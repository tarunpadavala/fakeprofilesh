import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaRobot } from 'react-icons/fa';

function InfoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What is Fake Profile Detection?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Fake Profile Detection is a specialized process aimed at identifying fraudulent or deceptive 
            user accounts on various online platforms. These accounts are often created by bots, 
            malicious actors, or individuals with dishonest intentions to exploit digital systems 
            for personal or organizational gain.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FaShieldAlt,
              title: "Protection",
              description: "Safeguards users and platforms from fraudulent activities and malicious intentions"
            },
            {
              icon: FaUserSecret,
              title: "Detection",
              description: "Identifies suspicious patterns and behaviors in user profiles and activities"
            },
            {
              icon: FaRobot,
              title: "Prevention",
              description: "Stops automated bots and fake accounts from compromising platform integrity"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                <item.icon className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{item.title}</h3>
              <p className="text-gray-600 text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InfoSection;