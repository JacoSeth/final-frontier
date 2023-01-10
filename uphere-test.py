# Import Packages

import requests
import json

# Read auth from config file
with open ('config.json', 'r') as config:
    configData = json.load(config)

# API call- return Sat Info
def getSatInfo(satNumber):
    url = f"https://uphere-space1.p.rapidapi.com/{satNumber}/43226/details"

    headers = configData["auth"]["uphere"]

    response = requests.request("GET", url, headers=headers)

    dict_entry = json.loads(response.text)

    mydict = {}

    mydict.update(dict_entry)

    return mydict


# API call- return Sat Location
def getSatLocation(satNumber):

    url = f"https://uphere-space1.p.rapidapi.com/satellite/{satNumber}/location"

    querystring = {"units":"metric"}

    headers = configData["auth"]["uphere"]

    response = requests.request("GET", url, headers=headers, params=querystring)

    # print(response.text)

# getSatInfo(43226)
# getSatLocation(43226)