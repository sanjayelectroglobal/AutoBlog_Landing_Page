import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * =====================================================================================
 * AUTOBLOG CONTACT FORM AUTOMATION API ROUTE
 * =====================================================================================
 * 
 * Pipeline:
 * 1. Validates form submission (name, email, mobile, website, message).
 * 2. Appends submission to Google Sheet (via Google Apps Script Webhook).
 * 3. Sends confirmation email to submitter from sales@notify.mommantum.com via MailX (Mailflare REST API):
 *    - CC: kuldeep@mommantum.com, sharnasaurabh2604@gmail.com
 *    - Google Calendar Meeting Booking Link (10:00 AM - 6:00 PM IST, 4-day availability window)
 *    - Meeting participants: ahirkuldeep1709@gmail.com, sharnasaurabh2604@gmail.com
 *    - Product & dashboard preview graphics embedded in email
 *    - Direct support note: "If you want to connect now or ask any issue, you can ask on these emails"
 *    - Fallback to SMTP if Mailflare is unconfigured
 */

function isMailflareConfigured(): boolean {
  return Boolean(
    process.env.MAILFLARE_URL &&
    process.env.MAILFLARE_API_KEY &&
    process.env.MAILFLARE_MAILBOX_ID
  );
}

async function sendMailflare(message: {
  to: string;
  cc?: string[];
  subject: string;
  html: string;
  text: string;
}): Promise<string> {
  const baseUrl = (process.env.MAILFLARE_URL || 'https://mailx.rapidchip.in').replace(/\/+$/, '');
  const mailboxId = process.env.MAILFLARE_MAILBOX_ID || '';
  const apiKey = process.env.MAILFLARE_API_KEY || '';
  const fromHeader = process.env.EMAIL_FROM || 'AutoBlog <sales@notify.mommantum.com>';

  if (!apiKey || !mailboxId) {
    throw new Error('Mailflare credentials (MAILFLARE_API_KEY / MAILFLARE_MAILBOX_ID) are missing from environment.');
  }

  const makePayload = (includeCc: boolean) => {
    const payload: Record<string, any> = {
      mailboxId,
      from: fromHeader,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    };
    if (includeCc && message.cc && message.cc.length > 0) {
      payload.cc = message.cc;
    }
    return payload;
  };

  const doSend = async (payload: Record<string, any>) => {
    const res = await fetch(`${baseUrl}/api/v1/send`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`Mailflare HTTP ${res.status}: ${errText.slice(0, 200)}`);
    }

    const json = (await res.json().catch(() => ({}))) as { messageId?: string };
    return String(json.messageId ?? '');
  };

  try {
    return await doSend(makePayload(true));
  } catch (err: any) {
    console.warn('⚠️ Mailflare send with CC failed, retrying primary send without CC:', err?.message);
    return await doSend(makePayload(false));
  }
}

