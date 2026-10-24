const scene = (title, prompt, shot) => `
  <div class="abs serif" style="left:60px;right:60px;top:110px;text-align:center;font-size:74px;line-height:1.08">${title}</div>
  ${prompt ? `<div class="abs bubble" style="left:100px;right:100px;top:340px;font-size:35px;z-index:2">${prompt}<div class="send">↑</div></div>` : ""}
  ${img(shot, `position:absolute;left:0;width:1080px;top:${prompt ? 640 : 330}px`)}`;
const POST = {
  bg: "#e7e5db",
  slides: [
    { html: `
      <div class="abs serif" style="left:0;right:0;top:140px;text-align:center;font-size:104px;line-height:1.05">Conheça o Claude<br>para professores</div>
      ${img("apple", "position:absolute;left:340px;top:440px;width:400px")}
      <div class="abs" style="left:120px;right:120px;top:960px;text-align:center;font-size:40px;line-height:1.38">Acesso gratuito para professores da educação básica nos EUA, com ferramentas e currículos prontos</div>` },
    { html: scene("Planeje uma aula com base em um currículo real",
      "Planeje uma aula de matemática de 45 minutos para o 7º ano sobre equações de dois passos, usando o Illustrative Math. Prepare uma apresentação para eu dar amanhã.", "aula") },
    { html: scene("Adapte a aula para cada aluno da turma",
      "Analise como meus alunos do 4º ano estão em leitura em relação ao esperado e divida a turma em reforço, nível adequado e aprofundamento para a aula de amanhã.", "diferenciar") },
    { html: scene("Crie provas e confira o que a turma aprendeu",
      "Crie uma avaliação formativa de 10 questões sobre fotossíntese para o 8º ano, alinhada ao currículo. Inclua dois níveis de dificuldade e um gabarito.", "quiz") },
    { html: scene("Escreva e-mails e boletins para os pais", "", "emails") },
    { html: scene("Antecipe onde os alunos podem travar",
      "Quais são os erros mais comuns dos alunos do 5º ano ao multiplicar frações? Me dê três perguntas de discussão que revelem cada um deles.", "travar") },
    { type: "center", icon: img("heart", "width:260px;margin-bottom:60px"),
      title: "Foque nos alunos, não no planejamento e na papelada", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
