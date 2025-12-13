import { Message } from "../types";
import { GLOBAL_SYSTEM_INSTRUCTION } from "../constants";

const OLLAMA_BASE_URL = "https://seasnail-becoming-likely.ngrok-free.app";
const DEFAULT_MODEL = "qwen2.5:14b-instruct-q4_K_M";

export interface OllamaModel {
  name: string;
  displayName: string;
  description: string;
  category: 'recommended' | 'optimized' | 'specialized' | 'generalist';
}

export const AVAILABLE_OLLAMA_MODELS: OllamaModel[] = [
  { name: "gpt-4o", displayName: "ChatGPT OSS 120B", description: "Le plus puissant - Raisonnement complexe", category: 'recommended' },
  { name: "gpt-4o-mini", displayName: "ChatGPT OSS", description: "Équilibré - Usage général optimal", category: 'recommended' },
  { name: "qwen2.5:14b-instruct-q4_K_M", displayName: "Qwen 2.5 Instruct (14B)", description: "Modèle principal optimisé", category: 'optimized' },
  { name: "qwen2.5:3b", displayName: "Qwen 3 (8B)", description: "Plus léger et rapide", category: 'optimized' },
  { name: "llava:13b", displayName: "LLaVA 13B v1.6", description: "Vision et analyse d'images", category: 'specialized' },
  { name: "deepseek-math:7b", displayName: "DeepSeek Math 7B", description: "Mathématiques et calculs", category: 'specialized' },
  { name: "deepseek-coder:6.7b", displayName: "DeepSeek Coder 6.7B", description: "Programmation et code", category: 'specialized' },
  { name: "gemma:7b", displayName: "Gemma 7B", description: "Précis et fiable", category: 'generalist' },
  { name: "mistral:7b", displayName: "Mistral 7B", description: "Raisonnement logique", category: 'generalist' }
];

export const getAvailableOllamaModels = async (): Promise<OllamaModel[]> => {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
    if (!response.ok) {
      console.warn("Could not fetch Ollama models, using predefined list");
      return AVAILABLE_OLLAMA_MODELS;
    }
    const data = await response.json();
    const installedModelNames = new Set(data.models?.map((m: any) => m.name) || []);

    return AVAILABLE_OLLAMA_MODELS.filter(model =>
      installedModelNames.has(model.name)
    );
  } catch (error) {
    console.warn("Error fetching Ollama models:", error);
    return AVAILABLE_OLLAMA_MODELS;
  }
};

export const streamOllamaResponse = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void,
  systemInstruction?: string,
  model?: string
): Promise<string> => {
  try {
    const validHistory = history.filter(m => !m.isStreaming && m.text.trim() !== "");

    const messages: Array<{ role: string; content: string }> = [];

    if (systemInstruction || GLOBAL_SYSTEM_INSTRUCTION) {
      messages.push({
        role: "system",
        content: systemInstruction || GLOBAL_SYSTEM_INSTRUCTION
      });
    }

    validHistory.forEach(m => {
      messages.push({
        role: m.role === "model" ? "assistant" : "user",
        content: m.text
      });
    });

    messages.push({
      role: "user",
      content: newMessage
    });

    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || DEFAULT_MODEL,
        messages: messages,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.trim()) {
          try {
            const json = JSON.parse(line);
            const text = json.message?.content || "";
            if (text) {
              fullText += text;
              onChunk(text);
            }
          } catch {
            // Skip invalid JSON lines
          }
        }
      }
    }

    return fullText;
  } catch (error) {
    console.error("Error calling Ollama API:", error);
    throw error;
  }
};
