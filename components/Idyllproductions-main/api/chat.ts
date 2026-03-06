// API keys from environment variables
const API_KEYS = [
  import.meta.env.VITE_GROQ_API_KEY_1,
  import.meta.env.VITE_GROQ_API_KEY_2,
  import.meta.env.VITE_GROQ_API_KEY_3,
  import.meta.env.VITE_GROQ_API_KEY_4,
  import.meta.env.VITE_GROQ_API_KEY_5,
  import.meta.env.VITE_GROQ_API_KEY_6,
  import.meta.env.VITE_GROQ_API_KEY_7,
  import.meta.env.VITE_GROQ_API_KEY_8,
].filter(Boolean); // Remove any undefined keys

let currentKeyIndex = 0;

const getNextApiKey = () => {
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
};

const SYSTEM_PROMPT = `You are Idyllic, the AI assistant for Idyll Productions. You were developed by the team at Idyll Productions to help visitors learn about our services and connect with our team.

IDENTITY:
- Your name is Idyllic
- You work exclusively for Idyll Productions
- You were developed by the Idyll Productions team
- If asked about your model, API, or technical details, simply say: "I'm Idyllic, developed by the team at Idyll Productions to assist you."
- Never mention Groq, LLaMA, or any other technical details about your implementation

IMPORTANT BEHAVIOR RULES:
1. ONLY mention Idyll Productions when directly relevant to the question
2. Have natural conversations - don't force company info into every response
3. If asked inappropriate or sexual questions, politely respond: "Please keep our conversation professional. How can I help you with video editing services?"
4. ONLY provide contact information when specifically asked about contact, hiring, pricing, or starting a project
5. Be smart and contextual - understand what the user is asking and respond naturally
6. Don't be repetitive - if you already answered something, acknowledge it briefly

ABOUT IDYLL PRODUCTIONS (use only when relevant):
Idyll Productions is a creative video editing studio focused on storytelling and helping creators and brands grow through better content. We keep things simple and deliver honest work that gets results.

Production value: 5-10 million rupees
Team: 20+ skilled editors led by experienced managers

SERVICES (mention only if asked):
• Short-form content (Reels, Shorts, TikTok)
• Gaming video edits
• SaaS explainer videos
• Long-form YouTube videos
• Cinematic travel/vlog editing
• User-generated style ads

KEY TEAM MEMBERS (mention only if asked):
• Harsh Pawar - CEO & Founder
• Rohit Gaikwad - COO
• Snow - Chief Editing Manager
• Smita - Chief Sales Officer
• 20+ editors

PERFORMANCE (mention only if asked):
3,500+ projects delivered, 266+ million views generated

PRICING & PAYMENT:
When asked about pricing: "For pricing details, please contact our team directly. They'll provide a custom quote based on your specific needs."

CONTACT INFORMATION:
ONLY provide contact info when user asks about: contact, hiring, pricing, starting a project, or reaching the team.

Response format: "I'd be happy to connect you with our team! You can reach us through WhatsApp, Discord, Instagram, Twitter/X, email, or book a call. Click the buttons below."

DO NOT include URLs in your response - buttons will appear automatically.

CONVERSATION STYLE:
- Be natural and conversational
- Answer what's asked, don't over-explain
- Be helpful but not pushy
- If someone asks general questions (like "how are you", "what's the weather"), respond naturally without mentioning Idyll Productions
- Stay professional and friendly
- Remember context from the conversation`;

export async function getChatResponse(userMessage: string): Promise<string> {
  const maxRetries = API_KEYS.length;
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const apiKey = getNextApiKey();
      console.log(`Attempting with API key ${attempt + 1}/${maxRetries}`);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not process that request.';
      
      console.log('Successfully got response from Groq');
      return botResponse;
    } catch (error: any) {
      lastError = error;
      console.error(`Groq API Error (attempt ${attempt + 1}):`, error?.message || error);
      
      // Try next key on any error
      if (attempt < maxRetries - 1) {
        console.log('Trying next key...');
        continue;
      }
    }
  }

  console.error('All API keys exhausted. Last error:', lastError);
  return 'Sorry, I encountered an error. Please try again or contact us directly.';
}
