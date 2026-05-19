import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Log all requests to help debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Sitemap route for SEO
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://youngdolphins.nl/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

// Robots.txt route
app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://youngdolphins.nl/sitemap.xml`);
});

// API route for signup
app.get("/api/signup", (req, res) => {
  res.json({ message: "Signup API is active. Use POST to submit data." });
});

app.post("/api/signup", async (req, res) => {
  const { name, phone, email, childInfo, package: selectedPackage } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Naam en email zijn verplicht." });
  }

  try {
    // ... setup transporter ...
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP credentials not provided. Email not sent.");
      return res.status(200).json({ 
        success: true, 
        message: "Aanmelding ontvangen (simulatie - configureer SMTP voor echte verzending)." 
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Young Dolphins" <${smtpUser}>`,
      to: "info@youngdolphins.nl",
      cc: email, // Copy to parent
      subject: `Nieuwe aanmelding zwemles: ${name}`,
      text: `
Nieuwe aanmelding van de website:

Naam ouder: ${name}
Telefoonnummer: ${phone}
E-mailadres: ${email}
Naam kind & Leeftijd: ${childInfo}
Gekozen pakket: ${selectedPackage || 'Niet opgegeven'}

Deze gegevens zijn verstuurd naar info@youngdolphins.nl en een kopie is gestuurd naar ${email}.
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0ea5e9;">Nieuwe aanmelding zwemles</h2>
          <p>U heeft een nieuwe aanmelding ontvangen van de website:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Naam ouder:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefoonnummer:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>E-mailadres:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Naam kind & Leeftijd:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${childInfo}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Gekozen pakket:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${selectedPackage || 'Niet opgegeven'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
            Deze gegevens zijn verstuurd naar info@youngdolphins.nl en een kopie is gestuurd naar ${email}.
          </p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Aanmelding succesvol verzonden." });
    } catch (sendError: any) {
      console.error("Nodemailer Error Details:", sendError);
      return res.status(500).json({ 
        error: `Fout bij het versturen: ${sendError.message || "Onbekende SMTP fout"}`,
        details: sendError.code
      });
    }
  } catch (error: any) {
    console.error("General Error in /api/signup:", error);
    res.status(500).json({ error: error.message || "Interne server fout." });
  }
});

// JSON fallback for unmatched API routes
app.all("/api/*", (req, res) => {
  res.status(404).json({ error: `API route ${req.method} ${req.url} not found` });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global Express Error:", err);
  res.status(500).json({ error: "Server Error", details: err.message });
});

startServer();
