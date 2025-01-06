import { useState } from 'react';
import SymptomHeader from '../components/symptoms/SymptomHeader';
import SymptomsList from '../components/symptoms/SymptomsList';
import AnalysisResult from '../components/symptoms/AnalysisResult';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState({
    blurredVision: false,
    floaters: false,
    nightVision: false,
    eyePain: false,
    suddenChanges: false,
    darkAreas: false
  });
  const [analysis, setAnalysis] = useState(null);

  const handleSymptomChange = (key, value) => {
    setSymptoms(prev => ({ ...prev, [key]: value }));
  };

  const analyzeSymptoms = () => {
    const symptomCount = Object.values(symptoms).filter(Boolean).length;
    let stage, description, recommendations;

    if (symptomCount >= 5) {
      stage = 'Severe';
      description = 'Your symptoms suggest advanced diabetic retinopathy. This is a serious condition that requires immediate medical attention.';
      recommendations = [
        'Seek immediate medical attention from an eye specialist',
        'Do not delay treatment as this could lead to vision loss',
        'Prepare for possible laser treatment or anti-VEGF therapy',
        'Monitor blood sugar levels very closely',
        'Keep all medical appointments',
        'Consider lifestyle modifications under medical supervision'
      ];
    } else if (symptomCount >= 3) {
      stage = 'Moderate';
      description = 'Your symptoms indicate moderate diabetic retinopathy. Early intervention can help prevent progression.';
      recommendations = [
        'Schedule an appointment with an eye specialist within a week',
        'Monitor blood sugar levels more frequently',
        'Start or maintain a healthy diet',
        'Exercise regularly as recommended by your doctor',
        'Take all prescribed medications',
        'Keep a symptom diary'
      ];
    } else if (symptomCount >= 1) {
      stage = 'Early';
      description = 'Your symptoms suggest early signs of diabetic retinopathy. Taking action now can help prevent progression.';
      recommendations = [
        'Schedule a comprehensive eye examination',
        'Review and optimize blood sugar control',
        'Maintain a healthy lifestyle',
        'Monitor for any new symptoms',
        'Follow up with your primary care physician',
        'Learn more about diabetic eye care'
      ];
    } else {
      stage = 'Minimal Risk';
      description = 'You have reported no significant symptoms, but regular monitoring is still important.';
      recommendations = [
        'Continue regular eye check-ups',
        'Maintain good blood sugar control',
        'Follow a healthy diet',
        'Exercise regularly',
        'Monitor for any new symptoms',
        'Stay educated about diabetes management'
      ];
    }

    setAnalysis({ stage, description, recommendations });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SymptomHeader />

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <SymptomsList 
          symptoms={symptoms}
          onSymptomChange={handleSymptomChange}
        />

        <button
          onClick={analyzeSymptoms}
          className="mt-8 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Analyze Symptoms
        </button>
      </div>

      <AnalysisResult analysis={analysis} />
    </div>
  );
}

export default SymptomChecker;