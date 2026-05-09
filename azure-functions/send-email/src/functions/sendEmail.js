const { app } = require("@azure/functions");
const nodemailer = require("nodemailer");

app.http("sendEmail", {
  methods: ["POST"],
  authLevel: "function", // Requires function key — not publicly accessible
  handler: async (request, context) => {
    context.log("Azure Function: sendEmail triggered");

    try {
      // Parse the JSON body
      const body = await request.json();
      const { email, code, subject } = body;

      // Validate required fields
      if (!email || !code) {
        return {
          status: 400,
          jsonBody: {
            success: false,
            message: "Missing required fields: email, code",
          },
        };
      }

      // Create SMTP transporter using environment variables
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.MAIL_PORT || "587"),
        secure: false, // true for 465, false for 587
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      // Send the email
      const info = await transporter.sendMail({
        from:
          process.env.MAIL_FROM_ADDRESS ||
          '"ESApp Azure Function" <no-reply@esapp.dev>',
        to: email,
        subject: subject || "Your Account Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #2563eb;">ESApp Email Verification</h2>
            <p>Your verification code is:</p>
            <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; text-align: center; margin: 16px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e293b;">${code}</span>
            </div>
            <p style="color: #64748b; font-size: 13px;">This email was sent by Azure Functions (serverless).</p>
          </div>
        `,
      });

      context.log(`Email sent successfully to ${email}, messageId: ${info.messageId}`);

      return {
        status: 200,
        jsonBody: {
          success: true,
          message: `Verification email sent to ${email}`,
          messageId: info.messageId,
          sentBy: "Azure Functions (Serverless)",
        },
      };
    } catch (error) {
      context.error("Failed to send email:", error.message);

      return {
        status: 500,
        jsonBody: {
          success: false,
          message: "Failed to send email",
          error: error.message,
        },
      };
    }
  },
});
