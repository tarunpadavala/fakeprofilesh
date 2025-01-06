const InstagramForm = () => (
    <div className="mb-4">
      <label htmlFor="profile_name" className="block font-medium">
        Profile Name:
      </label>
      <input
        id="profile_name"
        name="profile_name"
        type="text"
        className="w-full p-2 border rounded"
        required
      />
    </div>
  );
  
  export default InstagramForm;
  