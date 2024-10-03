import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle
import math
import random
import numpy as np
apartment_col = ['x座標', 'y座標', 'total_floor', 'house_age', '車位移轉總面積(坪)']
house_col = ['x座標', 'y座標', 'house_age', '土地移轉總面積(坪)', '建物移轉總面積(坪)','far']
building_col = ['x座標', 'y座標', '主建物面積', 'house_age']
def take_log(x):
    x = float(x)
    if x>0:
        return math.log(x)
    else:
        return 0.  
def selectByKNN(selectNum,inputData, mode, data):
    """Get the most similar datas by parameter filtering, base on different property type input features.

    Args:
        inputData (json): The original inputData with converted coordinates for calculating the distances.

    Returns:
        DataFrame: Returns the most similar five data after filtering.
    """
    data = data
    if mode == '公寓':
        # data = pd.read_csv('./data/all_apartment.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                'total_floor': [inputData['total_floor']],
                'house_age': [inputData['house_age']],
                '車位移轉總面積(坪)': [inputData['車位移轉總面積(坪)']]
            }
        X_input = pd.DataFrame(anchor, columns = apartment_col)
        knn_selector = NearestNeighbors(n_neighbors=selectNum)
        
        selected_df = data.loc[:, apartment_col]
        knn_selector.fit(selected_df)
        
    elif mode == '大樓':
        # data = pd.read_csv('./data/all_building.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                '主建物面積': [inputData['主建物面積']],
                'house_age': [inputData['house_age']]
            }
        X_input = pd.DataFrame(anchor, columns = building_col)
        knn_selector = NearestNeighbors(n_neighbors=selectNum)
        
        selected_df = data.loc[:, building_col]
        knn_selector.fit(selected_df)
        
    else:
        # data = pd.read_csv('./data/all_house.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                'house_age': [inputData['house_age']],
                '土地移轉總面積(坪)': [inputData['土地移轉總面積(坪)']],
                '建物移轉總面積(坪)': [inputData['建物移轉總面積(坪)']],
                'far': [inputData['far']]
            }
        X_input = pd.DataFrame(anchor, columns = house_col)
        knn_selector = NearestNeighbors(n_neighbors=selectNum)
        
        selected_df = data.loc[:, house_col]
        knn_selector.fit(selected_df)
        
    _, indices = knn_selector.kneighbors(X_input)
    KNNGroupData = data.iloc[indices[0]]
    return KNNGroupData

    
