export function formatInTz(isoUtc: string, timeZone: string, locale = 'en-US') {
    return new Date(isoUtc).toLocaleString(locale, {
      timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }