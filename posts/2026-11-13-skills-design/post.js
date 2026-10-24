const ttl = (t, size = 80) => `<div class="abs serif" style="left:80px;right:80px;top:110px;font-size:${size}px;line-height:1.1">${t}</div>`;
const POST = {
  bg: "#efece4",
  slides: [
    { bg: "#e6ddce", html: `${ttl("Transforme o <span style='font-weight:600'>Claude</span> no seu parceiro de design com as Skills", 104)}
      ${img("shapes", "position:absolute;left:150px;top:560px;width:640px")}` },
    { html: `${ttl("As Skills são kits especializados que entram em ação quando você precisa")}
      ${img("grid", "position:absolute;left:0;top:420px;width:1080px")}` },
    { html: `${ttl("Primeiro, ative a execução de código e a criação de arquivos nas configurações do Claude", 70)}
      ${img("capab", "position:absolute;left:90px;top:420px;width:900px")}` },
    { html: `${ttl("Ative a skill <b>theme-factory</b>, que ajuda o Claude a dar estilo aos arquivos que cria")}
      ${img("theme", "position:absolute;left:90px;top:520px;width:900px", "shadow")}` },
    { html: `${ttl("Crie um tema próprio descrevendo como quer ou enviando exemplos")}
      <div class="abs bubble" style="left:70px;right:70px;top:460px;font-size:38px">Crie um tema ousado, com tipografia grande, gradientes vibrantes e uma estética moderna e cheia de energia.</div>
      ${img("tfiles", "position:absolute;left:40px;top:780px;width:1000px")}` },
    { html: `${ttl("Agora todos os seus artifacts falam a mesma linguagem visual")}
      <div class="abs say" style="left:70px;right:70px;top:420px;font-size:36px">Faça uma landing page para uma ferramenta de gestão de projetos.</div>
      ${img("landing", "position:absolute;left:110px;top:580px;width:860px", "shadow")}` },
    { bg: "#e6ddce", type: "center", icon: img("monitor", "width:420px;margin-bottom:60px"),
      title: "Explore as Skills e muito mais em <span style='font-weight:600'>claude.ai</span>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
