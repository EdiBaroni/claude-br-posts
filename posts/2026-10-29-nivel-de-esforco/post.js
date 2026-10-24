const LV = [
  { n: "Baixo", c: "#c96b86" }, { n: "Médio", c: "#5e9b7c" }, { n: "Alto", c: "#5f8fc9" },
  { n: "Muito alto", c: "#eba84c" }, { n: "Máximo", c: "#8f7fc4" }
];
const bars = (k, c) => `<div style="display:flex;gap:5px;align-items:flex-end;height:46px">${[14, 22, 30, 38, 46].map((h, i) =>
  `<i style="display:block;width:11px;height:${h}px;border-radius:2px;background:${i <= k ? c : "#d6d4cc"}"></i>`).join("")}</div>`;
const levelCards = LV.map((l, i) => `
  <div class="abs" style="left:640px;top:${300 + i * 168}px;width:270px;height:124px;background:#fff;border-radius:16px;padding:20px 24px;display:flex;justify-content:space-between;align-items:flex-end;box-shadow:0 6px 18px rgba(0,0,0,.06);z-index:2">
    <div style="font-size:32px;font-weight:600;align-self:flex-start;line-height:1.1">${l.n}</div>${bars(i, l.c)}</div>
  <div class="abs" style="left:905px;right:0;top:${360 + i * 168}px;border-top:5px solid ${l.c}"></div>`).join("");
const tip = (i, head, text) => `
  <div style="position:relative">
    <div class="abs" style="left:-70px;width:72px;top:58px;border-top:5px solid ${LV[i].c}"></div>
    <div style="background:#fff;border-radius:20px;padding:26px 34px;box-shadow:0 6px 18px rgba(0,0,0,.05)">
      <div style="font-size:33px;font-weight:600;line-height:1.3">${head.replace("#", `<span style="font-family:'DM Mono',monospace;background:${LV[i].c};color:#fff;border-radius:8px;padding:0 10px">${LV[i].n.toLowerCase()}</span>`)}</div>
      <div style="font-size:29px;line-height:1.36;color:var(--soft);margin-top:8px">${text}</div>
    </div>
  </div>`;
const POST = {
  bg: "#dedcd0",
  slides: [
    { html: `
      ${img("hand", "position:absolute;left:96px;top:250px;width:200px")}
      <div class="abs serif" style="left:96px;top:470px;width:520px;font-size:88px;line-height:1.04">Como escolher o nível de esforço no Opus 5.5</div>
      <div class="abs" style="left:96px;top:870px;width:500px;font-size:36px;line-height:1.38;color:var(--soft)">O esforço define o quanto o Claude trabalha em cada pedido. Siga as linhas para ver como escolher.</div>
      ${levelCards}` },
    { html: `
      <div class="abs" style="left:70px;right:70px;top:80px;display:flex;flex-direction:column;gap:22px">
        ${tip(0, "Use esforço # quando o plano está claro", "Para mudanças que você descreveria numa frase, como renomear algo ou aplicar um padrão conhecido em vários arquivos.")}
        ${tip(1, "Use esforço # no trabalho diário bem definido", "Comece por aqui na maioria das tarefas em que você sabe aonde quer chegar.")}
        ${tip(2, "Tente esforço # quando o médio empacar", "O modelo pensa mais em cada etapa, o que ajuda a pegar o que o nível médio deixa passar.")}
        ${tip(3, "Use esforço # quando nem o alto resolver", "O modelo pensa ainda mais. Se o problema continuar, troque para o Fable 5.1 naquela tarefa.")}
        ${tip(4, "Use esforço # nas tarefas mais complexas", "O máximo não fica disponível como padrão fixo. Ative numa tarefa difícil e depois reduza o esforço.")}
      </div>` },
    { type: "center", titleStyle: "font-size:84px",
      title: "Não está tendo o resultado que esperava?",
      sub: "Tente aumentar o nível de esforço antes de trocar para um modelo mais poderoso.", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
