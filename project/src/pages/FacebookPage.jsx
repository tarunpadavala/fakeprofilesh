// src/pages/FacebookPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

function FacebookPage() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get-csrf-token')
      .then(response => {
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
    if (!selectedModel) {
        toast.error("Please select a model before starting the analysis!");
        return;
      }

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:8000/facebook/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          platform: "Facebook",
          model: selectedModel,
          form_data: Object.fromEntries(formData.entries()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Prediction Successful!")
        setAnalysisResults(data);
      } else {
        toast.error("Something Went Wrong!")
        setAnalysisResults({ error: data.error });
      }
    } catch (error) {
       toast.error("Something Went Wrong!")
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Fake Profile Detection - Facebook</h1>

      <form onSubmit={handleStartAnalysis} className="bg-white p-6 rounded shadow-md">

      <div className="mb-4">
          <label htmlFor="model" className="block font-medium mb-2">
            Select Model:
          </label>
          <select
            id="model"
            name="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              Choose a model...
            </option>
            <option value="xgboost">XGBoost</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>

        <div className="mb-4">

          <input id="profile_picture" name="profile_picture" placeholder="Profile Picture URL" type="text" className="w-full p-2 border rounded mb-2" />
          <input id="friend_count" name="friend_count" placeholder="Friend Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="post_count" name="post_count" placeholder="Post Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="account_age_days" name="account_age_days" placeholder="Account Age (in days)" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="likes_per_post" name="likes_per_post" placeholder="Likes Per Post" type="text" className="w-full p-2 border rounded mb-2" />
          <input id="comments_per_post" name="comments_per_post" placeholder="Comments Per Post" type="text" className="w-full p-2 border rounded mb-2" />
          <input id="shared_links" name="shared_links" placeholder="Shared Links" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="about_section" name="about_section" placeholder="About Section" type="text" className="w-full p-2 border rounded mb-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
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
              <pre className="bg-white p-4 rounded border">{analysisResults.prediction === 1 ? "Profile is Fake ❌" : "Profile is Not Fake ✅" }</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacebookPage;
