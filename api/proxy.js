export default async (req, res) => {
  const targetUrl = req.query.url;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://community.wideiptv.top/',
        'Origin': 'https://community.wideiptv.top/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
