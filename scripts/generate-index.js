const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zynthra — Sovereign AI Platform</title>
  <meta name="description" content="Unified AI + cloud platform for enterprise-grade automation">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
  <link rel="stylesheet" href="/assets/styles-DJZu-Rr1.css">
</head>
<body>
  <div id="root" style="min-height:100vh;display:grid;place-items:center;background:#0a0a0f;color:#fff;font-family:system-ui">
    <div style="text-align:center;padding:2rem">
      <h1 style="font-size:2rem;margin-bottom:1rem">Zynthra</h1>
      <p style="color:#888">Loading...</p>
      <div style="margin-top:1rem;width:48px;height:48px;border:4px solid #00f5ff;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin:1rem auto"></div>
    </div>
  </div>
  <script type="module" src="/assets/index-DmK8sF26.js"></script>
  <style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0a0f}@keyframes spin{to{transform:rotate(360deg)}}</style>
</body>
</html>`;

const redirects = `/* /index.html 200`;

const distPath = path.join(__dirname, 'dist', 'client');
const indexPath = path.join(distPath, 'index.html');
const redirectsPath = path.join(distPath, '_redirects');

try {
  fs.writeFileSync(indexPath, html);
  fs.writeFileSync(redirectsPath, redirects);
  console.log('Created index.html');
  console.log('Created _redirects');
} catch(e) {
  console.log('Error:', e.message);
}