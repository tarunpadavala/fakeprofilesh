import { motion } from 'framer-motion';
import NutritionalGuidelines from '../components/food/autism/NutritionalGuidelines';
import DietaryStrategies from '../components/food/autism/DietaryStrategies';
import SensoryConsiderations from '../components/food/autism/SensoryConsiderations';
import MealPlanning from '../components/food/autism/MealPlanning';
import SupplementInfo from '../components/food/autism/SupplementInfo';

function FoodRecommendations() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-700 mb-8"
      >
        Nutrition Guide for Autism Spectrum Disorders
      </motion.h1>

      <div className="space-y-12">
        {/* Nutritional Guidelines Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Essential Nutrients & Guidelines</h2>
          <NutritionalGuidelines />
        </div>

        {/* Dietary Strategies Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Dietary Strategies</h2>
          <DietaryStrategies />
        </div>

        {/* Sensory Considerations Section */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Sensory Considerations</h2>
          <SensoryConsiderations />
        </div>

        {/* Meal Planning Section */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Meal Planning & Routines</h2>
          <MealPlanning />
        </div>

        {/* Supplements Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-green-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold text-center mb-8">Supplements & Considerations</h2>
          <SupplementInfo />
        </div>
      </div>
    </div>
  );
}

export default FoodRecommendations;