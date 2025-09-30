import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load model
model = joblib.load("credit_risk_model.pkl")

# threshold
THRESHOLD = 0.5

# ✅ Input schema
class CreditRiskInput(BaseModel):
    person_age: int
    person_income: float
    person_emp_length: float
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_cred_hist_length: int
    person_home_ownership: str
    loan_intent: str
    loan_grade: str
    cb_person_default_on_file: str

# ✅ App must be defined OUTSIDE the class
app = FastAPI(title="Credit Risk Prediction API")

@app.get("/")
def home():
    return {"message": "Credit Risk Prediction API is running!"}

@app.post("/predict")
def predict(data: CreditRiskInput):
    input_dict = {
        "person_home_ownership": [data.person_home_ownership],
        "loan_intent": [data.loan_intent],
        "loan_grade": [data.loan_grade],
        "cb_person_default_on_file": [data.cb_person_default_on_file],
        "person_age": [data.person_age],
        "person_income": [data.person_income],
        "person_emp_length": [data.person_emp_length],
        "loan_amnt": [data.loan_amnt],
        "loan_int_rate": [data.loan_int_rate],
        "loan_percent_income": [data.loan_percent_income],
        "cb_person_cred_hist_length": [data.cb_person_cred_hist_length]
    }

    features = pd.DataFrame(input_dict)

    try:
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0][1]
    except Exception as e:
        return {"error": str(e), "features": features.to_dict()}

    return {
        "prediction": int(prediction),
        "probability": round(probability, 4),
        "threshold": THRESHOLD
    }
