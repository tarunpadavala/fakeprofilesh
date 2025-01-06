import { motion } from "framer-motion";
import profileImage from "../assets/profile.png";
import { useState, useEffect } from "react";
import axios from 'axios';

function ImageAnalysis() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [platform, setPlatform] = useState("Unknown");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/twitter/get-csrf-token')
      .then(response => {
        console.log(response.data.csrfToken)
        setCsrfToken(response.data.csrfToken);
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const handleStartAnalysis = async (event) => {
    event.preventDefault();
    setIsAnalyzing(true);
    setAnalysisResults(null);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:8000/twitter/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          platform,
          form_data: Object.fromEntries(formData.entries()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysisResults(data);
      } else {
        setAnalysisResults({ error: data.error });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlatformSelect = (platformType) => {
    setPlatform(platformType);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Fake Profile Detection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Our advanced AI algorithms analyze social media profiles to detect
          potential fake accounts and protect your online community.
        </p>
      </motion.div>

      {/* Platform Buttons */}
      <div className="mb-4 text-center">
        <button
          onClick={() => handlePlatformSelect("Twitter")}
          className={`px-6 py-2 mr-4 rounded ${platform === "Twitter" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
        >
          Twitter
        </button>
        <button
          onClick={() => handlePlatformSelect("Instagram")}
          className={`px-6 py-2 mr-4 rounded ${platform === "Instagram" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
        >
          Instagram
        </button>
        <button
          onClick={() => handlePlatformSelect("Facebook")}
          className={`px-6 py-2 mr-4 rounded ${platform === "Facebook" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}
        >
          Facebook
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-12"
      >
        <img
          src={profileImage}
          alt="Profile Detection"
          className="w-full h-[400px] object-cover rounded-lg shadow-xl"
        />
      </motion.div>

      <form onSubmit={handleStartAnalysis} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="profile_link" className="block font-medium">
            Profile Link (only required for Instagram):
          </label>
          <input
            id="profile_link"
            name="profile_link"
            type="text"
            className="w-full p-2 border rounded"
            required={platform === "Instagram"}
            disabled={platform !== "Instagram"}
          />
        </div>

        <input id="platform" name="platform" type="hidden" value={platform} />

        {/* Twitter Input Fields */}
        {platform === "Twitter" && (
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
        )}

        {/* Instagram Input Fields */}
        {platform === "Instagram" && (
          <div id="instagram-fields" className="mb-4">
            {/* Add any Instagram-specific fields here */}
            <h3 className="font-medium">Instagram Input Fields</h3>
          </div>
        )}

        {/* Facebook Input Fields */}
        {platform === "Facebook" && (
          <div id="facebook-fields" className="mb-4">
            {/* Add any Facebook-specific fields here */}
            <h3 className="font-medium">Facebook Input Fields</h3>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {analysisResults && (
        <div className="mt-8 bg-gray-100 p-4 rounded shadow-md">
          {analysisResults.error ? (
            <p className="text-red-600">Error: {analysisResults.error}</p>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Analysis Results</h3>
              <pre className="bg-white p-4 rounded border">{JSON.stringify(analysisResults, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageAnalysis;
