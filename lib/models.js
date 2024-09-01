export function saveAPIKeys(APIkey, provider) {
    debugger
  try {
    // Store the API keys in the browser's local storage
    switch (provider) {
      case 'openai':
        localStorage.setItem('openAIKey', APIkey);
        break;
      case 'stabilityai':
        localStorage.setItem('stabilityAIKey', APIkey);
        break;
      default:
        console.error('Invalid provider:', provider);
        break;
    }
  } catch (error) {
    console.error('Error saving API keys:', error);
    throw error;
  }
}
