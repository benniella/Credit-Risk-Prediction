import React from "react";
import { useNavigate } from "react-router-dom";

const Results = ({ prediction }) => {
  const navigate = useNavigate();

  if (!prediction) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-lg text-gray-400 mb-4">No prediction made yet.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition"
        >
          Make a Prediction
        </button>
      </div>
    );
  }

  if (prediction.error) {
    return (
      <div className="max-w-xl mx-4 md:mx-auto bg-red-900 border border-red-700 text-red-200 p-6 rounded-2xl shadow-xl mt-10">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-6">{prediction.error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isDefault = prediction.prediction === "Default";
  const probability = prediction.default_probability || 0;
  const probabilityPercent = (probability * 100).toFixed(2);

  return (
    <div className="max-w-2xl mx-4 md:mx-auto bg-gray-900 shadow-2xl rounded-3xl p-10 mt-10 border border-yellow-700">
      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-8">
        Prediction Results
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Prediction Status */}
        <div className={`p-6 rounded-2xl text-white font-semibold shadow-lg ${
          isDefault 
            ? "bg-gradient-to-r from-red-600 to-red-500" 
            : "bg-gradient-to-r from-green-600 to-green-500"
        }`}>
          <h3 className="text-xl mb-2">Prediction Status</h3>
          <p className="text-3xl font-bold">{prediction.prediction || "No data available"}</p>
          {isDefault && (
            <p className="text-sm mt-2 opacity-90">⚠️ High risk of loan default</p>
          )}
          {!isDefault && (
            <p className="text-sm mt-2 opacity-90">✓ Low risk of loan default</p>
          )}
        </div>

        {/* Default Probability */}
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 rounded-2xl text-black shadow-lg">
          <h3 className="text-xl mb-2 font-semibold">Default Probability</h3>
          <p className="text-3xl font-bold">{probabilityPercent}%</p>
          <div className="mt-3 w-full bg-black bg-opacity-20 rounded-full h-3">
            <div 
              className="bg-black h-3 rounded-full transition-all duration-500"
              style={{ width: `${probabilityPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Threshold */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-2xl text-yellow-400 shadow-lg">
          <h3 className="text-xl mb-2 font-semibold">Prediction Threshold</h3>
          <p className="text-3xl font-bold">{prediction.threshold || "0.5"}</p>
          <p className="text-sm mt-2 text-gray-300">
            Probabilities above this threshold are classified as "Default"
          </p>
        </div>

        {/* Risk Level Indicator */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-yellow-600">
          <h3 className="text-xl mb-3 font-semibold text-yellow-400">Risk Assessment</h3>
          <div className="space-y-2">
            {probability < 0.3 && (
              <div className="flex items-center gap-2 text-green-400">
                <span className="text-2xl">🟢</span>
                <span className="font-medium">Low Risk - Loan likely to be repaid</span>
              </div>
            )}
            {probability >= 0.3 && probability < 0.5 && (
              <div className="flex items-center gap-2 text-yellow-400">
                <span className="text-2xl">🟡</span>
                <span className="font-medium">Moderate Risk - Monitor loan closely</span>
              </div>
            )}
            {probability >= 0.5 && probability < 0.75 && (
              <div className="flex items-center gap-2 text-orange-400">
                <span className="text-2xl">🟠</span>
                <span className="font-medium">High Risk - Consider additional collateral</span>
              </div>
            )}
            {probability >= 0.75 && (
              <div className="flex items-center gap-2 text-red-400">
                <span className="text-2xl">🔴</span>
                <span className="font-medium">Critical Risk - Loan approval not recommended</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105"
        >
          Make Another Prediction
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 px-6 py-3 border border-yellow-600 text-yellow-400 rounded-xl hover:bg-gray-800 transition"
        >
          Print Results
        </button>
      </div>
    </div>
  );
};

export default Results;