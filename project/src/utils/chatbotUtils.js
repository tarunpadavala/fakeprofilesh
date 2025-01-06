import { chatbotKnowledge, commonQuestions } from '../data/chatbotData';

function findBestMatch(input, questions) {
  const normalizedInput = input.toLowerCase();
  return questions.find(q => 
    normalizedInput.includes(q.question.toLowerCase()) ||
    q.question.toLowerCase().includes(normalizedInput)
  );
}

function generateDetailedResponse(topic, subtopic) {
  const knowledge = chatbotKnowledge[topic];
  if (!knowledge) return null;
  
  return knowledge[subtopic] ? 
    typeof knowledge[subtopic] === 'string' ?
      knowledge[subtopic] :
      JSON.stringify(knowledge[subtopic], null, 2) :
    null;
}

export function processUserInput(input) {
  const normalizedInput = input.toLowerCase();
  
  // Check for direct matches in common questions
  const drMatch = findBestMatch(normalizedInput, commonQuestions.diabeticRetinopathy);
  if (drMatch) return drMatch.answer;
  
  const eyeMatch = findBestMatch(normalizedInput, commonQuestions.eyeAnatomy);
  if (eyeMatch) return eyeMatch.answer;
  
  // Process specific topics
  if (normalizedInput.includes('stage') || normalizedInput.includes('progression')) {
    return formatStagesResponse();
  }
  
  if (normalizedInput.includes('treatment') || normalizedInput.includes('therapy')) {
    return formatTreatmentResponse();
  }
  
  if (normalizedInput.includes('symptom') || normalizedInput.includes('sign')) {
    return formatSymptomsResponse();
  }
  
  if (normalizedInput.includes('prevent') || normalizedInput.includes('avoid')) {
    return formatPreventionResponse();
  }
  
  // Default response
  return "I can help you understand diabetic retinopathy and eye health. You can ask about symptoms, stages, treatments, or prevention. What would you like to know?";
}

function formatStagesResponse() {
  const { stages } = chatbotKnowledge.diabeticRetinopathy;
  return Object.values(stages)
    .map(stage => `${stage.name}:\n${stage.description}\nSymptoms: ${stage.symptoms.join(', ')}`)
    .join('\n\n');
}

function formatTreatmentResponse() {
  const { treatments } = chatbotKnowledge.diabeticRetinopathy;
  return `Treatment options include:\n\n${
    treatments.interventional
      .map(t => `${t.name}: ${t.description || t.types?.join(', ')}`)
      .join('\n\n')
  }\n\nPreventive measures:\n${treatments.preventive.join('\n')}`;
}

function formatSymptomsResponse() {
  const { symptoms } = chatbotKnowledge.diabeticRetinopathy;
  return `Early stage: ${symptoms.early.join(', ')}\n\nProgressive symptoms:\n${
    symptoms.progressive.map(s => `• ${s}`).join('\n')
  }`;
}

function formatPreventionResponse() {
  const { treatments } = chatbotKnowledge.diabeticRetinopathy;
  return `Prevention and management of diabetic retinopathy includes:\n${
    treatments.preventive.map(p => `• ${p}`).join('\n')
  }`;
}