export function getUrl() {
  if (process.env.NEXTAUTH_URL == "${VERCEL_URL}") {
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  }
  return process.env.NEXTAUTH_URL;
}
