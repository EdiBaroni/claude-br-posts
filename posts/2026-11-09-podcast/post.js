const hd = (label, title) => `
  <div class="abs" style="left:0;right:0;top:110px;text-align:center;font-size:32px;color:var(--soft)">${label}</div>
  <div class="abs serif" style="left:60px;right:60px;top:170px;text-align:center;font-size:78px;line-height:1.08">${title}</div>`;
const ask = (t, y, send = true) => `<div class="abs bubble" style="left:70px;right:70px;top:${y}px;font-size:36px;z-index:2">${t}${send ? `<div class="send">↑</div>` : ""}</div>`;
const doc = (t, kind, art = "") => `<div style="width:230px;height:240px;background:#fff;border-radius:16px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 12px rgba(0,0,0,.05);overflow:hidden;position:relative">${art}<div style="font-size:28px;font-weight:600;position:relative">${t}</div><div style="font-size:22px;font-weight:700;color:#4a7fe0;position:relative">▤ ${kind}</div></div>`;
const POST = {
  bg: "#e3dbcc",
  slides: [
    { bg: "#6b9acd", html: `
      ${img("mic", "position:absolute;left:470px;top:120px;width:140px")}
      <div class="abs serif" style="left:0;right:0;top:420px;text-align:center;font-size:136px;line-height:1.02">Como começar<br>um podcast com<br>o <span style="font-weight:600">Claude</span></div>
      <div class="abs" style="left:0;right:0;top:1040px;text-align:center;font-size:38px">Ferramentas para deixar sua jornada mais tranquila →</div>` },
    { html: `${hd("Pesquisa", "Confira se o seu podcast ainda não existe")}
      ${ask("Quantos podcasts existem sobre astrologia? E sobre astrologia E astronautas?", 440, false)}
      <div class="abs say" style="right:70px;top:700px;font-style:italic;font-family:'Source Serif 4',serif"><span style="color:var(--clay)">✳</span> Criando um plano de pesquisa…</div>
      <div class="abs say" style="left:110px;top:880px;width:640px"><div style="font-size:34px">Pesquisa: o cenário dos podcasts de astrologia</div><div style="font-size:28px;color:#77746b;margin-top:10px">476 fontes · 6 min 41 s</div></div>` },
    { html: `${hd("Chat", "Teste a sua ideia de podcast")}
      <div class="abs" style="left:70px;right:70px;top:420px;background:#fbfaf6;border-radius:30px;padding:36px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="background:#efede6;border-radius:18px;padding:22px 28px;font-size:34px;line-height:1.35">Me ajude a testar esta ideia de podcast: entrevistar astronautas e ler o mapa astral deles</div>
        <div class="serif" style="font-size:34px;line-height:1.4;margin-top:30px;font-weight:400">É uma premissa divertida. O nome é marcante e o contraste é claro. Aqui é onde eu pressionaria:<br><br><b style="font-weight:600">O que funciona:</b> a tensão entre gente da ciência e uma proposta nada científica é divertida.<br><br><b style="font-weight:600">Onde complica:</b> há poucos convidados possíveis. Cerca de 600 pessoas já foram ao espaço, e a maioria não dá entrevistas.</div>
      </div>` },
    { html: `${hd("Projetos", "Organize todo o material dos episódios")}
      <div class="abs" style="left:70px;right:70px;top:440px;background:#fbfaf6;border-radius:30px;padding:40px;box-shadow:0 14px 40px rgba(0,0,0,.08)">
        <div style="font-size:30px;color:#77746b">Projetos</div>
        <div class="serif" style="font-size:56px;margin:10px 0 34px">Astronautas Astrológicos</div>
        <div style="display:flex;gap:20px;background:#efede6;border-radius:20px;padding:24px">
          ${doc("Pesquisa do podcast", "DOC")}${doc("<span style='color:#fff'>Astrologia 101</span>", "PDF", img("astro", "position:absolute;inset:0;width:100%;height:100%;object-fit:cover"))}${doc("Roteiro dos episódios", "DOC")}
        </div>
      </div>` },
    { html: `${hd("Cowork", "Processe uma temporada inteira de uma vez")}
      ${ask("Transforme todas estas transcrições em resumos detalhados, com marcações de tempo e capítulos", 420)}
      ${img("episodios", "position:absolute;left:140px;top:720px;width:800px", "shadow")}` },
    { html: `${hd("Conectores", "Mantenha o calendário de conteúdo em dia")}
      ${ask("Acabei de marcar um episódio com a Sam Vega. Pode colocar no controle do Notion?", 420)}
      ${img("notion", "position:absolute;left:70px;top:740px;width:130px", "shadow")}
      ${img("agenda", "position:absolute;left:230px;top:700px;width:780px", "shadow")}` },
    { bg: "#6b9acd", type: "center", icon: img("torre", "width:150px;margin-bottom:60px"),
      title: "O que você vai começar com o Claude?", sub: "Conta aqui nos comentários 👇", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
