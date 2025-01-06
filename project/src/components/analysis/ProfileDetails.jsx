import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const platformIcons = {
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Facebook: FaFacebook
};

function ProfileDetails({ details }) {
  if (!details) return null;

  const PlatformIcon = platformIcons[details.platform];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="mt-8 pt-8 border-t border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {PlatformIcon && <PlatformIcon className="text-blue-500" />}
        Profile Details
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Posts</div>
          <div className="text-xl font-semibold">{details.postsCount}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Stories</div>
          <div className="text-xl font-semibold">{details.storiesCount}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Followers</div>
          <div className="text-xl font-semibold">{details.followersCount}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">Following</div>
          <div className="text-xl font-semibold">{details.followingCount}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProfileDetails;