
// Utilisation de la clé API fournie via les variables d'environnement ou fallback
// Supporte à la fois Vite (import.meta.env) et process.env standard
const HARDCODED_KEY = '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';
const PERPLEXITY_API_KEY = (import.meta as any).env?.VITE_PERPLEXITY_API_KEY || process.env.VITE_PERPLEXITY_API_KEY || HARDCODED_KEY;
const PERPLEXITY_BASE_URL = 'https://api.perplexity.ai/chat/completions';

// État global pour la recherche web
let webSearchEnabled = true;

export class PerplexityService {
  setWebSearchEnabled(enabled: boolean) {
    webSearchEnabled = enabled;
  }

  getWebSearchEnabled(): boolean {
    return webSearchEnabled;
  }

  private async makeRequest(messages: Array<{ role: string; content: string }>) {
    if (!PERPLEXITY_API_KEY) {
        console.error("Clé API Perplexity manquante. Assurez-vous que VITE_PERPLEXITY_API_KEY est définie.");
        throw new Error("Clé API Perplexity manquante");
    }

    try {
      const payload: any = {
        model: 'sonar-pro',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
      };

      const response = await fetch(PERPLEXITY_BASE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API ${response.status}:`, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur API Perplexity:', error);
      // Relancer l'erreur pour qu'elle soit gérée par l'interface
      throw error;
    }
  }

  async getDailyQuestion(): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Tu es un expert en veille stratégique pour l'administration publique française. 
        Ton rôle est d'identifier LA question prioritaire du jour concernant l'IA dans le secteur public français.`
      },
      {
        role: 'user',
        content: `Analyse l'actualité des dernières 24h en France concernant l'intelligence artificielle dans l'administration publique. 
        Identifie LA question la plus importante que les référents IA des ministères devraient se poser aujourd'hui.
        
        Réponds uniquement avec la question, sans préambule ni explication.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async getWeeklyAINews(): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Tu es un analyste spécialisé dans la veille IA pour l'administration publique française. Tu dois TOUJOURS répondre avec un objet JSON valide, rien d'autre.`
      },
      {
        role: 'user',
        content: `Fais une synthèse de l'actualité IA des 7 derniers jours concernant l'administration publique française.
        Inclus : nouveaux référents IA identifiés, annonces ministérielles, projets lancés, évolutions réglementaires.

        IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide (sans backticks, sans markdown) au format suivant :
        {
          "referents": [
            {"name": "Nom Prénom", "organization": "Ministère/Organisation", "source": "Source de l'info"}
          ],
          "actualites": [
            {"titre": "Titre de l'actualité", "categorie": "Catégorie", "source": "Source", "impact": "Description de l'impact"}
          ],
          "opportunites": [
            {"sujet": "Sujet identifié", "gap": "Manque constaté", "action_suggeree": "Action recommandée"}
          ]
        }

        Si aucune information n'est trouvée pour une section, utilise un tableau vide [].`
      }
    ];

    return await this.makeRequest(messages);
  }

  async analyzeContentOpportunities(): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Tu es consultant en stratégie de communication pour l'administration publique française.`
      },
      {
        role: 'user',
        content: `Analyse l'actualité récente IA dans l'administration française et identifie 3 opportunités de contenu.
        Pour chaque opportunité, indique :
        - Le sujet/thème manquant ou peu traité
        - Pourquoi c'est important pour les agents publics
        - Le type de contenu à produire (guide, FAQ, retour d'expérience...)
        
        Concentre-toi sur les besoins concrets des référents IA ministériels.`
      }
    ];

    return await this.makeRequest(messages);
  }

  async searchAIExperts(): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Tu es un cartographe des réseaux d'experts IA dans l'administration française.`
      },
      {
        role: 'user',
        content: `Identifie les experts et référents IA les plus actifs ces 30 derniers jours dans l'administration publique française.

        Pour chaque personne identifiée, précise :
        - Nom et prénom
        - Organisation/ministère
        - Rôle ou fonction
        - Récente prise de parole ou action notable

        Concentre-toi sur les sources fiables (communiqués officiels, médias spécialisés comme Acteurs Publics).`
      }
    ];

    return await this.makeRequest(messages);
  }

  async askCustomQuestion(userQuestion: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Tu es un assistant expert en intelligence artificielle pour l'administration publique française.
        Tu dois répondre de manière précise, factuelle et sourcée aux questions sur l'IA dans le secteur public français.
        Si la question concerne l'actualité récente, fournis les informations les plus à jour possibles.
        Si tu ne trouves pas d'information pertinente, dis-le clairement plutôt que d'inventer.`
      },
      {
        role: 'user',
        content: userQuestion
      }
    ];

    return await this.makeRequest(messages);
  }
}

export const perplexityService = new PerplexityService();
