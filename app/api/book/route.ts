import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { isPersonalEmail, isValidEmail } from '@/lib/blocked-domains';

function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = 'Coach Voice <hello@coachvoice.ai>';
const TEAM_EMAIL = 'hello@coachvoice.ai';
const LOGO_URL = 'https://storage.googleapis.com/coachvoice-public-assets/logo-email.png';

interface BookingRequest {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone?: string;
    jobTitle?: string;
    message?: string;
    packageType: string;
}

function notificationHtml(data: BookingRequest): string {
    const packageLabel = data.packageType === 'independent' ? 'Independent Coach' : 'Enterprise Package';
    const rows = [
        ['Name', `${data.firstName} ${data.lastName}`],
        ['Email', data.email],
        ['Company', data.company],
        ...(data.phone ? [['Phone', data.phone]] : []),
        ...(data.jobTitle ? [['Job title', data.jobTitle]] : []),
        ['Package', packageLabel],
    ];

    const rowsHtml = rows.map(([label, value]) =>
        `<tr>
            <td style="padding:8px 16px 8px 0;color:#475569;font-size:14px;white-space:nowrap;vertical-align:top;">${label}</td>
            <td style="padding:8px 0;color:#1a1d21;font-size:14px;">${value}</td>
        </tr>`
    ).join('');

    const messageBlock = data.message
        ? `<div style="margin-top:24px;padding:16px;background:#f8fafb;border-radius:12px;">
            <div style="font-size:12px;color:#475569;margin-bottom:8px;">Message</div>
            <div style="font-size:14px;color:#1a1d21;line-height:1.6;">${data.message.replace(/\n/g, '<br/>')}</div>
           </div>`
        : '';

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
        <!-- Logo -->
        <tr><td style="padding:32px 40px 24px;text-align:center;">
          <img src="${LOGO_URL}" alt="Coach Voice" width="180" style="display:inline-block;"/>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#e5e7eb;"></div></td></tr>
        <!-- Content -->
        <tr><td style="padding:32px 40px;">
          <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1a1d21;">New Booking Request</h1>
          <table cellpadding="0" cellspacing="0" width="100%">${rowsHtml}</table>
          ${messageBlock}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;text-align:center;">
          <div style="height:1px;background:#e5e7eb;margin-bottom:24px;"></div>
          <div style="font-size:12px;color:#94a3b8;">Coach Voice — Make coaching communication visible.</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function autoReplyHtml(firstName: string): string {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
        <!-- Logo -->
        <tr><td style="padding:32px 40px 24px;text-align:center;">
          <img src="${LOGO_URL}" alt="Coach Voice" width="180" style="display:inline-block;"/>
        </td></tr>
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#e5e7eb;"></div></td></tr>
        <!-- Content -->
        <tr><td style="padding:32px 40px;">
          <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1a1d21;">Thank you for reaching out.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
            Hi ${firstName},
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
            We've received your inquiry and appreciate your interest in Coach Voice.
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
            Our team will review your request and get back to you within 48 hours to schedule a conversation.
          </p>
          <p style="margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;">
            In the meantime, if you have any questions, feel free to reply directly to this email.
          </p>
          <p style="margin:0;font-size:15px;color:#475569;line-height:1.7;">
            Best,<br/>The Coach Voice Team
          </p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;text-align:center;">
          <div style="height:1px;background:#e5e7eb;margin-bottom:24px;"></div>
          <div style="font-size:12px;color:#94a3b8;">Coach Voice — Make coaching communication visible.</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px;">
            <a href="https://coachvoice.ai" style="color:#3f857e;text-decoration:none;">coachvoice.ai</a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, company, phone, jobTitle, message, packageType } = body;

        // Server-side validation
        if (!firstName?.trim() || !lastName?.trim() || !company?.trim() || !packageType) {
            return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 });
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        if (isPersonalEmail(email)) {
            return NextResponse.json({
                error: 'Coach Voice is designed for sports organizations. Please use your club or organization email to get started.',
            }, { status: 422 });
        }

        const data: BookingRequest = { firstName, lastName, email, company, phone, jobTitle, message, packageType };

        const resend = getResend();

        // Send both emails in parallel
        const [notifResult, replyResult] = await Promise.allSettled([
            // 1. Notification to team
            resend.emails.send({
                from: FROM_EMAIL,
                to: [TEAM_EMAIL],
                replyTo: email,
                subject: `New inquiry from ${firstName} ${lastName} at ${company}`,
                html: notificationHtml(data),
            }),
            // 2. Auto-reply to user
            resend.emails.send({
                from: FROM_EMAIL,
                to: [email],
                replyTo: TEAM_EMAIL,
                subject: `Thank you, ${firstName}. We'll be in touch soon.`,
                html: autoReplyHtml(firstName),
            }),
        ]);

        // Log failures but don't fail the request if auto-reply fails
        if (notifResult.status === 'rejected') {
            console.error('Failed to send notification email:', notifResult.reason);
            return NextResponse.json({ error: 'Failed to send your request. Please try again.' }, { status: 500 });
        }

        if (replyResult.status === 'rejected') {
            console.error('Failed to send auto-reply:', replyResult.reason);
            // Don't fail — the team got the notification
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Book API error:', error);
        return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
