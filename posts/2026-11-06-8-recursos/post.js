const f = (eyebrow, title, im, note) => ({ type: "feature", eyebrow, title, img: im, note });
const POST = {
  bg: "#faf9f5",
  slides: [
    { html: `
      <span class="chip" style="left:380px;top:200px;font-size:32px;font-style:italic"><span style="color:var(--clay)">✳</span> Explorando…</span>
      <span class="chip" style="right:80px;top:320px">Uso do computador</span>
      <span class="chip" style="left:60px;top:880px">Projetos no Cowork</span>
      <span class="chip" style="right:90px;top:930px">Dispatch</span>
      <div class="abs serif" style="left:0;right:0;top:430px;text-align:center;font-size:118px;line-height:1.04">8 recursos do<br><span style="font-weight:600">Claude</span> que talvez<br>você não conheça</div>
      <div class="abs" style="left:0;right:0;top:1050px;text-align:center;font-size:70px">→</div>` },
    f("Memória", "Para quando você não quer se apresentar de novo", "memoria", "Traga sua memória de outros assistentes de IA. Disponível também no plano gratuito."),
    f("Excel + PowerPoint", "Para quando seu trabalho vive em planilhas e apresentações", "excel", "O Claude analisa os dados no Excel, cria o gráfico e já leva para a apresentação."),
    f("Gráficos e diagramas na conversa", "Para quando você precisa ver a resposta, não só ler", "graficos"),
    f("Dispatch", "Para quando você precisa do computador, mas só tem o celular", "dispatch", "Peça pelo celular e o Claude faz a tarefa no seu computador."),
    f("Projetos no Cowork", "Para quando você quer fazer mais com seus projetos", "projetos"),
    f("Canais no Claude Code", "Para quando o código não pode esperar você voltar ao terminal", "canais", "Converse com o Claude Code pelo Discord ou Telegram."),
    f("Uso do computador", "Para quando você prefere descrever a tarefa a ficar clicando", "computador", "No Cowork e no Claude Code, o Claude controla os apps que você permitir."),
    f("Modo automático no Claude Code", "Para quando você quer que o Claude trabalhe por mais tempo, com menos pausas", "automatico"),
    { type: "center", title: "Qual desses você já usa?", sub: "Baixe o app do Claude para computador em <b>claude.com/download</b>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
