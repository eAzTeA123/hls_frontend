export default async function handler(req, res) {
  const fetch = (await import('node-fetch')).default;
  const url = 'https://key2.keylocking.ru/wmsxx.php?' + new URLSearchParams(req.query).toString();

  try {
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://topembed.pw/',
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('Fehler beim Laden des Keys');
    }

    const arrayBuffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).send('Proxy-Fehler: ' + err.message);
  }
}
