import math
import numpy as np
import pandas as pd
import os, sys
import tqdm
from tqdm import tqdm
from sklearn.model_selection import ParameterGrid
from sklearn.metrics import mean_absolute_percentage_error

def checkAndMakeDir(directory):
    if not os.path.exists(directory):
        print(f'Make directory: {directory}')
        os.makedirs(directory)
def initReport(reportWholePath):
    with open(reportWholePath, 'w') as f:
        f.write('Training data ,  MAPE,  Hit10,  Hit20\n')
# def initcsv(reportWholePath):
#     with open(reportWholePath, 'w'):
#         f.write()
def addItemToReport(score, reportWholePath):
    if score is not None:
        with open(reportWholePath, 'a') as f:
            f.write(f'{score[0]},  {score[1][0]:.2f},  {score[1][1]:.2f},  {score[1][2]:.2f}\n')
# def calHitRate(y_hat, y, rate):
#     return (np.abs((y_hat-y)/y) < rate).mean()
def calHitRate(y_hat, y, rate):
    hit, total = 0, 0
    for each_y_hat, each_y in zip(y_hat, y):
        if np.abs((each_y_hat-each_y)/each_y) < rate:
            hit += 1
        total += 1
    return round((hit/total)*100, 2)
# def calMAPE(y_hat, y):
#     return np.abs((y_hat-y)/y).mean()
def calMAPE(y_true, y_pred):
    return round(mean_absolute_percentage_error(y_true, y_pred)*100, 2)

def predAndCalScore(model, feature, price):
    pred = model.predict(feature)
    # print(pred)
    # print(price)
    pred = pred.reshape(-1,1)
    mape = calMAPE(pred, price)
    hit10 = calHitRate(pred, price, 0.1)
    hit20 = calHitRate(pred, price, 0.2)
    
    # mape = mape[0]
    # hit10 = hit10[0]
    # hit20 = hit20[0]
    return (mape, hit10, hit20)

def gridSearch(model, trainData, valData, param_grid):
    bestScore = sys.maxsize
    bestParam = None
    for g in tqdm(ParameterGrid(param_grid)):
        model.set_params(**g)
        model.fit(trainData[0], trainData[1])

        pred = model.predict(valData[0])
        score = calMAPE(pred, valData[1])
        if score < bestScore:
            bestScore = score
            bestParam = g
    return bestParam, bestScore

def column_filter(df):
    return df.loc[:, ['city_nm2','town_nm','交易車位','小坪數物件','建物型態','主要用途','主要建材','有無管理組織','車位類別','電梯','firstfloor_ind','shop_ind','building_type2',
        'col2_ind','villname','都市土地使用分區','非都市土地使用編定',
        '土地移轉總面積(坪)','建物移轉總面積(坪)','建物現況格局-房','建物現況格局-廳','建物現況格局-衛','建物現況格局-隔間',
        '車位移轉總面積(坪)','主建物面積','附屬建物面積','陽台面積','house_age','交易筆棟數_土地','交易筆棟數_建物','交易筆棟數_停車位','building_area_no_park','single_floor_area','far','floor','total_floor',
        'x座標','y座標','larea_utilize_ratio','park_cnt_flat','park_cnt_mach',
        'n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000',
        'area_kilometer','population_density','house_price_index','unemployment_rate','econ_rate','lending_rate','land_tx_count','land_price','steel_id'
    ]]
def column_filter_knn(df):
    return df.loc[:, [
        'x座標','y座標'
    ]]
def loadData(dataPath, chineseBuildingType, mode):
    feature = pd.read_csv(f'{dataPath}/{chineseBuildingType}_{mode}Feat.csv')
    price = pd.read_csv(f'{dataPath}/{chineseBuildingType}_{mode}Price.csv').values.reshape(-1)
    return feature, price