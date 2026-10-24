const M = {
  Fable: { c: "#dc7a5c", tag: "O trabalho mais difícil", dots: 4, d: "O modelo mais autônomo, para trabalhos que exigem planejamento, não só raciocínio.",
    best: ["Tarefas longas, com muitas etapas ligadas", "Trabalhar com materiais densos", "Construir algo a partir de uma ideia solta", "Problemas em que o Opus teve dificuldade"] },
  Opus: { c: "#bed4c9", tag: "Tarefas complexas e especializadas", dots: 3, d: "O modelo de raciocínio profundo, para problemas difíceis.",
    best: ["Pesquisa e análise complexas", "Documentos técnicos longos", "Crítica de metodologia", "Programação com agentes"] },
  Sonnet: { c: "#cac9de", tag: "Trabalho do dia a dia", dots: 2, d: "O colaborador versátil, que resolve a maioria dos problemas.",
    best: ["Escrever e criar conteúdo", "Tarefas de programação", "Análise e pesquisa", "Problemas com várias etapas"] },
  Haiku: { c: "#faf8f2", tag: "Respostas instantâneas", dots: 1, d: "O modelo mais eficiente, para pedidos simples e rotineiros.",
    best: ["Perguntas diretas", "Resumos simples", "Consultas rápidas", "Extrair uma informação de um texto"] }
};
const card = (name, inner, pos = "left:70px;right:70px;top:150px;bottom:170px") => `
  <div class="abs" style="${pos}">
    <div style="display:inline-block;background:${M[name] ? M[name].c : "#dc7a5c"};border:4px solid #1f1e1d;border-bottom:none;border-radius:16px 16px 0 0;padding:6px 34px;margin-left:44px;font-family:'Source Serif 4',serif;font-size:30px">${name}</div>
    <div style="background:${M[name] ? M[name].c : "#dc7a5c"};border:4px solid #1f1e1d;border-radius:8px;padding:48px 50px;height:calc(100% - 52px)">${inner}</div>
  </div>`;
const model = name => {
  const m = M[name];
  return { html: card(name, `
    <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:40px">${m.tag}</span>
      <span style="display:flex;gap:10px">${[1, 2, 3, 4].map(i => `<i style="display:block;width:34px;height:34px;border-radius:50%;border:4px solid #1f1e1d;background:${i <= m.dots ? "#f1c9b6" : "#fff"}"></i>`).join("")}</span></div>
    <div class="serif" style="font-size:104px;margin:30px 0 24px;font-weight:400">${name}</div>
    <div style="font-size:40px;line-height:1.35">${m.d}</div>
    <div style="font-size:44px;font-weight:700;margin-top:56px">Melhor para</div>
    <ul style="font-size:38px;line-height:1.38;margin:16px 0 0 50px">${m.best.map(b => `<li>${b}</li>`).join("")}</ul>`) };
};
const POST = {
  bg: "#ecc9b8",
  slides: [
    { html: `
      <div class="abs serif" style="left:0;right:0;top:150px;text-align:center;font-size:110px;line-height:1.06">Como escolher o<br>modelo <span style="font-weight:600">Claude</span> certo</div>
      ${["Fable", "Opus", "Sonnet", "Haiku"].map((n, i) => `
        <div class="abs" style="left:${170 + i * 120}px;top:${560 + (i % 2) * 30}px;width:460px;height:560px;background:${M[n].c};border:4px solid #1f1e1d;border-radius:10px;transform:rotate(${-12 + i * 8}deg);box-shadow:0 10px 30px rgba(0,0,0,.08);padding:50px 40px">
          <div class="serif" style="font-size:72px;font-weight:400">${n}</div><div class="serif" style="font-size:34px;margin-top:14px;font-weight:400">${M[n].tag}</div></div>`).join("")}` },
    model("Fable"), model("Opus"), model("Sonnet"), model("Haiku"),
    { html: card("Resumo", `
      <div class="serif" style="font-size:58px;text-align:center;margin-bottom:24px;font-weight:400">Escolha seu modelo Claude</div>
      <table style="width:100%;border-collapse:collapse;font-size:29px;line-height:1.28">
        ${["Fable", "Opus", "Sonnet", "Haiku"].map((n, i) => `<tr style="${i ? "border-top:3px solid #1f1e1d" : ""}">
          <td class="serif" style="font-size:44px;padding:22px 16px 22px 0;border-right:3px solid #1f1e1d;width:24%">${n}</td>
          <td style="padding:22px 18px;border-right:3px solid #1f1e1d;width:28%;text-align:center">${M[n].tag}</td>
          <td style="padding:22px 0 22px 20px">${M[n].d}</td></tr>`).join("")}
      </table>`) },
    { type: "center", title: "Cada modelo foi feito para um tipo de trabalho",
      sub: "Salve este guia para consultar quando precisar 📌", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
