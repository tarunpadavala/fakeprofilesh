import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

function HeroSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const handleStartDetection = () => {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    navigate('/analysis');
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            Detect Fake Social Media Profiles
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Using advanced AI technology to identify and protect against fraudulent social media accounts. 
            Our platform helps you verify authenticity and maintain online safety.
          </p>
          <button
            onClick={handleStartDetection}
            className="flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors mx-auto"
          >
            <FaSearch className="text-xl" />
            Start Detection
          </button>
        </motion.div>
      </div>

      {/* Sign In Prompt Modal */}
      <AnimatePresence>
        {showSignInPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowSignInPrompt(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-gray-900"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to access the fake profile detection feature.
              </p>
              <button
                onClick={() => navigate('/signin')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Sign In
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;