import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle
import math
apartment_col = ['x座標', 'y座標', 'total_floor', 'house_age', '車位移轉總面積(坪)']
house_col = ['x座標', 'y座標', 'house_age', '土地移轉總面積(坪)', '建物移轉總面積(坪)','far']
building_col = ['x座標', 'y座標', '主建物面積', 'house_age']
def take_log(x):
    x = float(x)
    if x>0:
        return math.log(x)
    else:
        return 0.  
def selectByKNN(inputData):
    """Get the most similar datas by parameter filtering, base on different property type input features.

    Args:
        inputData (json): The original inputData with converted coordinates for calculating the distances.

    Returns:
        DataFrame: Returns the most similar five data after filtering.
    """
    if inputData['type'] == 'apartment':
        data = pd.read_csv('./data/all_apartment.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                'total_floor': [inputData['totalFloors']],
                'house_age': [inputData['houseAge']],
                '車位移轉總面積(坪)': [take_log(inputData['parkingArea'])]
            }
        X_input = pd.DataFrame(anchor, columns = apartment_col)
        with open('./model/knn_apartment.pkl', 'rb') as f:
            knn_selector = pickle.load(f)
         
    elif inputData['type'] == 'building':
        data = pd.read_csv('./data/all_building.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                '主建物面積': [take_log(inputData['mainBuildingArea'])],
                'house_age': [inputData['houseAge']]
            }
        X_input = pd.DataFrame(anchor, columns = building_col)
        with open('./model/knn_building.pkl', 'rb') as f:
            knn_selector = pickle.load(f)
    else:
        data = pd.read_csv('./data/all_house.csv')
        anchor = {
                'x座標': [inputData['x座標']],
                'y座標': [inputData['y座標']],
                'house_age': [inputData['houseAge']],
                '土地移轉總面積(坪)': [take_log(inputData['landTransferArea'])],
                '建物移轉總面積(坪)': [take_log(inputData['buildingTransferArea'])],
                'far': [inputData['floorAreaRatio']]
            }
        X_input = pd.DataFrame(anchor, columns = house_col)
        
        with open('./model/knn_house.pkl', 'rb') as f:
            knn_selector = pickle.load(f)
        
    _, indices = knn_selector.kneighbors(X_input)
    most_similar_data = data.iloc[indices[0]]
    return most_similar_data
