
import { GoogleGenAI, Content, GenerativeModel } from "@google/genai";
import { GLOBAL_SYSTEM_INSTRUCTION } from "../constants";
import { Message, Role } from "../types";

// Ensure API key is present
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("Missing API_KEY in environment variables. The chat will likely fail.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

// Configure the model
const modelId = 'gemini-2.5-flash'; 

export const streamChatResponse = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void,
  systemInstruction?: string
): Promise<string> => {

  try {
    const finalSystemInstruction = systemInstruction || GLOBAL_SYSTEM_INSTRUCTION;
    console.log('[Gemini Service] Using system instruction:', finalSystemInstruction.substring(0, 200) + '...');

    // Format history for the SDK
    // System instruction is passed via config, not as a message in the history for this SDK version usually,
    // but the @google/genai SDK allows systemInstruction in the generateContent config.
    // However, for chat, we initialize the chat with system instructions if possible or pass it in config.

    // Convert app history to SDK contents
    // We exclude the very last message which is 'newMessage' to avoid duplication if the caller added it to UI state already
    const validHistory = history.filter(m => !m.isStreaming && m.text.trim() !== "");

    // Map to SDK format. Note: 'user' role is 'user', 'model' role is 'model'.
    const chatHistory: Content[] = validHistory.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: finalSystemInstruction,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
      history: chatHistory
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    let fullText = "";
    
    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }

    return fullText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
