function ProfileStats({ stats, onChange }) {
  const fields = [
    { id: 'postsCount', label: 'Posts Count', placeholder: 'Number of posts' },
    { id: 'storiesCount', label: 'Stories/Status Count', placeholder: 'Number of stories/status' },
    { id: 'followersCount', label: 'Followers Count', placeholder: 'Number of followers' },
    { id: 'followingCount', label: 'Following/Friends Count', placeholder: 'Number of following/friends' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ id, label, placeholder }) => (
        <div key={id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            type="number"
            value={stats[id]}
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
        </div>
      ))}
    </div>
  );
}

export default ProfileStats;