// Permanently send visitors (and Google) from the old Cloudflare Pages
// address to the real domain, keeping the same page and query string.
// Preview deployments like abc123.shanelfoods.pages.dev are left alone.
const OLD_HOST = 'shanelfoods.pages.dev';
const NEW_ORIGIN = 'https://shanelfoods.com';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === OLD_HOST) {
    return Response.redirect(NEW_ORIGIN + url.pathname + url.search, 301);
  }
  return next();
}
