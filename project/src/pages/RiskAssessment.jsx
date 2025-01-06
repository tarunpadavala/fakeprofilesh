import { useState } from 'react';
import { motion } from 'framer-motion';
import RiskHeader from '../components/risk/RiskHeader';

function RiskAssessment() {
  const [formData, setFormData] = useState({
    age: '',
    diabetesDuration: '',
    bloodSugar: '',
    bloodPressure: '',
    lastEyeExam: ''
  });
  const [riskResult, setRiskResult] = useState(null);

  const calculateRiskLevel = (age, duration) => {
    if (duration >= 10 || age >= 60) return 'high';
    if (duration >= 5 || age >= 45) return 'moderate';
    return 'low';
  };

  const getRecommendations = (riskLevel) => {
    const recommendations = {
      high: [
        "Schedule immediate comprehensive eye examination",
        "Monitor blood sugar levels multiple times daily",
        "Maintain A1C levels below 7%",
        "Check blood pressure daily, target below 130/80",
        "Follow a strict low-glycemic diet",
        "Exercise moderately for 30 minutes, 5 times a week",
        "Take prescribed medications regularly",
        "Consider laser therapy or anti-VEGF treatment options",
        "Join support groups for diabetes management",
        "Use protective eyewear in bright conditions"
      ],
      moderate: [
        "Schedule eye examination every 6 months",
        "Monitor blood sugar levels daily",
        "Maintain A1C levels below 7.5%",
        "Regular blood pressure checks",
        "Follow a balanced diabetic diet",
        "Regular physical activity",
        "Consider vitamin supplements for eye health",
        "Reduce screen time and practice eye exercises",
        "Stay hydrated with 8 glasses of water daily",
        "Avoid smoking and limit alcohol intake"
      ],
      low: [
        "Annual eye examination recommended",
        "Monitor blood sugar levels regularly",
        "Maintain healthy diet rich in antioxidants",
        "Regular exercise routine",
        "Learn about early warning signs",
        "Practice good sleep hygiene",
        "Protect eyes from UV exposure",
        "Stay updated with diabetes education",
        "Practice stress management techniques",
        "Regular health check-ups"
      ]
    };
    return recommendations[riskLevel];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const riskLevel = calculateRiskLevel(parseInt(formData.age), parseInt(formData.diabetesDuration));
    const recommendations = getRecommendations(riskLevel);
    setRiskResult({ level: riskLevel, recommendations });
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <RiskHeader />

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your Age"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration of Diabetes (years)
            </label>
            <input
              type="number"
              value={formData.diabetesDuration}
              onChange={(e) => setFormData({ ...formData, diabetesDuration: e.target.value })}
              placeholder="Enter Duration of Diabetes"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Calculate Risk
          </button>
        </div>
      </form>

      {riskResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className={`mb-6 p-4 rounded-lg ${
            riskResult.level === 'high' ? 'bg-red-100 text-red-800' :
            riskResult.level === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            <h2 className="text-xl font-semibold mb-2">Risk Level: {riskResult.level.toUpperCase()}</h2>
            <p>Based on your age and diabetes duration, here are personalized recommendations:</p>
          </div>

          <div className="space-y-4">
            {riskResult.recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-700">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default RiskAssessment;