import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600">Unmasking FAKES</span>
              <span className="text-sm text-gray-600">Enhancing Digital Integrity</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={signOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => navigate('/signin')}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;