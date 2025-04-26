#app/model.py will have the code for loading the model and making predictions.

import joblib

def load_model():
    return joblib.load('model/final_trained_model.pkl')

def predict(model, data):
    return model.predict(data)
