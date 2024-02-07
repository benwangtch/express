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

set_random_seeds(6)
doGridSearch = True

# load dataset
# Starting predicting...
print('Loading dataset...')
train_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_trainFeat.csv')
train_price = pd.read_csv(f'./data/demo_paper_data/{mode}_trainPrice.csv').values.reshape(-1)

val_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_valFeat.csv')
val_price = pd.read_csv(f'./data/demo_paper_data/{mode}_valPrice.csv').values.reshape(-1)

test_feat = pd.read_csv(f'./data/demo_paper_data/{mode}_testFeat.csv')
test_Price = pd.read_csv(f'./data/demo_paper_data/{mode}_testPrice.csv').values.reshape(-1)

# Preprocess dataset
train_feat = column_filter(train_feat)
val_feat = column_filter(val_feat)
test_feat = column_filter(test_feat)


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
# gbm = joblib.load(f'./lgbm/公寓all.pkl') 


ReportPath = f"./lgbm"
checkAndMakeDir(ReportPath)
ReportName = f"sigir_ave_impute_{mode}report.csv"
initReport(f'{ReportPath}/{ReportName}')




if mode == '公寓':
    data = pd.read_csv('./data/all_apartment.csv')
    inputFeat = ['n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000','x座標', 'y座標', 'total_floor', 'city_nm2', 'town_nm','house_age', '車位移轉總面積(坪)']
    inputData = {'type':mode, 'x座標':0, 'y座標':0, 'house_age':10, 'total_floor':10, '車位移轉總面積(坪)':10}
elif mode == '大樓':
    data = pd.read_csv('./data/all_building.csv')
    inputFeat = ['n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000','x座標', 'y座標', '主建物面積', 'city_nm2', 'town_nm','house_age', '建物移轉總面積(坪)','土地移轉總面積(坪)']
    inputData = {'type':mode, 'x座標':0, 'y座標':0, 'house_age':10, '主建物面積':10}
else:
    data = pd.read_csv('./data/all_house.csv')
    inputFeat = ['n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000','x座標', 'y座標', 'house_age', 'city_nm2', 'town_nm','土地移轉總面積(坪)', '建物移轉總面積(坪)','far' ]
    inputData = {'type':mode, 'x座標':0, 'y座標':0, 'house_age':10, '土地移轉總面積(坪)':10, '建物移轉總面積(坪)':10, 'far':10}
    
inferenceData = imputeMissingValues(mode, inputData, data)
print(f'InferenceData: {inferenceData}')
for items in allFeatList:
    if items not in inputFeat:
        test_feat[items] = inferenceData[items]
        # print(f'Add {items} to test_feat')
testScore = [mode, predAndCalScore(gbm, test_feat, test_Price)]

addItemToReport(testScore, f'{ReportPath}/{ReportName}')

