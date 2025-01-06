const FacebookForm = () => (
    <div id="facebook-fields" className="mb-4">
      <h3 className="font-medium">Facebook Input Fields</h3>
      <input
        id="profile_picture"
        name="profile_picture"
        placeholder="Profile Picture"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="friend_count"
        name="friend_count"
        placeholder="Friend Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="post_count"
        name="post_count"
        placeholder="Post Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="account_age_days"
        name="account_age_days"
        placeholder="Account Age (Days)"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="likes_per_post"
        name="likes_per_post"
        placeholder="Likes per Post"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="comments_per_post"
        name="comments_per_post"
        placeholder="Comments per Post"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="shared_links"
        name="shared_links"
        placeholder="Shared Links"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="about_section"
        name="about_section"
        placeholder="About Section"
        type="text"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="suspicious_activity"
        name="suspicious_activity"
        placeholder="Suspicious Activity"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
    </div>
  );
  
  export default FacebookForm;
  