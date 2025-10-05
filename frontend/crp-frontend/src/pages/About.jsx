export default function About() {
  return (
    <section className="text-center py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gold-400 mb-6">
          About This Project
        </h2>

        {/* Short Description */}
        <p className="text-lg text-black-300 leading-relaxed">
          BankChurn AI empowers banks with predictive insights, helping them  
          understand customer behavior and reduce churn with smarter decisions.
        </p>
      </div>
    </section>
  );
}
