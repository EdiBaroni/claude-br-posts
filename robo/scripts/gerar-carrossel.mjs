// Gera o carrossel de um post de notícia e confere cada slide.
//
// Uso:  node robo/scripts/gerar-carrossel.mjs noticias/AAAA-MM-DD [--recapturar]
//
// O que faz, na ordem:
//   1. confere o post.json e a legenda.txt (formato, limites, crédito);
//   2. baixa as imagens oficiais listadas em "telas" (só de sites da Anthropic);
//   3. escreve o post.js que o modelo/carrossel.html entende;
//   4. tira uma foto de cada slide (1080x1350) e confere: imagem que não carregou,
//      fonte que faltou, texto invadindo o rodapé ou saindo pela lateral;
//   5. monta a folha de miniaturas (folha.png);
//   6. grava tudo o que achou em conferencia.txt.
// Sai com código 1 se achar qualquer problema. Problema achado é problema: corrija e rode de novo.

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { validarPost, validarLegenda, dominioOficial } from "./regras.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// Servidor local temporário: o navegador não carrega fontes de páginas abertas como arquivo.
const TIPOS_MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json" };
const servidor = http.createServer((req, res) => {
  const alvo = path.join(RAIZ, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!alvo.startsWith(RAIZ) || !fs.existsSync(alvo) || fs.statSync(alvo).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TIPOS_MIME[path.extname(alvo)] || "application/octet-stream", "Cache-Control": "no-store" });
  fs.createReadStream(alvo).pipe(res);
});
await new Promise(ok => servidor.listen(0, "127.0.0.1", ok));
const BASE = `http://127.0.0.1:${servidor.address().port}`;
const W = 1080, H = 1350;
const LIMITE_RODAPE = 1235; // abaixo disso começa a faixa do rodapé "@claude.anthropic.br · traduzido de @claudeai"

const args = process.argv.slice(2);
const recapturar = args.includes("--recapturar");
const pastaRel = (args.find(a => !a.startsWith("--")) || "").replace(/\\/g, "/").replace(/\/$/, "");
if (!/^noticias\/\d{4}-\d{2}-\d{2}$/.test(pastaRel)) {
  console.error("Uso: node robo/scripts/gerar-carrossel.mjs noticias/AAAA-MM-DD");
  process.exit(2);
}
const pasta = path.join(RAIZ, pastaRel);
const problemas = [];
const avisos = [];

// 1. post.json e legenda.txt
const post = JSON.parse(fs.readFileSync(path.join(pasta, "post.json"), "utf8"));
problemas.push(...validarPost(post));
const legendaArq = path.join(pasta, "legenda.txt");
if (!fs.existsSync(legendaArq)) problemas.push("Falta a legenda.txt.");
else problemas.push(...validarLegenda(fs.readFileSync(legendaArq, "utf8")));

let chromium;
try { ({ chromium } = await import("playwright")); }
catch { console.error("Falta o Playwright. Rode: npm install && npx playwright install chromium"); process.exit(2); }

async function abrirNavegador() {
  const opcoes = { args: ["--disable-gpu"] };
  try { return await chromium.launch(opcoes); }
  catch (e1) {
    try { return await chromium.launch({ ...opcoes, channel: "chrome" }); }
    catch { throw e1; }
  }
}
const navegador = await abrirNavegador();

// 2. imagens oficiais
fs.mkdirSync(path.join(pasta, "telas"), { recursive: true });
for (const [nome, t] of Object.entries(post.telas || {})) {
  const destino = path.join(pasta, "telas", `${nome}.png`);
  if (fs.existsSync(destino) && !recapturar) continue;
  if (t.arquivo) { if (!fs.existsSync(destino)) problemas.push(`Tela "${nome}": arquivo telas/${nome}.png não existe.`); continue; }
  if (!t.url || !dominioOficial(t.url)) { problemas.push(`Tela "${nome}": endereço fora dos sites oficiais da Anthropic (${t.url}).`); continue; }
  try {
    const pagina = await navegador.newPage({ viewport: { width: t.largura || 1280, height: t.altura || 900 }, deviceScaleFactor: 2 });
    await pagina.goto(t.url, { waitUntil: "networkidle", timeout: 45000 });
    // Tira avisos de cookies: recusa quando houver botão; senão esconde a caixa fixa.
    const recusar = pagina.getByRole("button", { name: /reject all|recusar|decline|rejeitar/i }).first();
    if (await recusar.isVisible().catch(() => false)) { await recusar.click().catch(() => {}); await pagina.waitForTimeout(800); }
    await pagina.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const st = getComputedStyle(el);
        if ((st.position === "fixed" || st.position === "sticky") && /cookie/i.test(el.textContent || "") && el.textContent.length < 2000) el.remove();
      }
    });
    if (t.modo === "og") {
      const og = await pagina.evaluate(() => document.querySelector('meta[property="og:image"]')?.content || "");
      if (!og) throw new Error("a página não tem imagem de destaque (og:image)");
      const r = await fetch(new URL(og, t.url));
      if (!r.ok) throw new Error(`imagem de destaque respondeu ${r.status}`);
      const foto = await navegador.newPage({ viewport: { width: 1600, height: 1000 } });
      await foto.setContent(`<body style="margin:0;background:#fff"><img id="i" src="data:${r.headers.get("content-type") || "image/png"};base64,${Buffer.from(await r.arrayBuffer()).toString("base64")}"></body>`);
      await foto.locator("#i").screenshot({ path: destino });
      await foto.close();
    } else if (t.seletor) {
      await pagina.locator(t.seletor).first().screenshot({ path: destino });
    } else {
      await pagina.screenshot({ path: destino });
    }
    await pagina.close();
    avisos.push(`Tela "${nome}" capturada de ${t.url}. Abra a imagem e confira: sem foto de pessoa real, sem aviso de cookies.`);
  } catch (e) {
    problemas.push(`Tela "${nome}": não consegui capturar ${t.url} (${e.message.split("\n")[0]}).`);
  }
}

