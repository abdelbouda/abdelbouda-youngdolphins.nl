import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, childInfo, package: selectedPackage } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Naam en email zijn verplicht.' });
  }

  try {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('SMTP credentials not provided. Email not sent.');
      return res.status(200).json({ 
        success: true, 
        message: 'Aanmelding ontvangen (simulatie - configureer SMTP voor echte verzending).' 
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
      to: 'info@youngdolphins.nl',
      cc: email,
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

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Aanmelding succesvol verzonden.' });
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Fout bij het versturen van de mail.' });
  }
}
