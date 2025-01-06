import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/auth/SignUpForm';
import SuccessMessage from '../../components/auth/SuccessMessage';
import { FaShieldAlt } from 'react-icons/fa';

function SignUp() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-400 to-blue-300 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Left Side - Info */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-600 text-white p-12">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8">
            <FaShieldAlt className="text-5xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Join Our Mission</h2>
          <p className="text-center mb-8">Help create a safer social media environment by identifying and reporting fake profiles</p>
          <Link
            to="/signin"
            className="px-8 py-2 border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 bg-white relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <FaShieldAlt className="text-4xl text-blue-600" />
              <h1 className="text-3xl font-bold">Create Account</h1>
            </div>
            <p className="text-center text-gray-600 mb-8">Join our community of users committed to making social media safer</p>
            
            <SignUpForm onSubmit={handleSubmit} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <SuccessMessage message="Account created successfully! Welcome to our community." />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SignUp;