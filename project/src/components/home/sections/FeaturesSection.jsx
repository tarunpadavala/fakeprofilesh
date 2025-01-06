import { motion } from 'framer-motion';
import { FaShieldAlt, FaSearch, FaChartLine, FaUserShield, FaRobot, FaBrain } from 'react-icons/fa';

function FeaturesSection() {
  const features = [
    {
      icon: FaRobot,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze profile patterns and behaviors",
      delay: 0.2
    },
    {
      icon: FaSearch,
      title: "Deep Scanning",
      description: "Thorough examination of profile authenticity markers",
      delay: 0.4
    },
    {
      icon: FaBrain,
      title: "Machine Learning",
      description: "Continuous learning from new detection patterns",
      delay: 0.6
    },
    {
      icon: FaShieldAlt,
      title: "Real-time Protection",
      description: "Instant alerts for suspicious activities",
      delay: 0.8
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-900 mb-12"
        >
          Advanced Detection Features
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;