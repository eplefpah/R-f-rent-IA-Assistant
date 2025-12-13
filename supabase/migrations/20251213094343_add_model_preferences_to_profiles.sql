/*
  # Add Model Preferences to Profiles

  1. Changes
    - Add `preferred_model_provider` column to profiles table
      - Type: text with check constraint ('gemini' or 'ollama')
      - Default: 'gemini'
      - Description: User's preferred AI model provider
    
    - Add `preferred_ollama_model` column to profiles table
      - Type: text (nullable)
      - Description: Specific Ollama model name when provider is 'ollama'
      - Examples: 'qwen2.5:14b-instruct-q4_K_M', 'llama3.2:latest', etc.
  
  2. Notes
    - Default provider is Gemini (Google Cloud)
    - Ollama models are on-premise/sovereign options
    - The preferred_ollama_model is only used when provider is 'ollama'
*/

-- Add preferred_model_provider column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'preferred_model_provider'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN preferred_model_provider text DEFAULT 'gemini' 
    CHECK (preferred_model_provider IN ('gemini', 'ollama'));
  END IF;
END $$;

-- Add preferred_ollama_model column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'preferred_ollama_model'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN preferred_ollama_model text;
  END IF;
END $$;