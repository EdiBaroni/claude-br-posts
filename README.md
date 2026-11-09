# claude-br-posts

Artes do perfil [@claude.anthropic.br](https://www.instagram.com/claude.anthropic.br/), uma página **não oficial** que traduz e adapta para o português conteúdos da Anthropic sobre o Claude.

- `posts/AAAA-MM-DD-assunto/`: slides (PNG 1080×1350) e legenda de cada post
- `modelo/slides.html`: modelo usado para gerar os slides

Conteúdo original: Anthropic (@claudeai). Este repositório não tem relação oficial com a Anthropic.

## Robô diário de notícias do Claude

Todo dia às 8h (Brasília) uma rotina do Claude na nuvem procura a principal novidade sobre o
Claude e a Anthropic, monta o carrossel no mesmo visual dos posts traduzidos e grava em
`noticias/AAAA-MM-DD/`. Nada vai ao ar sem aprovação.

1. **8h** — o robô grava o post e a `ficha.md` (regras em `robo/INSTRUCOES.md`).
2. **Na hora** — o GitHub abre a ficha como Issue atribuída a @EdiBaroni, o que manda um e-mail.
3. **Você responde "pode"** ao e-mail (ou comenta na Issue). Qualquer outra resposta não publica.
4. **Até 1 hora depois** — a rotina agendadora coloca o post no Metricool para as 18h
   (regras em `robo/AGENDADOR.md`) e comenta o link na ficha.
5. **Vigia** — às 9h avisa se a ficha não chegou; às 17h30 avisa se algo aprovado não foi agendado.

| Arquivo | Para quê |
|---|---|
| `robo/INSTRUCOES.md` | como escolher a notícia e escrever o post (o robô lê todo dia) |
| `robo/AGENDADOR.md` | como agendar no Metricool depois do "pode" |
| `robo/exemplo/` | formato de referência do `post.json` e da legenda |
| `robo/scripts/gerar-carrossel.mjs` | gera e confere os slides: `node robo/scripts/gerar-carrossel.mjs noticias/AAAA-MM-DD` |
| `robo/scripts/testes.mjs` | testes das regras: `node robo/scripts/testes.mjs` |
| `.github/workflows/` | abrir ficha, aprovar, avisar agendamento, vigia |
| `modelo/fontes/` | as fontes do modelo, guardadas aqui para não depender da internet |

Para pausar o robô: em https://claude.ai/code/routines, desligue as rotinas
"Robô de notícias do Claude (8h)" e "Agendador do Metricool".
