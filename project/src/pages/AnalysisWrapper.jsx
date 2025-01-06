import React from 'react';
import { Link } from 'react-router-dom';

const AnalysisWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Analysis Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-md">
        <Link
          to="/twitter"
          className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600 transition duration-300 text-center font-medium"
        >
          Twitter Analysis
        </Link>
        <Link
          to="/facebook"
          className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600 transition duration-300 text-center font-medium"
        >
          Facebook Analysis
        </Link>
        <Link
          to="/instagram"
          className="bg-blue-500 text-white py-4 px-6 rounded shadow hover:bg-blue-600 transition duration-300 text-center font-medium"
        >
          Instagram Analysis
        </Link>
      </div>
    </div>
  );
};

export default AnalysisWrapper;
