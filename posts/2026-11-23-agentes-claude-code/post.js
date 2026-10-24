const term = (lines, pos, size = 34) => `<div class="abs" style="${pos};background:#141413;border-radius:24px;padding:50px 54px;font-family:'DM Mono',monospace;font-size:${size}px;line-height:1.5;color:#f0eee6">${lines}</div>`;
const gray = t => `<span style="color:#9a988f">${t}</span>`;
const chip = (t, x, y) => `<span class="chip" style="left:${x}px;top:${y}px;background:#efe6d8;font-size:34px">${t}</span>`;
const POST = {
  bg: "#d97757",
  slides: [
    { html: `${K.ttl("Vamos falar sobre agentes no <span style='font-weight:600'>✳ Claude Code</span>", 140, 92)}
      <div class="abs" style="left:0;right:0;top:420px;text-align:center;font-size:90px">→</div>
      ${term(`Criar novo agente<br>${gray("Descreva o que este agente deve fazer e quando deve ser usado")}<br><br>&gt; Engenheiro de software que vai revisar o código em busca de falhas de segurança<br><br><span style="color:#e8a07f">✳ Gerando a configuração do agente…</span>`, "left:150px;right:0;top:600px;bottom:0")}` },
    { html: `${K.ttl("Por que programar com agentes?", 100, 80)}
      ${K.sub("Coloque especialistas para cuidar de cada tarefa. É como gerenciar uma equipe, em vez de trabalhar com uma pessoa só.", 320)}
      ${img("parallel", "position:absolute;left:60px;top:560px;width:1020px;max-height:620px;object-fit:cover;object-position:left top;border-radius:24px 0 0 24px")}` },
    { html: `${K.pill("Passo 1", 100)}
      ${K.ttl("Abra a tela de agentes", 170, 76)}
      <div class="abs" style="left:0;right:0;top:290px;text-align:center;font-size:38px">Digite <span style="font-family:'DM Mono',monospace;background:#141413;color:#fff;border-radius:8px;padding:2px 12px">/agents</span> e escolha “criar novo agente”</div>
      ${K.pill("Passo 2", 420)}
      ${K.ttl("Defina o agente", 490, 76)}
      ${K.sub("Descreva o agente em detalhes e quando ele deve ser usado. Seja específico, mas sem engessar.", 600)}
      ${term(`Criar novo agente<br>${gray("Descreva o que este agente deve fazer e quando deve ser usado")}<br><br>&gt; Engenheiro de software que vai…`, "left:60px;right:60px;top:820px;bottom:150px")}` },
    { html: `${K.ttl("Integre suas ferramentas", 100, 80)}
      ${K.sub("Escolha as ferramentas que cada agente pode usar. Os subagentes também usam ferramentas de servidores MCP.", 220)}
      ${img("tools", "position:absolute;left:150px;top:470px;width:780px;border-radius:20px")}` },
    { html: K.tips("Dicas para criar agentes", [
        ["i1", "Uma responsabilidade por agente", "clara e bem definida"],
        ["i2", "Escreva prompts detalhados", "com os passos que ele deve seguir"],
        ["i3", "Dê acesso só ao necessário", "apenas às ferramentas que o agente precisa"]]) },
    { html: `${chip("Auditor de segurança", 300, 120)}${chip("Analista de testes", 640, 260)}${chip("Otimizador de código", 40, 400)}
      ${img("shape", "position:absolute;left:390px;top:420px;width:300px")}
      ${K.ttl("Um agente pode ser quase qualquer coisa", 760, 80)}
      ${chip("Engenheiro de refatoração", 560, 980)}${chip("Designer de interfaces", 80, 1060)}${chip("Organizador de código", 400, 1150)}` },
    { type: "center", title: "Crie seu primeiro agente com o Claude Code",
      sub: "Comece em <b>claude.ai/code</b>", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
