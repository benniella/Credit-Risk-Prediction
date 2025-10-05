import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="container mx-auto text-center py-20 px-6">
      <h1 className="text-5xl font-extrabold text-gold-500 mb-6 leading-tight">
     Credit Risk Prediction
      </h1>
      <p className="text-lg text-black-300 max-w-2xl mx-auto mb-10">
        Enter customer or loan details to check the chance of default. <br /> Our AI model analyzes the data and predicts whether the applicant is low-risk or high-risk for credit default
      </p>
      <Link
        to="/predict"
        className="inline-block px-8 py-4 bg-gold-500 text-black font-semibold rounded-xl shadow-lg hover:bg-gold-400 transition-all duration-200 transform hover:scale-105"
      >
        Start Prediction
      </Link>
    </section>
  );
}
