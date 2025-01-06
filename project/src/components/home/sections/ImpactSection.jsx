import { motion } from 'framer-motion';
import { FaGlobe, FaFlag } from 'react-icons/fa';

function ImpactSection() {
  const impacts = {
    global: [
      {
        title: "Erosion of Trust",
        description: "Fake profiles degrade platform trustworthiness, making users hesitant to engage."
      },
      {
        title: "Economic Losses",
        description: "Fraudulent activities lead to significant financial losses through scams and impersonation."
      },
      {
        title: "Misinformation Spread",
        description: "Bots and fake accounts amplify misinformation, influencing public opinion."
      },
      {
        title: "Cybersecurity Threats",
        description: "Fake profiles serve as vectors for phishing attacks and malware distribution."
      }
    ],
    india: [
      {
        title: "High Social Media Usage",
        description: "India's large online user base makes it a prime target for fake profiles."
      },
      {
        title: "E-Commerce Vulnerability",
        description: "Rising fake reviews and sellers on popular platforms like Amazon and Flipkart."
      },
      {
        title: "Scams and Fraud",
        description: "Increasing instances of employment fraud and loan scams through fake profiles."
      },
      {
        title: "Political Misinformation",
        description: "Fake accounts manipulate public discourse during elections and debates."
      }
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Impact of Fake Profiles
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Fake profiles have far-reaching consequences across different sectors and regions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Global Impact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <FaGlobe className="text-4xl text-blue-600" />
              <h3 className="text-2xl font-bold">Global Impact</h3>
            </div>
            <div className="grid gap-6">
              {impacts.global.map((impact, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-blue-600 mb-2">
                    {impact.title}
                  </h4>
                  <p className="text-gray-600">{impact.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* India-Specific Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <FaFlag className="text-4xl text-orange-600" />
              <h3 className="text-2xl font-bold">India-Specific Challenges</h3>
            </div>
            <div className="grid gap-6">
              {impacts.india.map((impact, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-orange-600 mb-2">
                    {impact.title}
                  </h4>
                  <p className="text-gray-600">{impact.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;