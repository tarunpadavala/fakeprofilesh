import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

function AnalysisResults({ results }) {
  if (!results) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Risk Level */}
      <div className={`p-6 rounded-lg ${
        results.overallRisk === 'High' ? 'bg-red-50' : 'bg-green-50'
      }`}>
        <div className="flex items-center gap-3">
          {results.overallRisk === 'High' ? (
            <FaExclamationTriangle className="text-2xl text-red-500" />
          ) : (
            <FaCheckCircle className="text-2xl text-green-500" />
          )}
          <h3 className="text-xl font-semibold">
            Risk Level: {results.overallRisk}
          </h3>
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Analysis Metrics</h3>
        <div className="grid gap-4">
          {Object.entries(results.metrics).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <div className="w-1/3 text-gray-600">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${
                      value > 70 ? 'bg-green-500' :
                      value > 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
              </div>
              <div className="w-16 text-right font-semibold">
                {value}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flags and Recommendations */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Risk Flags</h3>
          <ul className="space-y-3">
            {results.flags.map((flag, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-red-600"
              >
                <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                <span>{flag}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
          <ul className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-blue-600"
              >
                <FaCheckCircle className="mt-1 flex-shrink-0" />
                <span>{rec}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default AnalysisResults;