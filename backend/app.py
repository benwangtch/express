from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
import ast
from utils import *
from selectProperties import *
from featureImputation import *
from inference import *
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)


# @app.route("/")
# def hello():
# 	return render_template('index.html')
@app.route("/test")
def test():
    data = {
        "type": "Building",
        "address": "test",
        "houseAge": "25",
        "mainBuildingArea": "3.4",
    }
    return jsonify(data)


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
    inputData = data

    load_dotenv("../frontend/.env", "REACT_APP_GOOGLE_MAPS_API_KEY")
    api = os.getenv("REACT_APP_GOOGLE_MAPS_API_KEY")
    # Convert from TWD97 to LatLon
    inputData = getLatLong(inputData, api)

    groupData = getSimilarProperties(inputData)
    # For Case study
    # groupData.to_csv('./similar_data.csv', index=False)
    inferenceData = imputeMissingValues(inputData, groupData)
    # For Case study
    # outputInf = pd.DataFrame(inferenceData)
    # outputInf.to_csv('./inference_data.csv', index=False)
    output = inference(inputData["type"], inferenceData, inputData)
    # Get LatLon and addr for groupData to show on map
    groupData = getGroupLatLon(groupData, api)
    groupData = convertGroupNumFeat(inputData["type"], groupData)
    groupData.to_csv("./groupData.csv", index=False)
    groupData = groupData.to_json()

    output = {"groupData": groupData, "output": output}
    print("Inference done.")
    return output


if __name__ == "__main__":
    app.run(debug=True, port=8000)
