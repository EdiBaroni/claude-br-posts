// Monta o vídeo "Melhorias nos apps do Claude" em português, sem a pessoa.
// Uso: node montar.mjs   (rodar dentro da pasta v2; a voz já gerada em voz/)
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";

const AQUI = path.resolve(".");
const VIDEO = path.resolve("..");
const require = createRequire(path.join(VIDEO, "package.json"));
const FF = require("ffmpeg-static");
const FP = require("ffprobe-static").path;
const { chromium } = createRequire(path.resolve("../../claude-br-posts/package.json"))("playwright");
const ORIGEM = "C:/Users/edilaneelb/Downloads/snapinsta-1794251004167.mp4";
const FONTES = path.resolve("../../claude-br-posts/modelo/fontes");
const ff = (...a) => execFileSync(FF, ["-v", "error", "-y", ...a], { stdio: ["ignore", "inherit", "inherit"] });
const dur = f => Number(execFileSync(FP, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], { encoding: "utf8" }));
const CREME = "0xf9f7f3", ESCURO = "0x131313";
fs.mkdirSync("camadas", { recursive: true }); fs.mkdirSync("blocos", { recursive: true });

// 1. Base: recorte 720x900 do topo, cobrindo a pessoa e a legenda em inglês
const faixasDivididas = [[1.3, 3.2], [7.3, 17.6], [21.4, 27.7], [56.4, 58.7], [64.3, 68.45]];
const entre = r => `between(t,${r[0]},${r[1]})`;
const caixas = [
  `drawbox=x=0:y=840:w=720:h=60:color=${CREME}:t=fill:enable='not(between(t,38.9,46.8))'`,
  `drawbox=x=0:y=840:w=720:h=60:color=${ESCURO}:t=fill:enable='between(t,38.9,46.8)'`,
  ...faixasDivididas.map(r => `drawbox=x=0:y=590:w=720:h=310:color=${CREME}:t=fill:enable='${entre(r)}'`),
  `drawbox=x=0:y=500:w=720:h=400:color=${ESCURO}:t=fill:enable='between(t,42.8,45.7)'`
];
if (!fs.existsSync("base.mp4"))
  ff("-i", ORIGEM, "-an", "-vf", `crop=720:900:0:0,${caixas.join(",")},scale=1080:1350:flags=lanczos,setsar=1,fps=30`, "-c:v", "libx264", "-crf", "14", "-preset", "fast", "base.mp4");

// 2. Voz: tira o silêncio das pontas e mede
const roteiro = JSON.parse(fs.readFileSync("roteiro.json", "utf8"));
const falas = {};
for (const l of roteiro) {
  const ent = `voz/l${String(l.id).padStart(2, "0")}.wav`, sai = `voz/c${String(l.id).padStart(2, "0")}.wav`;
  ff("-i", ent, "-af", "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,aresample=48000", "-ac", "2", sai);
  falas[l.id] = { arq: sai, d: dur(sai), texto: l.legenda || l.texto };
}

// 3. Blocos: trecho do vídeo original de cada fala (a última imagem fica parada se a fala for mais longa)
const blocos = [
  { id: 1, a: 0.0, b: 3.0 }, { id: 2, a: 3.0, b: 5.9 }, { id: 3, a: 6.0, b: 11.8 },
  { id: 4, a: 12.4, b: 17.1, titulos: [["melhorias", 0, 3.9], ["melhorias-busca", 3.9, 99]] },
  { id: 5, a: 21.9, b: 27.6, titulos: [["contas", 0, 99]] },
  { id: 6, a: 28.4, b: 34.0, titulos: [["notebook-rotulo", 0.1, 3.8], ["notebook", 3.8, 99]] },
  { id: 7, a: 37.1, b: 38.1, titulos: [["voz", 0, 99]] },
  { id: 8, a: 38.75, b: 45.6 }, { id: 9, a: 50.2, b: 54.3, titulos: [["idiomas", 2.5, 99]] },
  { id: 10, a: 57.1, b: 64.2 }, { id: 11, a: 64.2, b: 70.4, titulos: [["dica-dividida", 0.35, 3.95], ["dica", 3.95, 99]] },
  { id: 12, final: true }
];

