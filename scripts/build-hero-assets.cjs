const sharp = require("sharp");
const fs = require("fs");
const src = "public/images/kevinimg.png";
(async () => {
  const meta = await sharp(src).metadata();
  console.log(meta);
  const b = await sharp(src).stats();
  console.log("dominant", b.dominant);
  // quantize palette from 96px raw
  const { data, info } = await sharp(src).resize(96, 96, { fit: "inside" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = [];
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    const r = data[i], g = data[i + 1], bl = data[i + 2];
    if (a < 200) continue;
    // skip near-white background
    if (r > 244 && g > 240 && bl > 236) continue;
    px.push([r, g, bl]);
  }
  const k = 5;
  let centers = Array.from({ length: k }, (_, i) => px[Math.floor((i + 0.5) * px.length / k)]);
  for (let iter = 0; iter < 12; iter++) {
    const sums = Array.from({ length: k }, () => [0, 0, 0, 0]);
    for (const p of px) {
      let best = 0, bd = Infinity;
      for (let c = 0; c < k; c++) {
        const d = (p[0]-centers[c][0])**2 + (p[1]-centers[c][1])**2 + (p[2]-centers[c][2])**2;
        if (d < bd) { bd = d; best = c; }
      }
      sums[best][0]+=p[0]; sums[best][1]+=p[1]; sums[best][2]+=p[2]; sums[best][3]++;
    }
    centers = sums.map((s, i) => s[3] ? [s[0]/s[3], s[1]/s[3], s[2]/s[3]] : centers[i]);
  }
  const hex = (c) => "#" + c.map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
  console.log("palette", centers.map(hex));
  await sharp(src).resize({ height: 1156, kernel: "lanczos3" }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile("public/images/hero-kevin.webp");
  await sharp(src).resize({ height: 578, kernel: "lanczos3" }).webp({ quality: 86, alphaQuality: 100, effort: 6 }).toFile("public/images/hero-kevin-sm.webp");
  for (const f of ["public/images/hero-kevin.webp", "public/images/hero-kevin-sm.webp"]) {
    const s = fs.statSync(f).size;
    console.log(f, s, "bytes");
  }
})().catch((e) => { console.error(e); process.exit(1); });
