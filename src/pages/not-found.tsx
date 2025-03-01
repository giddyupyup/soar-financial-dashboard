import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