// 4. Camadas em PNG (1080x1350, fundo transparente)
const css = `<link href="fontes/fontes.css" rel="stylesheet"><style>
  html,body{margin:0;width:1080px;height:1350px;background:transparent;overflow:hidden;font-family:"DM Sans",sans-serif;color:#1f1e1d}
  .a{position:absolute}.s{font-family:"Source Serif 4",serif;font-weight:400;letter-spacing:-.02em}
  .dot::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;background:#d97757;margin-right:12px;vertical-align:middle}
  .chip{display:inline-block;background:#efece6;border-radius:40px;padding:10px 26px;font-size:32px;margin:0 6px}
  .leg{position:absolute;left:70px;right:70px;bottom:78px;text-align:center}
  .leg span{display:inline-block;background:rgba(31,30,29,.86);color:#fff;border-radius:16px;padding:12px 24px;font-size:36px;line-height:1.28;font-weight:500}
  .rod{position:absolute;left:0;right:0;bottom:22px;text-align:center}
  .rod span{display:inline-block;background:rgba(249,247,243,.92);border-radius:20px;padding:4px 16px;font-size:23px;font-weight:600;color:#55534d}
</style>`;
const C = "#f9f7f3", E = "#131313";
const camadas = {
  melhorias: `<div class="a" style="left:60px;top:270px;width:960px;height:495px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:282px;text-align:center;font-size:30px;color:#6b6862"><span class="dot"></span>Apps do Claude</div>
    <div class="a s" style="left:0;right:0;top:335px;text-align:center;font-size:96px;line-height:1.0">Melhorias nos<br>apps do Claude</div>
    <div class="a" style="left:0;right:0;top:582px;text-align:center"><span class="chip">iPhone Duo</span><span class="chip">iPhone</span><span class="chip">iPad</span><span class="chip">Android</span></div>
    <div class="a" style="left:0;right:0;top:672px;text-align:center"><span class="chip">Modo de voz</span><span class="chip">Idiomas</span>__BUSCA__</div>`,
  contas: `<div class="a" style="left:160px;top:240px;width:700px;height:248px;background:${C}"></div>
    <div class="a" style="left:186px;top:258px;font-size:26px;color:#6b6862"><span class="dot"></span>iPhone e Android</div>
    <div class="a s" style="left:184px;top:302px;font-size:72px;line-height:1.02">Conectado em<br>várias contas</div>`,
  "notebook-rotulo": `<div class="a" style="left:60px;top:1012px;width:960px;height:58px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:1020px;text-align:center;font-size:26px;color:#6b6862"><span class="dot"></span>Android · Chromebooks e dobráveis</div>`,
  notebook: `<div class="a" style="left:60px;top:1012px;width:960px;height:190px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:1020px;text-align:center;font-size:26px;color:#6b6862"><span class="dot"></span>Android · Chromebooks e dobráveis</div>
    <div class="a s" style="left:0;right:0;top:1066px;text-align:center;font-size:78px;line-height:1.05">Funciona como app de notebook</div>`,
  voz: `<div class="a" style="left:112px;top:388px;width:850px;height:262px;background:${E}"></div>
    <div class="a" style="left:142px;top:404px;font-size:27px;color:#d9d6cf"><span class="dot"></span>Modo de voz</div>
    <div class="a s" style="left:140px;top:452px;font-size:74px;line-height:1.05;color:#f9f7f3">Responde antes.<br>Ouve você melhor.</div>`,
  idiomas: `<div class="a" style="left:180px;top:972px;width:720px;height:110px;background:${C}"></div>
    <div class="a s" style="left:0;right:0;top:982px;text-align:center;font-size:64px;line-height:1.1">idiomas a mais</div>`,
  "dica-dividida": `<div class="a" style="left:120px;top:296px;width:840px;height:265px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:310px;text-align:center;font-size:30px;color:#6b6862"><span class="dot"></span>Dica</div>
    <div class="a s" style="left:0;right:0;top:362px;text-align:center;font-size:74px;line-height:1.05">Já disponível na web<br>e no computador</div>`,
  dica: `<div class="a" style="left:60px;top:290px;width:960px;height:413px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:392px;text-align:center;font-size:32px;color:#6b6862"><span class="dot"></span>Dica</div>
    <div class="a s" style="left:0;right:0;top:450px;text-align:center;font-size:90px;line-height:1.05">Já disponível na web<br>e no computador</div>
    <div class="a" style="left:300px;top:1072px;width:480px;height:76px;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:1086px;text-align:center;font-size:34px;color:#6b6862">No Mac</div>`,
  rodape: `<div class="rod"><span>@claude.anthropic.br · traduzido de @claudeai</span></div>`,
  final: `<div class="a" style="inset:0;background:${C}"></div>
    <div class="a" style="left:0;right:0;top:470px;text-align:center"><span style="font-family:'Source Serif 4',serif;font-size:60px;color:#d97757">✳</span></div>
    <div class="a s" style="left:90px;right:90px;top:570px;text-align:center;font-size:92px;line-height:1.06">Qual dessas novidades você quer testar primeiro?</div>
    <div class="a" style="left:0;right:0;top:880px;text-align:center;font-size:38px;color:#4a4843">Conta nos comentários!</div>
    <div class="a" style="left:0;right:0;top:960px;text-align:center;font-size:30px;color:#4a4843">Fonte: Anthropic (@claudeai)</div>`
};
camadas["melhorias-busca"] = camadas.melhorias.replace("__BUSCA__", `<span class="chip" style="background:transparent;border:2px dashed #bdb9b0">Busca <span style="font-size:24px;color:#8a867e">em breve</span></span>`);
camadas.melhorias = camadas.melhorias.replace("__BUSCA__", "");

