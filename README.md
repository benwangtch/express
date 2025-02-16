# EXPRESS: An LLM-Generated Explainable Property Valuation System with Neighbor Imputation
## Overview
This system, called EXPRESS (LLM-Generated Explainable Property Valuation System with Neighbor Imputation), is designed for banks and financial institutions that issue loans to homebuyers, as well as property buyers and sellers planning to buy or sell properties.

## System Interface
* The interface of Property Configuration<br/>
![Image](/assests/express.png "Interface of Property Configuration")

* The interface of Prediction Result.<br/>
![Image](/assests/result.png "Interface of Prediction Result")

## Directory Structure
``` Bash
.
├── assests
│   ├── steps.svg
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
Due to the confidentiality of our property data, the data in the  './backend/data' directory can't be provided.

## Install and Usage
Due to the cost of the Google Geoencoding API might be high, and also the confidential issue mentioned above, we can only provide direct usage of our frontend. Run the command below to use the frontend interface.
```
    cd frontend
    npm install
    npm start
```

## Demonstration
* [Demo Video](https://youtu.be/kFh-Lx5nQIk "@embed")
* System Procedure:
    1. Select the property type and enter property details.
    2. Enter the property configuration.
    3. View the valuation result, pairwise explanation, and visualization on the map.
    4. Verify the result using the LLM-generated explanation and the spatial relationships shown on the map.
![Image](/assests/repo.png "Steps of EXPRESS")<br />

## References
* [LightGBM](https://github.com/microsoft/LightGBM "@embed") <br/>
* [Coordinate Convertion](https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/ "@embed")
