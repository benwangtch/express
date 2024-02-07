import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import random 
import lightgbm as lgb
import pandas as pd
import argparse
from utils import predAndCalScore, checkAndMakeDir, initReport, addItemToReport, gridSearch
# from data import dataset
import joblib
import numpy as np
def set_random_seeds(seed):
        """Set the random seeds for reproducibility.

        Args:
            seed (int): The seed value to set for random number generators.

        Returns:
            None
        """
        random.seed(seed)
        np.random.seed(seed)
def column_filter(df, mode):
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



        
# Set testing data and create result report 


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
train_feat = column_filter(train_feat,mode)
val_feat = column_filter(val_feat, mode)
test_feat = column_filter(test_feat, mode)


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

if doGridSearch:
    print("Strating GridSearch.....")
    best_param, _ = gridSearch(gbm, [train_feat, train_price], [val_feat, val_price], param_grid)
    gbm.set_params(**best_param)
    gbm.fit(train_feat, train_price,eval_set=(val_feat, val_price),early_stopping_rounds =15,)
else:
    gbm.fit(train_feat, train_price,eval_set=(val_feat, val_price),early_stopping_rounds =15)

joblib.dump(gbm, f'./lgbm/sigir_noImpute_{mode}all.pkl')
gbm = joblib.load(f'./lgbm/sigir_noImpute_{mode}all.pkl')

ReportPath = f"./lgbm"
checkAndMakeDir(ReportPath)
ReportName = f"sigir_{mode}report.csv"
initReport(f'{ReportPath}/{ReportName}')

# evaluate model

testScore = [mode, predAndCalScore(gbm, test_feat, test_Price)]


addItemToReport(testScore, f'{ReportPath}/{ReportName}')
