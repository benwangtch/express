# EXPRESS: A Model-Agnostic Explainable Property Valuation System with Neighbor Imputation.
System screenshot after valuation.<br/>

![Image](/assests/express.png "Interface of EXPRESS")

## Directory Structure
``` Bash
.
├── assests
│   └── express.png
├── backend
│   ├── app.py
│   ├── convertCoord.py
│   ├── data
│   │   ├── all_apartment.csv
│   │   ├── all_building.csv
│   │   └── all_house.csv
│   ├── featureImputation.py
│   ├── inference.py
│   ├── model
│   │   ├── 公寓all.pkl
│   │   ├── 大樓all.pkl
│   │   └── 透天厝all.pkl
│   ├── selectByKNN.py
│   ├── selectProperties.py
│   └── utils.py
├── experiment
│   ├── featureImputation.py
│   ├── lgbm_ave.py
│   ├── lgbm_hierarcical.py
│   ├── lgbm_knn.py
│   ├── lgbm_noImpute.py
│   ├── selectByKNN.py
│   ├── selectProperties.py
│   └── utils.py
├── frontend
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── components
│       │   ├── apartment.js
│       │   ├── building.js
│       │   ├── customSlider.js
│       │   ├── house.js
│       │   ├── map.js
│       │   ├── similarProperties.js
│       │   ├── test.js
│       │   └── valuationResult.js
│       ├── data
│       │   ├── output.js
│       │   ├── processSimiData.js
│       │   └── processValData.js
│       ├── imgs
│       │   ├── simiHouse.svg
│       │   └── userHouse.svg
│       ├── index.css
│       ├── index.js
│       ├── layouts
│       │   └── Navbar.js
│       ├── pages
│       │   ├── About.js
│       │   ├── Home.js
│       │   └── Result.js
│       ├── reportWebVitals.js
│       └── setupTests.js
└── README.md
```

## Installation
Recommand conda for setting up the environment, with other applications, the versions of the packages is shown in 'requirements.txt'.
```
    conda create --name <env> --file requirements.txt
```
We used the service, geocoding, which is provided by Google. So for running the system, you will need to apply for a api key from the site below, then put your **api key** in file `./frontend/.env` as REACT_APP_GOOGLE_MAPS_API_KEY='API_KEY'.

## Confidential Data Issue
Due to the confidential issue of our house data, the house data if directory './backend/data' can't be provided.

## Demonstration
The screenshots below shows the four steps of our system,<br />
1. Select the property type.
2. Enter property details.
3. Set the property configuration.
4. Get the valuation result.
5. Verify the result with pairwise explanation and the location relationship shown on map.
![Image](/assests/images/steps.png "Steps of EXPRESS")<br />



## References
[LightGBM](https://github.com/microsoft/LightGBM "@embed") <br/>
[Coordinate Convertion](https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/ "@embed")