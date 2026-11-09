// Testes das regras do robô. Uso: node robo/scripts/testes.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ehAprovacao, validarPost, validarLegenda, dominioOficial, horarioAgendamento, hojeBrasilia } from "./regras.mjs";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
let falhas = 0, total = 0;
const ok = (cond, nome) => { total++; if (!cond) { falhas++; console.log(`FALHOU: ${nome}`); } };

// Reconhecimento de aprovação, com respostas de e-mail de verdade
const sim = [
  "pode", "Pode", "PODE!", "pode.", "  pode  ", "Pode publicar", "aprovado", "Aprovada!", "sim", "ok", "Ok 👍",
  "\n\npode\n\nOn Mon, Nov 9, 2026 at 8:01 AM github-actions wrote:\n> Ficha 2026-11-09\n> Responda pode",
  "pode\r\n\r\nEnviado do meu iPhone\r\n\r\n> Em 9 de nov. de 2026, às 08:01, github-actions escreveu:\r\n> texto",
  "> citação que veio antes\n> mais citação\n\npode publicar\n\n--\nEdi",
  "\tpode\t", "pode\n> pode trocar a frase?"
];
const nao = [
  "pode trocar a primeira frase?", "não pode", "nao", "pode ser amanhã?", "ok, mas troca o título", "", "   ",
  "> pode\n> citação apenas", "Podemos mudar o slide 2?", "publicar só amanhã", "sim, mas antes troque a capa",
  "Obrigada!\n\npode"
];
for (const t of sim) ok(ehAprovacao(t) === true, `deveria aprovar: ${JSON.stringify(t)}`);
for (const t of nao) ok(ehAprovacao(t) === false, `NÃO deveria aprovar: ${JSON.stringify(t)}`);

// Post e legenda de exemplo passam nas regras
const exemplo = JSON.parse(fs.readFileSync(path.join(RAIZ, "robo/exemplo/post.json"), "utf8"));
ok(validarPost(exemplo).length === 0, `exemplo/post.json válido: ${validarPost(exemplo).join("; ")}`);
const leg = fs.readFileSync(path.join(RAIZ, "robo/exemplo/legenda.txt"), "utf8");
ok(validarLegenda(leg).length === 0, `exemplo/legenda.txt válida: ${validarLegenda(leg).join("; ")}`);

// Erros que têm de ser pegos
ok(validarPost({ slides: [{ tipo: "texto", titulo: "x", paragrafos: ["a"] }] }).length >= 3, "post curto, sem capa e sem final é recusado");
ok(validarPost({ ...exemplo, slides: exemplo.slides.map(s => s.tipo === "final" ? { ...s, fonte: "" } : s) }).some(p => /fonte/.test(p)), "final sem fonte é recusado");
ok(validarPost({ ...exemplo, slides: [exemplo.slides[0], { tipo: "video", titulo: "x" }, ...exemplo.slides.slice(1)] }).some(p => /não existe/.test(p)), "tipo desconhecido é recusado");
ok(validarPost({ ...exemplo, telas: {} }).some(p => /não está em "telas"/.test(p)), "tela não declarada é recusada");
ok(validarLegenda(leg.replace(" #ZeniteWeb", "")).some(p => /ZeniteWeb/.test(p)), "legenda sem #ZeniteWeb é recusada");
ok(validarLegenda(leg + "\nhttps://anthropic.com/news").some(p => /https/.test(p)), "legenda com https:// é recusada");
ok(validarLegenda(leg.replace(/^Fonte:.*$/m, "")).some(p => /Fonte/.test(p)), "legenda sem crédito é recusada");
ok(validarLegenda(leg + " #a #b #c").some(p => /hashtags/.test(p)), "legenda com hashtags demais é recusada");

// Só sites oficiais
for (const u of ["https://www.anthropic.com/news/x", "https://claude.com/blog", "https://docs.claude.com/pt", "https://support.claude.com/x", "https://github.com/anthropics/claude-code"])
  ok(dominioOficial(u), `oficial: ${u}`);
for (const u of ["http://www.anthropic.com/news", "https://anthropic.com.golpe.io/", "https://notanthropic.com", "https://github.com/anthropics-fake/x", "https://github.com/outro/anthropics", "https://theverge.com/anthropic", "lixo"])
  ok(!dominioOficial(u), `não oficial: ${u}`);

// Horário do agendamento (Brasília = UTC-3)
ok(horarioAgendamento(new Date("2026-11-10T12:00:00Z")) === "2026-11-10T18:00:00", "9h -> 18h do mesmo dia");
ok(horarioAgendamento(new Date("2026-11-10T20:40:00Z")) === "2026-11-10T18:00:00", "17h40 -> ainda 18h");
ok(horarioAgendamento(new Date("2026-11-10T20:41:00Z")) === "2026-11-10T18:05:00", "17h41 -> 18h05");
ok(horarioAgendamento(new Date("2026-11-10T22:03:00Z")) === "2026-11-10T19:25:00", "19h03 -> 19h25");
ok(horarioAgendamento(new Date("2026-11-11T02:50:00Z")) === "2026-11-11T00:10:00", "23h50 -> 00h10 do dia seguinte");
ok(hojeBrasilia(new Date("2026-11-10T02:00:00Z")) === "2026-11-09", "23h de Brasília ainda é o dia anterior em UTC+0");

console.log(`${total - falhas} de ${total} testes passaram.`);
process.exit(falhas ? 1 : 0);
