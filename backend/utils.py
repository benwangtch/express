
CityList = [
    '臺北市', '臺中市', '基隆市', '臺南市', '高雄市', '新北市', '宜蘭縣', '桃園市', '嘉義市', 
    '新竹縣', '苗栗縣', '南投縣', '彰化縣', '新竹市', '雲林縣', '嘉義縣', '屏東縣', '花蓮縣', 
    '臺東縣', '金門縣', '澎湖縣'
]
TypeList = ['大樓', '公寓', '透天厝']
BuildingTypeMapping = {
    'building':'大樓',
    'apartment':'公寓',
    'house':'透天厝'
}
cols =  ['city_nm2','town_nm','交易車位','小坪數物件','建物型態','主要用途','主要建材','有無管理組織','車位類別','電梯','firstfloor_ind','shop_ind','building_type2',
        'col2_ind','villname','都市土地使用分區','非都市土地使用編定',
        '土地移轉總面積(坪)','建物移轉總面積(坪)','建物現況格局-房','建物現況格局-廳','建物現況格局-衛','建物現況格局-隔間',
        '車位移轉總面積(坪)','主建物面積','附屬建物面積','陽台面積','house_age','交易筆棟數_土地','交易筆棟數_建物','交易筆棟數_停車位','building_area_no_park','single_floor_area','far','floor','total_floor',
        'x座標','y座標','larea_utilize_ratio','park_cnt_flat','park_cnt_mach',
        'n_a_10', 'n_a_50', 'n_a_100', 'n_a_250', 'n_a_500', 'n_a_1000', 'n_a_5000', 'n_a_10000','n_c_10', 'n_c_50', 'n_c_100', 'n_c_250', 'n_c_500', 'n_c_1000', 'n_c_5000', 'n_c_10000',
        'area_kilometer','population_density','house_price_index','unemployment_rate','econ_rate','lending_rate','land_tx_count','land_price','steel_id'
        ]
apartment_col = ['type','address', 'houseAge', 'totalFloors', 'parkingArea']
house_col = ['type','address', 'houseAge', 'landTransferArea', 'buildingTransferArea', 'floorAreaRatio']
building_col = ['type','address', 'houseAge', 'mainBuildingArea']
def checkFilterData(inputData):
    if inputData['type'] == 'apartment':
        for key in inputData.keys():
            if key not in apartment_col and inputData[key]!=[0,0]:
                print(key)
                return True
    elif inputData['type'] == 'building':
        for key in inputData.keys():
            if key not in building_col and inputData[key]!=[0,0]:
                print(key)
                return True
    else:
        for key in inputData.keys():
            if key not in house_col and inputData[key]!=[0,0]:
                return True
    return False
