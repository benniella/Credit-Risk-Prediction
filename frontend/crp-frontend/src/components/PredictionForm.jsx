import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictCreditRisk, wakeUpServer } from "../utils/api.js";

const INITIAL = {
  person_age: "",
  person_income: "",
  person_emp_length: "",
  loan_amnt: "",
  loan_int_rate: "",
  loan_percent_income: "",
  cb_person_cred_hist_length: "",
  person_home_ownership: "",
  loan_intent: "",
  loan_grade: "",
  cb_person_default_on_file: "",
};

export default function PredictionForm({ setPrediction }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [localResult, setLocalResult] = useState(null);
  const navigate = useNavigate();

  const validate = (values) => {
    const e = {};
    
    // Person age validation
    if (!values.person_age || values.person_age === "") {
      e.person_age = "Required";
    } else if (Number(values.person_age) < 18 || Number(values.person_age) > 100) {
      e.person_age = "Must be between 18-100";
    }
    
    // Person income validation
    if (values.person_income === "") {
      e.person_income = "Required";
    } else if (Number(values.person_income) < 0) {
      e.person_income = "Must be positive";
    }
    
    // Employment length validation
    if (values.person_emp_length === "") {
      e.person_emp_length = "Required";
    } else if (Number(values.person_emp_length) < 0) {
      e.person_emp_length = "Must be positive";
    }
    
    // Loan amount validation
    if (values.loan_amnt === "") {
      e.loan_amnt = "Required";
    } else if (Number(values.loan_amnt) < 0) {
      e.loan_amnt = "Must be positive";
    }
    
    // Loan interest rate validation
    if (values.loan_int_rate === "") {
      e.loan_int_rate = "Required";
    } else if (Number(values.loan_int_rate) < 0 || Number(values.loan_int_rate) > 100) {
      e.loan_int_rate = "Must be between 0-100";
    }
    
    // Loan percent income validation
    if (values.loan_percent_income === "") {
      e.loan_percent_income = "Required";
    } else if (Number(values.loan_percent_income) < 0 || Number(values.loan_percent_income) > 1) {
      e.loan_percent_income = "Must be between 0-1";
    }
    
    // Credit history length validation
    if (values.cb_person_cred_hist_length === "") {
      e.cb_person_cred_hist_length = "Required";
    } else if (Number(values.cb_person_cred_hist_length) < 0) {
      e.cb_person_cred_hist_length = "Must be positive";
    }
    
    // Home ownership validation
    if (!values.person_home_ownership || values.person_home_ownership === "") {
      e.person_home_ownership = "Select home ownership";
    }
    
    // Loan intent validation
    if (!values.loan_intent || values.loan_intent === "") {
      e.loan_intent = "Select loan intent";
    }
    
    // Loan grade validation
    if (!values.loan_grade || values.loan_grade === "") {
      e.loan_grade = "Select loan grade";
    }
    
    // Default on file validation
    if (!values.cb_person_default_on_file || values.cb_person_default_on_file === "") {
      e.cb_person_default_on_file = "Select an option";
    }
    
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
  };

  const buildPayload = (values) => ({
    person_age: parseInt(values.person_age, 10),
    person_income: parseFloat(values.person_income),
    person_emp_length: parseFloat(values.person_emp_length),
    loan_amnt: parseFloat(values.loan_amnt),
    loan_int_rate: parseFloat(values.loan_int_rate),
    loan_percent_income: parseFloat(values.loan_percent_income),
    cb_person_cred_hist_length: parseInt(values.cb_person_cred_hist_length, 10),
    person_home_ownership: values.person_home_ownership,
    loan_intent: values.loan_intent,
    loan_grade: values.loan_grade,
    cb_person_default_on_file: values.cb_person_default_on_file,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLocalResult(null);
    
    const v = validate(form);
    if (Object.keys(v).length) {
      setErrors(v);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const payload = buildPayload(form);
    
    console.log("Form values:", form);
    console.log("Built payload:", payload);
    console.log("Payload JSON:", JSON.stringify(payload, null, 2));

    setLoading(true);
    try {
      // First, wake up the server (important for Render free tier)
      console.log("Waking up server...");
      await wakeUpServer();
      console.log("Server ready, sending prediction request...");
      
      const data = await predictCreditRisk(payload);
      console.log("Received data:", data);

      if (typeof setPrediction === "function") {
        setPrediction(data);
        navigate("/results");
      } else {
        setLocalResult(data);
      }
    } catch (err) {
      console.error("Prediction error:", err);
      const msg = err?.message || "Unable to get prediction. Please try again.";
      setServerError(msg);
      if (typeof setPrediction === "function") {
        setPrediction({ error: msg });
        navigate("/results");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL);
    setErrors({});
    setServerError("");
    setLocalResult(null);
  };

  return (
    <div className="max-w-4xl mx-4 md:mx-auto bg-black border border-yellow-600 shadow-xl rounded-2xl p-6 md:p-10 mt-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-500">
          Credit Risk Prediction
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Fill the form below and get a credit default probability prediction.
        </p>
        <div className="mt-4 p-3 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg text-blue-300 text-sm">
          ⏱️ <strong>Note:</strong> First prediction may take 30-60 seconds as the server wakes up (Render free tier limitation). Subsequent predictions will be faster.
        </div>
      </header>

      {serverError && (
        <div role="alert" className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg text-red-200">
          <strong className="font-bold">Error: </strong>
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label="Age" 
          name="person_age" 
          value={form.person_age} 
          onChange={handleChange} 
          type="number" 
          error={errors.person_age}
          min="18"
          max="100"
          placeholder="e.g., 35"
        />
        <Input 
          label="Annual Income" 
          name="person_income" 
          value={form.person_income} 
          onChange={handleChange} 
          type="number" 
          step="0.01"
          error={errors.person_income}
          min="0"
          placeholder="e.g., 50000.00"
        />
        <Input 
          label="Employment Length (Years)" 
          name="person_emp_length" 
          value={form.person_emp_length} 
          onChange={handleChange} 
          type="number" 
          step="0.1"
          error={errors.person_emp_length}
          min="0"
          placeholder="e.g., 5.5"
        />
        <Input 
          label="Loan Amount" 
          name="loan_amnt" 
          value={form.loan_amnt} 
          onChange={handleChange} 
          type="number" 
          step="0.01"
          error={errors.loan_amnt}
          min="0"
          placeholder="e.g., 10000.00"
        />
        <Input 
          label="Loan Interest Rate (%)" 
          name="loan_int_rate" 
          value={form.loan_int_rate} 
          onChange={handleChange} 
          type="number" 
          step="0.01"
          error={errors.loan_int_rate}
          min="0"
          max="100"
          placeholder="e.g., 12.50"
        />
        <Input 
          label="Loan Percent of Income" 
          name="loan_percent_income" 
          value={form.loan_percent_income} 
          onChange={handleChange} 
          type="number" 
          step="0.01"
          error={errors.loan_percent_income}
          min="0"
          max="1"
          placeholder="e.g., 0.25"
        />
        <Input 
          label="Credit History Length (Years)" 
          name="cb_person_cred_hist_length" 
          value={form.cb_person_cred_hist_length} 
          onChange={handleChange} 
          type="number" 
          error={errors.cb_person_cred_hist_length}
          min="0"
          placeholder="e.g., 10"
        />
        <Select 
          label="Home Ownership" 
          name="person_home_ownership" 
          value={form.person_home_ownership} 
          onChange={handleChange}
          options={[
            { value: "", label: "Select home ownership" }, 
            { value: "RENT", label: "Rent" }, 
            { value: "MORTGAGE", label: "Mortgage" },
            { value: "OWN", label: "Own" },
            { value: "OTHER", label: "Other" }
          ]} 
          error={errors.person_home_ownership} 
        />
        <Select 
          label="Loan Intent" 
          name="loan_intent" 
          value={form.loan_intent} 
          onChange={handleChange}
          options={[
            { value: "", label: "Select loan intent" }, 
            { value: "PERSONAL", label: "Personal" }, 
            { value: "EDUCATION", label: "Education" },
            { value: "MEDICAL", label: "Medical" },
            { value: "VENTURE", label: "Venture" },
            { value: "HOMEIMPROVEMENT", label: "Home Improvement" },
            { value: "DEBTCONSOLIDATION", label: "Debt Consolidation" }
          ]} 
          error={errors.loan_intent} 
        />
        <Select 
          label="Loan Grade" 
          name="loan_grade" 
          value={form.loan_grade} 
          onChange={handleChange}
          options={[
            { value: "", label: "Select loan grade" }, 
            { value: "A", label: "A (Best)" }, 
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" },
            { value: "E", label: "E" },
            { value: "F", label: "F" },
            { value: "G", label: "G (Worst)" }
          ]} 
          error={errors.loan_grade} 
        />
        <Select 
          label="Default on File" 
          name="cb_person_default_on_file" 
          value={form.cb_person_default_on_file} 
          onChange={handleChange}
          options={[
            { value: "", label: "Select an option" }, 
            { value: "Y", label: "Yes" }, 
            { value: "N", label: "No" }
          ]} 
          error={errors.cb_person_default_on_file} 
          className="md:col-span-2"
        />
        <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full md:w-auto px-8 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Predicting... (This may take 30-60s)</span>
              </span>
            ) : "Predict Credit Risk"}
          </button>
          <button 
            type="button" 
            onClick={resetForm} 
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 border border-yellow-600 text-yellow-400 rounded-xl hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>
      </form>

      {localResult && (
        <div className="mt-8 p-6 bg-gray-900 border border-yellow-700 rounded-lg text-yellow-400">
          <h3 className="text-xl font-bold mb-4">Prediction Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-400">Default Probability</div>
              <div className="text-2xl font-bold">{(localResult.default_probability * 100).toFixed(2)}%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Prediction</div>
              <div className="text-2xl font-bold">{localResult.prediction}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Threshold</div>
              <div className="text-2xl font-bold">{localResult.threshold}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", error, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm font-medium text-gray-300 flex justify-between mb-2">
        <span>{label}</span>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`w-full p-3 rounded-xl bg-gray-900 text-yellow-400 border ${
          error ? "border-red-600" : "border-yellow-600"
        } focus:ring-2 focus:ring-yellow-400 focus:outline-none transition`}
        {...props}
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options = [], error, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <div className="text-sm font-medium text-gray-300 flex justify-between mb-2">
        <span>{label}</span>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-3 rounded-xl bg-gray-900 text-yellow-400 border ${
          error ? "border-red-600" : "border-yellow-600"
        } focus:ring-2 focus:ring-yellow-400 focus:outline-none transition`}
      >
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}