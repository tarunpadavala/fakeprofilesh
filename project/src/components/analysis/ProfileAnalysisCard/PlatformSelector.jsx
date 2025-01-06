import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const platforms = [
  { id: 'twitter', name: 'Twitter', icon: FaTwitter },
  { id: 'instagram', name: 'Instagram', icon: FaInstagram },
  { id: 'facebook', name: 'Facebook', icon: FaFacebook }
];

function PlatformSelector({ selectedPlatform, onPlatformSelect }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-4">
        Select Platform
      </label>
      <div className="flex gap-4">
        {platforms.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPlatformSelect(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-colors ${
              selectedPlatform === id
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <Icon className="text-xl" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlatformSelector;