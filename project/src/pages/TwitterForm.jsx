const TwitterForm = () => (
    <div id="twitter-fields" className="mb-4">
      <h3 className="font-medium">Twitter Input Fields</h3>
      <input
        id="sex_code"
        name="sex_code"
        placeholder="Sex Code"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="statuses_count"
        name="statuses_count"
        placeholder="Statuses Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="followers_count"
        name="followers_count"
        placeholder="Followers Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="friends_count"
        name="friends_count"
        placeholder="Friends Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="favourites_count"
        name="favourites_count"
        placeholder="Favourites Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="listed_count"
        name="listed_count"
        placeholder="Listed Count"
        type="number"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        id="lang_code"
        name="lang_code"
        placeholder="Language Code"
        type="text"
        className="w-full p-2 border rounded mb-2"
      />
    </div>
  );
  
  export default TwitterForm;
  