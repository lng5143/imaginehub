import supabase from './supabase';

export async function saveAPIKeys(userId, openAIKey, stabilityAIKey) {
  try {
    const { data, error } = await supabase
      .from('user_api_keys')
      .upsert({ user_id: userId, openai_key: openAIKey, stability_ai_key: stabilityAIKey });

    if (error) {
      console.error('Error saving API keys:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error saving API keys:', error);
    throw error;
  }
}
