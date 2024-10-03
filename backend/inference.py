# import lightgbm as lgb
import pandas as pd
import joblib
import json
import math
def take_exp(x):
    x = float(x)
    if x > 0:
        return math.exp(x)
    else:
        return 0
def inference(type,inferenceData, inputData):
    """Predict the unit price of input by LightGBM, using different model weight for each property type.

    Args:
        type (str): The property type.
        inferenceData (DataFrame): The inference data.
        inputData (json): The original inputData with converted coordinates for calculating the distances.

    Returns:
        json: A json file with informations including the prediction price.
    """
    if type == 'apartment':
        type = '公寓'
    elif type == 'building':
        type = '大樓'
    else:
        type = '透天厝'
    # gbm = lgb.LGBMRegressor(n_jobs=20, 
    #                     n_estimators=1000, 
    #                     learning_rate = 0.01, 
    #                     # num_leaves = 32, 
    #                     metric = 'mape')
    # gbm = joblib.load(f'./model/{type}all.pkl')
    # pred = gbm.predict(inferenceData)
    pred = [1038665, 0]
    output = {'type':inputData['type'],'addr':inputData['address'],'x座標':inferenceData['x座標'][0],'y座標':inferenceData['y座標'][0],'far':inferenceData['far'][0], 'house_age':inferenceData['house_age'][0], '土地移轉總面積(坪)':take_exp(inferenceData['土地移轉總面積(坪)'][0]), '建物移轉總面積(坪)':take_exp(inferenceData['建物移轉總面積(坪)'][0]),'population_density':inferenceData['population_density'][0], '主建物面積':take_exp(inferenceData['主建物面積'][0]), 'n_c_1000':inferenceData['n_c_1000'][0],'車位移轉總面積(坪)':take_exp(inferenceData['車位移轉總面積(坪)'][0]),'total_floor':inferenceData['total_floor'][0],'lat':inputData['lat'],'lon':inputData['lon'],'price_pin':pred[0] }
    return output