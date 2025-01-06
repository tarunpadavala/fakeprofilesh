from django.shortcuts import render
import matplotlib.pyplot as plt
import os
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
import instaloader
import csv
from joblib import load
import pandas as pd
import requests
import numpy as np
import json
import pickle
import matplotlib.pyplot as plt


def home(request):
    return HttpResponse("<h2>Backend is working !</h2>")

@csrf_exempt
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form_data = data.get('form_data')
        model_name = data.get('model')
        
        if not model_name or not form_data:
            return jsonify({"error": "Model or form data missing!"}), 400

        sex_code = int(form_data['sex_code'])
        statuses_count = int(form_data['statuses_count'])
        followers_count = int(form_data['followers_count'])
        friends_count = int(form_data['friends_count'])
        favourites_count = int(form_data['favourites_count'])
        listed_count = int(form_data['listed_count'])
        lang_code = int(form_data['lang_code'])

        input_features = [[
            sex_code,
            statuses_count,
            followers_count,
            friends_count,
            favourites_count,
            listed_count,
            lang_code,
        ]]

        data = np.array(input_features)
        print("Input features are : ", input_features)
        
        if model_name == 'xgboost':
            model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\twitter\xg_model.ckpt")
        else:
            model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\twitter\model.ckpt")

        prediction = model.predict(data)
        print("Prediction is : ", prediction)

        result = int(prediction[0])

        return JsonResponse({'prediction': result})

    return JsonResponse({"error": "Invalid request method. Use POST instead."}, status=405)

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
def Pk(value):
    if value:
        return 1
    else:
        return 0

def nameOk(username, full_name):
    return 1 if username == full_name else 0

def predictions():
    best_gb_model = load('./xgboost_model.joblib')
    new_data = pd.read_csv('./test.csv')
    return best_gb_model.predict(new_data)


@csrf_exempt
def get_profile_info(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('form_data')['profile_url']
            print("USERNAME : ",username)
            L = instaloader.Instaloader()
            
            model_name = data.get('model')
            
            try:
                profile = instaloader.Profile.from_username(L.context, username)
            
            except instaloader.exceptions.ProfileNotExistsException:
                return JsonResponse({"error": "The provided profile does not exist!"}, status=404)
            except instaloader.exceptions.ConnectionException:
                return JsonResponse({"error": "Profile Doesnt Exists"}, status=503)
            except Exception as e:
                return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
            
            profile_info = {
                "profile_pic": check(profile.profile_pic_url),
                "username_length": len(profile.username),
                "fullname_words": len(profile.full_name.split()),
                "fullname_length": len(profile.full_name),
                "name_equals_username": nameOk(profile.username, profile.full_name),
                "bio_length": len(profile.biography),
                "external_url": Pk(bool(profile.external_url)),
                "is_private": Pk(profile.is_private),
                "num_posts": profile.mediacount,
                "num_followers": profile.followers,
                "num_follows": profile.followees,
                # "is_verified": Pk(profile.is_verified),
            }
            
            print("Bio: ",profile.biography)
            
            if model_name == 'xgboost':
                model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\instagram\xgboost_optimized_model.pkl")
            else:
                model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\instagram\model.pkl")
                
                
            profile_df = pd.DataFrame([profile_info])
            prediction = model.predict(profile_df)[0]
            # print("Prediction",prediction)
            if Pk(profile.is_verified):
                prediction = 0
                
            print("Profile Verification",profile.is_verified)

            # with open('profile_info.csv', 'a', newline='', encoding='utf-8') as csvfile:
            #     fieldnames = profile_info.keys()
            #     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            #     if csvfile.tell() == 0:
            #         writer.writeheader()
            #     writer.writerow(profile_info)
            
            print("Prediction : ",prediction)

            return JsonResponse({"profile_info": profile_info, "prediction": "Fake" if prediction == 1 else "Not Fake"})
        except Exception as e:
           return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    return JsonResponse({"error": "Invalid request method. Use POST instead."}, status=405)

def result(request):
    try:
        predictions_result = predictions()
        prediction_labels = ["Fake" if pred == 1 else "Not Fake" for pred in predictions_result]
        return render(request, 'result.html', {"predictions": prediction_labels})
    except Exception as e:
        return render(request, 'index.html', {"error": str(e)})
    

@csrf_exempt
def FaceBookPredict(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        form_data = data.get('form_data')
        
        model_name = data.get('model')

        # print("Form Data : ",form_data)
        profile_picture = int(form_data['profile_picture'])
        friend_count = int(form_data['friend_count'])
        post_count = int(form_data['post_count'])
        account_age_days = int(form_data['account_age_days'])
        likes_per_post = float(form_data['likes_per_post'])
        comments_per_post = float(form_data['comments_per_post'])
        shared_links = int(form_data['shared_links'])
        about_section = int(form_data['about_section'])  

        input_features = np.array([[
            profile_picture,
            friend_count,
            post_count,
            account_age_days,
            likes_per_post,
            comments_per_post,
            shared_links,
            about_section,
        ]])
        
        if model_name == 'xgboost':
             model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\facebook\xgb_model.pkl")
        else:
            model = load(r"D:\VVIT-PROJ-8\fakeprofile\fakeprofile\models\facebook\rf_model.pkl")

        print("Input features are : ", input_features)
        print("Model name : ",model_name)
        prediction = model.predict(input_features)
        print("Prediction is : ", prediction)

        result = int(prediction[0])

        return JsonResponse({'prediction': result})

    return JsonResponse({"error": "Invalid request method. Use POST instead."}, status=405)

