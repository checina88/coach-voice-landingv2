/** Personal/free email domains that are not allowed for booking requests. */
export const BLOCKED_DOMAINS = new Set([
    // Google
    'gmail.com', 'googlemail.com',
    // Microsoft
    'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de',
    'outlook.com', 'outlook.co.uk', 'live.com', 'msn.com',
    // Yahoo
    'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de',
    // Apple
    'icloud.com', 'me.com', 'mac.com',
    // Other global
    'aol.com', 'protonmail.com', 'proton.me', 'mail.com',
    'zoho.com', 'yandex.com', 'yandex.ru', 'gmx.com', 'gmx.de',
    'web.de', 't-online.de',
    // Polish
    'wp.pl', 'onet.pl', 'o2.pl', 'interia.pl', 'gazeta.pl', 'poczta.fm',
]);

/** Returns true if the email belongs to a blocked personal domain. */
export function isPersonalEmail(email: string): boolean {
    const domain = email.trim().toLowerCase().split('@')[1];
    if (!domain) return false;
    return BLOCKED_DOMAINS.has(domain);
}

/** Basic email format check. */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
