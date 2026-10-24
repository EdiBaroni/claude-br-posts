const tag = (t, c) => `<span class="tagchip"><i style="background:${c}"></i>${t}</span>`;
const head = (t, c, title) => `
  <div class="abs" style="left:0;right:0;top:70px;text-align:center">${tag(t, c)}</div>
  <div class="abs serif" style="left:80px;right:80px;top:180px;text-align:center;font-size:76px;line-height:1.06">${title}</div>`;
const POST = {
  bg: "#fbf9f5",
  slides: [
    { html: `
      <div class="abs serif" style="left:0;right:0;top:110px;text-align:center;font-size:150px">Crie</div>
      ${img("chips", "position:absolute;left:290px;top:310px;width:500px")}
      <div class="abs serif" style="left:0;right:0;top:880px;text-align:center;font-size:104px">em qualquer conversa</div>
      <div class="abs serif" style="left:0;right:0;top:1040px;text-align:center;font-size:52px;font-weight:400">O Claude cria. Você conduz.</div>` },
    { bg: "#dce9fa", html: `
      ${head("Docs", "#6d9be0", "Transforme a conversa em um documento")}
      ${img("docs-q", "position:absolute;left:50px;top:380px;width:420px")}
      <div class="abs say" style="left:500px;top:440px;width:520px">Agora escreva o one-pager de lançamento para a equipe de campo.</div>
      ${img("docs-doc", "position:absolute;left:90px;top:660px;width:900px")}
      <div class="abs" style="right:80px;top:1150px;width:640px;text-align:right;font-size:30px;line-height:1.35;color:var(--soft)">O Claude pergunta antes de começar e aponta o que precisa ser conferido.</div>` },
    { bg: "#f5e9d3", html: `
      ${head("Slides", "#e3a64f", "Transforme suas anotações em uma apresentação")}
      ${img("slides-zip", "position:absolute;left:90px;top:390px;width:210px")}
      <div class="abs say" style="left:440px;top:400px;width:560px">Transforme o one-pager numa apresentação para a revisão de sexta.</div>
      ${img("slides-deck", "position:absolute;left:220px;top:630px;width:640px")}
      <div class="abs" style="left:80px;right:80px;top:1180px;text-align:center;font-size:30px;line-height:1.35;color:var(--soft)">Marque o Claude num comentário onde quiser outra revisão.</div>` },
    { bg: "#e6e2f9", html: `
      ${head("Design", "#8f7fc4", "Transforme sua ideia num primeiro rascunho")}
      ${img("design-canvas", "position:absolute;right:60px;top:420px;width:480px", "shadow")}
      <div class="abs say" style="left:60px;top:430px;width:470px;font-size:29px">
        <div style="font-weight:600;font-size:26px">Frankie <span style="color:#8a877e;font-weight:400">· agora</span></div>
        <div style="margin-top:8px"><span style="background:#dfe6ff;color:#3d5bd9;border-radius:6px;padding:0 6px">@Claude</span> vamos usar este design de slide e criar as imagens para redes sociais, nos tamanhos padrão</div>
      </div>
      <div class="abs say" style="left:90px;top:880px;width:600px;font-size:31px">
        <div style="font-weight:600;font-size:27px"><span style="color:var(--clay)">●</span> Claude · via Frankie <span style="color:#8a877e;font-weight:400">· agora</span></div>
        <div style="margin-top:8px">Pode deixar! Vou abrir um canvas de design com os quatro tamanhos padrão para redes sociais.</div>
      </div>
      <div class="abs" style="right:70px;top:960px;width:300px;font-size:30px;line-height:1.35;color:var(--soft)">Ajuste à mão ou passe para seu designer dar os toques finais.</div>` },
    { type: "center", title: "Uma conversa, todas as partes do trabalho",
      sub: "Crie um artifact com o Claude em <b>claude.ai/artifacts</b>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
