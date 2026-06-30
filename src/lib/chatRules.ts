export type ChatRule = {
  keywords: string[];
  response: string;
  quickReplies?: string[];
};

export const chatRules: ChatRule[] = [
  {
    keywords: ["hi", "hello", "hey", "greetings"],
    response: "Hi there! 👋 I'm the Jeshurun assistant. Ask me about our services, technology, or how to get in touch.",
    quickReplies: ["Our Services", "Pricing & Quotes", "Where You're Based", "Get in Touch"]
  },
  {
    keywords: ["services", "what do you do", "offer", "what can you do"],
    response: "We offer 4 core services:\n• IT Consulting - Strategic technology guidance.\n• Project Management - End-to-end delivery execution.\n• Test Management - Quality assurance and testing pipelines.\n• Infrastructure Management - Cloud and on-premise systems.\n\nVisit our Services page for more details!",
    quickReplies: ["Tell me about Cloud Solutions", "View Technology Page", "Get in Touch"]
  },
  {
    keywords: ["technology", "tech stack", "cloud", "ai", "devops", "machine learning"],
    response: "Our expertise covers Cloud Solutions, Data Management, Cybersecurity, AI & Machine Learning, Network Infrastructure, and DevOps. We specialize in the AWS, Azure, GCP, Kubernetes, and Docker ecosystems. Check out our Technology page to learn more!",
    quickReplies: ["Our Services", "What industries do you serve?"]
  },
  {
    keywords: ["where", "located", "contact", "email", "based", "reach", "get in touch"],
    response: "We're headquartered in Dublin, Ireland, with delivery hubs across Europe, the Middle East, and India. Reach us at info@jeshuruntech.com or use the Contact Us button above.",
    quickReplies: ["Do you offer free consultations?", "What industries do you serve?"]
  },
  {
    keywords: ["experience", "how many", "clients", "projects", "stats", "engineers"],
    response: "We have a proven track record with:\n• 150+ projects delivered\n• 14 enterprise clients\n• 8 years of industry experience\n• 45 certified engineers\n• 99.9% uptime commitment",
    quickReplies: ["What industries do you serve?", "Pricing & Quotes"]
  },
  {
    keywords: ["price", "cost", "quote", "how much", "pricing"],
    response: "Pricing depends on project scope. Click 'Schedule Consultation' or 'Contact Us' and our team will get back to you with a tailored quote.",
    quickReplies: ["Do you offer free consultations?", "How do I get started?"]
  },
  {
    keywords: ["startup", "startups", "small business"],
    response: "Yes, we work with both established enterprises and high-growth startups to scale their technology efficiently and effectively. We can tailor our solutions to your specific growth stage.",
    quickReplies: ["How do I get started?", "Pricing & Quotes"]
  },
  {
    keywords: ["industry", "industries"],
    response: "We have extensive experience serving clients across Financial Services, Healthcare, Retail, Manufacturing, and Logistics. You can see detailed examples on our Case Studies page.",
    quickReplies: ["View Case Studies", "Our Services"]
  },
  {
    keywords: ["get started", "start", "onboard"],
    response: "Getting started is easy! We usually begin with a discovery call to understand your current architecture and goals, followed by a customized proposal.",
    quickReplies: ["Do you offer free consultations?", "Get in Touch"]
  },
  {
    keywords: ["free consultation", "free", "consultation"],
    response: "Absolutely! We offer a free initial consultation to discuss your project requirements and determine how Jeshurun can add the most value.",
    quickReplies: ["Get in Touch", "Pricing & Quotes"]
  },
  {
    keywords: ["thanks", "bye", "thank you", "goodbye"],
    response: "You're welcome! Feel free to reach out anytime via the Contact Us button.",
    quickReplies: []
  },
  // Fallback rule should be at the end, checked only if no others match
  {
    keywords: [], 
    response: "I'm not sure I have an answer for that yet — for detailed questions, please use the 'Contact Us' button and our team will help directly.",
    quickReplies: ["Our Services", "Get in Touch", "Pricing & Quotes"]
  }
];

export function findMatchingResponse(input: string): { response: string; quickReplies: string[] } {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const rule of chatRules) {
    if (rule.keywords.length === 0) continue; // Skip fallback rule for now
    
    // Check if any keyword matches
    if (rule.keywords.some(keyword => normalizedInput.includes(keyword))) {
      return {
        response: rule.response,
        quickReplies: rule.quickReplies || []
      };
    }
  }
  
  // Return fallback response
  const fallback = chatRules[chatRules.length - 1];
  return {
    response: fallback.response,
    quickReplies: fallback.quickReplies || []
  };
}
