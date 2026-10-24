const grid = `background-color:#efeee6;background-image:linear-gradient(#e2e0d6 2px,transparent 2px),linear-gradient(90deg,#e2e0d6 2px,transparent 2px);background-size:54px 54px;`;
const sketch = (txt, bg, extra = "") => `<div style="background:${bg};border:4px solid #1f1e1d;border-radius:22px;padding:30px 36px;${extra}">${txt}</div>`;
const arrow = (d) => `<svg class="line" viewBox="0 0 1080 1350"><path d="${d}" style="stroke:#1f1e1d;stroke-width:5"/></svg>`;
const menu = (items, pos) => `<div class="abs" style="${pos};background:#fff;border-radius:20px;padding:20px 28px;box-shadow:0 14px 40px rgba(0,0,0,.12);font-size:32px;display:flex;flex-direction:column;gap:18px">${items.map(i => `<div>${i}</div>`).join("")}</div>`;
const POST = {
  bg: "#efeee6",
  slides: [
    { html: `<div class="abs" style="inset:0;${grid}"></div>
      ${arrow("M 190 680 C 160 820, 260 880, 390 870 M 360 840 L 392 870 L 356 896")}
      <span class="chip" style="left:80px;top:220px;font-size:34px;font-style:italic"><span style="color:var(--clay)">✳</span> Pensando…</span>
      <div class="abs serif" style="left:80px;top:330px;width:700px;font-size:100px;line-height:1.05">Devo trocar o modelo ou o esforço?</div>
      ${menu(["Opus", "Fable", "Sonnet", "<div style='background:#f0ede4;margin:0 -14px;padding:14px;border-radius:10px;display:flex;justify-content:space-between'>Esforço <span>›</span></div>", "<div style='display:flex;justify-content:space-between'>Mais modelos <span>›</span></div>"], "left:400px;top:780px;width:340px")}
      ${menu(["Baixo", "Médio", "Alto <span style='font-size:22px;background:#eee;border-radius:6px;padding:2px 8px'>Padrão</span>", "Muito alto", "Máximo"], "right:-40px;top:430px;width:300px")}` },
    { html: `<div class="abs" style="inset:0;${grid}"></div>
      ${arrow("M 760 300 C 860 300, 900 360, 880 450 M 852 425 L 880 455 L 905 420 M 760 1000 C 860 1000, 900 940, 880 850 M 852 875 L 880 845 L 905 880")}
      <div class="abs" style="left:80px;top:150px;width:680px">${sketch("<div style='font-size:40px;line-height:1.35'>Se você quer que o Claude trabalhe num problema com <b>mais cuidado e profundidade</b>…</div>", "#fbfaf5")}</div>
      <div class="abs" style="left:300px;top:480px;width:700px">${sketch("<div style='font-size:60px;font-weight:600;text-align:center'>Aumente o esforço</div>", "#f1c9b6")}</div>
      <div class="abs" style="left:300px;top:680px;width:700px">${sketch("<div style='font-size:60px;font-weight:600;text-align:center'>Troque o modelo</div>", "#e5dccb")}</div>
      <div class="abs" style="left:80px;top:900px;width:680px">${sketch("<div style='font-size:40px;line-height:1.35'>Se o problema é <b>especialmente difícil</b> e você quer dar mais capacidade ao Claude…</div>", "#fbfaf5")}</div>` },
    { html: `<div class="abs" style="inset:0;${grid}"></div>
      <div class="abs" style="left:100px;right:100px;top:330px;transform:rotate(-3deg)">${sketch("<div style='font-size:46px;line-height:1.3'>O <b>esforço</b> controla quanto trabalho o Claude está disposto a fazer.</div>", "#c3cfdf")}</div>
      <div class="abs" style="left:130px;right:130px;top:640px">${sketch("<div style='font-size:62px;line-height:1.2;font-weight:600'>O <b>modelo</b> define as capacidades fixas do Claude.</div>", "#fbfaf5", "padding:50px 50px")}</div>` },
    { html: `<div class="abs" style="inset:0;${grid}"></div>
      <div class="abs" style="left:80px;right:80px;top:120px;font-size:62px;font-weight:700;text-align:center">Como modelo e esforço se combinam</div>
      ${[["Sonnet com esforço alto", "#c9c8de", "é como passar uma tarde com um generalista"],
         ["Opus com esforço baixo", "#bfd3c9", "é como passar cinco minutos com um especialista"],
         ["Fable em qualquer esforço", "#e07a5b", "é como trabalhar com um especialista que encontra soluções que mais ninguém vê"]]
        .map(([t, c, d], i) => `
        <div class="abs" style="left:110px;top:${310 + i * 300}px;z-index:2">${sketch(`<div style='font-size:40px;font-weight:600'>${t}</div>`, c, "padding:14px 30px;border-radius:16px")}</div>
        <div class="abs" style="left:190px;right:100px;top:${380 + i * 300}px">${sketch(`<div style='font-size:40px;line-height:1.32'>${d}</div>`, "#fbfaf5", "padding:40px 40px 30px")}</div>`).join("")}` },
    { type: "center", titleStyle: "font-size:84px", title: "Primeiro o esforço, depois o modelo",
      sub: "Quer mais capricho? Suba o esforço. O problema está além do que o modelo consegue? Aí sim, troque de modelo.", src: "Fonte: Anthropic (@claudeai)" }
  ]
};
