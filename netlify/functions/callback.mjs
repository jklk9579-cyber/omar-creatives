// OAuth callback — exchanges code for token and sends it to Decap CMS via postMessage
export default async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const provider = "github";

  if (!code) {
    return new Response(errorPage("No code parameter received from GitHub"), {
      status: 400,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return new Response(errorPage(data.error_description || data.error), {
        status: 400,
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    const token = data.access_token;
    const content = JSON.stringify({ token, provider });

    return new Response(successPage(provider, content), {
      status: 200,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  } catch (err) {
    return new Response(errorPage(err.message), {
      status: 500,
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }
};

function successPage(provider, content) {
  return `<!DOCTYPE html>
<html>
<head><title>Authorized</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:40px;">Authorizing with GitHub&hellip;</p>
<script>
(function() {
  function sendMessage(provider, content) {
    window.opener.postMessage(
      "authorization:" + provider + ":success:" + content,
      document.referrer || window.opener.location.origin
    );
  }
  function receiveMessage(e) {
    console.log("receiveMessage %o", e);
    if (e.data === "authorizing:${provider}") {
      sendMessage("${provider}", '${content}');
      window.removeEventListener("message", receiveMessage, false);
    }
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:${provider}", "*");
})();
</script>
</body>
</html>`;
}

function errorPage(message) {
  return `<!DOCTYPE html>
<html>
<head><title>Auth Error</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:40px;color:#e53e3e;">
  OAuth Error: ${message}
</p>
<script>
(function() {
  window.addEventListener("message", function(e) {
    window.opener.postMessage(
      'authorization:github:error:' + JSON.stringify({message: "${message}"}),
      e.origin
    );
  }, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;
}
