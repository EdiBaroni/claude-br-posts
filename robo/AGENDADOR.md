# Instruções do agendador do Metricool

Você roda de hora em hora, das 9h às 20h de Brasília. Seu único trabalho: colocar no Metricool,
para o Instagram **@claude.anthropic.br**, os posts de notícia que a pessoa **já aprovou**.
Na maioria das vezes não há nada a fazer: confira e encerre em silêncio.

## Passo 1 — há algo para agendar?

```
git pull origin main
node robo/scripts/pendentes.mjs
```

Lista vazia (`[]`): **encerre sem fazer mais nada**, sem commit e sem mensagem.

Um post só é agendável se tem `aprovado.json` e não tem `agendado.json`. Quem grava o
`aprovado.json` é o GitHub, quando a pessoa responde "pode". **Nunca crie `aprovado.json` você mesmo.**

## Passo 2 — você tem o Metricool?

Procure a ferramenta `createScheduledPost` do Metricool (use o ToolSearch com "metricool").
Se ela não existir nesta sessão, **não tente outro caminho**. Para cada post pendente que ainda
não tem `falha-agendamento.md`, grave esse arquivo com o texto abaixo, faça commit e push, e encerre:

```
O agendador rodou às (hora de Brasília) e não encontrou a conexão com o Metricool.
Para resolver: abra https://claude.ai/customize/connectors e confira se o Metricool está conectado.
Depois, em https://claude.ai/code/routines, abra "Agendador do Metricool" e clique em "Run now".
```

(Se o arquivo já existe, não grave de novo: o aviso já foi dado.)

## Passo 3 — conferir antes de mandar

Para cada post da lista:

- `todos_200` tem de ser `true`. Se algum link não respondeu 200, espere a próxima rodada (não grave nada).
- A quantidade de links em `midia` tem de ser igual a `total_slides`.
- Antes de criar, chame `getScheduledPosts` (marca 7628955, fuso America/Sao_Paulo, o dia inteiro do
  horário escolhido). Se já existe um post nesse dia com a mesma primeira linha da legenda, ele já foi
  agendado numa rodada anterior que não conseguiu gravar: **não crie outro**; pule para o passo 5 com os dados dele.

## Passo 4 — agendar

Chame `createScheduledPost` com:

- `blogId`: `7628955` (marca claude.anthropic.br)
- `date`: o `horario_brasilia` do pendentes.mjs com `-03:00` no fim
- `info` (JSON):
  - `providers`: `[{"network":"instagram"}]`
  - `instagramData`: `{"type":"POST"}`
  - `publicationDate`: `{"dateTime": "<horario_brasilia>", "timezone": "America/Sao_Paulo"}`
  - `media`: a lista `midia` **na ordem** (slide-1 primeiro)
  - `text`: a `legenda` exatamente como está, sem mudar nada
  - `autoPublish`: `true`, `draft`: `false`

Se o Metricool recusar, grave `falha-agendamento.md` com a mensagem de erro em linguagem simples
(sem token nem dado sensível), commit e push, e encerre. Na rodada seguinte você tenta de novo; se
falhar **pelo mesmo motivo**, não regrave o arquivo (a pessoa já foi avisada e não precisa de um
aviso por hora).

## Passo 5 — conferir o que o Metricool recebeu

Chame `getScheduledPosts` de novo e ache o post. Conte as imagens que ele tem.
Grave `noticias/AAAA-MM-DD/agendado.json`:

```json
{
  "agendado_em": "<agora, ISO>",
  "horario_brasilia": "<AAAA-MM-DD HH:MM>",
  "imagens_enviadas": 7,
  "imagens_no_metricool": 7,
  "link_metricool": "<plannerUrl que o Metricool devolveu>",
  "commit_das_imagens": "<commit>"
}
```

Se `imagens_no_metricool` for diferente de `imagens_enviadas`, grave **também** um
`falha-agendamento.md` explicando a diferença, para a pessoa conferir no Metricool.

```
git add noticias/
git commit -m "Agenda no Metricool: noticias/AAAA-MM-DD"
git push origin HEAD:main
```

O GitHub comenta na ficha e a fecha sozinho. Encerre.

## Regras que não mudam

- Só agenda o que tem `aprovado.json`. Nunca publica "agora" por conta própria.
- Nunca mexe em posts que não são de `noticias/` (os posts traduzidos à mão são agendados pela pessoa).
- Nunca muda a legenda nem as imagens. Achou erro? Grave `falha-agendamento.md` explicando e não agende.
- Não guarde token, senha ou chave em arquivo nenhum: o repositório é público.
