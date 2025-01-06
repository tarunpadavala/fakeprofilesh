import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaShoppingCart, 
  FaLinkedin, 
  FaHeart, 
  FaGamepad 
} from 'react-icons/fa';

function ApplicationsSection() {
  const applications = [
    {
      icon: FaFacebook,
      title: "Social Media Platforms",
      description: "Identifies bots spreading misinformation and protects users from cyberbullying and phishing attempts.",
      color: "blue"
    },
    {
      icon: FaShoppingCart,
      title: "E-Commerce Websites",
      description: "Prevents fake reviews that manipulate product ratings and detects fraudulent buyers or sellers.",
      color: "green"
    },
    {
      icon: FaLinkedin,
      title: "Professional Networking",
      description: "Ensures genuine interactions between job seekers and recruiters, reducing impersonation risks.",
      color: "indigo"
    },
    {
      icon: FaHeart,
      title: "Dating Platforms",
      description: "Protects users from catfishing and identifies accounts created for harassment or spamming.",
      color: "red"
    },
    {
      icon: FaGamepad,
      title: "Gaming Services",
      description: "Detects cheating accounts and bots, improving community integrity and fair play.",
      color: "purple"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Applications of Fake Profile Detection
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our technology is deployed across various platforms to ensure safety and authenticity
            in different online environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`bg-${app.color}-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className={`flex items-center justify-center w-16 h-16 bg-${app.color}-100 rounded-full mb-6 mx-auto`}>
                <app.icon className={`text-2xl text-${app.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{app.title}</h3>
              <p className="text-gray-600 text-center">{app.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ApplicationsSection;