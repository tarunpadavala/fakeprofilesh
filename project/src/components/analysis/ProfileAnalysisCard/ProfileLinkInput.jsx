function ProfileLinkInput({ value, onChange }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-700 mb-4">
        Enter Profile Link
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the social media profile URL here"
        className="w-full px-6 py-4 text-lg border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
    </div>
  );
}

export default ProfileLinkInput;