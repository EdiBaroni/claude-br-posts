const curve = d => `<svg class="line" viewBox="0 0 1080 1350"><path d="${d}"/></svg>`;
const scene = (title, prompt, extra, d) => `
  ${curve(d)}
  <div class="z serif" style="left:60px;right:60px;top:100px;text-align:center;font-size:70px;line-height:1.08">${title}</div>
  <div class="z bubble" style="left:70px;width:820px;top:300px;font-size:34px">${prompt}<div class="send">↑</div></div>
  ${extra}`;
const POST = {
  bg: "#faf9f5",
  slides: [
    { html: `
      ${curve("M 1100 300 C 900 380, 880 520, 1000 640 C 1100 740, 1000 900, 1040 1010 C 1060 1080, 1100 1100, 1120 1110")}
      <span class="chip z" style="left:60px;top:110px">O que os clientes dizem de nós?</span>
      <span class="chip z" style="right:80px;top:210px">O que postar esta semana?</span>
      <span class="chip z" style="left:60px;top:310px">Como captar contatos fora do horário?</span>
      <div class="z serif" style="left:96px;top:440px;width:900px;font-size:104px;line-height:1.02">Novas formas de usar o <span style="font-weight:600">Claude</span> nos Pequenos Negócios</div>
      ${img("awning", "position:absolute;right:110px;top:830px;width:210px;z-index:1")}
      <div class="z" style="left:96px;top:840px;width:560px;font-size:36px;line-height:1.38">Conversamos com 1.000 donos de pequenos negócios na América do Norte para trazer algumas ideias.</div>
      <span class="chip z" style="left:60px;top:1110px">A folha de pagamento está pronta?</span>
      <span class="chip z" style="right:80px;top:1130px">Como está o estoque?</span>` },
    { html: scene("Monte uma proposta enquanto a reunião ainda está fresca",
      "Aqui estão meu áudio e as fotos da visita à Harbord Dental. <b>Monte a proposta com o meu modelo</b>, preço padrão, doze unidades, entrega semanal. <b>Envie para assinatura quando eu aprovar.</b>",
      `${img("prop-logos", "position:absolute;left:80px;top:760px;width:280px;z-index:1")}
       ${img("prop-card", "position:absolute;right:80px;top:800px;width:440px;z-index:1", "shadow")}`,
      "M -20 420 C 120 480, 60 700, 200 820 C 340 940, 420 1060, 560 1000 C 700 940, 640 1180, 1100 1080") },
    { html: scene("Nunca perca um contato, mesmo quando ele chega fora do horário",
      "A Harbord Dental acabou de pedir informações sobre café no atacado. Qualifique pelos meus critérios no HubSpot, <b>escreva uma resposta com dois horários da minha agenda</b> e registre o contato no Apollo. <b>Não envie sem mim.</b>",
      `${img("lead-hub", "position:absolute;right:50px;top:330px;width:130px;z-index:2")}
       ${img("lead-logos", "position:absolute;left:80px;top:840px;width:300px;z-index:1")}
       ${img("lead-card", "position:absolute;right:80px;top:790px;width:440px;z-index:1", "shadow")}`,
      "M -20 900 C 150 840, 260 1000, 420 940 C 580 880, 520 700, 760 620 C 960 560, 1000 420, 940 340") },
    { html: scene("Crie um calendário de conteúdo com os dados da sua própria loja",
      "As inscrições no Coffee Club caíram três semanas seguidas. Monte um calendário de conteúdo de duas semanas, puxe imagens e preços da Shopify, escreva as legendas e prepare tudo no Canva. <b>Espere minha revisão antes de postar.</b>",
      `${img("cal-shop", "position:absolute;left:400px;top:760px;width:150px;z-index:1")}
       ${img("cal-logos", "position:absolute;left:70px;top:900px;width:260px;z-index:1")}
       ${img("cal-card", "position:absolute;right:70px;top:820px;width:450px;z-index:1", "shadow")}`,
      "M -20 820 C 160 760, 300 840, 470 800 C 600 770, 520 1060, 300 1080 C 200 1090, 400 1180, 1100 1060") },
    { html: scene("Faça todas as suas ferramentas conversarem com o Claude",
      "O BeanTrack tem os dados da minha torrefação, mas o Claude não consegue acessá-los. Me ajude a conectar, para que <b>o resumo de segunda e o fechamento do mês puxem os lotes de torra e o estoque. Só leitura, por enquanto.</b>",
      `${img("tools-zap", "position:absolute;left:340px;top:780px;width:140px;z-index:1")}
       <div class="z say" style="left:70px;top:960px;width:470px;font-size:28px;padding:22px 28px"><span style="color:var(--clay)">●</span> O resumo de segunda e o fechamento do mês agora puxam dados do BeanTrack.<div style="font-size:22px;color:#8a877e;margin-top:6px">Claude · agora</div></div>
       ${img("tools-card", "position:absolute;right:70px;top:790px;width:420px;z-index:1", "shadow")}`,
      "M 1100 250 C 700 200, 560 380, 700 560 C 800 700, 300 700, 400 880 C 460 990, 200 1000, -20 1180") },
    { type: "center", icon: img("sprout", "width:300px;margin-bottom:60px"),
      title: "Administre e faça seu negócio crescer", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
