import os
import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ===== FastAPI app =====
app = FastAPI(title="Credit Risk Prediction API", version="0.1.0")

# ===== CORS Middleware =====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== Load Model =====
MODEL_PATH = "credit_risk_model.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None


# ===== Request Schema =====
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


# ===== Simplified Preprocessing =====
def preprocess_input(data: CreditRiskInput):
    """Return raw DataFrame — model handles its own preprocessing."""
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
    df = pd.DataFrame(input_dict)
    return df


# ===== Prediction Endpoint =====
@app.post("/predict")
async def predict(data: CreditRiskInput):
    if model is None:
        return {"error": "Model not loaded correctly."}

    try:
        processed = preprocess_input(data)
        prediction = model.predict(processed)
        probability = model.predict_proba(processed).tolist()[0]
        
        return {
            "prediction": int(prediction[0]),
            "probability": probability
        }
    except Exception as e:
        return {"error": str(e)}


# ===== Root Endpoint =====
@app.get("/")
async def root():
    return {"message": "Credit Risk Prediction API is running 🚀"}