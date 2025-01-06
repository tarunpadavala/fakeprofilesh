import { motion } from 'framer-motion';
import { FaUserCircle, FaChartLine, FaUsers, FaRobot } from 'react-icons/fa';

function CharacteristicsSection() {
  const characteristics = [
    {
      icon: FaUserCircle,
      title: "Limited Information",
      items: [
        "Sparse personal information",
        "Incomplete bios",
        "Generic names",
        "Stock or stolen images"
      ]
    },
    {
      icon: FaChartLine,
      title: "Unusual Behavior",
      items: [
        "High frequency requests",
        "Repetitive posts",
        "Templated comments",
        "Automated actions"
      ]
    },
    {
      icon: FaUsers,
      title: "Unrealistic Connections",
      items: [
        "Excessive followers",
        "Suspicious connections",
        "Random friend patterns",
        "Similar profile links"
      ]
    },
    {
      icon: FaRobot,
      title: "Activity Anomalies",
      items: [
        "Automated interactions",
        "Unrelated engagement",
        "Spam-like behavior",
        "Irregular timing"
      ]
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
            Characteristics of Fake Profiles
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Fake profiles often exhibit distinct patterns and anomalies, making them 
            identifiable through a systematic approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characteristics.map((item, index) => (
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
              <h3 className="text-xl font-semibold text-center mb-6">{item.title}</h3>
              <ul className="space-y-3">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-gray-600">{listItem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CharacteristicsSection;