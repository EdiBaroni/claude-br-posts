const icon = n => img(n, "position:absolute;left:0;right:0;margin:0 auto;top:90px;height:130px");
const POST = {
  bg: "#e6ddd0",
  slides: [
    { html: `${K.ttl("Tela do humor", 90, 110)}
      <div class="abs" style="left:0;right:0;top:230px;text-align:center;font-size:44px;font-family:'Source Serif 4',serif">Criado com <span style="color:var(--clay)">✳</span> <b>Claude</b></div>
      <div class="abs" style="left:60px;right:60px;top:340px;height:760px;border-radius:24px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,.18)">
        ${img("art", "width:100%;height:100%;object-fit:cover")}
        <div class="abs" style="left:0;right:0;top:40px;text-align:center;color:#fff;font-size:36px">Gere arte algorítmica com base no seu humor</div>
        <div class="abs" style="left:40px;right:40px;bottom:36px;background:rgba(0,0,0,.6);border:2px solid #555;border-radius:14px;padding:18px 26px;color:#fff;font-size:34px">Animada!</div>
      </div>
      <div class="abs" style="left:0;right:0;top:1150px;text-align:center;font-size:36px;font-weight:600">Arraste para ver como foi feito →</div>` },
    { html: `${icon("laptop")}${K.ttl("1. Abra a área de Artifacts na barra lateral", 260, 80)}
      ${img("sidebar", "position:absolute;left:60px;top:520px;width:960px", "shadow")}` },
    { html: `${icon("bulb")}${K.ttl("2. Comece explorando sua ideia", 260, 80)}
      ${K.ask("Quero criar um app em que você digita como está se sentindo e ele cria uma arte algorítmica que representa essa emoção. Por exemplo, “ansioso” gera padrões vermelhos e caóticos, e “tranquilo” cria ondas azuis suaves.", 520)}` },
    { html: `${icon("bubbles")}${K.ttl("3. Deixe o Claude entrevistar você", 260, 80)}
      <div class="abs" style="left:60px;right:60px;top:480px;background:#fbfaf6;border-radius:26px;padding:40px 44px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div class="serif" style="font-size:36px;line-height:1.45;font-weight:400">Adorei a ideia! Algumas perguntas rápidas para acertar a visão:<br><br>
        <b style="font-weight:600">1. Estilo visual:</b> partículas e formas abstratas, ou padrões orgânicos e fluidos?<br>
        <b style="font-weight:600">2. Detecção de emoção:</b> analisar o texto com IA ou usar temas emocionais definidos?<br>
        <b style="font-weight:600">3. Interação:</b> animação em tempo real enquanto digita, ou gerar depois de apertar Enter?<br>
        <b style="font-weight:600">4. Complexidade:</b> simples e elegante, ou rico em camadas e efeitos?<br><br>O que parece certo para você?</div>
      </div>` },
    { html: `${icon("code")}${K.ttl("4. Peça ao Claude para construir", 260, 80)}
      <div class="abs" style="left:80px;right:80px;top:500px;background:#fbfaf6;border-radius:26px;padding:40px 44px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="background:#efede6;border-radius:16px;padding:20px 26px;font-size:36px">Parece ótimo, pode construir!</div>
        <div class="serif" style="font-size:38px;line-height:1.42;margin-top:30px;font-weight:400">Perfeito! Vou criar o seu gerador de arte das emoções. Vai ser uma experiência bonita e interativa, em que seus sentimentos viram arte visual única.</div>
        <div style="margin-top:30px;border:3px solid #9cb8e0;border-radius:16px;padding:22px 28px;font-size:32px"><b>Arte algorítmica das emoções</b><br><span style="color:#77746b;font-size:28px">Artifact interativo</span></div>
        <div style="color:var(--clay);font-size:56px;margin-top:20px">✳</div>
      </div>` },
    { html: `${icon("party")}${K.ttl("Pronto!", 250, 100)}
      <div class="abs" style="left:0;right:0;top:390px;text-align:center;font-size:44px">Faça o seu em <b>claude.ai/artifacts</b></div>
      ${img("final", "position:absolute;left:130px;top:490px;width:820px", "shadow")}
      <div class="abs" style="left:0;right:0;top:1150px;text-align:center;font-size:28px;color:var(--soft)">Fonte: Anthropic (@claudeai)</div>` }
  ]
};
