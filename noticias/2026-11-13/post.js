// Gerado por robo/scripts/gerar-carrossel.mjs a partir do post.json. Não edite à mão.
const D = {
  "bg": "#faf9f5",
  "slides": [
    {
      "tipo": "capa",
      "selo": "Novidade",
      "rotulo": "Anthropic · 12 nov 2026",
      "titulo": "O Claude agora entra na sua reunião",
      "tela": "destaque",
      "sub": "O Claude Meetings, em beta, anota, responde e cria documentos durante a chamada."
    },
    {
      "tipo": "texto",
      "rotulo": "O que é",
      "titulo": "Um participante a mais na chamada",
      "paragrafos": [
        "Em 12 de novembro, a Anthropic lançou em beta o <b>Claude Meetings</b>. O Claude entra na videochamada como participante visível e acompanha a conversa.",
        "Beta quer dizer que ainda está em fase de testes."
      ]
    },
    {
      "tipo": "lista",
      "rotulo": "O que ele faz",
      "titulo": "Durante e depois da reunião",
      "itens": [
        [
          "💬",
          "Responde perguntas",
          "Por voz ou no chat; por padrão, ele responde por escrito"
        ],
        [
          "📝",
          "Anota e lista tarefas",
          "Notas e itens de ação, com resumo antes de a chamada acabar"
        ],
        [
          "🧩",
          "Cria na hora",
          "Documentos e quadros enquanto o time edita junto"
        ],
        [
          "🗂️",
          "Guarda tudo",
          "Cada reunião ganha uma página no claude.ai"
        ]
      ]
    },
    {
      "tipo": "texto",
      "rotulo": "Privacidade",
      "titulo": "Fique atento antes de usar",
      "paragrafos": [
        "O Claude avisa no chat que entrou, e salva transcrição, resumo e descrição da tela. <b>Não salva o áudio.</b>",
        "A Anthropic recomenda confirmar que todos aceitam ser transcritos. Por padrão, ele não participa de chamadas com convidados de fora."
      ]
    },
    {
      "tipo": "texto",
      "rotulo": "Disponibilidade",
      "selo": "Team e Enterprise",
      "cor": "var(--green)",
      "titulo": "Quem já pode usar",
      "paragrafos": [
        "Em beta nos planos <b>Team e Enterprise</b>, no Claude e no Claude Desktop. Por enquanto, só no <b>Google Meet</b>; outras plataformas estão \"em breve\".",
        "No Team, convidar o Claude vem ligado; no Enterprise, o administrador ativa. Países e idiomas: a Anthropic não informou."
      ]
    },
    {
      "tipo": "final",
      "titulo": "Você deixaria o Claude entrar?",
      "sub": "Conta nos comentários se usaria em reuniões do seu time.",
      "fonte": "Fonte: Anthropic (claude.com/resources/articles/claude-meetings)"
    }
  ]
};
const POST = { bg: D.bg, rodape: "@claude.anthropic.br", slides: D.slides.map(K.nx) };
