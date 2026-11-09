// Workflow agendado.yml: quando o agendador grava agendado.json (ou falha-agendamento.md),
// avisa na ficha. Agendado: comenta o link e fecha. Falha: comenta e deixa aberta.
import fs from "node:fs";
import { git, gh, issues, comentar, marcador, REPO } from "./github.mjs";

const antes = /^0*$/.test(process.env.BEFORE || "") ? "HEAD~1" : process.env.BEFORE;
const mudou = git("diff", "--name-only", "--diff-filter=AM", antes, "HEAD", "--", "noticias/").split("\n")
  .filter(f => /^noticias\/\d{4}-\d{2}-\d{2}\/(agendado\.json|falha-agendamento\.md)$/.test(f));
if (!mudou.length) { console.log("Nada de agendamento neste push."); process.exit(0); }
const fichas = issues("ficha");
for (const f of mudou) {
  const pasta = f.replace(/\/[^/]+$/, "");
  const ficha = fichas.find(i => (i.body || "").includes(marcador(pasta)));
  if (!ficha) { console.log(`::warning::não achei a ficha de ${pasta}`); continue; }
  if (f.endsWith("agendado.json")) {
    const a = JSON.parse(fs.readFileSync(f, "utf8"));
    comentar(ficha.number, [
      `📅 **Agendado no Metricool** para ${a.horario_brasilia} (horário de Brasília).`,
      `- Imagens que o Metricool recebeu: ${a.imagens_no_metricool} de ${a.imagens_enviadas}`,
      a.link_metricool ? `- Ver no Metricool: ${a.link_metricool}` : "",
      "", "Para cancelar ou mudar, use o próprio Metricool."
    ].join("\n"));
    try { gh("issue", "edit", String(ficha.number), "--repo", REPO, "--add-label", "agendado"); } catch {}
    gh("issue", "close", String(ficha.number), "--repo", REPO, "--reason", "completed");
  } else {
    comentar(ficha.number, `⚠️ **O agendador não conseguiu colocar o post no Metricool.**\n\n${fs.readFileSync(f, "utf8")}`);
  }
}
