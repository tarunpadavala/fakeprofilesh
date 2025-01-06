import { motion } from 'framer-motion';
import { FaCog, FaUserShield, FaExclamationTriangle, FaServer } from 'react-icons/fa';

function ChallengesSection() {
  const challenges = [
    {
      icon: FaCog,
      title: "Sophisticated Tactics",
      description: "Fraudsters employ advanced tactics like AI-generated profiles, making detection increasingly complex.",
      color: "purple"
    },
    {
      icon: FaUserShield,
      title: "Privacy Concerns",
      description: "Platforms must carefully balance user privacy with the need for comprehensive data analysis.",
      color: "green"
    },
    {
      icon: FaExclamationTriangle,
      title: "Detection Accuracy",
      description: "Systems may incorrectly flag genuine users or miss well-disguised fake profiles.",
      color: "yellow"
    },
    {
      icon: FaServer,
      title: "Scalability Issues",
      description: "Processing vast amounts of data from millions of users requires highly scalable solutions.",
      color: "blue"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Challenges in Fake Profile Detection
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            While technology continues to evolve, several challenges remain in the fight against fake profiles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`flex items-center justify-center w-16 h-16 bg-${challenge.color}-100 rounded-full mb-6 mx-auto`}>
                <challenge.icon className={`text-2xl text-${challenge.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{challenge.title}</h3>
              <p className="text-gray-600 text-center">{challenge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChallengesSection;