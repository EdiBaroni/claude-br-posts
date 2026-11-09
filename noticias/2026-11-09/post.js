// Gerado por robo/scripts/gerar-carrossel.mjs a partir do post.json. Não edite à mão.
const D = {
  "bg": "#faf9f5",
  "slides": [
    {
      "tipo": "capa",
      "selo": "Teste",
      "rotulo": "Teste do robô · 9 nov 2026",
      "titulo": "Teste do robô de notícias",
      "tela": "destaque",
      "sub": "Este post é só um teste. Ele nunca vai para o Instagram."
    },
    {
      "tipo": "texto",
      "rotulo": "O que é",
      "titulo": "Em uma frase",
      "paragrafos": [
        "Explique a novidade como se fosse para alguém que usa o Claude no trabalho, mas não é técnico.",
        "Segundo parágrafo opcional, com o detalhe que mais interessa. <b>Negrito</b> com moderação."
      ]
    },
    {
      "tipo": "lista",
      "rotulo": "O que muda",
      "titulo": "Na prática",
      "itens": [
        [
          "⚡",
          "Primeiro ponto",
          "Descrição curta do ponto"
        ],
        [
          "🧠",
          "Segundo ponto",
          "Descrição curta do ponto"
        ],
        [
          "🔒",
          "Terceiro ponto",
          "Descrição curta do ponto"
        ]
      ]
    },
    {
      "tipo": "pedido",
      "titulo": "Teste com um pedido assim",
      "pedido": "Leia este relatório e me diga os três pontos que mais afetam o meu time.",
      "sub": "Funciona no app e no claude.ai."
    },
    {
      "tipo": "texto",
      "rotulo": "Disponibilidade",
      "selo": "Pro e Max",
      "cor": "var(--green)",
      "titulo": "Quem já pode usar",
      "paragrafos": [
        "Diga os planos e os países exatamente como a fonte diz. Se a fonte não disser, escreva que a Anthropic não informou."
      ]
    },
    {
      "tipo": "final",
      "titulo": "Você já testou?",
      "sub": "Conta nos comentários o que achou.",
      "fonte": "Fonte: Anthropic (anthropic.com/news)"
    }
  ]
};
const POST = { bg: D.bg, slides: D.slides.map(K.nx) };
