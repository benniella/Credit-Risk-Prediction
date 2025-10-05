import { useState } from "react";
import PredictionForm from "../components/PredictionForm";

export default function Predict() {
  const [prediction, setPrediction] = useState(null);

  return (
    <section className="container mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
        Enter Customer Details
      </h2>

      {/* Pass setPrediction so the form updates state */}
      <PredictionForm setPrediction={setPrediction} />

      {/* Show results below form */}
      {prediction && (
        <div className="mt-10 max-w-xl mx-auto bg-gray-100 border border-gray-300 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Prediction Result
          </h3>
          {prediction.error ? (
            <p className="text-red-500">{prediction.error}</p>
          ) : (
            <>
              <p className="text-lg">
                <span className="font-bold">Churn Probability:</span>{" "}
                {prediction.churn_probability}
              </p>
              <p className="text-lg mt-2">
                <span className="font-bold">Prediction:</span>{" "}
                {prediction.prediction}
              </p>
            </>
          )}
        </div>
      )}
    </section>
  );
}
