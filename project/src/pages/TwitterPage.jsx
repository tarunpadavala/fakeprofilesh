import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast'

function TwitterPage() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [selectedModel, setSelectedModel] = useState(""); 

  useEffect(() => {
    axios
      .get("http://localhost:8000/get-csrf-token")
      .then((response) => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
      });
  }, []);

  const handleStartAnalysis = async (event) => {
    event.preventDefault();

    if (!selectedModel) {
      alert("Please select a model before starting the analysis!");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResults(null);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:8000/twitter/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          platform: "Twitter",
          model: selectedModel, 
          form_data: Object.fromEntries(formData.entries()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysisResults(data);
        toast.success("Prediction successful")
      } else {
        toast.error("Something Went Wrong!")
        setAnalysisResults({ error: data.error });
      }
    } catch (error) {
        toast.error(
            "Something Went Wrong!"
        )
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Fake Profile Detection - Twitter</h1>
      </motion.div>

      <form onSubmit={handleStartAnalysis} className="bg-white p-6 rounded shadow-md">
        {/* Model Selection Dropdown */}
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

        {/* Input Fields */}
        <div className="mb-4">
          <input required id="sex_code" name="sex_code" placeholder="Sex Code" type="number" className="w-full p-2 border rounded mb-2" />
          <input required id="statuses_count" name="statuses_count" placeholder="Statuses Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input required id="followers_count" name="followers_count" placeholder="Followers Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input required id="friends_count" name="friends_count" placeholder="Friends Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input required id="favourites_count" name="favourites_count" placeholder="Favourites Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="listed_count" name="listed_count" placeholder="Listed Count" type="number" className="w-full p-2 border rounded mb-2" />
          <input id="lang_code" name="lang_code" placeholder="Language Code" type="text" className="w-full p-2 border rounded mb-2" />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {/* Results Section */}
      {analysisResults && (
        <div className="mt-8 bg-gray-100 p-4 rounded shadow-md">
          {analysisResults.error ? (
            <p className="text-red-600">Error: {analysisResults.error}</p>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Analysis Results</h3>
              <pre className="bg-white p-4 rounded border">Predicted Using : {selectedModel === "random_forest" ? "Random Forest" : "XG-Boost"} <br/>
                {analysisResults.prediction === 1 ? "Profile is Fake" : "Profile is Not Fake"}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TwitterPage;
