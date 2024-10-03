import numpy as np
import pandas as pd
import requests
import math
from math import degrees, tan, sin, cos, radians
import warnings
warnings.filterwarnings("ignore")

allFeatList = ['city_nm2', 'town_nm', '交易車位', '小坪數物件', '建物型態', '主要用途', '主要建材', '有無管理組織', 
    '車位類別', '電梯', 'firstfloor_ind', 'shop_ind', 'building_type2', 'col2_ind', 'villname', 
    '都市土地使用分區', '非都市土地使用編定','土地移轉總面積(坪)','建物移轉總面積(坪)','建物現況格局-房','建物現況格局-廳','建物現況格局-衛','建物現況格局-隔間',
        '車位移轉總面積(坪)','主建物面積','附屬建物面積','陽台面積','house_age','交易筆棟數_土地','交易筆棟數_建物','交易筆棟數_停車位','building_area_no_park','single_floor_area','far','floor','total_floor',
        'x座標','y座標','larea_utilize_ratio','park_cnt_flat','park_cnt_mach',
        'n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000',
        'area_kilometer','population_density','house_price_index','unemployment_rate','econ_rate','lending_rate','land_tx_count','land_price','steel_id']
CatFeatList = [
    'city_nm2', 'town_nm', '交易車位', '小坪數物件', '建物型態', '主要用途', '主要建材', '有無管理組織', 
    '車位類別', '電梯', 'firstfloor_ind', 'shop_ind', 'building_type2', 'col2_ind', 'villname', 
    '都市土地使用分區', '非都市土地使用編定'
]
NumFeatList = ['土地移轉總面積(坪)','建物移轉總面積(坪)','建物現況格局-房','建物現況格局-廳','建物現況格局-衛','建物現況格局-隔間',
        '車位移轉總面積(坪)','主建物面積','附屬建物面積','陽台面積','house_age','交易筆棟數_土地','交易筆棟數_建物','交易筆棟數_停車位','building_area_no_park','single_floor_area','far','floor','total_floor',
        'x座標','y座標','larea_utilize_ratio','park_cnt_flat','park_cnt_mach',
        'n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000',
        'area_kilometer','population_density','house_price_index','unemployment_rate','econ_rate','lending_rate','land_tx_count','land_price','steel_id']
NumCatFeatList = ['建物現況格局-房','建物現況格局-廳','建物現況格局-衛','建物現況格局-隔間','交易筆棟數_土地','交易筆棟數_建物','交易筆棟數_停車位','floor','total_floor',
                  'n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000']

# Inputs: 
# Building => addr, age, area
# apartment => addr, age, total_floor, parking_area
# House => addr, age, far, land transfer, house transfer
# Fill missing feature, Numerical feature => average, Catagorical data => the most catagory
def imputeMissingValues(mode, inputData, groupData):
    """Impute the missing values by similar data.

    Args:
        inputData (json): The original inputData with converted coordinates for calculating the distances.
        groupData (DataFrame): The most similar five data grouped by input features.

    Returns:
        DataFrame: The imputed inputData for inference.
    """
    tmp  = pd.DataFrame(columns=allFeatList, index=[0])
    tmp['x座標'] = float(inputData['x座標'])
    tmp['y座標'] = float(inputData['y座標'])
    tmp['house_age'] = float(inputData['house_age'])
    
    if mode == '公寓':
        tmp['total_floor'] = float(inputData['total_floor'])
        tmp['車位移轉總面積(坪)'] = float(inputData['車位移轉總面積(坪)'])
        # Get most common for catFeat, mean for numFeat
        for catFeat in CatFeatList:
            tmp[catFeat] = groupData[catFeat].mode()[0] 
        
        for numFeat in NumFeatList:
            isNumCat=False
            for item in NumCatFeatList:
                if numFeat == item:
                    isNumCat=True
            if numFeat != 'x座標' and numFeat !='y座標'and numFeat !='house_age'and numFeat !='total_floor' and numFeat !='車位移轉總面積(坪)':
                if isNumCat:
                    tmp[numFeat] = round(groupData[numFeat].mean(),0)
                else:
                    tmp[numFeat] = groupData[numFeat].mean()
        
    elif mode == '大樓':
        tmp['主建物面積'] = float(inputData['主建物面積'])
        
        for catFeat in CatFeatList:
            tmp[catFeat] = groupData[catFeat].mode()[0]
            
        for numFeat in NumFeatList:
            isNumCat=False
            for item in NumCatFeatList:
                if numFeat == item:
                    isNumCat=True
            if numFeat != 'x座標' and numFeat !='y座標'and numFeat !='house_age'and numFeat !='主建物面積':
                if isNumCat:
                    tmp[numFeat] = round(groupData[numFeat].mean(),0)
                else:
                    tmp[numFeat] = groupData[numFeat].mean()
    else: # House
        tmp['far'] = float(inputData['far'])
        tmp['土地移轉總面積(坪)'] = float(inputData['土地移轉總面積(坪)'])
        tmp['建物移轉總面積(坪)'] = float(inputData['建物移轉總面積(坪)'])
        for catFeat in CatFeatList:
            tmp[catFeat] = groupData[catFeat].mode()[0]
        for numFeat in NumFeatList:
            isNumCat=False
            for item in NumCatFeatList:
                if numFeat == item:
                    isNumCat=True
            if numFeat != 'x座標' and numFeat !='y座標'and numFeat !='house_age'and numFeat !='far' and numFeat !='土地移轉總面積(坪)'and numFeat!='建物移轉總面積(坪)':
                if isNumCat:
                    tmp[numFeat] = round(groupData[numFeat].mean(),0)
                else:
                    tmp[numFeat] = groupData[numFeat].mean()
    tmp['house_price_index'] = 121.01
    tmp['unemployment_rate'] = 0.0364
    tmp['econ_rate'] = 0.0314
    tmp['lending_rate'] = 0.01368
    tmp['land_tx_count'] = 158199
    tmp['land_price'] = 105.86
    tmp['steel_id'] = 1605.58
    return tmp

