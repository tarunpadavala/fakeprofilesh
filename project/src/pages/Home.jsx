import HeroSection from '../components/home/sections/HeroSection';
import FeaturesSection from '../components/home/sections/FeaturesSection';
import InfoSection from '../components/home/sections/InfoSection';
import CharacteristicsSection from '../components/home/sections/CharacteristicsSection';
import WhyGrowthSection from '../components/home/sections/WhyGrowthSection';
import ImpactSection from '../components/home/sections/ImpactSection';
import ChallengesSection from '../components/home/sections/ChallengesSection';
import fakeImage from '../assets/fake.png';
import { motion } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';

function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <InfoSection />
      <CharacteristicsSection />
      <FeaturesSection />
      <WhyGrowthSection />
      <ImpactSection />
      <ChallengesSection />
      
      {/* Large Fake Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto px-4 mb-12"
      >
        <img
          src={fakeImage}
          alt="Fake Profile Detection"
          className="w-full h-[800px] object-cover rounded-lg shadow-xl"
        />
      </motion.div>



      {/* Slogan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 mt-16"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 shadow-xl">
            <FaShieldAlt className="text-6xl text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
              Authenticity Matters
            </h2>
            <p className="text-2xl md:text-3xl text-blue-100 font-light">
              Detecting Fakes, Protecting Trust
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;