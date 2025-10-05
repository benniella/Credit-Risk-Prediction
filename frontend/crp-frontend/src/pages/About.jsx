export default function About() {
  return (
    <section className="text-center py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gold-400 mb-6">
          About the Credit Risk Prediction Model
        </h2>

        {/* Short Description */}
        <p className="text-lg text-black-300 leading-relaxed leading-loose">
          The Credit Risk Prediction Model is an intelligent system designed to
          help financial institutions and loan officers evaluate the likelihood
          of loan default.  By analyzing borrower information such as age,
          income, employment length, loan amount, interest rate, and credit
          history, the model predicts whether a borrower is low-risk or
          high-risk for default.  <br /> <br /> Built using a Random Forest algorithm, the
          model was trained on thousands of real loan records and achieves over
          93% accuracy with an AUC score of 0.93. It automatically handles data
          preprocessing, encoding, and scaling through a single machine-learning
          pipeline, ensuring smooth and consistent predictions. <br /> <br /> This model can
          be integrated into financial dashboards, lending platforms, or
          customer evaluation tools to: Support fair and data-driven lending
          decisions. Reduce losses caused by risky borrowers. Improve the
          efficiency of loan approval processes.
        </p>
      </div>
    </section>
  );
}
