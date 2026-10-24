const lbl = (t, pos) => `<span class="chip" style="${pos};background:var(--clay);color:#fff;font-size:36px;z-index:3">${t}</span>`;
const POST = {
  bg: "#e6ddd0",
  slides: [
    { html: `${K.ttl("Transforme seus designs do Figma em código pronto para produção com o <span style='font-weight:600'>Claude</span>", 100, 80)}
      ${img("hero", "position:absolute;left:40px;top:450px;width:1000px", "shadow")}
      <div class="abs" style="left:0;right:0;top:1150px;text-align:center;font-size:36px">Arraste para ver como →</div>` },
    { html: `${K.pill("Passo 1", 150)}
      ${K.ttl("Conecte o Figma ao Claude", 220, 84)}
      ${K.sub("Abra o diretório de conectores do Claude e instale o conector do Figma.", 360)}
      <div class="abs bubble" style="left:70px;right:70px;top:620px;font-size:40px;color:#8a877e">Como posso ajudar hoje?<div style="display:flex;gap:16px;margin-top:40px"><span class="tagchip" style="font-size:36px;padding:6px 20px">+</span><span class="tagchip" style="font-size:30px;padding:6px 20px">🔌 Conectores</span></div></div>` },
    { html: `${img("mcp", "position:absolute;left:100px;top:90px;width:880px", "shadow")}
      ${K.pill("Passo 2", 810)}
      ${K.ttl("Ative o servidor MCP", 880, 80)}
      ${K.sub("No Dev Mode do Figma para computador, ative o <b>servidor MCP</b> para o Claude salvar o código no seu projeto.", 1000)}` },
    { html: `${K.pill("Passo 3", 100)}
      ${K.ttl("Compartilhe seu design", 170, 80)}
      ${K.sub("Copie o link do quadro no Figma e cole no Claude, pedindo o código.", 290)}
      ${K.ask("Gere o código React para este design:<br>www.figma.com/design/area-homepage", 440)}
      ${img("share", "position:absolute;left:90px;top:700px;width:900px", "shadow")}` },
    { html: `${K.ttl("Veja a mágica acontecer", 100, 84)}
      ${K.sub("O Claude analisa o seu design…", 220)}
      ${img("hero", "position:absolute;left:220px;top:340px;width:1300px;clip-path:inset(0 52% 0 0)")}
      ${lbl("Layout e espaçamento", "left:60px;top:470px")}${lbl("Cores e tipografia", "left:560px;top:620px")}
      ${lbl("Elementos interativos", "left:60px;top:800px")}${lbl("Estrutura dos componentes", "left:520px;top:960px")}` },
    { html: `${img("sparkle", "position:absolute;left:450px;top:100px;width:180px")}
      ${img("code", "position:absolute;left:50px;top:340px;width:980px", "shadow")}
      ${K.ttl("…e gera um código limpo e semântico, igual ao seu design", 1060, 70)}` },
    { html: K.examples("hands", "Exemplos do que você pode criar", ["Guias do design system com regras de uso", "Folhas de estilo alinhadas às variáveis do Figma", "Protótipos interativos que funcionam"]) },
    { html: K.tips("Dicas para melhores resultados", [
        ["t1", "Nomeie as camadas no Figma com cuidado", "o Claude usa esses nomes nas classes do código"],
        ["t2", "Use tokens de design", "o Claude reconhece suas variáveis de cor e espaçamento"],
        ["t3", "Diga qual framework quer", "“Gere em React com Tailwind” ou “Crie em HTML e CSS puro”"]]) },
    { html: K.steps3("Comece em 3 passos", ["Conecte o Figma pelo diretório de conectores do Claude", "Ative o servidor MCP no Figma para computador", "Cole um link do Figma e peça o código ao Claude"], "Fonte: Anthropic (@claudeai) e Figma (@figma)") }
  ]
};
