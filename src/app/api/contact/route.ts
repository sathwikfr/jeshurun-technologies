import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// Set up SendGrid if API key is provided
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, message } = body;

    // Field Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Required fields (First name, Last name, Email, Message) are missing." },
        { status: 400 }
      );
    }

    const submission = {
      id: Math.random().toString(36).substring(2, 9),
      firstName,
      lastName,
      email,
      company: company || "",
      message,
      createdAt: new Date().toISOString(),
    };

    // Save to Database using Prisma
    try {
      await prisma.lead.create({
        data: {
          firstName,
          lastName,
          email,
          company: company || "",
          message,
          source: "Website Contact Form",
          status: "New",
        }
      });
      console.log("Saved contact submission to database.");

      // Log Activity under default admin
      const adminUser = await prisma.user.findFirst({
        where: { role: { name: "ADMIN" } }
      });
      if (adminUser) {
        await prisma.activity.create({
          data: {
            type: "Lead Created (Contact Form)",
            description: `New lead '${firstName} ${lastName}' captured from website contact form.`,
            userId: adminUser.id,
          }
        });
      }
    } catch (err) {
      console.error("Database/Activity save failed for contact submission:", err);
    }

    // 1. Fallback: Log submission locally in prisma/contact_submissions.json
    const dataDir = path.join(process.cwd(), "prisma");
    const filePath = path.join(dataDir, "contact_submissions.json");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let existingSubmissions = [];
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8");
        existingSubmissions = JSON.parse(fileContent);
      } catch (err) {
        console.error("Error reading fallback contact submission logs:", err);
      }
    }

    existingSubmissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(existingSubmissions, null, 2), "utf8");

    // 2. Send Email via Gmail SMTP or SendGrid (if configured)
    let emailSent = false;
    const recipient = process.env.CONTACT_RECEIVER_EMAIL || "info@jeshuruntech.com";
    const sender = process.env.CONTACT_SENDER_EMAIL || "no-reply@jeshuruntech.com";

    const mailText = `
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || "N/A"}
Date: ${submission.createdAt}

Message:
${message}
    `;

    const mailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px;">
        <h2 style="color: #0057d9; margin-top: 0;">New Contact Inquiry</h2>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Submitted At:</strong> ${submission.createdAt}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #f1f5f9; white-space: pre-wrap;">${message}</div>
      </div>
    `;

    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Jeshurun Contact Gateway" <${process.env.GMAIL_USER}>`,
          to: recipient,
          replyTo: email,
          subject: `[Website Contact Form] Submission from ${firstName} ${lastName}`,
          text: mailText,
          html: mailHtml,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log("Email sent successfully via Gmail SMTP to:", recipient);
      } catch (err) {
        console.error("Failed to send contact notification email via Gmail SMTP:", err);
      }
    } else if (process.env.SENDGRID_API_KEY) {
      try {
        const msg = {
          to: recipient,
          from: sender,
          replyTo: email,
          subject: `[Website Contact Form] Submission from ${firstName} ${lastName}`,
          text: mailText,
          html: mailHtml,
        };

        await sgMail.send(msg);
        emailSent = true;
        console.log("Email sent successfully via SendGrid to:", recipient);
      } catch (err) {
        console.error("Failed to send contact notification email via SendGrid:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Submission processed successfully.",
      emailSent,
      id: submission.id,
    });
  } catch (error) {
    console.error("API submission handler encountered an error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
