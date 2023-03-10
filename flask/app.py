#using flask to create our api endpoint
from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
import os,requests,json
from dotenv import load_dotenv
load_dotenv()
#import variables
SECRET_KEY = os.getenv('PLAYHT_AUTH_KEY')
API_ID = os.getenv('PLAYHT_USER_ID')

#create endpoint for generating audio
@app.route('/audio/<toTranslate>/<voice>', methods = ['GET'])
@cross_origin()
def generateAudio(toTranslate,voice):
  print(voice,toTranslate)
  payload = json.dumps({
  "voice": voice,
  "content":[toTranslate],
   "title": "Testing public api convertion",
     
})
  print(voice)

  url = "https://play.ht/api/v1/convert"

  headers =  {
        'Authorization': SECRET_KEY,
        'X-User-ID': API_ID,
        "Content-Type":"application/json"
    }
 
  response = requests.request("POST", url, headers=headers, data=payload)
  print(response.text)
  return jsonify(response.text)



#endpoint for retrieving audio
@app.route('/getAudio/<transcriptionId>', methods = ['GET'])
@cross_origin()
def getAudio(transcriptionId):
    headers =  {
            'Authorization': SECRET_KEY,
            'X-User-ID': API_ID,
            "Content-Type":"application/json"
        }
    url = f'https://play.ht/api/v1/articleStatus?transcriptionId={transcriptionId}'
    print(url);
    response = requests.request("GET",url, headers=headers)
    return jsonify(response.text)

#run app
if __name__ == '__main__':
    app.run(debug=True)
