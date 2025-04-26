This project is a complete Machine Learning pipeline to predict water potability (safe to drink or not), deployed with a FastAPI backend and a React frontend.

It was developed during a hackathon with a focus on robust data preprocessing, balanced model training, and full-stack deployment.

🧪 Project Overview
Goal: Predict whether water is safe for human consumption (Potable: 1, Not Potable: 0).

Tech Stack: Python (scikit-learn, FastAPI), React.js, Axios, MinMaxScaler, SMOTE, Random Forest.

Deployment:

Backend: FastAPI serving the trained model

Frontend: React app for user input and displaying results

📊 Data Preprocessing
Missing Values: Imputed missing values in pH, Sulfate, and Trihalomethanes using SimpleImputer.

Feature Scaling: Applied MinMaxScaler to normalize features between 0 and 1.

Skewness Correction: Applied log1p() transformation on highly skewed features (Solids, Conductivity, Trihalomethanes).

Outlier Treatment: Managed outliers using boxplots and domain knowledge.

Class Imbalance Handling:

Before SMOTE: {0: 1586, 1: 1034}

After SMOTE: {0: 1586, 1: 1586} — perfectly balanced.

Key Insight: Without SMOTE, the model would heavily favor predicting non-potable water.

📈 Exploratory Data Analysis (EDA)
Plotted histograms, boxplots, and correlation heatmaps.

Discovered strong correlations (e.g., between Solids and Conductivity).

Visualized clear class imbalance leading to the application of SMOTE.

🛠 Feature Engineering
Initially kept all features for interpretability.

Focused on reducing noise by considering feature importance during model tuning.

🤖 Model Training & Tuning
Algorithm: Random Forest Classifier

Hyperparameter Tuning: Used GridSearchCV to optimize:

n_estimators: [100, 200, 300]

max_depth: [None, 10, 20]

min_samples_split: [2, 5, 10]

Best Parameters:


{'n_estimators': 300, 'max_depth': 10, 'min_samples_split': 10}
Final Metrics:

Accuracy: 64.48%

F1-Score (Potable class): 53%

Improvements in recall and F1-score for potable water after preprocessing and SMOTE.

Model Saved As: final_trained_model.pkl

🚀 FastAPI Backend
Created a FastAPI server (main.py) to:

Load the trained model using joblib.

Create an endpoint /predict that receives feature inputs and returns a prediction (0 or 1).

🌐 React Frontend
Developed a React app for the UI:

Nine input fields for water features (pH, Hardness, Solids, etc.).

Sends a POST request to FastAPI using Axios.

Displays whether the water is "Safe to Drink" or "Unsafe to Drink" based on the model's prediction.

🧪 Sample Input for API Testing
Sample input JSON you can use in Postman:

{
  "ph": 9.18156,
  "Hardness": 273.8138067,
  "Solids": 24041.32628,
  "Chloramines": 6.904989726,
  "Sulfate": 398.3505168,
  "Conductivity": 477.9746419,
  "Organic_carbon": 13.38734078,
  "Trihalomethanes": 71.45736221,
  "Turbidity": 4.503660796
}
📝 How to Run Locally
Clone the repository:


git clone https://github.com/your-username/Water-Potability-Prediction-Full-Stack-ML-Deployment-FastAPI-React-.git
Backend (FastAPI):

bash
Copy
Edit
cd prediction-api
pip install -r requirements.txt
uvicorn main:app --reload
Frontend (React):

bash
Copy
Edit
cd prediction-ui
npm install
npm start
📢 Important Notes
Postman Testing: API gives prediction as 0 or 1.

React UI: Displays "Safe to Drink" if prediction = 1 (Potable = 1) and "Unsafe to Drink" if prediction = 0.

Full Stack: You have a complete working pipeline: ML Model → FastAPI → React UI.

✨ Final Conclusion
This project demonstrates a complete machine learning lifecycle — from raw data cleaning, model building, tuning, API development, to frontend integration — all aimed at solving a real-world problem of water quality prediction.
