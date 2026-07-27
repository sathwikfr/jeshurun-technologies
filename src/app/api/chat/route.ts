import { NextResponse } from "next/server";

/**
 * Match user message against rule-based keyword patterns.
 * Provides accurate, brand-aligned answers based on Jeshurun Technologies site data.
 */
function matchRuleBasedResponse(lowercaseMessage: string): string {
  if (lowercaseMessage.match(/hello|hi\b|hey\b|greetings|good (morning|afternoon|evening)/)) {
    return "Hello! I am Jeshurun AI, the official assistant for Jeshurun Technologies. How can I assist you today? You can ask about our enterprise consulting, cloud services, offices, or pricing & contact options.";
  }

  if (lowercaseMessage.match(/pricing|quote|cost|rate|price|how much|budget|estimate/)) {
    return "Enterprise engagements at Jeshurun Technologies are scoped on a custom basis depending on project complexity, SLA requirements, and team scale:\n\n" +
      "• **Billing Models**: Fixed-price milestone delivery or dedicated time-and-materials engagement.\n" +
      "• **SLA Guarantee**: All managed architectures include a 99.9% uptime SLA guarantee.\n" +
      "• **Custom Proposals**: Submit your project details on our Contact page at /contact or email sales@jeshuruntech.com for an official scope and estimate within 2 hours.";
  }

  if (lowercaseMessage.match(/service|consulting|project management|test management|qa|testing|infrastructure|cloud|devops|software/)) {
    return "Jeshurun Technologies delivers four core enterprise competencies:\n\n" +
      "1. **IT Consulting**: Strategic technology roadmaps, architecture audits, and digital transformation planning.\n" +
      "2. **Project Management**: Agile Scrum execution, PMO governance, and cross-functional risk matrices.\n" +
      "3. **Test Management**: Automated QA testing, performance testing, and defect reduction (proven 60% reduction in production bugs).\n" +
      "4. **Infrastructure Management**: Multi-cloud migration, Kubernetes orchestration, 24/7 monitoring, and zero-downtime deployments.\n\n" +
      "Learn more on our Services page or tell me which area you'd like to explore!";
  }

  if (lowercaseMessage.match(/office|hq|location|address|dublin|new york|where|based/)) {
    return "Jeshurun Technologies operates out of major global financial and technology hubs:\n\n" +
      "📍 **Dublin HQ**: 1 Upper Pembroke Street, Dublin 2, Ireland (Primary engineering & consulting hub)\n" +
      "📍 **New York Office**: 120 Broadway, New York, NY 10271, USA\n\n" +
      "Visit our Contact page at /contact to view interactive map locators and office details.";
  }

  if (lowercaseMessage.match(/contact|touch|email|phone|sales|reach|inquiry|rfp|mail|message/)) {
    return "You can reach the appropriate Jeshurun team directly:\n\n" +
      "💼 **Enterprise Solutions & Sales**: sales@jeshuruntech.com\n" +
      "👥 **Careers & Recruitment**: careers@jeshuruntech.com\n" +
      "📧 **General Inquiries**: info@jeshuruntech.com\n\n" +
      "For urgent project requests, submit an RFP at /contact — our practice leads guarantee a response within 2 hours.";
  }

  if (lowercaseMessage.match(/client|partner|portfolio|pfizer|vodafone|astellas|ergo|boston|reference/)) {
    return "We partner with leading global enterprises across healthcare, telecommunications, and financial services — including **Pfizer**, **Vodafone**, **Astellas**, **Boston Scientific**, **Ergo**, and **Tech Placements**. We deliver mission-critical software under strict SLA guarantees.";
  }

  if (lowercaseMessage.match(/career|job|hiring|work|apply|recru|position|opening/)) {
    return "We are always interested in connecting with outstanding technology talent. Please reach out directly through our contact page at /contact or email your credentials to careers@jeshuruntech.com.";
  }

  if (lowercaseMessage.match(/who are you|what is this|about jeshurun|what do you do|company/)) {
    return "Jeshurun Technologies is a global enterprise IT consulting firm headquartered in Dublin, Ireland. We specialize in digital transformation, cloud architecture, automated QA, and high-availability infrastructure management.";
  }

  // Graceful rule-based fallback response
  return "I'm currently operating in assistant guide mode. I can help answer questions about:\n\n" +
    "• **Our Services**: IT Consulting, Project Management, QA, and Infrastructure\n" +
    "• **Pricing & Quotes**: Custom scoping and billing models\n" +
    "• **Office Locations**: Dublin HQ and New York office\n" +
    "• **Contact & Sales**: Direct email contacts and 2-hour SLA form at /contact\n\n" +
    "Select one of the quick options or type a specific keyword to learn more!";
}

/**
 * Modular response processor — ready for future AI API integration.
 */
async function generateChatResponse(messages: any[], lastUserMessage: string): Promise<string> {
  const lowercaseMessage = lastUserMessage.toLowerCase().trim();

  // 1. If Gemini API key is configured, invoke the official Gemini API
  if (process.env.GEMINI_API_KEY) {
    try {
      const systemPrompt = `You are Jeshurun AI, the official AI assistant for Jeshurun Technologies (https://www.jeshurun.ie). You are professional, concise, helpful, and speak on behalf of the company. 
Jeshurun Technologies is an enterprise IT consulting and services provider with headquarters in Dublin, Ireland (1 Upper Pembroke Street, Dublin 2) and an office in New York City (120 Broadway). 
They specialize in four core areas: 
1. IT Consulting (strategic roadmaps, architecture audits)
2. Project Management (agile integration, execution)
3. Test Management (QA automation, load testing, defect reduction)
4. Infrastructure Management (cloud migration, system monitoring, zero-downtime transitions)

Their client portfolio includes leading brands like Pfizer, Vodafone, Astellas, Boston Scientific, Ergo, and Tech Placements. They guarantee a 99.9% SLA uptime on all managed architectures.
If asked about contact info: sales@jeshuruntech.com for business queries, careers@jeshuruntech.com for jobs, and info@jeshuruntech.com for general topics. They have a dynamic contact form at /contact with a 2-hour response SLA.
Please keep your answers helpful and format them nicely in Markdown.`;

      const geminiHistory = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: geminiHistory,
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
          })
        }
      );

      if (response.ok) {
        const result = await response.json();
        const reply = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return reply;
      }
    } catch (geminiError) {
      console.error("Gemini API call failed, using rule-based engine:", geminiError);
    }
  }

  // 2. Rule-based NLP Responder
  return matchRuleBasedResponse(lowercaseMessage);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "Please provide a valid message." }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const reply = await generateChatResponse(messages, lastUserMessage);
    const defaultQuickReplies = ["Our Services", "Pricing & Quotes", "Where You're Based", "Get in Touch"];
    return NextResponse.json({ reply, quickReplies: defaultQuickReplies }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ reply: "Sorry, an unexpected error occurred. Please try again or visit /contact." }, { status: 500 });
  }
}
