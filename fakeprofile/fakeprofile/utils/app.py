from flask import Flask, request, jsonify, render_template
import instaloader
import csv
from joblib import load  
import pandas as pd
import requests

app = Flask(__name__)

import requests

def print_url_size(url):
    try:
        response = requests.get(url)
        response.raise_for_status() 
    
        content_bytes = response.content
        print(f"The size of the content at {url} is {len(content_bytes)} bytes.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")


default_url = "https://instagram.fxyz1-1.fna.fbcdn.net/v/t51.2885-19/11849794_1285101736464711_3193638103259049534_a.jpg" 
def check(value):
    response = requests.get(value,stream=True)
    
    
    if response.status_code == 200:
        print("Length of content is : ",len(response.content))
        
        url_size = len(response.content)
        
        default_threshold = 2000
        custom_threshold = 8000
        
        if url_size <= default_threshold:
            return 0
        else:
            return 1
        
    # if value == default_url:
    #     return 0
    # else:
    #     return 1


def bool_to_int(value):
    if value:
        return 1
    else:
        return 0

def same_name(username, full_name):
    return 1 if username == full_name else 0

def predictions():
    best_gb_model = load('./xgboost_model.joblib')
    new_data = pd.read_csv('./test.csv')

    predictions = best_gb_model.predict(new_data)

    return predictions

@app.route('/')
def home():
    try:
        return render_template('index.html')
    except Exception as e:
        return render_template('index.html', error=str(e))

@app.route('/profile_info', methods=['POST'])
def get_profile_info():
    try:
       
        username = request.form.get('profile_username')

        print(username)
        
        L = instaloader.Instaloader()

        try:
            profile = instaloader.Profile.from_username(L.context, username)
            if profile is None:
                return render_template('index.html', error="Profile not found.")
        except instaloader.ProfileNotExistsException:
            return render_template('index.html', error="Profile not found.")
        except Exception as e:
            return render_template('index.html', error=str(e))

        print()
        profile_info = {
            "profile_pic": check(profile.profile_pic_url),
            "username_length": len(profile.username),
            "fullname_words": len(profile.full_name.split()),
            "fullname_length": len(profile.full_name),
            "name_equals_username": same_name(profile.username, profile.full_name),
            "bio_length": len(profile.biography),
            "external_url": bool_to_int(bool(profile.external_url)),
            "is_private": bool_to_int(profile.is_private),
            "num_posts": profile.mediacount,
            "num_followers": profile.followers,
            "num_follows": profile.followees
        }
        
        model = load('./model.pkl')
        profile_df = pd.DataFrame([profile_info])
        print("Prediction is : ", model.predict(profile_df))
        
        
        with open('profile_info.csv', 'a', newline='', encoding='utf-8') as csvfile:
            fieldnames = profile_info.keys()
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            if csvfile.tell() == 0:
                writer.writeheader()
            writer.writerow(profile_info)

        return jsonify(profile_info)
    
    except Exception as e:
        return render_template('index.html', error=str(e))
    
@app.route('/result',methods=['POST'])
def result():
    try:
        profile_info = get_profile_info()
        print(profile_info)
        
        predictions = predictions()

        prediction_labels = ["Fake" if pred == 1 else "Not Fake" for pred in predictions]

        return render_template('result.html', profile_info=profile_info, predictions=prediction_labels)
    except Exception as e:
        return render_template('index.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
