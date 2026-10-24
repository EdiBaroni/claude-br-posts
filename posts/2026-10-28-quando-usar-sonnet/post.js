const row = (icon, label, text, right) => `
  <div style="display:flex;gap:26px;align-items:stretch;${right ? "flex-direction:row-reverse" : ""}">
    ${img(icon, "width:140px;height:auto;min-height:150px;object-fit:cover;border-radius:16px;flex:0 0 140px")}
    <div style="flex:1;background:#e9e6dd;border-radius:16px;padding:20px 30px;display:flex;flex-direction:column;justify-content:center">
      <div style="color:var(--clay);font-weight:700;font-size:24px;letter-spacing:.05em">${label}</div>
      <div style="font-size:30px;line-height:1.3;margin-top:6px">${text}</div>
    </div>
  </div>`;
const box = t => `<div class="serif" style="background:#e9e6dd;border-radius:22px;padding:40px 30px;font-size:60px;line-height:1.08;text-align:center;width:470px">${t}</div>`;
const POST = {
  bg: "#f5f5ed",
  slides: [
    { html: `
      ${img("tilestop", "position:absolute;left:70px;top:50px;width:940px")}
      <div class="abs serif" style="left:0;right:0;top:450px;text-align:center;font-size:118px;line-height:1.02">Quando usar o<br>Sonnet 5.5</div>
      <div class="abs" style="left:110px;right:110px;top:720px;text-align:center;font-size:38px;line-height:1.38">Um complemento mais rápido e mais barato ao Claude Opus 5.5, melhor em tarefas do dia a dia bem definidas.</div>
      ${img("tilesbot", "position:absolute;left:70px;top:880px;width:940px")}` },
    { html: `
      <div class="abs serif" style="left:96px;top:110px;font-size:80px">Qual modelo usar?</div>
      <div class="abs" style="left:96px;top:330px;width:380px;font-size:42px;line-height:1.3">Para trabalhos do <b>dia a dia</b> que você consegue descrever com clareza</div>
      <div class="abs" style="left:96px;top:810px;width:380px;font-size:42px;line-height:1.3">Para trabalhos <b>complexos</b> que ainda estão tomando forma…</div>
      <div class="abs" style="left:480px;top:400px;width:60px;border-top:4px solid #1f1e1d"></div>
      <div class="abs" style="left:480px;top:880px;width:60px;border-top:4px solid #1f1e1d"></div>
      <div class="abs" style="left:540px;top:300px">${box("Experimente o<br>Sonnet 5.5")}</div>
      <div class="abs" style="left:540px;top:780px">${box("Comece (ou continue) com o Opus 5.5")}</div>
      <div class="abs" style="left:774px;top:520px;height:250px;border-left:4px dashed #1f1e1d"></div>
      <div class="abs" style="left:756px;top:500px;font-size:40px;line-height:1">▲</div>
      <div class="abs" style="left:810px;top:580px;width:220px;font-size:32px;line-height:1.3"><b>Opcional:</b> delegue as partes claras</div>` },
    { html: `
      <div class="abs serif" style="left:70px;top:80px;font-size:66px">Onde o Sonnet 5.5 brilha</div>
      <div class="abs" style="left:70px;right:70px;top:190px;display:flex;flex-direction:column;gap:16px">
        ${row("code", "PROGRAMAÇÃO", "Corrigir bugs, iterar rápido em funcionalidades e conferir o código com os requisitos.")}
        ${row("cycle", "TRABALHO RECORRENTE DE AGENTES", "Fazer triagem e investigação, prontas para sua revisão toda manhã.", true)}
        ${row("video", "DOCUMENTOS, APRESENTAÇÕES E PLANILHAS", "Montar a apresentação trimestral no modelo da sua equipe.")}
        ${row("chart", "ANÁLISE FINANCEIRA", "Transformar uma teleconferência de resultados num resumo de uma página, com a fonte de cada número.", true)}
        ${row("flow", "DESIGN", "Criar uma tela, um diagrama ou um fluxo de usuário caprichado a partir de uma ideia solta.")}
      </div>` },
    { type: "center", titleStyle: "font-size:74px",
      title: "Quando você sabe como é o resultado final, o Sonnet 5.5 chega lá mais rápido e por menos.",
      sub: "Quando ainda está descobrindo, comece com o Opus 5.5.", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
