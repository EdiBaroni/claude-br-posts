// Workflow aprovar.yml: decide se o comentário (ou o rótulo "aprovado") é aprovação e,
// se for, grava noticias/<dia>/aprovado.json. Quem coloca no Metricool é a rotina "agendador".
import fs from "node:fs";
import { git, gh, comentar, pastaDoCorpo, REPO } from "./github.mjs";
import { ehAprovacao } from "./regras.mjs";

const { EVENTO, COMENTARIO = "", ISSUE, ISSUE_CORPO = "", QUEM } = process.env;
const aprovou = EVENTO === "issues" ? true : ehAprovacao(COMENTARIO);
if (!aprovou) { console.log("Não é aprovação. Nada a fazer."); process.exit(0); }

const pasta = pastaDoCorpo(ISSUE_CORPO);
if (!pasta || !fs.existsSync(`${pasta}/post.json`)) {
  comentar(ISSUE, `⚠️ Entendi como aprovação, mas não achei a pasta do post nesta ficha (${pasta || "sem marcador"}). Nada foi agendado.`);
  process.exit(1);
}
const arq = `${pasta}/aprovado.json`;
if (fs.existsSync(arq)) { console.log("Já estava aprovado."); process.exit(0); }
const teste = JSON.parse(fs.readFileSync(`${pasta}/post.json`, "utf8")).teste === true;
fs.writeFileSync(arq, JSON.stringify({ aprovado_em: new Date().toISOString(), por: QUEM, issue: Number(ISSUE), teste }, null, 2) + "\n");
git("config", "user.name", "github-actions[bot]");
git("config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com");
git("add", arq);
git("commit", "-m", `Aprova ${pasta} (ficha #${ISSUE})`);
let enviado = false;
for (let t = 1; t <= 3 && !enviado; t++) {
  try { git("push", "origin", "HEAD:main"); enviado = true; }
  catch { try { git("pull", "--rebase", "origin", "main"); } catch {} }
}
if (!enviado) {
  comentar(ISSUE, "⚠️ Entendi a aprovação, mas não consegui gravá-la no repositório. Responda **pode** de novo daqui a pouco.");
  process.exit(1);
}
try { gh("issue", "edit", String(ISSUE), "--repo", REPO, "--add-label", "aprovado"); } catch {}
if (teste) {
  comentar(ISSUE, `🧪 Aprovação reconhecida (por @${QUEM}). Este é um **post de teste**: o agendador nunca o manda ao Metricool.`);
  process.exit(0);
}
comentar(ISSUE, `✅ Aprovado por @${QUEM}. O agendador confere de hora em hora (das 9h às 20h) e coloca o post no Metricool para as **18h** (ou uns 20 minutos depois de agendar, se já passou das 17h40). Aviso aqui quando estiver agendado.`);
