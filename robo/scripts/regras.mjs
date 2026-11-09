// Regras do robô de notícias, num lugar só, para os scripts e os testes usarem as mesmas.

export const TIPOS = ["capa", "tela", "texto", "lista", "pedido", "final"];
export const HASHTAG_DA_MARCA = "#ZeniteWeb";

// Sites de onde o robô pode tirar imagem. Só da Anthropic.
const OFICIAIS = ["anthropic.com", "claude.com", "claude.ai", "github.com/anthropics"];
export function dominioOficial(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const alvo = (u.hostname + u.pathname).toLowerCase();
    return OFICIAIS.some(d => d.includes("/")
      ? alvo.startsWith(d + "/") || alvo === d
      : u.hostname === d || u.hostname.endsWith("." + d));
  } catch { return false; }
}

const semTags = t => String(t || "").replace(/<[^>]+>/g, "");

export function validarPost(post) {
  const p = [];
  const s = post?.slides;
  if (!Array.isArray(s)) return ["post.json sem a lista \"slides\"."];
  if (s.length < 4 || s.length > 10) p.push(`O carrossel tem ${s.length} slides; o certo é de 4 a 10.`);
  if (s[0]?.tipo !== "capa") p.push("O primeiro slide tem de ser do tipo \"capa\".");
  if (s.at(-1)?.tipo !== "final") p.push("O último slide tem de ser do tipo \"final\".");
  const telas = Object.keys(post.telas || {});
  s.forEach((x, i) => {
    const n = `Slide ${i + 1}`;
    if (!TIPOS.includes(x.tipo)) { p.push(`${n}: tipo "${x.tipo}" não existe (use ${TIPOS.join(", ")}).`); return; }
    if (!x.titulo) p.push(`${n}: falta o título.`);
    if (semTags(x.titulo).length > 70) p.push(`${n}: título com ${semTags(x.titulo).length} caracteres (máximo 70).`);
    if (x.tipo === "tela" && !x.tela) p.push(`${n}: slide "tela" sem imagem.`);
    if (x.tela && !telas.includes(x.tela)) p.push(`${n}: usa a tela "${x.tela}", que não está em "telas".`);
    if (x.tipo === "texto") {
      if (!x.paragrafos?.length || x.paragrafos.length > 3) p.push(`${n}: "texto" precisa de 1 a 3 parágrafos.`);
      (x.paragrafos || []).forEach((t, j) => semTags(t).length > 240 && p.push(`${n}: parágrafo ${j + 1} longo demais (máximo 240).`));
    }
    if (x.tipo === "lista") {
      if (!x.itens?.length || x.itens.length > 4) p.push(`${n}: "lista" precisa de 1 a 4 itens.`);
      (x.itens || []).forEach((it, j) => {
        if (!Array.isArray(it) || it.length < 2) p.push(`${n}: item ${j + 1} deve ser ["emoji", "título", "descrição"].`);
        else if (semTags(it[1]).length + semTags(it[2]).length > 130) p.push(`${n}: item ${j + 1} longo demais.`);
      });
    }
    if (x.tipo === "pedido" && !x.pedido) p.push(`${n}: "pedido" sem o texto do pedido.`);
    if (x.tipo === "final" && !/Fonte:/i.test(x.fonte || "")) p.push(`${n}: o slide final precisa da fonte ("Fonte: ...").`);
    if (/@claudeai|@anthropicai/i.test(JSON.stringify(x)) && x.tipo !== "final") p.push(`${n}: não cite o perfil oficial fora do crédito.`);
  });
  return p;
}

export function validarLegenda(texto) {
  const p = [];
  const t = texto.trim();
  if (!t) return ["A legenda está vazia."];
  if (t.length > 2200) p.push(`Legenda com ${t.length} caracteres (o Instagram aceita 2200).`);
  const tags = t.match(/#[\p{L}\p{N}_]+/gu) || [];
  if (tags.length < 3 || tags.length > 5) p.push(`Legenda com ${tags.length} hashtags (use de 3 a 5).`);
  if (!tags.includes(HASHTAG_DA_MARCA)) p.push(`Falta a hashtag da marca ${HASHTAG_DA_MARCA}.`);
  if (!/^Fonte: .+não oficial/im.test(t)) p.push("Falta a linha \"Fonte: ... · Resumo e adaptação não oficial\".");
  if (/https?:\/\//.test(t)) p.push("Link com https:// na legenda não abre no Instagram: escreva só o endereço (ex.: anthropic.com/news).");
  return p;
}

// Lê um comentário (que pode ser resposta de e-mail) e diz se é aprovação.
// Vale a primeira linha com conteúdo, ignorando linhas em branco e citações (">").
const APROVA = ["pode", "pode publicar", "pode agendar", "aprovado", "aprovada", "publicar", "publica", "sim", "ok"];
export function ehAprovacao(texto) {
  const linha = String(texto || "").replace(/\r/g, "").split("\n")
    .map(l => l.trim()).find(l => l && !l.startsWith(">"));
  if (!linha) return false;
  const limpa = linha.toLowerCase().replace(/[\s.!,;:…👍✅]+$/u, "").replace(/\s+/g, " ").trim();
  return APROVA.includes(limpa);
}

// Hora (Brasília) em que o post vai ao ar. Regra: 18h do dia, se ainda faltarem
// pelo menos 20 minutos; senão, daqui a 20 minutos, arredondado para os próximos 5.
export function horarioAgendamento(agora = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const partes = d => Object.fromEntries(fmt.formatToParts(d).map(x => [x.type, x.value]));
  const a = partes(agora);
  const minutos = Number(a.hour) * 60 + Number(a.minute);
  if (minutos <= 18 * 60 - 20) return `${a.year}-${a.month}-${a.day}T18:00:00`;
  const depois = new Date(Math.ceil((agora.getTime() + 20 * 60000) / 300000) * 300000);
  const b = partes(depois);
  return `${b.year}-${b.month}-${b.day}T${b.hour}:${b.minute}:00`;
}

export function hojeBrasilia(agora = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(agora);
}
