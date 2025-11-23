import { Message } from "../types";

const OLLAMA_BASE_URL = "https://seasnail-becoming-likely.ngrok-free.app";
const MODEL = "qwen2.5:14b-instruct-q4_K_M";

export const streamOllamaResponse = async (
  history: Message[],
  newMessage: string,
  onChunk: (text: string) => void,
  systemInstruction?: string
): Promise<string> => {
  try {
    const validHistory = history.filter(m => !m.isStreaming && m.text.trim() !== "");

    const messages = validHistory.map(m => ({
      role: m.role === "model" ? "assistant" : "user",
      content: m.text
    }));

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
        model: MODEL,
        messages: messages,
        stream: true,
        system: systemInstruction || "You are a helpful assistant."
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
