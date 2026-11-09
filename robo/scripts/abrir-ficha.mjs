// Workflow abrir-ficha.yml: transforma cada noticias/<dia>/ficha.md novo numa Issue
// atribuída a quem aprova (é a atribuição que manda o e-mail).
import fs from "node:fs";
import { git, gh, issues, criarIssue, garantirRotulos, marcador, REPO } from "./github.mjs";

const sha = process.env.GITHUB_SHA || git("rev-parse", "HEAD");
let pastas = [];
if (process.env.PASTA_MANUAL) pastas = [process.env.PASTA_MANUAL.replace(/\/$/, "")];
else {
  const antes = /^0*$/.test(process.env.BEFORE || "") ? "HEAD~1" : process.env.BEFORE;
  pastas = git("diff", "--name-only", "--diff-filter=AM", antes, "HEAD", "--", "noticias/")
    .split("\n").filter(f => /^noticias\/\d{4}-\d{2}-\d{2}\/ficha\.md$/.test(f)).map(f => f.replace(/\/ficha\.md$/, ""));
}
if (!pastas.length) { console.log("Nenhuma ficha nova neste push."); process.exit(0); }
garantirRotulos();
const existentes = issues();

for (const pasta of pastas) {
  if (!/^noticias\/\d{4}-\d{2}-\d{2}$/.test(pasta) || !fs.existsSync(`${pasta}/ficha.md`)) {
    console.log(`::error::pasta inválida: ${pasta}`); process.exitCode = 1; continue;
  }
  const dia = pasta.slice(-10);
  const ficha = fs.readFileSync(`${pasta}/ficha.md`, "utf8");
  const semNovidade = /^STATUS:\s*sem-novidade/im.test(ficha);
  let titulo, corpo;
  if (semNovidade) {
    titulo = `Sem novidade hoje: ${dia}`;
    corpo = `${marcador(pasta)}\n${ficha}\n\n---\nNada para aprovar hoje. Esta ficha fecha sozinha.`;
  } else {
    let post = { slides: [] };
    try { post = JSON.parse(fs.readFileSync(`${pasta}/post.json`, "utf8")); } catch {}
    const capa = String(post.slides[0]?.titulo || "post do dia").replace(/<[^>]+>/g, "");
    titulo = `Ficha ${dia}: ${capa}`;
    const total = post.slides.length;
    const numeros = Array.from({ length: total }, (_, i) => i + 1);
    const faltando = numeros.filter(n => !fs.existsSync(`${pasta}/slide-${n}.png`));
    const raw = f => `https://raw.githubusercontent.com/${REPO}/${sha}/${pasta}/${f}`;
    const conferencia = fs.existsSync(`${pasta}/conferencia.txt`) ? fs.readFileSync(`${pasta}/conferencia.txt`, "utf8") : "";
    const alertas = [];
    if (!total) alertas.push("⚠️ **Não achei o post.json.** O robô não terminou o post; não aprove.");
    if (faltando.length) alertas.push(`⚠️ **Faltam slides:** ${faltando.join(", ")}. Não aprove até o robô corrigir.`);
    if (/PROBLEMAS \(/.test(conferencia)) alertas.push("⚠️ **A conferência automática achou problemas** (veja no fim). Não aprove até corrigir.");
    corpo = [
      marcador(pasta), ...alertas, "", ficha, "", "## Slides", "",
      fs.existsSync(`${pasta}/folha.png`) ? `![Miniaturas](${raw("folha.png")})\n` : "",
      ...numeros.map(n => `<img src="${raw(`slide-${n}.png`)}" width="360" alt="slide ${n}">`),
      "",
      conferencia ? "<details><summary>Conferência automática</summary>\n\n```\n" + conferencia + "\n```\n</details>" : "",
      "", "---",
      "**Para aprovar:** responda este e-mail (ou comente aqui) só com **pode**. O post entra no Metricool para as 18h.",
      "Qualquer outra resposta (pergunta, pedido de mudança) **não** publica nada."
    ].join("\n");
  }
  if (existentes.some(i => i.title === titulo)) { console.log(`Já existe a Issue "${titulo}". Nada a fazer.`); continue; }
  const n = criarIssue({ titulo, corpo, rotulos: semNovidade ? ["aviso"] : ["ficha"] });
  console.log(`Ficha aberta: #${n} ${titulo}`);
  if (semNovidade) gh("issue", "close", String(n), "--repo", REPO, "--reason", "not planned");
}
