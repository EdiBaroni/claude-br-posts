const art = (name, desc, im, top = true) => ({ html: top
  ? `${K.ttl(name, 100, 84)}${K.sub(desc, 220)}${img(im, "position:absolute;left:90px;top:400px;width:900px;max-height:780px;object-fit:contain", "shadow")}`
  : `${img(im, "position:absolute;left:90px;top:80px;width:900px;max-height:780px;object-fit:contain", "shadow")}${K.ttl(name, 920, 84)}${K.sub(desc, 1040)}` });
const POST = {
  bg: "#e6ddd0",
  slides: [
    { html: `<div class="abs" style="left:0;right:0;top:90px;text-align:center;font-size:44px;font-family:'Source Serif 4',serif">Criado com <span style="color:var(--clay)">✳</span> <b>Claude</b></div>
      ${K.ttl("8 artifacts do Claude feitos para o trabalho", 180, 96)}
      ${img("cover", "position:absolute;left:150px;top:480px;width:780px", "shadow")}
      <div class="abs" style="left:0;right:0;top:1160px;text-align:center;font-size:60px">→</div>` },
    art("Coach de programação", "Analise seu código e receba sugestões de melhoria", "coach"),
    art("Visualizador de CSV", "Transforme planilhas CSV em gráficos e tire dúvidas sobre os dados", "csv", false),
    art("Verificador de contraste", "Teste combinações de cores para garantir a acessibilidade na web", "contrast", false),
    art("Paleta do humor", "Envie uma imagem e extraia uma paleta de cores que combine com ela", "palette"),
    art("Do documento ao protótipo", "Transforme um documento de requisitos num protótipo funcional", "prd"),
    art("Organizador de anotações", "Transforme anotações soltas em documentos caprichados", "notes", false),
    art("Gerador de ideias", "Gere ideias com base no que o Claude sabe sobre sua empresa e seu produto", "brainstorm"),
    art("Pipoca da equipe", "Sorteie a ordem de fala da equipe em reuniões diárias", "popcorn", false),
    { type: "center", title: "Qual desses você usaria primeiro?",
      sub: "Crie o seu em <b>claude.ai/artifacts</b>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
