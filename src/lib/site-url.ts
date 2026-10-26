/** Evaluated at build time; set NEXT_PUBLIC_SITE_URL before the deployment build. */
export function siteUrl(): string | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  let url: URL;
  try { url = new URL(value); } catch { throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a website origin without a path, credentials, query or fragment.');
  }
  if (url.hostname === 'example.com' || url.hostname.endsWith('.example.com')) return undefined;
  return url.origin;
}
