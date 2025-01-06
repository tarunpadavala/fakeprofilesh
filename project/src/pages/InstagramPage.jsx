import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function InstagramPage() {
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
      toast.error("Please select a model before starting the analysis!");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResults(null);

    const formData = new FormData(event.target);

    try {
      const response = await fetch("http://localhost:8000/instagram/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({
          platform: "Instagram",
          model: selectedModel,
          form_data: Object.fromEntries(formData.entries()),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysisResults(data);
        toast.success("Prediction successful");
      } else {
        setAnalysisResults({ error: data.error });
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Fake Profile Detection - Instagram
      </h1>

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
          <input
            id="profile_url"
            name="profile_url"
            placeholder="Instagram Profile URL"
            type="text"
            className="w-full p-2 border rounded mb-2"
            required
          />
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

              <div className="bg-white p-4 rounded shadow mb-4">
                <p>
                  Predicted Using:{" "}
                  {selectedModel === "random_forest" ? "Random Forest" : "XGBoost"}
                </p>
                <p className="text-xl mt-2">
                  {analysisResults.prediction === "Fake" ? (
                    <span className="text-red-600 font-bold">Profile is Fake ❌</span>
                  ) : (
                    <span className="text-green-600 font-bold">Profile is Not Fake ✅</span>
                  )}
                </p>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h4 className="font-medium text-lg mb-2">Profile Information</h4>
                  <ul className="list-disc list-inside">
                    <li>
                      <span>Profile Picture: </span>
                      {analysisResults.profile_info.profile_pic ? (
                        <span className="text-green-600">✅</span>
                      ) : (
                        <span className="text-red-600">❌</span>
                      )}
                    </li>
                    <li>
                      Username Length: <b>{analysisResults.profile_info.username_length}</b>
                    </li>
                    <li>
                      Full Name Words: <b>{analysisResults.profile_info.fullname_words}</b>
                    </li>
                    <li>
                      Full Name Length: <b>{analysisResults.profile_info.fullname_length}</b>
                    </li>
                    <li>
                      Name Equals Username:{" "}
                      {analysisResults.profile_info.name_equals_username ? (
                        <span className="text-green-600">✅</span>
                      ) : (
                        <span className="text-red-600">❌</span>
                      )}
                    </li>
                    <li>
                      Bio Length: <b>{analysisResults.profile_info.bio_length}</b>
                    </li>
                    <li>
                      External URL:{" "}
                      {analysisResults.profile_info.external_url ? (
                        <span className="text-green-600">✅</span>
                      ) : (
                        <span className="text-red-600">❌</span>
                      )}
                    </li>
                    <li>
                      Private Account:{" "}
                      {analysisResults.profile_info.is_private ? (
                        <span className="text-green-600">✅</span>
                      ) : (
                        <span className="text-red-600">❌</span>
                      )}
                    </li>
                    <li>
                      Number of Posts: <b>{analysisResults.profile_info.num_posts}</b>
                    </li>
                    <li>
                      Number of Followers: <b>{analysisResults.profile_info.num_followers}</b>
                    </li>
                    <li>
                      Number of Follows: <b>{analysisResults.profile_info.num_follows}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InstagramPage;
