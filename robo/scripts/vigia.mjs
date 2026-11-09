// Workflow vigia.yml. Dois turnos:
//   manha (9h):    a ficha de hoje chegou? Não chegou -> abre aviso.
//   tarde (17h30): há post aprovado que ainda não foi agendado? -> abre aviso.
// Não repete o mesmo aviso no mesmo dia (compara pelo título exato).
import fs from "node:fs";
import { issues, criarIssue, garantirRotulos } from "./github.mjs";
import { hojeBrasilia } from "./regras.mjs";

const turno = process.env.TURNO || "manha";
const hoje = process.env.HOJE || hojeBrasilia();
const avisos = [];
if (turno === "manha") {
  if (!fs.existsSync(`noticias/${hoje}/ficha.md`)) avisos.push({
    titulo: `O post de notícia de hoje não chegou: ${hoje}`,
    corpo: [
      `Bom dia. O robô deveria ter gravado a ficha de hoje às 8h (pasta \`noticias/${hoje}\`), mas ela não está no repositório.`,
      "", "**O que fazer:**",
      "1. Abra https://claude.ai/code/routines e clique na rotina **Robô de notícias do Claude (8h)**.",
      "2. Veja a última execução: se deu erro, a mensagem diz o motivo.",
      "3. Para tentar de novo agora, clique em **Run now** (Executar agora).",
      "", "Se preferir, abra uma conversa com o Claude e cole o endereço desta Issue."
    ].join("\n")
  });
} else {
  const pendentes = fs.existsSync("noticias") ? fs.readdirSync("noticias").filter(d =>
    fs.existsSync(`noticias/${d}/aprovado.json`) && !fs.existsSync(`noticias/${d}/agendado.json`) &&
    JSON.parse(fs.readFileSync(`noticias/${d}/post.json`, "utf8")).teste !== true) : [];
  if (pendentes.length) avisos.push({
    titulo: `Post aprovado ainda não foi agendado: ${hoje}`,
    corpo: [
      `Estes posts foram aprovados, mas ainda não estão no Metricool: ${pendentes.map(p => `\`noticias/${p}\``).join(", ")}.`,
      "", "**O que fazer:**",
      "1. Abra https://claude.ai/code/routines e veja a última execução da rotina **Agendador do Metricool**.",
      "2. Se ela diz que não encontrou o Metricool, reconecte-o em https://claude.ai/customize/connectors.",
      "3. Clique em **Run now** na rotina para tentar de novo."
    ].join("\n")
  });
}
if (!avisos.length) { console.log(`Vigia (${turno}): tudo em ordem.`); process.exit(0); }
garantirRotulos();
const existentes = issues();
for (const a of avisos) {
  if (existentes.some(i => i.title === a.titulo)) { console.log(`Aviso já aberto hoje: ${a.titulo}`); continue; }
  console.log(`Abrindo aviso #${criarIssue({ titulo: a.titulo, corpo: a.corpo, rotulos: ["aviso"] })}: ${a.titulo}`);
}
