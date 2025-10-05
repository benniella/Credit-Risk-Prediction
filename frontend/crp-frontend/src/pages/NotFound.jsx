import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-6">
      <h1 className="text-8xl font-extrabold text-gold-500 drop-shadow-lg">404</h1>
      <p className="text-lg text-gray-400 mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-8 bg-gold-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-gold-400 transition-all duration-200 transform hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
