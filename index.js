const express = require('express');

const app     = express();
const PORT    = process.env.PORT    || 3000;
const API_URL = process.env.API_URL || 'http://localhost:8080';

// ─── Health ──────────────────────────────────────────────────────────────────

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ─── Frontend ─────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fooshika Frontend</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      background: #0d0d14;
      color: #e2e2f0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      padding: 2rem;
    }

    .card {
      background: #16161f;
      border: 1px solid #26263a;
      border-radius: 18px;
      padding: 2.5rem 3rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 12px 48px rgba(0,0,0,0.5);
    }

    .logo {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #fff;
      margin-bottom: 0.3rem;
    }
    .logo span { color: #7c6dfa; }

    .tagline {
      color: #6666882;
      font-size: 0.88rem;
      color: #66668a;
      margin-bottom: 2rem;
    }

    button {
      width: 100%;
      padding: 0.85rem 1.5rem;
      background: #7c6dfa;
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
    }
    button:hover  { background: #9183fb; }
    button:active { transform: scale(0.97); }
    button:disabled { background: #3a3a52; color: #66668a; cursor: not-allowed; }

    .result {
      margin-top: 1.2rem;
      min-height: 2.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      border-radius: 8px;
      padding: 0.6rem 1rem;
      transition: background 0.2s;
    }
    .result.ok    { background: #16301e; color: #4ade80; }
    .result.error { background: #2d1414; color: #f87171; }
    .result.idle  { color: #44445a; }

    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: currentColor;
      animation: blink 1.2s ease-in-out infinite;
    }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

    .api-info {
      margin-top: 1.6rem;
      font-size: 0.75rem;
      color: #44445a;
    }
    .api-info a { color: #7c6dfa; text-decoration: none; }
    .api-info a:hover { text-decoration: underline; }

    footer {
      font-size: 0.75rem;
      color: #33334a;
    }
  </style>
</head>
<body>

  <div class="card">
    <div class="logo">Fooshi<span>ka</span></div>
    <p class="tagline">Frontend — Node.js / Express</p>

    <button id="btn" onclick="checkHealth()">
      Ping backend /health
    </button>

    <div class="result idle" id="result">
      En attente du premier ping…
    </div>

    <p class="api-info">
      Backend cible :
      <a href="${API_URL}" target="_blank" rel="noopener">${API_URL}</a>
    </p>
  </div>

  <footer>PORT ${PORT} &nbsp;·&nbsp; Node.js</footer>

  <script>
    const API_URL = "${API_URL}";

    async function checkHealth() {
      const btn    = document.getElementById('btn');
      const result = document.getElementById('result');

      btn.disabled = true;
      btn.textContent = 'Ping en cours…';
      result.className = 'result idle';
      result.innerHTML = '<span class="dot"></span> Appel vers ' + API_URL + '/health…';

      try {
        const t0  = Date.now();
        const res = await fetch(API_URL + '/health');
        const ms  = Date.now() - t0;

        if (!res.ok) throw new Error('HTTP ' + res.status);

        const data = await res.json();
        result.className = 'result ok';
        result.innerHTML =
          '<span class="dot"></span> ' +
          JSON.stringify(data) + ' — ' + ms + ' ms';
      } catch (err) {
        result.className = 'result error';
        result.innerHTML = '✖ ' + err.message;
      } finally {
        btn.disabled = false;
        btn.textContent = 'Ping backend /health';
      }
    }
  </script>

</body>
</html>`);
});

// ─── 404 ─────────────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fooshika Frontend listening on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Backend API → ${API_URL}`);
});