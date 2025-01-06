import { eyeHealthKnowledge } from '../data/knowledge/eyeHealth';
import { drKnowledge } from '../data/knowledge/diabeticRetinopathy';

class ResponseGeneratorService {
  generateResponse(transcript) {
    const normalizedInput = transcript.toLowerCase();
    
    // Check for DR related queries
    if (this.isDRQuery(normalizedInput)) {
      return this.handleDRQuery(normalizedInput);
    }
    
    // Check for eye health queries
    if (this.isEyeHealthQuery(normalizedInput)) {
      return this.handleEyeHealthQuery(normalizedInput);
    }

    return "I can help you understand eye health and diabetic retinopathy. What would you like to know about?";
  }

  isDRQuery(input) {
    return input.includes('diabetic retinopathy') || 
           input.includes('dr') || 
           input.includes('diabetes eye');
  }

  isEyeHealthQuery(input) {
    return input.includes('eye') || 
           input.includes('vision') || 
           input.includes('sight');
  }

  handleDRQuery(input) {
    if (input.includes('what is') || input.includes('define')) {
      return drKnowledge.basics.definition;
    }
    // Add more DR query handlers
    return "Could you be more specific about what you'd like to know about diabetic retinopathy?";
  }

  handleEyeHealthQuery(input) {
    // Add eye health query handlers
    return "Could you be more specific about what aspect of eye health you'd like to know about?";
  }
}

export default new ResponseGeneratorService();