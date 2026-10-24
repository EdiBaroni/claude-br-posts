const ttl = (t, y = 110) => `<div class="abs serif" style="left:60px;right:60px;top:${y}px;text-align:center;font-size:76px;line-height:1.1">${t}</div>`;
const nrow = t => `<div style="background:#fbfaf6;border-radius:18px;padding:24px 30px;font-size:34px;color:var(--soft);display:flex;gap:20px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.04)">${img("nlogo", "width:46px")}${t}</div>`;
const POST = {
  bg: "#e6ddd1",
  slides: [
    { html: `${ttl("Use as Skills do <span style='font-weight:600'>Claude</span> para turbinar seus fluxos no Notion", 120)}
      <div class="abs bubble" style="left:110px;right:110px;top:420px;font-size:40px">Transforme esta especificação de produto em planos de implementação detalhados<div class="send">↑</div></div>
      <div class="abs" style="left:110px;right:110px;top:720px;display:flex;flex-direction:column;gap:22px">${nrow("Buscando no Notion e em fontes conectadas")}${nrow("Criando páginas e bancos de dados no Notion")}</div>
      <div class="abs" style="left:0;right:0;top:1060px;text-align:center;font-size:80px">→</div>` },
    { html: `${img("upload", "position:absolute;left:150px;top:90px;width:780px")}
      ${ttl("Primeiro, envie as skills que você quer usar", 1000)}` },
    { html: `${ttl("As Skills ensinam ao Claude seus fluxos no Notion, e ele os executa")}
      ${img("skills", "position:absolute;left:40px;top:420px;width:1000px", "shadow")}` },
    { html: `${img("tasks", "position:absolute;left:40px;top:120px;width:1000px", "shadow")}
      ${ttl("Divida especificações de produto em planos de implementação detalhados", 870)}` },
    { html: `${ttl("Prepare pautas e materiais de reunião com o contexto do Notion")}
      <div class="abs bubble" style="left:60px;width:640px;top:400px;font-size:36px;z-index:2">Pode preparar os materiais da minha reunião de revisão de produto às 14h?<div class="send">↑</div></div>
      ${img("agenda", "position:absolute;left:140px;top:640px;width:900px", "shadow")}` },
    { html: `${img("decision", "position:absolute;left:180px;top:100px;width:840px", "shadow")}
      ${ttl("Construa sua base de conhecimento conversando com o Claude", 920)}` },
    { html: `${ttl("Crie relatórios reunindo informações de todo o seu workspace")}
      ${img("report", "position:absolute;left:40px;top:420px;width:1000px", "shadow")}` },
    { html: `<div class="abs serif" style="left:90px;top:130px;font-size:90px">Comece em 3 passos</div>
      <div class="abs say" style="left:70px;right:70px;top:330px;font-size:42px;display:flex;gap:24px;align-items:center">🌐 clau.de/skills-for-notion</div>
      <ol style="position:absolute;left:130px;right:90px;top:560px;font-size:42px;line-height:1.5">
        <li>Baixe as skills do Notion para o Claude</li>
        <li>Envie os arquivos .zip para o Claude, na área de Skills das configurações</li>
        <li>Peça ajuda ao Claude com o seu trabalho no Notion</li></ol>
      <div class="abs" style="left:90px;top:1120px;font-size:30px;color:var(--soft)">Fonte: Anthropic (@claudeai) e Notion (@notionhq)</div>` }
  ]
};
