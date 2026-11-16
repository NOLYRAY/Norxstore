import { applyCorsHeaders } from './_pushStore.js';

export default async function handler(req, res) {
  applyCorsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const targetUrl = req.query && req.query.url;
  if (!targetUrl || typeof targetUrl !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing url parameter' });
  }

  let cleanUrl = targetUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  try {
    const parsed = new URL(cleanUrl);
    if (!parsed.hostname.includes('whatsapp.com')) {
      return res.status(400).json({ success: false, error: 'URL harus berupa link saluran whatsapp.com yang valid' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const resp = await fetch(cleanUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    clearTimeout(timeoutId);
    const html = await resp.text();

    let title = '';
    let desc = '';
    let followers = '';

    const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                         html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (ogTitleMatch && ogTitleMatch[1]) {
      const rawT = ogTitleMatch[1].replace(/\|.*$/, '').replace(/- WhatsApp$/i, '').trim();
      if (rawT && rawT !== 'WhatsApp Channel') title = rawT;
    }

    const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    if (ogDescMatch && ogDescMatch[1]) {
      const rawD = ogDescMatch[1].trim();
      if (rawD && !rawD.includes('Follow this WhatsApp Channel')) desc = rawD;
    }

    const followerMatches = [
      /([0-9]+[0-9,.]*\s*(?:[KkMmBb]|rb|jt)?)\s*(?:pengikut|followers|subscribers)/i,
      /"followers_count":\s*([0-9]+)/i,
      /"subscriber_count":\s*([0-9]+)/i,
      /([0-9]+[0-9,.]*\s*[KkMm]?)\s*followers/i
    ];
    for (const rx of followerMatches) {
      const m = html.match(rx);
      if (m && m[1]) {
        followers = m[1].trim();
        break;
      }
    }
    if (!followers && desc) {
      const descMatch = desc.match(/([0-9]+[0-9,.]*\s*(?:[KkMmBb]|rb|jt)?)\s*(?:pengikut|followers)/i);
      if (descMatch && descMatch[1]) followers = descMatch[1].trim();
    }

    const formattedFollowers = followers
      ? ((followers.toLowerCase().includes('pengikut') || followers.toLowerCase().includes('follower')) ? followers : `${followers} Pengikut`)
      : null;

    return res.status(200).json({
      success: true,
      url: cleanUrl,
      title: title || null,
      desc: desc || null,
      followers: formattedFollowers
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: 'Tidak dapat mengambil info otomatis langsung dari WhatsApp.',
      followers: null
    });
  }
}
