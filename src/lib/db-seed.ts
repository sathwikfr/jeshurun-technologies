import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function ensureSeeded() {
  try {
    // 1. Ensure Roles exist (with thread-safe unique constraint handling)
    let adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
    if (!adminRole) {
      try {
        adminRole = await prisma.role.create({ data: { name: "ADMIN" } });
        console.log("Created role: ADMIN");
      } catch (err) {
        const error = err as { code?: string };
        if (error.code === "P2002") {
          adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
        } else {
          throw err;
        }
      }
    }

    let userRole = await prisma.role.findUnique({ where: { name: "USER" } });
    if (!userRole) {
      try {
        userRole = await prisma.role.create({ data: { name: "USER" } });
        console.log("Created role: USER");
      } catch (err) {
        const error = err as { code?: string };
        if (error.code === "P2002") {
          userRole = await prisma.role.findUnique({ where: { name: "USER" } });
        } else {
          throw err;
        }
      }
    }

    if (!adminRole || !userRole) {
      throw new Error("Roles initialization failed.");
    }

    // 2. Ensure Admin User exists
    let adminUser = await prisma.user.findUnique({ where: { email: "admin@jeshuruntech.com" } });
    if (!adminUser) {
      try {
        const passwordHash = await bcrypt.hash("Password123", 10);
        adminUser = await prisma.user.create({
          data: {
            name: "Admin User",
            email: "admin@jeshuruntech.com",
            passwordHash,
            roleId: adminRole.id,
          },
        });
        console.log("Created default admin user: admin@jeshuruntech.com");
      } catch (err) {
        const error = err as { code?: string };
        if (error.code === "P2002") {
          adminUser = await prisma.user.findUnique({ where: { email: "admin@jeshuruntech.com" } });
        } else {
          throw err;
        }
      }
    }

    // Ensure Regular User exists
    let regularUser = await prisma.user.findUnique({ where: { email: "user@jeshuruntech.com" } });
    if (!regularUser) {
      try {
        const passwordHash = await bcrypt.hash("Password123", 10);
        regularUser = await prisma.user.create({
          data: {
            name: "John Doe",
            email: "user@jeshuruntech.com",
            passwordHash,
            roleId: userRole.id,
          },
        });
        console.log("Created default regular user: user@jeshuruntech.com");
      } catch (err) {
        const error = err as { code?: string };
        if (error.code === "P2002") {
          regularUser = await prisma.user.findUnique({ where: { email: "user@jeshuruntech.com" } });
        } else {
          throw err;
        }
      }
    }

    if (!adminUser) {
      throw new Error("Admin user initialization failed.");
    }

    // 3. Ensure Clients exist
    const clientCount = await prisma.client.count();
    if (clientCount === 0) {
      const defaultClients = [
        { name: "Astellas", contact: "astellas.com" },
        { name: "Vodafone", contact: "vodafone.com" },
        { name: "Boston Scientific", contact: "bostonscientific.com" },
        { name: "Ergo", contact: "ergogroup.ie" },
        { name: "Pfizer", contact: "pfizer.com" },
        { name: "Tech Placements", contact: "techplacements.ie" },
      ];

      for (const client of defaultClients) {
        try {
          await prisma.client.create({
            data: {
              name: client.name,
              contact: client.contact,
              ownerId: adminUser.id,
            },
          });
        } catch (err) {
          const error = err as { code?: string };
          if (error.code !== "P2002") console.error("Failed to seed client during race:", err);
        }
      }
      console.log("Seeded 6 default clients");
    }

    // 4. Ensure Leads exist (to prevent blank dashboard on first load)
    const leadCount = await prisma.lead.count();
    if (leadCount === 0) {
      const defaultLeads = [
        {
          firstName: "Robert",
          lastName: "Chen",
          email: "r.chen@biomedcorp.com",
          company: "BioMed Corporation",
          message: "Looking for an infrastructure migration proposal with zero downtime compliance.",
          source: "Website Contact Form",
          status: "New",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          firstName: "Sarah",
          lastName: "O'Connor",
          email: "soconnor@telecomnet.ie",
          company: "Telecom Ireland",
          message: "Requesting IT consulting services for upgrading our cloud governance matrix.",
          source: "Website Contact Form",
          status: "Contacted",
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        },
        {
          firstName: "Marcus",
          lastName: "Vance",
          email: "m.vance@financialcloud.com",
          company: "Financial Cloud Group",
          message: "Interested in hiring certified QA test management engineers for a short-term contract.",
          source: "Manual",
          status: "Qualified",
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        },
      ];

      for (const lead of defaultLeads) {
        try {
          await prisma.lead.create({
            data: {
              firstName: lead.firstName,
              lastName: lead.lastName,
              email: lead.email,
              company: lead.company,
              message: lead.message,
              source: lead.source,
              status: lead.status,
              ownerId: adminUser.id,
              createdAt: lead.createdAt,
            },
          });
        } catch (err) {
          const error = err as { code?: string };
          if (error.code !== "P2002") console.error("Failed to seed lead during race:", err);
        }
      }
      console.log("Seeded 3 default leads");
    }

    // 5. Ensure Blog Posts exist
    const postCount = await prisma.blogPost.count();
    if (postCount === 0) {
      const defaultPosts = [
        {
          category: "Security",
          tag: "Research Report",
          title: "Why Today's Cyber Talent Model Is Broken — And How to Fix It",
          slug: "cyber-talent-model",
          excerpt: "Cybersecurity needs hybrid technical and strategic skills, but the workforce hasn't kept pace. Learn the three moves organizations can make to build resilience from within.",
          content: `## The Cyber Security Crisis

Modern enterprises face an unprecedented volume of sophisticated cyber threats. Yet, the talent supply model is fundamentally broken. Traditional training programs emphasize certifications over real-world problem solving.

### The Hybrid Skills Gap

A resilient cyber defense requires a blend of technical competence (e.g. penetration testing, network infrastructure analysis) and strategic orchestration (e.g. alignment with business risk, regulatory compliance).

### Three Strategic Solutions

1. **Build from Within**: Redesign engineering career pathways to cross-train software engineers in cybersecurity principles.
2. **Redesign the Work**: Implement AI-assisted security telemetry tools to handle low-level logs monitoring, letting human analysts focus on threat hunting.
3. **Augment Talent**: Partner with managed security consulting firms to provide 24/7 coverage.`,
          readTime: "8 min read",
          accent: "#0057D9",
          gradient: "from-blue-600 to-indigo-700",
          featured: true,
          published: true,
          createdAt: new Date("2026-06-10T10:00:00Z"),
        },
        {
          category: "AI & Automation",
          tag: "Research Report",
          title: "Reinventing for Human + AI Engineering",
          slug: "human-ai-engineering",
          excerpt: "Combining machine capability and executive coordination to multiply development velocity and secure enterprise-grade systems.",
          content: `## The Next Epoch of Software Engineering

Software development is undergoing a paradigm shift. Generative AI tools are no longer just completion aids; they are active agents collaborating with engineers.

### Multiplying Velocity Safely

By delegating syntax writing and routine unit test generation to AI, human engineers shift their focus to architecture, system security, and API integrations.

### Continuous Telemetry

Integrating automated validation loops into CI/CD pipelines ensures that AI-generated artifacts comply with enterprise constraints before deployment.`,
          readTime: "6 min read",
          accent: "#4F46E5",
          gradient: "from-indigo-600 to-purple-700",
          featured: false,
          published: true,
          createdAt: new Date("2026-06-03T10:00:00Z"),
        },
        {
          category: "Cloud",
          tag: "White Paper",
          title: "The Cloud Scalability Matrix",
          slug: "cloud-scalability-matrix",
          excerpt: "Assessing multi-tenant cloud efficiencies, containerization overheads, and automatic horizontal scaling margins under peak transaction volumes.",
          content: `## Designing for High-Concurrency Cloud Systems

Scaling cloud networks requires more than just provisioning more instances. It is about architectural efficiency and resource governance.

### Micro-services Overhead

While micro-services offer decoupling, they introduce network hops and transaction coordination overhead. We examine containerization limits and standard load balancing margins.

### Dynamic Optimization

Learn how caching strategies and edge routing limits server overhead by up to 40% during peak transaction sessions.`,
          readTime: "10 min read",
          accent: "#0284C7",
          gradient: "from-sky-600 to-blue-700",
          featured: false,
          published: true,
          createdAt: new Date("2026-05-27T10:00:00Z"),
        },
      ];

      for (const p of defaultPosts) {
        try {
          await prisma.blogPost.create({
            data: {
              title: p.title,
              slug: p.slug,
              content: p.content,
              category: p.category,
              tag: p.tag,
              excerpt: p.excerpt,
              readTime: p.readTime,
              gradient: p.gradient,
              accent: p.accent,
              featured: p.featured,
              published: p.published,
              authorId: adminUser.id,
              createdAt: p.createdAt,
            },
          });
        } catch (err) {
          const error = err as { code?: string };
          if (error.code !== "P2002") console.error("Failed to seed post during race:", err);
        }
      }
      console.log("Seeded default blog posts");
    }

    // 6. Ensure some Activities exist (audit trail)
    const activityCount = await prisma.activity.count();
    if (activityCount === 0) {
      const defaultActivities = [
        {
          type: "System Initialize",
          description: "Default telemetry credentials and nodes initialized.",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          type: "Database Seed",
          description: "Successfully seeded default roles, admin credentials, clients, and leads.",
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          type: "Lead Created (Contact Form)",
          description: "New lead 'Robert Chen' captured from corporate edge domain biomedcorp.com.",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          type: "Lead Status Updated",
          description: "Lead 'Sarah O'Connor' status updated to 'Contacted'.",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        }
      ];

      for (const act of defaultActivities) {
        try {
          await prisma.activity.create({
            data: {
              type: act.type,
              description: act.description,
              userId: adminUser.id,
              createdAt: act.createdAt,
            }
          });
        } catch (err) {
          console.error("Failed to seed activity during race:", err);
        }
      }
      console.log("Seeded default activities");
    }

  } catch (error) {
    console.error("Database seeding encountered an error:", error);
  }
}
