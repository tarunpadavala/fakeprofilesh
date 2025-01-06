import { motion } from 'framer-motion';
import { FaUserPlus, FaUserShield, FaBalanceScale } from 'react-icons/fa';

function WhyGrowthSection() {
  const reasons = [
    {
      icon: FaUserPlus,
      title: "Ease of Creation",
      description: "Minimal verification processes make it easy to create fake accounts.",
      color: "blue"
    },
    {
      icon: FaUserShield,
      title: "Low Awareness",
      description: "Limited digital literacy in many regions of India exacerbates vulnerability.",
      color: "red"
    },
    {
      icon: FaBalanceScale,
      title: "Lack of Robust Laws",
      description: "Inadequate regulations and enforcement against fake profile activities allow them to thrive.",
      color: "yellow"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why the Growth?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Understanding the factors contributing to the rise of fake profiles in India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`flex items-center justify-center w-16 h-16 bg-${reason.color}-100 rounded-full mb-6 mx-auto`}>
                <reason.icon className={`text-2xl text-${reason.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{reason.title}</h3>
              <p className="text-gray-600 text-center">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyGrowthSection;