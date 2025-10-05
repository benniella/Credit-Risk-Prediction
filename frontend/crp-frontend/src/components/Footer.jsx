export default function Footer() {
  return (
    <footer className="bg-black-900 text-gold-400 py-8 mt-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold tracking-wide text-gold-500">
            CreditRiskAI
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Smarter predictions. Better decisions.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 text-sm">
          <a href="/" className="hover:text-gold-300 transition-colors duration-200">
            Home
          </a>
          <a href="/predict" className="hover:text-gold-300 transition-colors duration-200">
            Predict
          </a>
          <a href="/results" className="hover:text-gold-300 transition-colors duration-200">
            Results
          </a>
          <a href="/about" className="hover:text-gold-300 transition-colors duration-200">
            About
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm text-center md:text-right">
          © {new Date().getFullYear()} <span className="text-gold-400">BankChurn AI</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
