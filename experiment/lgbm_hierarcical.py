import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import random 
import lightgbm as lgb
import pandas as pd
from selectProperties import *
from featureImputation import *
import argparse
from utils import predAndCalScore, checkAndMakeDir, initReport, addItemToReport, gridSearch, column_filter
# from data import dataset
import joblib
import numpy as np
from tqdm import tqdm
from concurrent.futures import ProcessPoolExecutor, as_completed
inputFilterFeat = ['filter_floorAreaRatio', 
              'filter_mainBuildingArea', 
              'filter_landTransferArea', 
              'filter_buildingTransferArea', 
              'filter_populationDensity', 
              'filter_totalFloors', 
              'filter_parkingArea', 
              'filter_n_c_1000', 'filter_houseAgeRange']
filterFeatTrueName ={
    'filter_floorAreaRatio': 'far',
    'filter_mainBuildingArea': '主建物面積',
    'filter_landTransferArea': '土地移轉總面積(坪)',
    'filter_buildingTransferArea': '建物移轉總面積(坪)',
    'filter_populationDensity': 'population_density',
    'filter_totalFloors': 'total_floor',
    'filter_parkingArea': '車位移轉總面積(坪)',
    'filter_n_c_1000': 'n_c_1000',
    'filter_houseAgeRange': 'house_age'
}
def set_random_seeds(seed):
        """Set the random seeds for reproducibility.

        Args:
            seed (int): The seed value to set for random number generators.

        Returns:
            None
        """
        random.seed(seed)
        np.random.seed(seed)
def test_column_filter(df, mode):
    if mode=='大樓':
        return df.loc[:, ['x座標', 'y座標', '主建物面積', 'house_age']]
    elif mode=='公寓':
        return df.loc[:, ['x座標', 'y座標', 'total_floor', 'house_age', '車位移轉總面積(坪)']]
    else:
        return df.loc[:, ['x座標', 'y座標', 'house_age', '土地移轉總面積(坪)', '建物移轉總面積(坪)','far' ]]
# Configs
parser = argparse.ArgumentParser()
parser.add_argument("--type", type=str)
args  = parser.parse_args()
mode = args.type

set_random_seeds(666)
doGridSearch = True

# load dataset
# Starting predicting...
print('Loading dataset...')
train_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_trainFeat.csv')
train_price = pd.read_csv(f'./data/demo_paper_data/{mode}_trainPrice.csv')

val_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_valFeat.csv')
val_price = pd.read_csv(f'./data/demo_paper_data/{mode}_valPrice.csv')

test_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_testFeat.csv')
test_Price = pd.read_csv(f'./data/demo_paper_data/{mode}_testPrice.csv').values.reshape(-1)

# Preprocess dataset
train_feat = column_filter(train_feat)
val_feat = column_filter(val_feat)
test_feat = column_filter(test_feat)

train_data = pd.concat([train_feat, train_price], axis=1)
val_data = pd.concat([val_feat, val_price], axis=1)

train_val_data = pd.concat([train_data, val_data], axis=0)

del train_data, val_data
param_grid = {
    'max_depth':[3, 5, 11, -1],
    'reg_lambda':[0, 0.02, 0.05, 0.07, 0.1],
    'min_split_gain':[0, 0.01, 0.02, 0.04],
    'num_leaves':[32, 64]
}


gbm = lgb.LGBMRegressor(n_jobs=20, 
                        n_estimators=1000, 
                        learning_rate = 0.01, 
                        # num_leaves = 32, 
                        
                        metric = 'mape')


gbm = joblib.load(f'./lgbm/{mode}all.pkl')

ReportPath = f"./lgbm"
checkAndMakeDir(ReportPath)
ReportName = f"sigir_default_impute_{mode}report.csv"
initReport(f'{ReportPath}/{ReportName}')


# evaluate model
def process_row(args):
    idx, row, mode = args
    tmp_dict = row.to_dict()
    groupData = getSimilarProperties(mode, tmp_dict, train_val_data)
    inferenceData = imputeMissingValues(mode, tmp_dict, groupData)
    return inferenceData

def parallel_process(df, mode):
    imputed_data = pd.DataFrame(columns=allFeatList)
    args_list = [(idx, row, mode) for idx, row in df.iterrows()]

    with ProcessPoolExecutor(max_workers=40) as executor:  # Adjust max_workers based on your machine's capabilities
        results = list(tqdm(executor.map(process_row, args_list), total=len(args_list), desc="Processing Rows"))

    for result in results:
        imputed_data = pd.concat([imputed_data, result], ignore_index=True)

    return imputed_data

impute_test_feat = test_column_filter(test_feat, mode)
imputed_test_data = parallel_process(impute_test_feat, mode)
# imputed_test_data = imputed_test_data.iloc[1:]  # Remove the first row with index 0

imputed_test_data.to_csv(f'./data/demo_paper_data/sigir_default_impute_{mode}_testFeat.csv', index=False)

testScore = [mode, predAndCalScore(gbm, imputed_test_data, test_Price)]


addItemToReport(testScore, f'{ReportPath}/{ReportName}')