// Legendas: divide cada fala em pedaços curtos, com tempo proporcional ao tamanho
function pedacos(texto) {
  const partes = texto.split(/(?<=[,:.!?])\s+/); const out = [];
  for (const p of partes) {
    if (p.length <= 46) { out.push(p); continue; }
    const pal = p.split(" "); let cur = "";
    for (const w of pal) { if ((cur + " " + w).trim().length > 40) { out.push(cur.trim()); cur = w; } else cur += " " + w; }
    if (cur.trim()) out.push(cur.trim());
  }
  const junt = []; for (const p of out) { if (junt.length && (junt.at(-1) + " " + p).length <= 46 && junt.at(-1).length < 22) junt[junt.length - 1] += " " + p; else junt.push(p); }
  return junt;
}

const RAIZ = AQUI; const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".woff2": "font/woff2" };
fs.mkdirSync("camadas/fontes", { recursive: true });
for (const f of fs.readdirSync(FONTES)) fs.copyFileSync(path.join(FONTES, f), path.join("camadas/fontes", f));
const srv = http.createServer((q, r) => { const a = path.join(RAIZ, "camadas", decodeURIComponent(new URL(q.url, "http://x").pathname)); if (!fs.existsSync(a) || fs.statSync(a).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": mime[path.extname(a)] || "application/octet-stream" }); fs.createReadStream(a).pipe(r); });
await new Promise(ok => srv.listen(0, "127.0.0.1", ok));
const nav = await chromium.launch({ channel: "chrome" }).catch(() => chromium.launch());
const pg = await nav.newPage({ viewport: { width: 1080, height: 1350 } });
async function png(nome, corpo) {
  fs.writeFileSync(`camadas/${nome}.html`, `<!doctype html><meta charset="utf-8">${css}<body>${corpo}</body>`);
  await pg.goto(`http://127.0.0.1:${srv.address().port}/${nome}.html`, { waitUntil: "networkidle" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: `camadas/${nome}.png`, omitBackground: true });
}
for (const [n, c] of Object.entries(camadas)) await png(n, c);

// 5. Cada bloco vira um mp4 com áudio
const lista = [];
for (const bl of blocos) {
  const fala = falas[bl.id];
  const T = Math.max(bl.final ? 0 : bl.b - bl.a, fala.d + 0.45);
  const legs = pedacos(fala.texto); const tot = legs.reduce((s, x) => s + x.length, 0);
  let t0 = 0.12; const legTempos = [];
  for (let i = 0; i < legs.length; i++) { const d = fala.d * legs[i].length / tot; legTempos.push([t0, i === legs.length - 1 ? T : t0 + d]); t0 += d; }
  for (let i = 0; i < legs.length; i++) await png(`leg-${bl.id}-${i}`, `<div class="leg"${bl.id === 9 ? ' style="bottom:auto;top:110px"' : ""}><span>${legs[i]}</span></div>`);
  const ent = []; const filtros = [];
  if (bl.final) { ent.push("-loop", "1", "-t", String(T), "-i", "camadas/final.png"); filtros.push(`[0:v]fps=30,format=rgb24,setsar=1[v0]`); }
  else { ent.push("-ss", String(bl.a), "-t", String(bl.b - bl.a), "-i", "base.mp4"); filtros.push(`[0:v]tpad=stop_mode=clone:stop_duration=${(T - (bl.b - bl.a) + 0.1).toFixed(2)},trim=duration=${T.toFixed(2)},setpts=PTS-STARTPTS,format=rgb24[v0]`); }
  let k = 1, atual = "v0";
  const sobre = (img, ini, fim) => { ent.push("-i", img); const prox = `v${k}`; filtros.push(`[${atual}][${k}:v]overlay=0:0:enable='between(t,${ini},${Math.min(fim, T + 1)})'[${prox}]`); atual = prox; k++; };
  for (const [nome, ini, fim] of bl.titulos || []) sobre(`camadas/${nome}.png`, ini, fim);
  legs.forEach((_, i) => sobre(`camadas/leg-${bl.id}-${i}.png`, legTempos[i][0].toFixed(2), legTempos[i][1].toFixed(2)));
  if (!bl.final) sobre("camadas/rodape.png", 0, T + 1);
  ent.push("-i", fala.arq);
  filtros.push(`[${atual}]format=yuv420p[vf]`); atual = "vf";
  filtros.push(`[${k}:a]adelay=120|120,apad,atrim=duration=${T.toFixed(2)}[a]`);
  const sai = `blocos/b${String(bl.id).padStart(2, "0")}.mp4`;
  ff(...ent, "-filter_complex", filtros.join(";"), "-map", `[${atual}]`, "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-preset", "medium", "-pix_fmt", "yuv420p", "-r", "30", "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-t", T.toFixed(2), sai);
  lista.push(`file '${sai}'`);
  console.log(`bloco ${bl.id}: ${T.toFixed(2)}s (fala ${fala.d.toFixed(2)}s) — ${legs.length} legendas`);
}
await nav.close(); srv.close();
fs.writeFileSync("lista.txt", lista.join("\n") + "\n");
ff("-f", "concat", "-safe", "0", "-i", "lista.txt", "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-movflags", "+faststart", "final.mp4");
console.log("final.mp4:", dur("final.mp4").toFixed(2), "s");
