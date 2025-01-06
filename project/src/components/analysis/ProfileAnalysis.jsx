import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import PlatformSelector from './ProfileAnalysisCard/PlatformSelector';
import ProfileStats from './ProfileAnalysisCard/ProfileStats';
import ProfileLinkInput from './ProfileAnalysisCard/ProfileLinkInput';

function ProfileAnalysisCard({ profileLink, isAnalyzing, onLinkChange, onReset, onAnalyze }) {
  const [platform, setPlatform] = useState('');
  const [profileStats, setProfileStats] = useState({
    postsCount: '',
    storiesCount: '',
    followersCount: '',
    followingCount: ''
  });

  const handleStatsChange = (field, value) => {
    setProfileStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnalyze = () => {
    onAnalyze({
      profileLink,
      platform,
      ...profileStats
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12"
    >
      <div className="space-y-6">
        <ProfileLinkInput 
          value={profileLink}
          onChange={onLinkChange}
        />

        <PlatformSelector 
          selectedPlatform={platform}
          onPlatformSelect={setPlatform}
        />

        <ProfileStats 
          stats={profileStats}
          onChange={handleStatsChange}
        />

        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="flex-1 px-6 py-3 text-lg bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !profileLink.trim() || !platform}
            className={`flex-1 px-6 py-3 text-lg rounded-lg text-white flex items-center justify-center gap-2 transition-colors ${
              profileLink.trim() && platform ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Analyzing...
              </>
            ) : (
              <>
                <FaSearch />
                Start Detection
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileAnalysisCard;