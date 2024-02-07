# EXPRESS: A Model-Agnostic Explainable Property Valuation System with Neighbor Imputation.
System screenshot after valuation.<br/>

![Image](/assests/express.png "Interface of EXPRESS")

## Directory Structure
``` Bash
├── app.py
├── app_demo.py
├── convertCoord.py
├── demo
│   ├── building_demo.csv
│   ├── apartment_demo.csv
│   └── house_demo.csv
├── data
│   ├── all_apartment.csv
│   ├── all_building.csv
│   └── all_house.csv
├── apikey.txt
├── imputeMissingValues.py
├── inference.py
├── model
│   ├── 公寓all.pkl
│   ├── 大樓all.pkl
│   └── 透天厝all.pkl
├── README.md
├── requirements.txt
├── selectProperties.py
├── assests
│   └── images
│       ├── express.png
│       └── steps.png
├── static
│   ├── scripts
│   │   ├── map.js
│   │   ├── script.js
│   │   └── user.js
│   └── styles
│       ├── map.css
│       └── style.css
├── templates
│   └── index.html
└── utils.py
```

## Installation
Recommand conda for setting up the environment, with other applications, the versions of the packages is shown in 'requirements.txt'.
```
    conda create --name <env> --file requirements.txt
```
We used the service, geocoding, which is provided by Google. So for demonstration, you will need to apply for a api key from the site below, then put your **api key** in file `./apiKey.txt`, and in the second line of `./static/scripts/map.js`.<br />
[Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start?hl=zh-tw "@embed")
## Demonstration
The screenshots below shows the four steps of our system,<br />
1. Select the property type.
2. Enter property details.
3. Get the valuation result.
4. Verify the result with pairwise explanation and the location relationship shown on map.
![Image](/assests/images/steps.png "Steps of EXPRESS")<br />

However, due to confidential issue, the complete dataset which is in the folder './data/' can't be provided. Alternatively, we provide a demo version, which can be ran by the command below.

```
    flask --app app_demo run
```

For each property type, we randomly selected one property for demonstration, then saved the grouped similar data in `./demo/`. First, choose a property type. Second, enter the corresponding values for each property type then press **valuate**.
| Property Type | Address |  House Age  | Main Building Area |
|:-----|:--------:|:--------:|------:|
| Building | 台中市南屯區文心路一段215號   | 33 | 4.3 |


| Property Type | Address |  House Age  | Total Floors | Parking Area |
|:-----|:--------:|:--------:|:------:|------:|
| Apartment | 新北市永和區國中路28號   | 33 | 5 | 0 |

| Property Type | Address |  House Age  | Floor Area Ratio | Land Transfer Area | Building Transfer Area |
|:-----|:--------:|:--------:|:------:|:------:|------:|
| House | 高雄市苓雅區林森二路7-7號   | 40 | 3.4 | 3.2 | 4.1 |

The results of above are the same as the original system, we simply saved the dataframe selected by the function `getSimilarProperties(inputData)` from `selectProperties.py` to the folder `./demo/`.

## References
[LightGBM](https://github.com/microsoft/LightGBM "@embed") <br/>
[Coordinate Convertion](https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/ "@embed")