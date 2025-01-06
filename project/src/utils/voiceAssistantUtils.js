import { voiceAssistantData, voiceCommands } from '../data/voiceAssistantData';

export function processVoiceCommand(transcript) {
  const normalizedTranscript = transcript.toLowerCase();
  
  // Check for diabetic retinopathy definition
  if (voiceCommands.triggers.diabeticRetinopathy.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.definition;
  }

  // Check for stages
  if (voiceCommands.triggers.stages.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.stages.overview;
  }

  // Check for risk factors
  if (voiceCommands.triggers.risks.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.riskFactors;
  }

  // Check for symptoms
  if (voiceCommands.triggers.symptoms.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.symptoms;
  }

  // Check for treatment
  if (voiceCommands.triggers.treatment.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.treatment;
  }

  // Check for prevention
  if (voiceCommands.triggers.prevention.some(trigger => 
    normalizedTranscript.includes(trigger))) {
    return voiceAssistantData.diabeticRetinopathy.prevention;
  }

  return "I can help you understand diabetic retinopathy. You can ask about its definition, stages, risk factors, symptoms, treatment, or prevention. What would you like to know?";
}