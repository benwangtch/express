# EXPRESS: An LLM-Generated Explainable Property Valuation System with Neighbor Imputation
Our system is an Explainable Property Valuation System called EXPRESS, which can be used by banks and financial institutions that make loans for house buyers, property buyers or sellers who plan to buy or sell properties.


System screenshot of input page.<br/>

![Image](/assests/express.png "Interface of EXPRESS")

System screenshot after valuation.<br/>

![Image](/assests/result.png "Interface of EXPRESS")

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
Due to the confidential issue of our house data, the house data if directory './backend/data' can't be provided.

## Install and Usage
Due to the cost of Geoencoding API provided by Google might be high, and also with the confidential issue mentioned above, we can only provide direct usage of our frontend. Run the command below for the frontend interface usage.
```
    cd frontend
    npm install
    npm start
```

## Demonstration video
[Demo video](https://youtu.be/kFh-Lx5nQIk "@embed") is provided for a clear understanding of how the system works.

## Demonstration
The screenshots below shows the four steps of our system,<br />
1. Select the property type and enter property details.
2. Set the property configuration.
3. Get the valuation result.
4. Verify the result with pairwise explanation and the location relationship shown on map.
![Image](/assests/repo.png "Steps of EXPRESS")<br />



## References
[LightGBM](https://github.com/microsoft/LightGBM "@embed") <br/>
[Coordinate Convertion](https://blog.ez2learn.com/2009/08/15/lat-lon-to-twd97/ "@embed")