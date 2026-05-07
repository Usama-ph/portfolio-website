import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "adilusama16@gmail.com",
        subject: `New Contact: ${data.projectType} — ${data.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3b82f6;">New Project Inquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Project Type:</td><td style="padding: 8px 0;">${data.projectType}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Budget:</td><td style="padding: 8px 0;">${data.budget}</td></tr>
            </table>
            <div style="margin-top: 16px;">
              <p style="color: #6b7280; font-weight: bold; margin-bottom: 8px;">Message:</p>
              <p style="background: #f4f4f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
