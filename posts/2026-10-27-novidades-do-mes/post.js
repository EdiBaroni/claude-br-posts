const NOVO = { t: "Novo", c: "var(--green)" }, ATUAL = { t: "Atualização", c: "var(--clay)" }, BETA = { t: "Beta", c: "var(--amber)" };
const POST = {
  bg: "#faf9f5",
  slides: [
    { bg: "#cbcada", html: `
      <span class="chip" style="left:400px;top:330px;font-size:32px"><span style="color:var(--clay)">●</span>&nbsp; Atualizando…</span>
      <span class="chip" style="left:110px;top:440px">Claude 5.5</span>
      <span class="chip" style="right:100px;top:470px">Painéis</span>
      <span class="chip" style="left:60px;top:660px">Mods</span>
      <div class="abs serif" style="left:0;right:0;top:520px;text-align:center;font-size:150px;line-height:1.02">Novidades<br>do <span style="font-weight:600">Claude</span></div>
      <div class="abs serif" style="left:0;right:0;top:880px;text-align:center;font-size:50px;font-weight:400">Tudo o que foi lançado no último mês</div>
      <div class="abs" style="left:0;right:0;top:980px;text-align:center;font-size:70px">→</div>` },
    { type: "feature", eyebrow: "Claude 5.5", badge: NOVO, title: "Uma nova família de modelos, para todo tipo de trabalho", img: "c55",
      note: "<b>Opus 5.5:</b> o mais capaz, para trabalhos ambiciosos<br><b>Sonnet 5.5:</b> o mais eficiente, para o dia a dia<br><b>Haiku 5.5:</b> o mais rápido, para respostas curtas" },
    { type: "feature", eyebrow: "Chat e Cowork", badge: ATUAL, title: "O Claude traz o que a tarefa precisar", img: "cowork",
      note: "Escolha o formato da resposta: documento, apresentação, design ou um artifact, deixando o Claude escolher." },
    { type: "feature", eyebrow: "Artifacts", badge: NOVO, title: "Crie documentos, apresentações, designs e painéis em qualquer conversa", img: "artifacts" },
    { type: "feature", eyebrow: "Projetos no Claude Code", badge: BETA, title: "Veja todas as conversas de uma vez. Mude qualquer uma delas.", img: "projects" },
    { type: "feature", eyebrow: "Claude Code", badge: NOVO, title: "Termine a etapa em que está quando atingir seu limite", img: "wrapup",
      note: "Perto do limite de uso, o Claude Code conclui a etapa atual em vez de parar no meio do caminho." },
    { type: "feature", eyebrow: "Mods no Claude Code", badge: NOVO, title: "Adicione seus próprios comandos e painéis ao Claude Code", img: "mods" },
    { type: "feature", eyebrow: "Claude no CarPlay", badge: NOVO, title: "Pense em voz alta com o Claude no caminho do trabalho", img: "carplay" },
    { type: "feature", eyebrow: "Claude para Google Workspace", badge: BETA, title: "Trabalhe com o Claude no Google Docs, Planilhas e Apresentações", img: "gws" },
    { type: "center",
      icon: `<svg width="230" height="120" viewBox="0 0 230 120" fill="none" stroke="#1f1e1d" stroke-width="5" stroke-linecap="round"><path d="M18 22 Q10 50 30 60"/><path d="M212 22 Q220 50 200 60"/><circle cx="62" cy="78" r="34" fill="#e7e6df"/><circle cx="168" cy="78" r="34" fill="#e7e6df"/><path d="M96 74 Q115 60 134 74"/></svg><div style="height:50px"></div>`,
      title: "Qual você vai testar primeiro?", sub: "Conta aqui nos comentários 👇", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
