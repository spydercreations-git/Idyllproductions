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
let keyUsageCount: { [key: string]: number } = {};
let keyLastUsed: { [key: string]: number } = {};

// Rate limiting: max 30 requests per minute per key
const RATE_LIMIT_PER_MINUTE = 30;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

const getNextApiKey = () => {
  const now = Date.now();
  
  // Find a key that hasn't hit rate limit
  for (let i = 0; i < API_KEYS.length; i++) {
    const keyIndex = (currentKeyIndex + i) % API_KEYS.length;
    const key = API_KEYS[keyIndex];
    
    if (!key) continue;
    
    const lastUsed = keyLastUsed[key] || 0;
    const usageCount = keyUsageCount[key] || 0;
    
    // Reset usage count if window has passed
    if (now - lastUsed > RATE_LIMIT_WINDOW) {
      keyUsageCount[key] = 0;
    }
    
    // Use this key if it's under rate limit
    if (keyUsageCount[key] < RATE_LIMIT_PER_MINUTE) {
      currentKeyIndex = (keyIndex + 1) % API_KEYS.length;
      keyUsageCount[key] = (keyUsageCount[key] || 0) + 1;
      keyLastUsed[key] = now;
      return key;
    }
  }
  
  // If all keys are rate limited, return the next one anyway (it will fail gracefully)
  const key = API_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  return key;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fallback responses for when API is completely unavailable
const FALLBACK_RESPONSES: { [key: string]: string } = {
  'services': "We offer professional video editing services including:\n\n• Short-form content (Reels, Shorts, TikTok)\n• Gaming video edits\n• SaaS explainer videos\n• Long-form YouTube videos\n• Cinematic travel/vlog editing\n• User-generated style ads\n\nWould you like to know more about any specific service?",
  
  'team': "Our team includes:\n\n• Harsh Pawar - CEO & Founder\n• Rohit Gaikwad - COO\n• Snow - Chief Editing Manager\n• Smita - Chief Sales Officer\n• 20+ skilled editors\n\nWe're a creative video editing studio focused on storytelling and helping creators grow.",
  
  'process': "Our process is simple:\n\n1. Share your vision and raw footage\n2. We create a detailed editing strategy\n3. Our expert team crafts your video\n4. You receive your polished video with platform-specific formats\n\nWe focus on delivering results that help you grow.",
  
  'pricing': "For pricing details, please contact our team directly. They'll provide a custom quote based on your specific needs and project requirements.",
  
  'contact': "I'd be happy to connect you with our team! You can reach us through WhatsApp, Discord, Instagram, Twitter/X, email, or book a call.",
  
  'default': "Thanks for your question! I'm currently experiencing some technical difficulties, but I'd love to help you learn about Idyll Productions. You can ask me about our services, team, process, or how to get in touch with us."
};

const getFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('service') || message.includes('what do you') || message.includes('what can you')) {
    return FALLBACK_RESPONSES.services;
  }
  
  if (message.includes('team') || message.includes('who') || message.includes('founder') || message.includes('ceo')) {
    return FALLBACK_RESPONSES.team;
  }
  
  if (message.includes('process') || message.includes('how') || message.includes('work')) {
    return FALLBACK_RESPONSES.process;
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('payment')) {
    return FALLBACK_RESPONSES.pricing;
  }
  
  if (message.includes('contact') || message.includes('hire') || message.includes('start') || message.includes('reach')) {
    return FALLBACK_RESPONSES.contact;
  }
  
  return FALLBACK_RESPONSES.default;
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
  // If no API keys available, use fallback immediately
  if (API_KEYS.length === 0) {
    console.warn('No API keys available, using fallback response');
    return getFallbackResponse(userMessage);
  }

  const maxRetries = Math.min(API_KEYS.length, 3); // Limit retries to 3 to avoid long delays
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const apiKey = getNextApiKey();
      
      if (!apiKey) {
        console.warn('No valid API key available');
        break;
      }
      
      console.log(`Attempting with API key ${attempt + 1}/${maxRetries}`);
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
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
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific error types
        if (response.status === 429) {
          console.log('Rate limit hit, trying next key...');
          // Mark this key as rate limited
          if (apiKey) {
            keyUsageCount[apiKey] = RATE_LIMIT_PER_MINUTE;
            keyLastUsed[apiKey] = Date.now();
          }
          
          if (attempt < maxRetries - 1) {
            await sleep(1000); // Wait 1 second before retry
            continue;
          }
        }
        
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not process that request.';
      
      console.log('Successfully got response from Groq');
      return botResponse;
      
    } catch (error: any) {
      lastError = error;
      console.error(`Groq API Error (attempt ${attempt + 1}):`, error?.message || error);
      
      // If it's a timeout or network error, try next key
      if (error.name === 'AbortError' || error.message?.includes('fetch')) {
        console.log('Network/timeout error, trying next key...');
        if (attempt < maxRetries - 1) {
          await sleep(500); // Wait 500ms before retry
          continue;
        }
      }
      
      // For other errors, try next key
      if (attempt < maxRetries - 1) {
        await sleep(1000); // Wait 1 second before retry
        continue;
      }
    }
  }

  console.error('All API attempts failed. Using fallback response. Last error:', lastError);
  return getFallbackResponse(userMessage);
}

// Export function to check API health
export const checkApiHealth = async (): Promise<boolean> => {
  if (API_KEYS.length === 0) return false;
  
  try {
    const apiKey = API_KEYS[0];
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};
