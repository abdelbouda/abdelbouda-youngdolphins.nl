import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Canonical Redirects Middleware
app.use((req, res, next) => {
  const host = req.headers.host || "";
  const url = req.url;
  
  if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(301, `https://${host}${url}`);
  }
  if (host.startsWith("www.")) {
    const newHost = host.replace("www.", "");
    return res.redirect(301, `https://${newHost}${url}`);
  }
  if (url.length > 1 && url.endsWith("/") && !url.includes("?")) {
    return res.redirect(301, url.slice(0, -1));
  }
  if (url === "/index.html") {
    return res.redirect(301, "/");
  }
  next();
});

// 2. SEO Routes
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://youngdolphins.nl/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://youngdolphins.nl/sitemap.xml`);
});

// 3. API route for signup
app.post("/api/signup", async (req, res) => {
  const { name, email, phone, childInfo, package: selectedPackage } = req.body;
  
  if (!name || !email) return res.status(400).json({ error: "Naam en email zijn verplicht." });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: parseInt(process.env.SMTP_PORT || "587") === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Young Dolphins" <${process.env.SMTP_USER}>`,
      to: "info@youngdolphins.nl",
      subject: `Aanmelding: ${name}`,
      text: `Naam: ${name}\nEmail: ${email}\nKind: ${childInfo}`,
    });

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Server Start & Optimalisatie
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Caching voor statische assets
    app.use(express.static(distPath, {
      maxAge: '1y',
      etag: true
    }));

    app.get("*", (req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
