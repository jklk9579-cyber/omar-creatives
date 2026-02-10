// OAuth initiator — redirects to GitHub with 'repo' scope so CMS can publish
export default async (req) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response("GITHUB_OAUTH_CLIENT_ID env var is missing", { status: 500 });
  }

  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/.netlify/functions/callback`;
  const scope = "repo,user";
  const state = Math.random().toString(36).substring(2);

  const githubAuthUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${scope}` +
    `&state=${state}`;

  return new Response(null, {
    status: 302,
    headers: { Location: githubAuthUrl },
  });
};
