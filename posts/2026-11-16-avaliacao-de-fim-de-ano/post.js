const ttl = (t, y = 130) => `<div class="abs serif" style="left:60px;right:60px;top:${y}px;text-align:center;font-size:80px;line-height:1.1">${t}</div>`;
const ask = (t, y) => `<div class="abs bubble" style="left:70px;right:70px;top:${y}px;font-size:38px">${t}<div class="send">↑</div></div>`;
const POST = {
  bg: "#bfd3ca",
  slides: [
    { html: `<div class="abs serif" style="left:80px;right:80px;top:120px;font-size:108px;line-height:1.06">Prepare sua avaliação de fim de ano com o <span style="font-weight:600">Claude</span></div>
      ${img("writing", "position:absolute;left:60px;top:560px;width:560px")}
      <div class="abs" style="right:110px;top:1080px;font-size:90px">→</div>` },
    { html: `${ttl("Primeiro, relembre as conquistas do ano com a memória do Claude", 300)}
      ${ask("Me dê <span style='background:#e7efe9;border-radius:6px;padding:0 6px'>uma visão geral de todos os meus projetos</span> deste ano, destacando as principais entregas e os desafios que resolvi.", 600)}` },
    { html: `${ttl("Depois conecte sua agenda para destacar os grandes momentos")}
      <div class="abs" style="left:60px;right:60px;top:420px;background:#fbfaf6;border-radius:30px;padding:36px 40px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="background:#efede6;border-radius:16px;padding:18px 26px;font-size:32px">Quais foram minhas reuniões e lançamentos mais importantes este ano?</div>
        <div class="serif" style="font-size:33px;line-height:1.42;margin-top:24px;font-weight:400">Vou buscar no seu Google Agenda as reuniões e os lançamentos mais importantes do ano.
          <div style="font-family:'DM Sans';font-size:24px;color:#77746b;margin:16px 0;border:2px solid #e7e5de;border-radius:10px;padding:8px 16px">📅 Eventos da agenda pesquisados · 25 resultados</div>
          <b style="font-weight:600">Principais lançamentos</b><br>O lançamento da nova plataforma em março foi claramente um marco. Você teve várias sessões intensas de planejamento em janeiro e fevereiro, e depois o lançamento envolveu as equipes de engenharia, produto e infraestrutura…</div>
      </div>` },
    { html: `${ttl("Complete as lacunas com o contexto de onde você trabalha")}
      ${ask("Resuma minhas tarefas do Linear ao longo do ano, destacando as principais sprints e os resultados em números.", 440)}
      <div class="abs" style="left:0;right:0;top:760px;text-align:center;font-size:90px">↓↑</div>
      ${img("logos", "position:absolute;left:200px;top:900px;width:680px")}` },
    { html: `${ttl("Organize tudo num único banco de dados, fácil de consultar")}
      <div class="abs say" style="left:70px;right:70px;top:420px;font-size:38px">Transforme tudo isso numa planilha do Excel.</div>
      <div class="abs" style="left:0;right:0;top:570px;text-align:center;font-size:80px">↓</div>
      ${img("sheet", "position:absolute;left:40px;top:700px;width:1000px", "shadow")}` },
    { html: `${ttl("Monte uma narrativa clara sobre suas conquistas e metas")}
      <div class="abs" style="left:60px;right:60px;top:440px;background:#fbfaf6;border-radius:30px;padding:36px 40px;box-shadow:0 14px 40px rgba(0,0,0,.08);height:640px">
        <div style="background:#efede6;border-radius:16px;padding:24px 28px;font-size:34px;line-height:1.4">Sou desenvolvedora e quero mostrar minha liderança técnica e as entregas de impacto que fiz este ano.<br><br>Escreva uma autoavaliação com base na planilha das minhas conquistas.</div>
        <div style="color:var(--clay);font-size:56px;margin-top:24px">✳</div>
      </div>` },
    { html: `<div class="abs serif" style="left:80px;right:80px;top:150px;font-size:108px;line-height:1.08">Você fez o trabalho duro, e o <span style="font-weight:600">Claude</span> ajudou a mostrar</div>
      ${img("party", "position:absolute;left:90px;top:860px;width:240px")}
      <div class="abs" style="left:80px;top:1140px;font-size:30px;color:var(--soft)">Fonte: Anthropic (@claudeai)</div>` }
  ]
};
