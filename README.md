#  Credit Risk Prediction API

A **FastAPI-based machine learning service** that predicts the probability of loan default using applicant and loan details.  
This project is fully **Dockerized**, making it portable and easy to deploy on cloud platforms like Render, Railway, or AWS.  

---

## Features
- REST API built with **FastAPI**  
- **Credit Risk Model** trained on real-world features:
  - Categorical: `person_home_ownership`, `loan_intent`, `loan_grade`, `cb_person_default_on_file`
  - Numerical: `person_age`, `person_income`, `person_emp_length`, `loan_amnt`, `loan_int_rate`, `loan_percent_income`, `cb_person_cred_hist_length`
- Returns:
  - `prediction`: `0` = low risk, `1` = high risk  
  - `probability`: probability of default  
- Customizable classification **threshold** (default = `0.3`)  
- **Swagger UI** docs at `/docs`  
- Dockerized for seamless deployment  

---

## Project Structure
```
CreditRiskPrediction/
│── main.py              # FastAPI app
│── credit_risk_model.pkl # Trained ML model
│── requirements.txt      # Dependencies
│── Dockerfile            # Docker build instructions
│── .dockerignore         # Ignore unnecessary files
```

---

## ⚡ Installation (Local)

1. Clone the repo:
   ```bash
   git clone https://github.com/benniella/Credit-Risk-Prediction.git
   cd Credit-Risk-Prediction
   ```

2. Create a virtual environment & install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the API:
   ```bash
   uvicorn main:app --reload --port 10000
   ```

4. Visit Swagger docs:
   ```
   http://127.0.0.1:10000/docs
   ```

---

##Run with Docker
Build the image:
```bash
docker build -t credit-risk-api .
```

Run the container:
```bash
docker run -d -p 10000:10000 credit-risk-api
```

API available at:
```
http://127.0.0.1:10000/docs
```

---

##  Example Request

**POST** `/predict`

```json
{
  "person_age": 35,
  "person_income": 50000,
  "person_emp_length": 5,
  "loan_amnt": 10000,
  "loan_int_rate": 12.5,
  "loan_percent_income": 0.2,
  "cb_person_cred_hist_length": 10,
  "person_home_ownership": "RENT",
  "loan_intent": "EDUCATION",
  "loan_grade": "B",
  "cb_person_default_on_file": "N"
}
```

**Response:**
```json
{
  "prediction": 0,
  "probability": 0.125,
  "threshold": 0.3
}
```

---

## Deployment 
1. Push repo to GitHub  
2. On [Render](https://render.com/):  
   - Create a **New Web Service**  
   - Connect repo  
   - Render detects `Dockerfile` → build automatically  
   - Free plan works for testing  

API is live at:
```
https://credit-risk-prediction-1-wzt4.onrender.com/docs
```

---

## Author
**Benedicta Otibhor Okhunlun**  
- MSc Artificial Intelligence – University of Stirling  
- AI/ML Lead @ Stripeedge  
 

---

## Contributing / Sponsorship
I’m open to collaborations with:  
- Banks & Fintechs (integrating ML into risk systems)  
- Researchers (applied ML in finance)  
- Sponsors & Accelerators (supporting AI-driven fintech projects)  

Contact: [LinkedIn](https://www.linkedin.com/in/benedicta-okhunlun-9b8346280/) | [GitHub](https://github.com/benniella)  
