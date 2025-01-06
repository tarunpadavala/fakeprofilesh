import { diabeticRetinopathyResponses } from '../data/responses/diabeticRetinopathyResponses';
import { matchCommand } from '../utils/voiceCommandMatcher';

class VoiceResponseService {
  getResponse(transcript) {
    const command = matchCommand(transcript);
    
    if (!command) {
      return "I can help you with information about diabetic retinopathy. You can ask about its definition, stages, risks, symptoms, treatment, or prevention.";
    }
    
    return diabeticRetinopathyResponses[command] || "Could you please rephrase your question?";
  }
}

export default new VoiceResponseService();