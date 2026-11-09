// Como a equipe da Anthropic usa o Claude Duet (depoimentos).
// Regras: fotos das pessoas trocadas por iniciais; telas do app recriadas com o texto original;
// depoimentos traduzidos.
const CORES = { B: "#d97757", C: "#5f9a82", M: "#7a6fb0", H: "#c08a3e", D: "#4f7fa8", P: "#b0607a", G: "#3f8f8a", N: "#8a7a5c" };
const curva = (d) => `<svg class="abs" style="inset:0;z-index:0" width="1080" height="1350" viewBox="0 0 1080 1350"><path d="${d}" fill="none" stroke="#9d9abf" stroke-opacity=".45" stroke-width="10" stroke-linecap="round"/></svg>`;
const fundoLilas = "linear-gradient(180deg,#d8d6e8 0%,#c3c1da 100%)";
const avatar = (ini, w = 210, h = 280, fs = 110) => `<div style="flex:0 0 ${w}px;width:${w}px;height:${h}px;border-radius:22px;background:${CORES[ini]};color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Source Serif 4',serif;font-size:${fs}px;box-shadow:0 0 0 5px #fff">${ini}</div>`;
// Cartão do depoimento, com a aba do título em cima
const cartao = (aba, ini, frase, nome, cargo) => `
  <div class="abs" style="left:66px;right:66px;bottom:150px;z-index:2">
    <div style="display:inline-block;background:#fff;border-radius:22px 22px 0 0;padding:16px 30px 10px;font-size:30px;font-weight:600">${aba}</div>
    <div style="background:rgba(255,255,255,.28);border:5px solid #fff;border-radius:0 30px 30px 30px;padding:40px 40px 40px 40px;display:flex;gap:40px;align-items:flex-start">
      ${avatar(ini)}
      <div style="flex:1">
        <div class="serif" style="font-size:43px;line-height:1.2;text-indent:-0.4em">“${frase}”</div>
        <div style="margin-top:28px;font-size:27px;line-height:1.3"><b style="font-weight:700">${nome}</b>, ${cargo}</div>
      </div>
    </div>
  </div>`;
const branco = "background:#fff;border-radius:24px;box-shadow:0 14px 40px rgba(40,30,80,.12);";
const logoDuet = `<div style="flex:0 0 76px;height:76px;border-radius:18px;background:#fff;box-shadow:0 0 0 2px #e6e4ee;display:flex;align-items:center;justify-content:center"><div style="width:58px;height:58px;border-radius:50%;background:#d97757;display:flex;align-items:center;justify-content:center"><svg width="40" height="22" viewBox="0 0 40 22"><path d="M3 15c3-9 9-9 8-2s5 7 7-1 8-8 8 0 5 7 11-3" fill="none" stroke="#1f1e1d" stroke-width="3" stroke-linecap="round"/></svg></div></div>`;
const notificacao = (hora, texto, top) => `<div class="abs" style="left:110px;right:110px;top:${top}px;${branco}padding:28px 32px;display:flex;gap:26px;align-items:center;z-index:2">${logoDuet}
  <div style="flex:1;font-size:29px;line-height:1.3"><div style="display:flex;justify-content:space-between"><b style="font-weight:700">Claude Duet</b><span style="color:#6b6880;font-size:25px">${hora}</span></div>${texto}</div></div>`;
const icone = {
  cal: `<svg width="30" height="30" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" stroke="#1f1e1d" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="#1f1e1d" stroke-width="2"/></svg>`,
  inbox: `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M3 13l3-8h12l3 8v6H3z" fill="none" stroke="#1f1e1d" stroke-width="2" stroke-linejoin="round"/><path d="M3 13h5l1 3h6l1-3h5" fill="none" stroke="#1f1e1d" stroke-width="2"/></svg>`,
  doc: `<svg width="30" height="30" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="#1f1e1d" stroke-width="2" stroke-linejoin="round"/><path d="M9 12h6M9 16h6" stroke="#1f1e1d" stroke-width="2"/></svg>`
};
const chip = (ic, t, d) => `<div style="${branco}border-radius:18px;padding:18px 24px;display:flex;gap:18px;align-items:flex-start;font-size:26px;line-height:1.3">${icone[ic]}<div>${t}<br><span style="color:#55526a">“${d}”</span></div></div>`;

