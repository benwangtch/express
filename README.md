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

## Confidential Data Issue
Due to the confidential issue of our house data, the house data if directory './backend/data' can't be provided.

## Demonstration video
[Demo video](https://youtu.be/1YsPrxYtmLk "@embed") is provided for a clear understanding of how the system works.

## Demonstration
The screenshots below shows the four steps of our system,<br />
1. Select the property type and enter property details.
2. Set the property configuration.
3. Get the valuation result.
4. Verify the result with pairwise explanation and the location relationship shown on map.
![Image](/assests/steps.svg "Steps of EXPRESS")<br />



## References
[LightGBM](https://github.com/microsoft/LightGBM "@embed") <br/>
[Coordinate Convertion](https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/ "@embed")