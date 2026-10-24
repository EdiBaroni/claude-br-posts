const POST = {
  bg: "#e6ddd0",
  slides: [
    { html: `${K.ttl("Crie conteúdo profissional em escala com o Canva e o <span style='font-weight:600'>Claude</span>", 110, 88)}
      ${img("hero", "position:absolute;left:50px;top:440px;width:980px", "shadow")}
      <div class="abs" style="left:0;right:0;top:1150px;text-align:center;font-size:36px">Arraste para ver como →</div>` },
    { html: `<div class="abs bubble" style="left:70px;right:70px;top:200px;font-size:40px;color:#8a877e">Como posso ajudar hoje?<div style="display:flex;gap:16px;margin-top:40px"><span class="tagchip" style="font-size:36px;padding:6px 20px">+</span><span class="tagchip" style="font-size:30px;padding:6px 20px">🔌 Conectores</span></div></div>
      ${K.pill("Passo 1", 640)}
      ${K.ttl("Conecte o Canva ao Claude", 720, 84)}
      ${K.sub("Abra o diretório de conectores do Claude e instale o conector do Canva.", 860)}` },
    { html: `${K.pill("Passo 2", 120)}
      ${K.ttl("Peça ao Claude um design a partir de um documento", 200, 80)}
      ${K.ask("Crie um infográfico com a cara da marca no <b style='font-style:normal'>Canva</b>, com base neste post do blog.", 480)}
      ${img("doc", "position:absolute;left:380px;top:820px;width:330px", "shadow")}` },
    { html: `${K.ttl("Veja a mágica acontecer", 100, 84)}
      ${K.sub("O Claude lê o documento e encontra as informações principais…", 220)}
      <div class="abs" style="left:60px;right:60px;top:360px;background:#fbfaf6;border-radius:30px;padding:36px 40px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="background:#efede6;border-radius:16px;padding:18px 26px;font-size:32px">Crie um infográfico com a cara da marca no Canva, com base neste post do blog.</div>
        <div class="serif" style="font-size:34px;line-height:1.42;margin-top:24px;font-weight:400">Vou criar um infográfico com base no seu post sobre a viagem a Osaka. Ele vai funcionar bem nas redes sociais ou como resumo visual do roteiro de 48 horas.
          <div style="font-family:'DM Sans';font-size:26px;color:#77746b;margin:20px 0;border:2px solid #e7e5de;border-radius:10px;padding:10px 18px">🎨 generate-design</div>
          Pronto! Gerei 4 opções diferentes de infográfico para o seu post. Aqui estão:</div>
      </div>` },
    { html: `${img("sparkle", "position:absolute;left:460px;top:100px;width:170px")}
      ${img("design", "position:absolute;left:50px;top:330px;width:980px", "shadow")}
      ${K.ttl("…e cria um design caprichado no Canva", 1080, 74)}` },
    { html: K.examples("hand", "Exemplos do que você pode criar", ["Um carrossel do Instagram para um post recente do blog", "Panfletos para o próximo evento da empresa", "Miniaturas para o vídeo de lançamento de um produto"]) },
    { html: K.tips("Dicas para melhores resultados", [
        ["t1", "Monte um kit de marca no Canva", "com as fontes, cores, logos e imagens da sua marca"],
        ["t2", "Diga onde e como o design será usado", "para o Claude escolher o formato e o modelo certos"],
        ["t3", "Peça várias opções com estilos diferentes", "como profissional, vibrante ou minimalista"]]) },
    { html: K.steps3("Comece em 3 passos", ["Abra o diretório de conectores do Claude", "Conecte o <b>Canva</b>", "Peça ao Claude para criar um design"], "Fonte: Anthropic (@claudeai) e Canva (@canva)") }
  ]
};
