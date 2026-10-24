const ttl = (t, y = 110, size = 80) => `<div class="abs serif" style="left:60px;right:60px;top:${y}px;text-align:center;font-size:${size}px;line-height:1.1">${t}</div>`;
const POST = {
  bg: "#e6ddcf",
  slides: [
    { html: `${ttl("Como qualquer pessoa pode usar os Artifacts do <span style='font-weight:600'>Claude</span> para visualizar dados", 120, 92)}
      ${img("bars", "position:absolute;left:0;bottom:0;width:1080px")}` },
    { html: `${ttl("Descreva seu objetivo: que padrões você quer encontrar?", 100, 74)}
      <div class="abs" style="left:0;right:0;top:290px;text-align:center;font-size:40px;color:var(--soft)">Depois envie a planilha, mesmo que esteja bagunçada</div>
      <div class="abs bubble" style="left:70px;right:70px;top:400px;font-size:36px;line-height:1.4">Analise a disponibilidade dos membros do clube de debate e crie visualizações mostrando:<br><br>1) Os melhores horários de reunião por turma<br>2) Os padrões de disponibilidade na semana<br>3) Quando a diretoria e os demais membros coincidem<br><br>Deixe interativo, para eu filtrar por grupo.<div class="send">↑</div></div>
      <div class="abs" style="right:110px;top:1010px;width:250px;height:200px;background:#fbfaf6;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:22px;font-size:26px;color:#77746b">Horários das aulas<br>Clube de debate<div style="margin-top:46px;font-size:22px;font-weight:700">CSV</div></div>` },
    { html: `${img("sparkle", "position:absolute;left:470px;top:110px;width:140px")}
      ${img("build", "position:absolute;left:50px;top:310px;width:980px", "shadow")}
      ${ttl("Veja o Claude criar seu Artifact em tempo real", 960, 76)}` },
    { html: `${ttl("Mude qualquer coisa com pedidos simples", 110, 80)}
      <div class="abs bubble" style="left:260px;right:70px;top:330px;font-size:36px;z-index:2">Adicione filtros para treino e para preparação de torneio, e troque as cores pelas do clube (azul e dourado).<div class="send">↑</div></div>
      ${img("chart", "position:absolute;left:80px;top:640px;width:860px", "shadow")}` },
    { html: `${img("lupa", "position:absolute;left:430px;top:110px;width:220px")}
      ${img("filtro", "position:absolute;left:50px;top:390px;width:980px", "shadow")}
      ${ttl("Use os elementos interativos para explorar os dados a fundo", 950, 72)}` },
    { type: "center", title: "Você não precisa ser técnico para criar coisas técnicas",
      sub: "Crie o seu em <b>claude.ai/artifacts</b>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