const POST = {
  bg: "#c9c7de",
  slides: [
    // 1. Capa
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>
      <div class="abs" style="left:0;right:0;top:120px;display:flex;justify-content:center;gap:34px">
        ${[["C", "Chelsea"], ["M", "Mike"], ["H", "Hugh"], ["D", "Dan"]].map(([i, n], k) => `<div style="margin-top:${[40, 0, 60, 10][k]}px;text-align:center">${avatar(i, 190, 240, 96)}<div style="margin-top:16px;font-size:26px;font-weight:600">${n}</div></div>`).join("")}
      </div>
      <div class="abs" style="left:0;right:0;top:520px;text-align:center">
        <div style="display:inline-flex;align-items:center;gap:16px;font-family:'Source Serif 4',serif;font-size:44px">${logoDuet.replace(/76px/g, "60px").replace(/58px/g, "46px")}Claude Duet</div>
        <div class="serif" style="margin:34px 70px 0;font-size:70px;line-height:1.1">A Anthropic anda rápido.<br>Veja como a equipe<br>acompanha o ritmo.</div>
      </div>
      <div class="abs" style="left:0;right:0;top:905px;display:flex;justify-content:center;gap:34px">
        ${[["N", "Neel"], ["P", "Pierce"], ["G", "Gabe"], ["B", "Boris"]].map(([i, n], k) => `<div style="margin-top:${[0, 30, 10, 36][k]}px;text-align:center">${avatar(i, 160, 200, 80)}<div style="margin-top:12px;font-size:24px;font-weight:600">${n}</div></div>`).join("")}
      </div>` },
    // 2. Boris
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M-40 420 C 200 80, 520 40, 600 220 S 380 520, 300 300 S 700 -40, 1120 160")}
      <div class="abs" style="left:110px;top:150px;background:#1f1e1d;color:#fff;border-radius:24px;padding:26px 34px;display:flex;gap:22px;align-items:center;font-size:30px;line-height:1.3;max-width:640px;z-index:2">
        <svg width="44" height="30" viewBox="0 0 44 30">${[4, 12, 20, 28, 36].map((x, i) => `<rect x="${x}" y="${[10, 4, 0, 6, 11][i]}" width="4" height="${[10, 22, 30, 18, 8][i]}" rx="2" fill="#fff"/>`).join("")}</svg>
        Ask Edwin if he can look at the doc by tomorrow.</div>
      <div class="abs" style="left:430px;top:330px;${branco}padding:22px 30px;display:flex;gap:18px;align-items:center;font-size:27px;font-weight:500;line-height:1.3;max-width:560px;z-index:2">
        <svg width="30" height="30" viewBox="0 0 30 30"><path d="M15 3a12 12 0 1 1-12 12" fill="none" stroke="#1f1e1d" stroke-width="3" stroke-linecap="round"/></svg>
        Checking your recent docs and threads with Edwin</div>
      ${cartao("Comande o dia pelo celular", "B", "Enquanto caminho, vou mandando pedidos para o Claude. Ele responde rápido quando dá; senão, faz uma pesquisa mais a fundo. Ele leva o tempo que precisa para acertar.", "Boris Cherny", "líder do Claude Code")}` },
    // 3. Chelsea
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M1120 120 C 900 -40, 760 260, 980 400 S 1180 620, 760 560")}
      <div class="abs" style="left:90px;top:110px;background:#f5f4f9;border-radius:30px;padding:30px 38px;font-size:36px;line-height:1.3;max-width:640px;z-index:2">Morning, Chelsea. A few things I can pull together for you today.</div>
      <div class="abs" style="left:480px;right:90px;top:280px;display:flex;flex-direction:column;gap:14px;z-index:2">
        ${chip("cal", "Week ahead", "What’s on my calendar this week?")}${chip("inbox", "Inbox sweep", "Anything in my mail that needs me today?")}${chip("doc", "Contract status", "Where does the Halcyon MSA stand?")}
      </div>
      ${cartao("Fique presente com a equipe", "C", "Ele me traz o que eu preciso saber antes de eu pedir, e assim consigo ficar acima do barulho. Nem tenho mais o Slack no celular.", "Chelsea Larsson", "Design Comportamental, Claude Duet")}` },
    // 4. Mike
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M-40 120 C 240 -60, 380 300, 160 380 S 520 560, 880 120 S 1100 40, 1120 300")}
      <div class="abs" style="left:170px;top:170px;background:#f6c8ad;border-radius:26px;padding:24px 34px;font-size:34px;z-index:2">How are we tracking?</div>
      <div class="abs" style="left:300px;top:300px;background:#fbf9f3;border-radius:26px;padding:26px 34px;font-size:32px;line-height:1.35;max-width:600px;box-shadow:0 14px 40px rgba(40,30,80,.12);z-index:2">Three PRs landed. You still haven’t sent that email you said you would.</div>
      ${cartao("Defina as metas do dia e mantenha o foco", "M", "É quase como ter um chefe de gabinete me mantendo no rumo. Ele confere e avisa: ‘Ei, já passou da metade. Isso ainda não saiu.’", "Mike Krieger", "Anthropic Labs")}` },
    // 5. Hugh
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M300 -40 C 260 200, 100 300, -40 420")}
      <div class="abs" style="left:230px;right:230px;top:150px;${branco}padding:32px 38px;font-size:30px;line-height:1.3;z-index:2">
        <b style="font-weight:700;font-size:32px">Partner call follow-ups</b>
        <div style="margin-top:18px;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;gap:16px;align-items:center"><svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="#1f1e1d"/><path d="M8 14l4 4 8-8" fill="none" stroke="#fff" stroke-width="3"/></svg>Recap drafted</div>
          <div style="display:flex;gap:16px;align-items:center"><svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 2a12 12 0 1 1-12 12" fill="none" stroke="#1f1e1d" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 4"/></svg>Updating the CRM</div>
          <div style="display:flex;gap:16px;align-items:center"><span style="font-size:26px;width:28px;text-align:center">✋</span>Share the dashboard<span style="margin-left:auto;color:#2f6fb0;font-size:26px">Needs input</span></div>
        </div></div>
      ${cartao("Nunca perca um retorno", "H", "Depois das reuniões, sempre ficam retornos e tarefas. Ele me diz quais são e até assume algumas quando eu deixo.", "Hugh Durkin", "Parcerias")}` },
    // 6. Dan
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M260 -40 C 420 160, 760 220, 1120 360")}
      ${notificacao("7:30 AM", "Nothing urgent overnight. Reference call booked Thursday, between lunch and dinner.", 340)}
      ${cartao("Notebook fechado nas férias", "D", "Acordo toda manhã com um resumo para ler no café, garantindo que nada escape. Não precisei abrir o computador nenhuma vez.", "Dan Barber", "Operações de Produto")}` },
    // 7. Pierce
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M-40 560 C 300 470, 700 520, 1120 440")}
      <div class="abs" style="left:240px;right:240px;top:190px;${branco}padding:34px 40px;font-size:30px;line-height:1.3;z-index:2">
        <b style="font-weight:700;font-size:30px">Apartment tours, Saturday</b>
        <div style="margin-top:18px;display:grid;grid-template-columns:150px 1fr;column-gap:18px;row-gap:6px">
          <b style="font-weight:700">10:00 AM</b><span>2-bed near the park</span>
          <span></span><span style="color:#6b6880;font-size:22px">15 min walk</span>
          <b style="font-weight:700">10:45 AM</b><span>1-bed with an office</span>
          <span></span><span style="color:#6b6880;font-size:22px">20 min drive</span>
          <b style="font-weight:700">11:45 AM</b><span>Top-floor 2-bed</span>
        </div></div>
      ${cartao("Deixe a busca de apartamento com ele", "P", "O Claude achou um monte de lugares, montou comparações, descartou opções com critérios bem difíceis e ainda marcou as visitas para mim.", "Pierce Clark", "engenheiro")}` },
    // 8. Gabe
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>${curva("M-40 470 C 240 380, 560 520, 760 360 S 860 40, 620 60 S 560 420, 1120 300")}
      <div class="abs" style="left:190px;right:190px;top:260px;height:110px;${branco}opacity:.45;z-index:2"></div>
      <div class="abs" style="left:150px;right:150px;top:290px;height:110px;${branco}opacity:.7;z-index:2"></div>
      ${notificacao("now", "Someone in Slack flagged an issue with a PR you merged today. Want to see the thread?", 340)}
      ${cartao("Ache a mensagem que precisa de você", "G", "Ele me avisou que estavam falando de um problema causado por um dos meus PRs. Aquilo tinha se perdido nas minhas notificações do Slack.", "Gabe Mulley", "engenheiro, Claude Duet")}` },
    // 9. Final
    { html: `<div class="abs" style="inset:0;background:${fundoLilas}"></div>
      <div class="center"><h2 class="serif" style="font-size:88px">Qual dessas tarefas você passaria para o Claude?</h2>
      <p class="sub">O Claude Duet está em prévia de pesquisa para assinantes Pro e Max nos Estados Unidos. Lista de espera em <b>claude.com/claude-duet</b></p>
      <p class="src">Fonte: Anthropic (@claudeai)</p></div>` }
  ]
};
