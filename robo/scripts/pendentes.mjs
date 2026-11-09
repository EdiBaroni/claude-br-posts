// Usado pela rotina "agendador". Lista os posts aprovados que ainda não foram agendados
// e confere se todas as imagens já respondem no GitHub pelo endereço com o commit.
// Saída: JSON com tudo o que o agendador precisa mandar ao Metricool.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { horarioAgendamento } from "./regras.mjs";

const REPO = "EdiBaroni/claude-br-posts";
const git = (...a) => execFileSync("git", a, { encoding: "utf8" }).trim();
const lista = fs.existsSync("noticias") ? fs.readdirSync("noticias").filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort() : [];
const saida = [];
for (const d of lista) {
  const p = `noticias/${d}`;
  if (!fs.existsSync(`${p}/aprovado.json`) || fs.existsSync(`${p}/agendado.json`)) continue;
  const post = JSON.parse(fs.readFileSync(`${p}/post.json`, "utf8"));
  if (post.teste === true) continue; // post de teste: nunca vai ao Metricool
  const total = post.slides.length;
  // Commit mais recente que mexeu nas imagens: o endereço com ele nunca muda de conteúdo
  // (com "main" no endereço, o Metricool pode pegar uma versão velha guardada).
  const commit = git("log", "-1", "--format=%H", "origin/main", "--", `${p}/`);
  const midia = Array.from({ length: total }, (_, i) => `https://raw.githubusercontent.com/${REPO}/${commit}/${p}/slide-${i + 1}.png`);
  const status = [];
  for (const u of midia) { try { status.push((await fetch(u, { method: "HEAD" })).status); } catch { status.push(0); } }
  saida.push({
    pasta: p, total_slides: total, commit, midia, status_dos_links: status,
    todos_200: status.every(s => s === 200),
    legenda: fs.readFileSync(`${p}/legenda.txt`, "utf8").trim(),
    horario_brasilia: horarioAgendamento(),
    aprovado: JSON.parse(fs.readFileSync(`${p}/aprovado.json`, "utf8")),
    ja_teve_falha: fs.existsSync(`${p}/falha-agendamento.md`)
  });
}
console.log(JSON.stringify(saida, null, 2));
if (!saida.length) console.error("Nada para agendar.");
