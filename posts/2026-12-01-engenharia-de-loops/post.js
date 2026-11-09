// O que é, afinal, engenharia de loops: os quatro tipos de loop do Claude Code.
// Diagramas recriados em português; comandos (/goal, /loop, /schedule) ficam como no original.
const PONTOS = "background-image:radial-gradient(rgba(31,30,29,.10) 1.4px,transparent 1.6px);background-size:22px 22px;";
const fundo = `<div class="abs" style="inset:0;${PONTOS}"></div>`;
const PESSEGO = "#ecc2ad", VERDINHO = "#c9d6cf";
const cab = (titulo, desc, rotulo, uso) => `${fundo}
  <div class="abs serif" style="left:84px;right:60px;top:96px;font-size:94px;line-height:1.05">${titulo}</div>
  <div class="abs" style="left:88px;right:120px;top:222px;font-size:37px;line-height:1.35">${desc}</div>
  <div class="abs" style="left:88px;top:352px;border:3px solid #1f1e1d;border-radius:30px;padding:5px 24px;font-size:22px;font-weight:700;letter-spacing:.06em">${rotulo}</div>
  <div class="abs" style="left:88px;right:80px;top:412px;font-size:34px;line-height:1.3">${uso}</div>`;
// caixa centrada no ponto (x, y)
const caixa = (x, y, html, extra = "") => `<div class="abs" style="left:${x}px;top:${y}px;transform:translate(-50%,-50%);background:#fff;border:3px solid #1f1e1d;border-radius:14px;padding:16px 22px;font-size:28px;line-height:1.25;text-align:center;z-index:2;${extra}">${html}</div>`;
const pedido = (x, y, w, texto) => `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;background:#fff;border:3px solid #1f1e1d;border-radius:14px;padding:22px 26px 18px;font-size:28px;line-height:1.3;z-index:2">${texto}<div style="width:44px;height:44px;border-radius:9px;background:#c4673f;color:#fff;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:8px 0 0 auto">↑</div></div>`;
// círculo com setas no sentido horário, nos ângulos dados (graus; 0 = direita, 90 = embaixo)
const circulo = (cx, cy, r, angulos) => {
  const seta = a => {
    const t = a * Math.PI / 180, x = cx + r * Math.cos(t), y = cy + r * Math.sin(t);
    const dx = -Math.sin(t), dy = Math.cos(t); // direção do movimento
    const p = (ang) => { const c = Math.cos(ang), s = Math.sin(ang); return [x - 22 * (dx * c - dy * s), y - 22 * (dx * s + dy * c)]; };
    const [a1, a2] = [p(0.6), p(-0.6)];
    return `<polyline points="${a1[0]},${a1[1]} ${x},${y} ${a2[0]},${a2[1]}" fill="none" stroke="#1f1e1d" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  return `<svg class="abs" style="inset:0;z-index:1" width="1080" height="1350"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1f1e1d" stroke-width="3.5"/>${angulos.map(seta).join("")}</svg>`;
};
// seta curva de (x1,y1) até (x2,y2), passando perto de (qx,qy)
const curvaSeta = (x1, y1, qx, qy, x2, y2) => {
  const dx = x2 - qx, dy = y2 - qy, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
  const p = ang => { const c = Math.cos(ang), s = Math.sin(ang); return [x2 - 22 * (ux * c - uy * s), y2 - 22 * (ux * s + uy * c)]; };
  const [a1, a2] = [p(0.6), p(-0.6)];
  return `<svg class="abs" style="inset:0;z-index:1" width="1080" height="1350"><path d="M${x1} ${y1} Q${qx} ${qy} ${x2} ${y2}" fill="none" stroke="#1f1e1d" stroke-width="3.5" stroke-linecap="round"/><polyline points="${a1[0]},${a1[1]} ${x2},${y2} ${a2[0]},${a2[1]}" fill="none" stroke="#1f1e1d" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
};
const nota = (y, html) => `<div class="abs" style="left:60px;right:60px;top:${y}px;text-align:center;font-size:29px;line-height:1.35;color:var(--soft)">${html}</div>`;
const pill = t => `<span style="display:inline-block;background:${PESSEGO};border:2.5px solid #1f1e1d;border-radius:30px;padding:3px 14px;font-size:24px;font-weight:600;white-space:nowrap">${t}</span>`;
const cmd = t => `<span style="display:inline-block;border:2.5px solid #1f1e1d;border-radius:8px;padding:2px 12px;font-family:'DM Mono',monospace;font-size:24px;margin:3px 0">${t}</span>`;

const POST = {
  bg: "#f0eee6",
  slides: [
    // 1. Capa escura
    { bg: "#1b1a19", html: `<style>.foot{color:#bdb9ae}</style>
      <div class="abs" style="inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1.4px,transparent 1.6px);background-size:22px 22px"></div>
      <svg class="abs" style="inset:0" width="1080" height="1350"><g fill="none" stroke="#f0eee6" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M470 140 C 560 70, 650 90, 690 190"/><polyline points="668,172 690,190 698,163"/>
        <path d="M930 330 C 1000 380, 990 470, 930 520"/><polyline points="958,512 930,520 940,494"/>
        <path d="M820 570 C 860 640, 820 690, 760 700"/><polyline points="786,712 760,700 782,682"/>
        <path d="M120 760 C -10 640, -10 260, 110 150"/><polyline points="82,160 110,150 108,178"/>
      </g></svg>
      <div class="abs serif" style="left:150px;top:96px;font-size:128px;color:#f0eee6;line-height:1">o que é</div>
      <div class="abs serif" style="left:600px;top:236px;font-size:128px;color:#f0eee6;line-height:1">afinal,</div>
      <div class="abs serif" style="left:200px;top:420px;font-size:128px;color:#f0eee6;line-height:1">engenharia</div>
      <div class="abs serif" style="left:150px;top:640px;font-size:128px;color:#f0eee6;line-height:1">de loops</div>
      <div class="abs" style="left:420px;right:80px;top:900px;font-size:38px;line-height:1.38;color:#e8e5dc">Um loop é quando agentes repetem ciclos de trabalho até cumprir uma condição de parada. <b style="color:#fff">Veja os quatro tipos e quando usar cada um.</b></div>` },
    // 2. Por turno
    { html: `${cab("Loops por turno", "O Claude avalia se concluiu as tarefas ou se precisa de mais contexto.", "USE QUANDO", "Você está explorando ou tomando uma decisão.")}
      ${circulo(500, 850, 210, [-45, 90, -135])}
      ${caixa(500, 640, "Agir")}
      ${caixa(290, 850, "Reunir contexto")}
      ${caixa(720, 850, "<b>Verificar o trabalho</b>", `background:${PESSEGO}`)}
      ${caixa(915, 650, "Resposta", `background:${VERDINHO}`)}
      ${curvaSeta(860, 850, 930, 830, 915, 705)}
      ${caixa(215, 1065, `<span style="color:#d97757">✳</span> Seu prompt`)}
      ${curvaSeta(215, 1020, 200, 940, 260, 895)}
      ${nota(1125, "Termina quando o Claude considera a tarefa concluída.<br>Ou quando o orçamento de esforço acaba.")}` },
    // 3. Por meta
    { html: `${cab("Loops por meta", "Você define o que é “pronto”, e o Claude repete o ciclo até chegar lá.", "USE PARA", "Tarefas com critério de saída que dá para verificar.")}
      ${pedido(84, 484, 470, "Deixe a nota do Lighthouse da página inicial em 90 ou mais; pare depois de 5 tentativas")}
      ${curvaSeta(200, 700, 210, 800, 360, 810)}
            <div class="abs" style="left:640px;top:662px;font-size:29px;color:var(--soft)">Tenta parar</div>
      ${circulo(560, 910, 195, [-80, 95])}
      ${caixa(365, 910, "O Claude trabalha<br>na tarefa", "width:250px")}
      ${caixa(760, 910, "Modelo avaliador<br>confere sua condição", "width:300px;background:#1f1e1d;color:#fff")}
      ${caixa(895, 1125, "<b>Fim do loop</b><br>meta atingida ou limite<br>de turnos alcançado", `width:290px;background:${PESSEGO};font-size:25px`)}
      ${curvaSeta(910, 930, 965, 980, 925, 1045)}
      <div class="abs" style="left:84px;width:600px;top:1120px;font-size:28px;line-height:1.3;color:var(--soft)">Condição não atingida:<br>volta ao trabalho</div>` },
    // 4. Por tempo
    { html: `${cab("Loops por tempo", "O Claude executa um prompt repetidamente, numa agenda que você define.", "USE PARA", "Trabalho recorrente ou interação com ambientes externos.")}
      ${pedido(84, 540, 410, "5m confira meu PR, responda aos comentários da revisão e corrija o CI com falha")}
      ${curvaSeta(230, 820, 260, 930, 470, 945)}
      ${circulo(700, 950, 200, [0, 180])}
      ${caixa(700, 750, "<b>O timer dispara</b><br>a cada 5 minutos", `background:${PESSEGO}`)}
      ${caixa(700, 1150, "<b>O Claude trabalha</b><br>executa a rotina")}
      <div class="abs" style="left:520px;width:360px;top:930px;text-align:center;font-size:29px;color:var(--soft)">Repete até você parar</div>` },
    // 5. Proativo
    { html: `${cab("Loops proativos", "O Claude repete o ciclo numa agenda ou gatilho que você definiu.", "USE PARA", "Fluxos recorrentes de trabalho bem definido.")}
      <div class="abs" style="left:270px;right:56px;top:490px;height:700px;border:3px dashed #1f1e1d;border-radius:18px"></div>
      <div class="abs" style="left:270px;right:56px;top:510px;text-align:center;font-size:26px;color:var(--soft)">Roda na nuvem, com o notebook aberto ou não.</div>
      ${circulo(645, 870, 215, [-45, 45, 135, -135])}
      ${caixa(645, 650, "<b>/schedule</b><br>fica de olho nos<br>relatos de bug", "width:260px;font-size:26px")}
      ${caixa(860, 870, "<b>Agente principal</b><br>repete até os<br>testes passarem", `width:250px;font-size:26px;background:${PESSEGO}`)}
      ${caixa(645, 1090, "<b>Abre um PR</b>", "font-size:26px")}
      ${caixa(430, 870, "<b>Segundo agente</b><br>revisa o trabalho", "width:230px;font-size:26px")}
      ${caixa(145, 980, "Você decide<br>o que entra<br>(merge)", `width:210px;font-size:26px;background:${VERDINHO}`)}
      ${curvaSeta(300, 760, 160, 770, 150, 900)}` },
    // 6. Tabela-resumo
    { html: `${fundo}
      <div class="abs serif" style="left:84px;right:60px;top:90px;font-size:92px;line-height:1.05">Engenharia de loops<br>com o Claude</div>
      <div class="abs" style="left:56px;right:56px;top:330px;background:#fff;border:3px solid #1f1e1d;border-radius:22px;overflow:hidden;font-size:26px;line-height:1.3">
        <div style="display:grid;grid-template-columns:140px 300px 245px 1fr;column-gap:16px;padding:22px 26px;border-bottom:3px solid #1f1e1d;font-weight:600">
          <div>Loop</div><div>O que você delega</div><div>Use quando</div><div>Recorra a</div></div>
        ${[["Por turno", "a verificação", "Você está explorando ou decidindo", "Skills de verificação personalizadas"],
           ["Por meta", "a condição de parada", "Você sabe o que é “pronto”", cmd("/goal")],
           ["Por tempo", "o gatilho", "O trabalho acontece fora do projeto, numa agenda", cmd("/loop") + "<br>" + cmd("/schedule")],
           ["Proativo", "o prompt", "O trabalho é recorrente e bem definido", "Tudo isso, e fluxos dinâmicos"]]
          .map(([a, b, c, d], i) => `<div style="display:grid;grid-template-columns:140px 300px 245px 1fr;column-gap:16px;align-items:center;padding:0 26px;height:186px;${i < 3 ? "border-bottom:1.5px solid #cfccc2" : ""}">
            <div style="font-weight:700">${a}</div><div>${pill(b)}</div><div style="padding-right:20px">${c}</div><div>${d}</div></div>`).join("")}
      </div>` },
    // 7. Final
    { html: `${fundo}<div class="center"><h2 class="serif">Qual tipo de loop você já usa?</h2>
      <p class="sub">Conta nos comentários!</p>
      <p class="src">Fonte: Anthropic (@claudeai)</p></div>` }
  ]
};
