/**
 * Brand asset pipeline.
 *
 * Takes the client's original logo (assets/source/logo-original.png) and produces:
 *  - public/brand/logo.webp / logo.png   transparent, trimmed logo (proportions untouched)
 *  - src/app/icon.png / apple-icon.png   favicons generated from the logo
 *  - public/brand/og-image.jpg           1200x630 social sharing image
 *
 * The white background is removed with an edge flood fill, so white areas INSIDE
 * the logo (lettering, highlights) are preserved. Colours are never altered.
 *
 * Re-run after replacing the source logo:  npm run assets
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets/source/logo-original.png";
const WHITE = 232; // channel threshold treated as "background white"

async function transparentLogo() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const isBg = (i) => data[i] >= WHITE && data[i + 1] >= WHITE && data[i + 2] >= WHITE;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop();
    if (seen[p]) continue;
    seen[p] = 1;
    if (!isBg(p * 4)) continue;
    data[p * 4 + 3] = 0;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  // Soften the anti-aliased fringe: near-white pixels touching the removed area get partial alpha.
  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    if (data[i + 3] === 0) continue;
    const x = p % w, y = (p / w) | 0;
    const touches =
      (x > 0 && data[i - 4 + 3] === 0) || (x < w - 1 && data[i + 4 + 3] === 0) ||
      (y > 0 && data[i - w * 4 + 3] === 0) || (y < h - 1 && data[i + w * 4 + 3] === 0);
    if (!touches) continue;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum > 170) data[i + 3] = Math.round(255 * (1 - (lum - 170) / 85));
  }
  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer().then((b) => sharp(b).trim().png().toBuffer());
}

await mkdir("public/brand", { recursive: true });
const logo = await transparentLogo();
const meta = await sharp(logo).metadata();
console.log(`trimmed logo: ${meta.width}x${meta.height}`);

await sharp(logo).resize({ width: 640 }).webp({ quality: 90, alphaQuality: 95 }).toFile("public/brand/logo.webp");
await sharp(logo).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile("public/brand/logo.png");
await sharp(logo).resize({ width: 220 }).webp({ quality: 90 }).toFile("public/brand/logo-sm.webp");

// Favicons: logo centred on a square dark tile so it reads at 16-32px.
const square = async (size, pad) => {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(logo).resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { r: 11, g: 13, b: 12, alpha: 1 } } })
    .composite([{ input: mark, gravity: "center" }]).png({ palette: true, quality: 90, compressionLevel: 9 });
};
await (await square(192, 0.04)).toFile("src/app/icon.png");
await (await square(180, 0.06)).toFile("src/app/apple-icon.png");
await (await square(192, 0.04)).toFile("public/brand/icon-192.png");
await (await square(512, 0.04)).toFile("public/brand/icon-512.png");

// Open Graph image
const ogLogo = await sharp(logo).resize({ height: 470 }).toBuffer();
const ogBg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="30%" cy="50%" r="70%"><stop offset="0" stop-color="#1b3d1f"/><stop offset=".55" stop-color="#0d110e"/><stop offset="1" stop-color="#070807"/></radialGradient>
    <pattern id="c" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="14" fill="#ffffff" opacity=".025"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#c)"/>
  <rect x="0" y="600" width="1200" height="30" fill="#3ddc4a"/>
  <text x="590" y="215" fill="#ffffff" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44">One-Stop Auto Repair</text>
  <text x="590" y="280" fill="#3ddc4a" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="44">&amp; Advanced Services</text>
  <text x="590" y="360" fill="#d6dbd7" font-family="Arial, sans-serif" font-size="26">B-17 Islamabad · Serving Islamabad &amp; Rawalpindi</text>
  <text x="590" y="420" fill="#d6dbd7" font-family="Arial, sans-serif" font-size="26">WhatsApp 0333-4548008</text>
</svg>`);
await sharp(ogBg).composite([{ input: ogLogo, left: 70, top: 70 }]).jpeg({ quality: 86, mozjpeg: true }).toFile("public/brand/og-image.jpg");

console.log("brand assets written");
