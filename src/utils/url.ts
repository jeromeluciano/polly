export function getUrl() {
  if (process.env.NEXTAUTH_URL == "${VERCEL_URL}") {
    return process.env.URL_VERCEL;
  }
  return process.env.NEXTAUTH_URL;
}
