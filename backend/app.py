from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import ast
from utils import *
from selectProperties import *
from featureImputation import *
from selectByKNN import *
from inference import *
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)


@app.route("/process", methods=["POST"])
def process():
    """The api used to get input from user, run all the algorithms and
    output the five similar data and prediction.

    Args:
        data (json): The original input from users.

    Returns:
        json: A json format with two keys, groupData and output.
    """
    data = request.json
    print(data)
    inputData = data

    load_dotenv("../frontend/.env", "REACT_APP_GOOGLE_MAPS_API_KEY")
    api = os.getenv("REACT_APP_GOOGLE_MAPS_API_KEY")
    
    #Check if filter info is input
    withFilterData = checkFilterData(inputData)
    # Convert from TWD97 to LatLon
    inputData = getLatLong(inputData, api)
    
    
    
    # If filter info is input, use the filter info to filter the data,
    # Otherwise, use the target info to select the properties(old version)
    if withFilterData:
        print("Get KNN training data by filter info...")
        notEnoughData, knnTrainData, filter_dict = getFilterData(inputData)
        # If knnTrainData is not enough, use target info for selectProperties
        if notEnoughData:
            print("Not enough data for training KNN, using target info for selectProperties...")
            inputData, groupData = getSimilarProperties(inputData)
        else:
            # The neighbor number is 1/10 of the training data (TODO: need to be tuned)
            similarNum = int(knnTrainData.shape[0])
            print("Original similarNum: ", similarNum)
            similarNum = min(similarNum, 20)
            print("Adjusted similarNum: ", similarNum)
            inputData, groupData = selectByKNN(similarNum,inputData, filter_dict, knnTrainData)
    else:
        print("No filter info input, using target info for selectProperties...")
        inputData, groupData = getSimilarProperties(inputData)
    
    # For Case study
    groupData.to_csv('./similar_data_knn.csv', index=False)
    inferenceData = imputeMissingValues(inputData, groupData)
    # For Case study
    # outputInf = pd.DataFrame(inferenceData)
    # outputInf.to_csv('./inference_data.csv', index=False)
    output = inference(inputData["type"], inferenceData, inputData)
    # Get LatLon and addr for groupData to show on map
    groupData = getGroupLatLon(groupData, api)
    groupData = convertGroupNumFeat(inputData["type"], groupData)
    groupData.to_csv("./groupData.csv", index=False)
    groupData = groupData.to_json(orient="records")
    output = {"groupData": groupData, "output": output}
    print("Inference done.")
    return output


if __name__ == "__main__":
    app.run(debug=True, port=5000)
