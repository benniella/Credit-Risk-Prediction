function ResultCard({ result }) {
  const isChurn = result.prediction === "Churn";

  return (
    <div
      className={`mt-6 p-8 rounded-2xl shadow-xl text-center transition transform hover:scale-105 ${
        isChurn
          ? "bg-red-900 border border-red-700 text-red-300"
          : "bg-green-900 border border-green-700 text-green-300"
      }`}
    >
      <h3 className="text-3xl font-bold">
        {result.prediction}
      </h3>
      <p className="mt-3 text-lg">
        Probability: {(result.churn_probability * 100).toFixed(2)}%
      </p>
    </div>
  );
}

export default ResultCard;