async function sendSmtp(message: {
  to: string;
  cc?: string[];
  subject: string;
  html: string;
  text: string;
}): Promise<string> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER || 'sales@notify.mommantum.com';
  const smtpPass = process.env.SMTP_PASSWORD;
  const emailSender = process.env.EMAIL_FROM || '"AutoBlog" <sales@notify.mommantum.com>';

  if (!smtpHost || !smtpPass) {
    throw new Error('SMTP host/password not configured');
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

  const info = await transporter.sendMail({
    from: emailSender,
    to: message.to,
    cc: message.cc,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });

  return String(info.messageId ?? '');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, website, message } = body;

    // Validation
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { error: 'Name, email, and mobile number are required.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });

    // ──────────────────────────────────────────────────────────────────────────
    // 1. FORWARD SUBMISSION TO GOOGLE SHEET
    // ──────────────────────────────────────────────────────────────────────────
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    let sheetSaved = false;

    if (googleSheetWebhookUrl) {
      try {
        // Prefix phone number with apostrophe (') so Google Sheets formats numbers starting
        // with '+' as plain text instead of attempting to parse them as an arithmetic formula (#ERROR!)
        const safeMobileForSheet = mobile.trim().startsWith("'")
          ? mobile.trim()
          : `'${mobile.trim()}`;

        const sheetResponse = await fetch(googleSheetWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: submissionTime,
            name,
            email,
            mobile: safeMobileForSheet,
            website: website || 'N/A',
            message: message || 'N/A',
            source: 'AutoBlog Landing Page Contact Form',
          }),
          redirect: 'follow',
        });
        if (sheetResponse.ok || sheetResponse.status === 302) {
          sheetSaved = true;
        }
      } catch (sheetErr) {
        console.error('Google Sheet Webhook Sync Warning:', sheetErr);
      }
    } else {
      console.log('ℹ️ GOOGLE_SHEET_WEBHOOK_URL not configured yet in .env.local');
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 2. GENERATE CALENDAR BOOKING URL (10 AM - 6 PM IST, 4-Day Window)
    // ──────────────────────────────────────────────────────────────────────────
    const customCalendarUrl = process.env.CALENDAR_BOOKING_URL;

    // Dynamic Google Calendar Event Link
    const calendarTitle = encodeURIComponent('AutoBlog Strategy & Onboarding Session');
    const calendarDetails = encodeURIComponent(
      `Hello ${name},\n\n` +
      `Thank you for connecting with AutoBlog!\n` +
      `This 1-on-1 strategy session covers automated blogging infrastructure, CMS synchronization (WordPress/Shopify/Webflow), and ranking acceleration.\n\n` +
      `• Meeting Window: 10:00 AM - 6:00 PM IST (Available within 4 business days)\n` +
      `• Lead Name: ${name} (${email}, ${mobile})\n` +
      `• Website/Store: ${website || 'N/A'}\n` +
      `• Inquiry Message: ${message || 'N/A'}\n\n` +
      `Host & Event Participants:\n` +
      `• ahirkuldeep1709@gmail.com\n` +
      `• sharnasaurabh2604@gmail.com`
    );
    const calendarParticipants = 'ahirkuldeep1709@gmail.com,sharnasaurabh2604@gmail.com';

    const googleCalendarLink =
      customCalendarUrl ||
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarTitle}&details=${calendarDetails}&add=${calendarParticipants}&add=${encodeURIComponent(
        email
      )}`;

    const ccRecipients = ['kuldeep@mommantum.com', 'sharmasaurabh2604@gmail.com'];

    // ──────────────────────────────────────────────────────────────────────────
    // 3. COMPOSE EMAIL (HTML + TEXT)
    // ──────────────────────────────────────────────────────────────────────────
    const emailSubject = 'Thank you for contacting AutoBlog – Book Your Strategy Session';

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting AutoBlog</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 36px 16px;">
          <tr>
            <td align="center">
              <table width="620" cellpadding="0" cellspacing="0" style="max-width: 620px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06); border: 1px solid #e2e8f0;">
                
                <!-- HEADER BANNER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #090e1a 0%, #172554 50%, #2563eb 100%); padding: 32px 36px; text-align: left;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td valign="middle">
                          <img src="https://autoblog-electroglobal.vercel.app/images/autoblog-official-logo.jpg" alt="AutoBlog Logo" style="height: 38px; border-radius: 8px; vertical-align: middle;" />
                        </td>
                        <td align="right" valign="middle">
                          <span style="color: #93c5fd; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
                            Autonomous SEO Engine
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- MAIN CONTENT -->
                <tr>
                  <td style="padding: 36px 36px 28px 36px;">
                    <h1 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 14px 0; line-height: 1.3;">
                      Thank you for contacting AutoBlog!
                    </h1>

                    <p style="font-size: 15px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
                      Hi <strong>${name}</strong>,<br/>
                      We received your inquiry regarding <strong>${website || 'your website/store'}</strong>. Our team is excited to help you scale your organic traffic autonomously.
                    </p>

                    <!-- CALENDAR BOOKING CARD -->
                    <div style="background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); border-radius: 14px; border: 1px solid #bfdbfe; padding: 24px; margin: 26px 0; text-align: center;">
                      <div style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px; margin-bottom: 10px;">
                        Next Step
                      </div>
                      <h2 style="color: #1e3a8a; font-size: 18px; font-weight: 800; margin: 0 0 8px 0;">
                        📅 Book Your 1-on-1 Growth Meeting
                      </h2>
                      <p style="font-size: 14px; color: #1e40af; margin: 0 0 18px 0; line-height: 1.5;">
                        Schedule a 20-minute live demo and roadmap discussion with our core engineering team.
                        Slots are open from <strong>10:00 AM to 6:00 PM IST</strong> over the next <strong>4 business days</strong>.
                      </p>
                      <a href="${googleCalendarLink}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14.5px; font-weight: 700; text-decoration: none; padding: 13px 30px; border-radius: 10px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);">
                        Book a Meeting Slot (10 AM - 6 PM IST) &rarr;
                      </a>
                      <p style="font-size: 12px; color: #64748b; margin: 14px 0 0 0;">
                        4-day availability window &bull; Fast calendar confirmation
                      </p>
                    </div>

                    <!-- MEETING PARTICIPANTS BOX -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc; padding: 18px;">
                      <tr>
                        <td>
                          <p style="font-size: 13px; font-weight: 700; color: #1e293b; margin: 0 0 8px 0;">
                            👥 Session Event Participants:
                          </p>
                          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.7;">
                            <li><strong>Kuldeep Ahir:</strong> <a href="mailto:ahirkuldeep1709@gmail.com" style="color: #2563eb; text-decoration: none;">ahirkuldeep1709@gmail.com</a></li>
                            <li><strong>Saurabh Sharma:</strong> <a href="mailto:sharnasaurabh2604@gmail.com" style="color: #2563eb; text-decoration: none;">sharnasaurabh2604@gmail.com</a></li>
                          </ul>
                        </td>
                      </tr>
                    </table>

                    <!-- EMBEDDED DASHBOARD SHOWCASE IMAGE -->
                    <div style="margin: 28px 0; text-align: center;">
                      <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin: 0 0 10px 0;">
                        AutoBlog Autonomous SEO Dashboard Preview
                      </p>
                      <a href="https://autoblog-electroglobal.vercel.app" target="_blank" style="text-decoration: none; display: block;">
                        <img src="https://autoblog-electroglobal.vercel.app/images/sc-dashboard.png" alt="AutoBlog Dashboard Preview" style="width: 100%; max-width: 548px; border-radius: 12px; border: 1px solid #cbd5e1; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); display: block; margin: 0 auto;" />
                      </a>
                    </div>

                    <!-- DIRECT CONTACT & SUPPORT -->
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 22px; margin-top: 26px;">
                      <p style="font-size: 14.5px; font-weight: 700; color: #0f172a; margin: 0 0 6px 0;">
                        If you want to connect now or have any questions:
                      </p>
                      <p style="font-size: 13.5px; color: #475569; margin: 0 0 12px 0; line-height: 1.6;">
                        You can reply directly to this email or reach our leadership team at:
                      </p>
                      <table cellpadding="0" cellspacing="0" style="margin: 8px 0;">
                        <tr>
                          <td style="padding: 4px 12px 4px 0;">
                            ✉️ <a href="mailto:kuldeep@mommantum.com" style="color: #2563eb; font-weight: 600; text-decoration: none; font-size: 13.5px;">kuldeep@mommantum.com</a>
                          </td>
                          <td style="padding: 4px 0;">
                            ✉️ <a href="mailto:sharnasaurabh2604@gmail.com" style="color: #2563eb; font-weight: 600; text-decoration: none; font-size: 13.5px;">sharnasaurabh2604@gmail.com</a>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- SUBMISSION SUMMARY RECAP -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 18px; margin-top: 22px; font-size: 12.5px; color: #64748b;">
                      <strong style="color: #334155;">Your Submitted Details:</strong><br/>
                      • <strong>Name:</strong> ${name}<br/>
                      • <strong>Email:</strong> ${email}<br/>
                      • <strong>Mobile:</strong> ${mobile}<br/>
                      • <strong>Website:</strong> ${website || 'N/A'}<br/>
                      • <strong>Message:</strong> ${message || 'N/A'}<br/>
                      • <strong>Logged At:</strong> ${submissionTime} IST
                    </div>

                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 22px 36px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    &copy; 2026 AutoBlog Software Inc. &bull; Autonomous SEO Acceleration<br/>
                    Sent automatically via <strong>sales@notify.mommantum.com</strong>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const emailText =
      `Thank you for contacting AutoBlog!\n\n` +
      `Hi ${name},\n\n` +
      `We received your inquiry regarding ${website || 'your website/store'}.\n\n` +
      `===================================================\n` +
      `BOOK YOUR 1-ON-1 STRATEGY SESSION (10 AM - 6 PM IST)\n` +
      `===================================================\n` +
      `Click here to book your slot (available next 4 days):\n` +
      `${googleCalendarLink}\n\n` +
      `Session Event Participants:\n` +
      `• Kuldeep Ahir: ahirkuldeep1709@gmail.com\n` +
      `• Saurabh Sharma: sharnasaurabh2604@gmail.com\n\n` +
      `If you want to connect now or ask any issue, you can ask on these emails:\n` +
      `• kuldeep@mommantum.com\n` +
      `• sharnasaurabh2604@gmail.com\n\n` +
      `Your Submission Summary:\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Mobile: ${mobile}\n` +
      `• Website: ${website || 'N/A'}\n` +
      `• Message: ${message || 'N/A'}\n` +
      `• Timestamp: ${submissionTime} IST\n\n` +
      `Best regards,\n` +
      `AutoBlog Growth Team\nsales@notify.mommantum.com`;

    // ──────────────────────────────────────────────────────────────────────────
    // 4. DISPATCH EMAIL VIA MAILX (MAILFLARE REST API) OR SMTP FALLBACK
    // ──────────────────────────────────────────────────────────────────────────
    let emailSent = false;
    let messageId = '';
    let dispatchMethod = 'none';

    try {
      if (isMailflareConfigured()) {
        dispatchMethod = 'MailX (Mailflare REST API)';
        messageId = await sendMailflare({
          to: email,
          cc: ccRecipients,
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        });
        emailSent = true;
        console.log(`✅ Email sent via MailX REST API. Message ID: ${messageId}`);
      } else if (process.env.SMTP_HOST && process.env.SMTP_PASSWORD) {
        dispatchMethod = 'SMTP Fallback';
        messageId = await sendSmtp({
          to: email,
          cc: ccRecipients,
          subject: emailSubject,
          html: emailHtml,
          text: emailText,
        });
        emailSent = true;
        console.log(`✅ Email sent via SMTP Fallback. Message ID: ${messageId}`);
      } else {
        console.warn('⚠️ Neither Mailflare nor SMTP credentials configured.');
      }
    } catch (sendErr: any) {
      console.error('Email Dispatch Error:', sendErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Contact inquiry processed successfully.',
      sheetSaved,
      emailSent,
      dispatchMethod,
      messageId,
      calendarLink: googleCalendarLink,
      details: {
        name,
        email,
        mobile,
        website,
        timestamp: submissionTime,
      },
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing contact submission.' },
      { status: 500 }
    );
  }
}
