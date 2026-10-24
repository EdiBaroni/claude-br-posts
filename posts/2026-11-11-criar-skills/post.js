const step = (n, t, sub) => `
  <div class="abs" style="left:0;right:0;top:110px;text-align:center;font-size:30px;letter-spacing:.08em;color:var(--soft)">PASSO ${n}</div>
  <div class="abs serif" style="left:60px;right:60px;top:160px;text-align:center;font-size:84px">${t}</div>
  <div class="abs" style="left:120px;right:120px;top:290px;text-align:center;font-size:38px;line-height:1.38;color:var(--soft)">${sub}</div>`;
const POST = {
  bg: "#e6ddd0",
  slides: [
    { html: `
      <div class="abs serif" style="left:60px;right:60px;top:110px;text-align:center;font-size:86px;line-height:1.08">As Skills guardam seus melhores processos para o <span style="font-weight:600">Claude</span> usar sozinho</div>
      ${img("lamp", "position:absolute;left:150px;top:470px;width:780px")}
      <div class="abs" style="left:0;right:0;top:1060px;text-align:center"><span class="tagchip" style="font-size:36px;padding:18px 40px">Veja como configurar &nbsp;→</span></div>` },
    { html: `
      ${img("files", "position:absolute;left:220px;top:90px;width:640px")}
      <div class="abs serif" style="left:60px;right:60px;top:830px;text-align:center;font-size:76px;line-height:1.1">As Skills dão ao <span style="font-weight:600">Claude</span> um jeito consistente de fazer cada tarefa</div>
      <div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:40px;color:var(--soft)">Como receitas de como você gosta de trabalhar.</div>` },
    { html: `${step(1, "Descreva a Skill", "Diga para que ela serve e quais documentos deve consultar.")}
      <div class="abs bubble" style="left:80px;right:80px;top:560px;font-size:44px">Me ajude a criar uma Skill para a nossa pizzaria que garanta que <b style="font-style:normal">tudo o que criarmos siga o nosso guia de marca</b>.<div class="send">↑</div></div>` },
    { html: `${step(2, "Construa a Skill", "O Claude guia você em toda a configuração.<br>Sem precisar editar arquivos à mão.")}
      ${img("complete", "position:absolute;left:60px;top:470px;width:960px", "shadow")}` },
    { html: `
      <div class="abs" style="left:70px;right:70px;top:90px;background:#fbfaf6;border-radius:30px;padding:40px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="background:#efede6;border-radius:18px;padding:22px 28px;font-size:34px;line-height:1.35">Toda sexta à noite temos massa de fermentação natural. Pode <b>escrever 10 legendas para as redes sociais com a nossa voz de marca</b>?</div>
        <div class="serif" style="font-size:34px;line-height:1.42;margin-top:28px;font-weight:400">Vou criar 10 legendas para a sexta da fermentação natural, com o seu tom acolhedor e autêntico. Vamos lá:<br><br>
        1. Nosso fermento natural já viu de tudo. Principalmente sextas lotadas. Venha conferir.<br>
        2. Tem fermento aqui mais velho que boa parte da equipe. Prove hoje à noite.<br>
        3. A temporada da fermentação natural abriu. Aviso: acaba rápido. Muito rápido.</div>
      </div>
      <div class="abs" style="left:0;right:0;top:980px;text-align:center;font-size:30px;letter-spacing:.08em;color:var(--soft)">PASSO 3</div>
      <div class="abs serif" style="left:60px;right:60px;top:1030px;text-align:center;font-size:84px">Use a Skill</div>
      <div class="abs" style="left:120px;right:120px;top:1145px;text-align:center;font-size:34px;color:var(--soft)">O Claude usa a Skill sozinho quando faz sentido.</div>` },
    { html: `
      ${img("grid", "position:absolute;left:0;top:0;width:1080px")}
      <div class="abs serif" style="left:60px;right:60px;top:1000px;text-align:center;font-size:90px">As possibilidades<br>não têm fim</div>` },
    { html: `
      <div class="abs serif" style="left:50px;right:50px;top:400px;background:var(--clay);padding:80px 40px;text-align:center;font-size:96px;line-height:1.1;transform:rotate(-1deg)">Quais Skills você está usando?</div>
      <div class="abs" style="left:0;right:0;top:780px;text-align:center;font-size:40px;color:var(--soft)">Conta aqui nos comentários</div>
      <div class="abs" style="left:0;right:0;top:850px;text-align:center;font-size:100px">↓</div>
      <div class="abs" style="left:0;right:0;top:1100px;text-align:center;font-size:30px;color:var(--soft)">Fonte: Anthropic (@claudeai)</div>` }
  ]
};
