// As novas regras da engenharia de contexto. Os slides 1 e 2 formam uma panorâmica:
// as linhas do "Antes" saem pela direita do slide 1 e entram como setas no slide 2.
const LINHAS = [0, 1, 2, 3, 4, 5].map(i => 760 + i * 80); // altura de cada linha (centro)
const grade = `background-image:linear-gradient(rgba(31,30,29,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(31,30,29,.045) 1px,transparent 1px);background-size:36px 36px;`;
const fundo = `<div class="abs" style="inset:0;${grade}"></div>`;
const ANTES = ["Dar <b>regras</b> ao Claude", "Dar <b>exemplos</b> ao Claude", "Pôr tudo <b>logo de início</b>",
  "<b>Repetir</b> as instruções", "Memória no <b>CLAUDE.md</b>", "<b>Especificações</b> simples"];
const AGORA = ["Deixar o Claude usar o <b>bom senso</b>", "Projetar <b>interfaces</b>", "Revelar o contexto aos <b>poucos</b>",
  "<b>Descrições</b> simples de ferramentas", "<b>Memória</b> automática", "<b>Referências</b> ricas"];
const item = (t, y, lado) => `<div class="abs" style="${lado};top:${y - 28}px;height:56px;display:flex;align-items:center;font-size:40px;white-space:nowrap"><span>${t}</span></div>`;
const POST = {
  bg: "#f0eee6",
  slides: [
    { html: `${fundo}
      <div class="abs serif" style="left:96px;right:60px;top:120px;font-size:124px;line-height:1.02">As novas regras<br>da engenharia<br>de contexto</div>
      <div class="abs" style="right:440px;top:${LINHAS[0] - 100}px;font-size:42px;font-weight:700">Antes</div>
      ${ANTES.map((t, i) => item(t, LINHAS[i], "right:440px;justify-content:flex-end")).join("")}
      ${LINHAS.map(y => `<div class="abs" style="left:670px;right:0;top:${y - 1.5}px;height:3px;background:#1f1e1d"></div>`).join("")}` },
    { html: `${fundo}
      <div class="abs" style="left:96px;right:96px;top:150px;font-size:42px;line-height:1.42;color:var(--soft)">A Anthropic tirou <b style="color:var(--ink)">mais de 80%</b> do prompt de sistema do Claude Code para os modelos mais avançados, sem perda mensurável de desempenho.</div>
      <div class="abs" style="left:270px;top:${LINHAS[0] - 100}px;font-size:42px;font-weight:700">Agora</div>
      ${LINHAS.map(y => `<div class="abs" style="left:0;width:226px;top:${y - 1.5}px;height:3px;background:#1f1e1d"></div>
        <div class="abs" style="left:214px;top:${y - 12}px;width:24px;height:24px;border-top:3px solid #1f1e1d;border-right:3px solid #1f1e1d;transform:rotate(45deg)"></div>`).join("")}
      ${AGORA.map((t, i) => item(t, LINHAS[i], "left:270px")).join("")}` },
    { html: `${fundo}<div class="center"><h2 class="serif">Qual dessas mudanças você já aplicou?</h2>
      <p class="sub">O contexto que guiava os modelos antigos agora limita demais os mais capazes.</p>
      <p class="src">Fonte: Anthropic (@claudeai)</p></div>` }
  ]
};