// 3. post.js
const D = JSON.stringify({ bg: post.bg || "#faf9f5", slides: post.slides }, null, 2);
fs.writeFileSync(path.join(pasta, "post.js"),
  `// Gerado por robo/scripts/gerar-carrossel.mjs a partir do post.json. Não edite à mão.\nconst D = ${D};\nconst POST = { bg: D.bg, slides: D.slides.map(K.nx) };\n`);

// 4. slides
for (const f of fs.readdirSync(pasta)) if (/^slide-\d+\.png$/.test(f)) fs.rmSync(path.join(pasta, f));
const modelo = `${BASE}/modelo/carrossel.html`;
const total = post.slides.length;
const pagina = await navegador.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errosJs = [];
pagina.on("pageerror", e => errosJs.push(e.message));
for (let n = 1; n <= total; n++) {
  errosJs.length = 0;
  await pagina.goto(`${modelo}?p=../${pastaRel}/&n=${n}`, { waitUntil: "load" });
  await pagina.waitForFunction(() => document.getElementById("app").innerHTML.length > 0, null, { timeout: 15000 }).catch(() => {});
  const r = await pagina.evaluate(async (limite) => {
    await document.fonts.ready;
    const imgs = [...document.querySelectorAll("#app img")];
    await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(ok => { i.onload = i.onerror = ok; })));
    const out = [];
    for (const i of imgs) if (!i.naturalWidth) out.push(`imagem não carregou (${decodeURIComponent(i.getAttribute("src"))})`);
    for (const f of ['500 40px "Source Serif 4"', '400 40px "DM Sans"', '600 40px "DM Sans"'])
      if (!(await document.fonts.load(f, "Ação")).length || !document.fonts.check(f, "Ação")) out.push(`fonte não carregou (${f})`);
    const app = document.getElementById("app");
    if (!app.innerHTML.trim()) out.push("slide vazio");
    if (/Tipo de slide desconhecido/.test(app.textContent)) out.push(app.textContent.trim());
    for (const el of app.querySelectorAll("*")) {
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      const temTexto = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (!temTexto && el.tagName !== "IMG") continue;
      const nome = el.tagName === "IMG" ? "imagem" : `"${el.textContent.trim().slice(0, 40)}"`;
      if (b.bottom > limite) out.push(`${nome} invade o rodapé (termina em ${Math.round(b.bottom)}px, limite ${limite}px)`);
      if (b.right > 1081 || b.left < -1) out.push(`${nome} sai pela lateral`);
      if (el.tagName !== "IMG" && el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== "visible") out.push(`${nome} está cortado`);
    }
    return [...new Set(out)];
  }, LIMITE_RODAPE);
  for (const e of errosJs) r.push(`erro no modelo: ${e}`);
  for (const p of r) problemas.push(`Slide ${n}: ${p}`);
  await pagina.screenshot({ path: path.join(pasta, `slide-${n}.png`) });
}

// 5. folha de miniaturas
const folhaHtml = path.join(pasta, "_folha.html");
const colunas = Math.min(total, 5);
fs.writeFileSync(folhaHtml, `<!doctype html><body style="margin:0;padding:24px;background:#e9e6df;display:grid;grid-template-columns:repeat(${colunas},270px);gap:18px;width:max-content">
${post.slides.map((_, i) => `<figure style="margin:0;font:600 16px sans-serif;color:#444"><img src="slide-${i + 1}.png" style="width:270px;height:337px;display:block;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.15)"><figcaption style="padding-top:6px">${i + 1}/${total}</figcaption></figure>`).join("")}</body>`);
const folha = await navegador.newPage({ viewport: { width: 400, height: 400 } });
await folha.goto(`${BASE}/${pastaRel}/_folha.html`, { waitUntil: "load" });
await folha.screenshot({ path: path.join(pasta, "folha.png"), fullPage: true });
fs.rmSync(folhaHtml);
await navegador.close();
servidor.close();

// 6. relatório
const linhas = [
  `Conferência de ${pastaRel} — ${new Date().toISOString()}`,
  `Slides gerados: ${total}`,
  problemas.length ? `PROBLEMAS (${problemas.length}):` : "Nenhum problema encontrado.",
  ...problemas.map(p => `  - ${p}`),
  ...(avisos.length ? ["Avisos:", ...avisos.map(a => `  - ${a}`)] : [])
];
fs.writeFileSync(path.join(pasta, "conferencia.txt"), linhas.join("\n") + "\n");
console.log(linhas.join("\n"));
process.exit(problemas.length ? 1 : 0);
