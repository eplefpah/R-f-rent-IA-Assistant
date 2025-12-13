import { RequirementForm } from '../types';
import { GoogleGenAI } from "@google/genai";
import { perplexityService } from './perplexityService';
import { streamOllamaResponse } from './ollamaService';

const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const buildPrompt = (requirement: RequirementForm): string => {
  return `En tant qu'expert en solutions IA pour l'administration publique française, analyse ce besoin métier et propose une solution détaillée :

**Titre du besoin :** ${requirement.title}

**Contexte métier :**
${requirement.business_context || 'Non renseigné'}

**Description du problème :**
${requirement.problem_description || 'Non renseigné'}

**Fréquence :** ${requirement.frequency || 'Non renseigné'}

**Impact métier :** ${requirement.business_impact}

**Délai souhaité :** ${requirement.desired_deadline || 'Non renseigné'}

**Données disponibles :**
${requirement.data_resources || 'Non renseigné'}

**Contraintes spécifiques :**
${requirement.specific_constraints || 'Non renseigné'}

**Solutions actuelles :**
${requirement.current_solutions || 'Non renseigné'}

---

**Fournis une analyse structurée avec :**

1. **Synthèse du besoin** (2-3 phrases)
2. **Solution IA recommandée** (type de technologie, approche)
3. **Outils et technologies suggérés** (solutions open-source ou commerciales adaptées au secteur public)
4. **Plan de mise en œuvre** (étapes clés, délais estimés)
5. **Conformité et sécurité** (RGPD, souveraineté des données, éthique)
6. **Estimation des ressources** (humaines, techniques, budget indicatif)
7. **Risques et points d'attention**
8. **Alternatives possibles**

Réponds de manière concrète, opérationnelle et adaptée au contexte de l'administration publique française.`;
};

export const generateAISolution = async (
  requirement: RequirementForm,
  onChunk?: (text: string) => void,
  preferredProvider?: 'gemini' | 'ollama',
  preferredOllamaModel?: string
): Promise<string> => {
  const prompt = buildPrompt(requirement);
  const systemInstruction = 'Tu es un expert en solutions IA pour l\'administration publique française.';
  const provider = preferredProvider || 'gemini';

  const callGemini = async (): Promise<string> => {
    if (!ai) throw new Error('Gemini not configured');

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    });

    const result = await chat.sendMessageStream({ message: prompt });
    let fullText = "";

    for await (const chunk of result) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        if (onChunk) onChunk(chunkText);
      }
    }

    return fullText;
  };

  const callOllama = async (): Promise<string> => {
    let fullText = "";
    await streamOllamaResponse(
      [],
      prompt,
      (text) => {
        fullText += text;
        if (onChunk) onChunk(text);
      },
      systemInstruction,
      preferredOllamaModel
    );
    return fullText;
  };

  try {
    if (provider === 'ollama') {
      return await callOllama();
    } else {
      return await callGemini();
    }
  } catch (primaryError) {
    console.warn(`${provider} failed, trying fallback:`, primaryError);

    try {
      if (provider === 'ollama') {
        return await callGemini();
      } else {
        return await callOllama();
      }
    } catch (fallbackError) {
      console.error('Both providers failed:', fallbackError);
      throw new Error('Tous les services IA sont indisponibles. Veuillez réessayer plus tard.');
    }
  }
};
