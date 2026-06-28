import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lowercaseMessage = lastUserMessage.toLowerCase();

    // 1. If Gemini API key is configured, call the official Google Gemini API directly
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

        // Format history for Gemini API
        // Gemini API expects: { role: 'user'|'model', parts: [{ text: '...' }] }
        const geminiHistory = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: geminiHistory,
              systemInstruction: {
                parts: [{ text: systemPrompt }]
              },
              generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
              }
            })
          }
        );

        if (response.ok) {
          const result = await response.json();
          const reply = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply }, { status: 200 });
          }
        }
        console.error("Gemini API call returned non-200 or empty response. Falling back to keyword responder.");
      } catch (geminiError) {
        console.error("Error connecting to Gemini API:", geminiError);
      }
    }

    // 2. Keyword-based NLP Fallback Responder
    let reply = "";

    if (lowercaseMessage.match(/hello|hi|hey|greet/)) {
      reply = "Hello! I am Jeshurun AI, the official assistant for Jeshurun Technologies. How can I help you today? You can ask about our enterprise consulting, cloud services, offices, or current open positions.";
    } else if (lowercaseMessage.match(/service|consulting|project management|testing|qa|infrastructure|competenc/)) {
      reply = "Jeshurun Technologies offers elite competencies tailored for enterprise brands:\n\n" +
        "• **IT Consulting**: Strategic roadmaps to align technology with business ROI.\n" +
        "• **Project Management**: Agile Scrum delivery and risk management.\n" +
        "• **Test Management**: Advanced QA automation that has proven to reduce defect rates by up to 60%.\n" +
        "• **Infrastructure**: Safe cloud migrations, server topologies, and 24/7 system monitoring.\n\n" +
        "Which of these services are you interested in?";
    } else if (lowercaseMessage.match(/office|hq|location|address|dublin|new york|where/)) {
      reply = "Jeshurun Technologies operates in major global hubs:\n\n" +
        "📍 **Dublin HQ**: 1 Upper Pembroke Street, Dublin 2, Ireland\n" +
        "📍 **New York Office**: 120 Broadway, New York, NY 10271, USA\n\n" +
        "Our HQ in Dublin serves as our primary engineering hub. We also offer interactive locators on our contact page at /contact.";
    } else if (lowercaseMessage.match(/contact|email|phone|sales|inquiry|rfp|mail/)) {
      reply = "You can contact our teams directly through these channels:\n\n" +
        "💼 **Enterprise Solutions & Sales**: sales@jeshuruntech.com\n" +
        "👥 **Careers & Recruitment**: careers@jeshuruntech.com\n" +
        "📧 **General Inquiries**: info@jeshuruntech.com\n\n" +
        "For immediate support, fill out our dynamic RFP form at /contact. Our leadership team responds within 2 hours.";
    } else if (lowercaseMessage.match(/client|partner|pfizer|vodafone|astellas|ergo|boston/)) {
      reply = "We work with top enterprise leaders across Europe and the US, including **Pfizer**, **Vodafone**, **Astellas**, **Boston Scientific**, **Ergo**, and **Tech Placements**. We support their infrastructure and software engineering under strict SLA-backed terms.";
    } else if (lowercaseMessage.match(/career|job|hiring|work|apply|recru/)) {
      reply = "We are actively recruiting certified cloud architects, agile managers, and QA specialists. You can view our available roles on our Careers page at /careers. To apply directly, send your CV and portfolio to careers@jeshuruntech.com.";
    } else if (lowercaseMessage.match(/who are you|what is this|jeshurun/)) {
      reply = "Jeshurun Technologies is a premier global enterprise IT consulting firm. We design, migration-secure, and test high-volume networks and custom SaaS platforms. We are known for our 99.9% uptime guarantees and fast agile engineering velocities.";
    } else {
      reply = "I am Jeshurun AI. I can guide you through our core services (IT Consulting, QA testing, Cloud Infrastructure), offices (Dublin and New York), corporate partnerships (Pfizer, Vodafone), careers, or contact details. What would you like to know more about?";
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
