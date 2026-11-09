// Ajudantes para os workflows: chamam o "gh" (já instalado nas máquinas do GitHub Actions).
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const gh = (...args) => execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
export const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();
export const REPO = process.env.GITHUB_REPOSITORY || "EdiBaroni/claude-br-posts";
export const APROVADORA = process.env.APROVADORA || "EdiBaroni";

export const marcador = pasta => `<!-- pasta: ${pasta} -->`;
export const pastaDoCorpo = corpo => (String(corpo || "").match(/<!-- pasta: (noticias\/\d{4}-\d{2}-\d{2}) -->/) || [])[1] || "";

const temp = nome => path.join(os.tmpdir(), nome);

// Lista as Issues (abertas e fechadas) pela API de listagem, não pela busca:
// a busca demora a enxergar o que acabou de ser criado.
export function issues(rotulo) {
  const r = gh("api", "--paginate", `repos/${REPO}/issues?state=all&per_page=100${rotulo ? `&labels=${rotulo}` : ""}`,
    "--jq", ".[] | select(.pull_request == null) | {number, title, state, body}");
  return r ? r.split("\n").filter(Boolean).map(l => JSON.parse(l)) : [];
}

export function comentar(numero, texto) {
  fs.writeFileSync(temp("comentario.md"), texto);
  gh("issue", "comment", String(numero), "--repo", REPO, "--body-file", temp("comentario.md"));
}

export function criarIssue({ titulo, corpo, rotulos = [] }) {
  fs.writeFileSync(temp("corpo.md"), corpo);
  const url = gh("issue", "create", "--repo", REPO, "--title", titulo, "--body-file", temp("corpo.md"), ...rotulos.flatMap(r => ["--label", r]));
  const numero = url.match(/\/issues\/(\d+)/)?.[1];
  if (!numero) throw new Error(`não entendi o endereço da Issue: ${url}`);
  // A atribuição é o que manda o e-mail. Falhando, a ficha continua de pé.
  try { gh("issue", "edit", numero, "--repo", REPO, "--add-assignee", APROVADORA); }
  catch { console.log(`::warning::não consegui atribuir a Issue #${numero} a ${APROVADORA}`); }
  return Number(numero);
}

export function garantirRotulos() {
  const rotulos = [["ficha", "0e8a16", "Ficha de aprovação do robô de notícias"], ["aprovado", "1d76db", "Aprovado: o agendador coloca no Metricool"],
    ["agendado", "5319e7", "Já está no Metricool"], ["aviso", "d93f0b", "Aviso do robô"]];
  for (const [nome, cor, desc] of rotulos) {
    try { gh("label", "create", nome, "--repo", REPO, "--color", cor, "--description", desc, "--force"); } catch {}
  }
}
