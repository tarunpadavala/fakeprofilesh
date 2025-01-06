import { eyeHealthData } from '../data/eyeHealthData';

export function processVoiceCommand(transcript) {
  const normalizedTranscript = transcript.toLowerCase();
  
  // Process different types of voice commands
  if (isEyeHealthQuery(normalizedTranscript)) {
    return handleEyeHealthQuery(normalizedTranscript);
  }
  
  if (isSymptomQuery(normalizedTranscript)) {
    return handleSymptomQuery(normalizedTranscript);
  }
  
  if (isTreatmentQuery(normalizedTranscript)) {
    return handleTreatmentQuery(normalizedTranscript);
  }
  
  return "I didn't quite catch that. Could you please rephrase your question about eye health or diabetic retinopathy?";
}

function isEyeHealthQuery(transcript) {
  return transcript.includes('what is') || 
         transcript.includes('tell me about') || 
         transcript.includes('explain');
}

function isSymptomQuery(transcript) {
  return transcript.includes('symptom') || 
         transcript.includes('sign') || 
         transcript.includes('problem');
}

function isTreatmentQuery(transcript) {
  return transcript.includes('treatment') || 
         transcript.includes('cure') || 
         transcript.includes('help');
}

function handleEyeHealthQuery(transcript) {
  if (transcript.includes('eye structure')) {
    return formatEyeStructureResponse();
  }
  if (transcript.includes('diabetic retinopathy')) {
    return formatDiabeticRetinopathyInfo();
  }
  // Add more specific query handlers
  return "Could you be more specific about what aspect of eye health you'd like to know about?";
}

function handleSymptomQuery(transcript) {
  if (transcript.includes('diabetic retinopathy')) {
    return formatDRSymptoms();
  }
  // Add more symptom query handlers
  return "I can help you understand symptoms of various eye conditions. Could you specify which condition you're interested in?";
}

function handleTreatmentQuery(transcript) {
  if (transcript.includes('diabetic retinopathy')) {
    return formatDRTreatments();
  }
  // Add more treatment query handlers
  return "I can provide information about various eye condition treatments. Which condition would you like to know about?";
}

function formatEyeStructureResponse() {
  const { eyeStructure } = eyeHealthData;
  return `The eye is composed of several important parts: ${eyeStructure.basic.join(', ')}`;
}

function formatDRSymptoms() {
  const { diabeticRetinopathy } = eyeHealthData;
  return diabeticRetinopathy.stages.map(stage => 
    `In ${stage.name} stage: ${stage.symptoms.join(', ')}`
  ).join('. ');
}

function formatDRTreatments() {
  return "Treatment for diabetic retinopathy depends on the stage and may include laser therapy, anti-VEGF injections, or surgery. Regular monitoring and blood sugar control are essential.";
}

// Add more utility functions for voice command processing