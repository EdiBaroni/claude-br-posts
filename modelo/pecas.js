// Peças reaproveitadas nos posts "passo a passo". Ficam todas dentro de K
// para não colidir com nomes que os post.js mais antigos já declaram.
const K = {
  ttl: (t, y = 110, size = 78) => `<div class="abs serif" style="left:60px;right:60px;top:${y}px;text-align:center;font-size:${size}px;line-height:1.1">${t}</div>`,
  sub: (t, y) => `<div class="abs" style="left:110px;right:110px;top:${y}px;text-align:center;font-size:38px;line-height:1.38;color:var(--soft)">${t}</div>`,
  pill: (t, y) => `<div class="abs" style="left:0;right:0;top:${y}px;text-align:center"><span style="display:inline-block;border:3px solid #1f1e1d;border-radius:30px;padding:4px 26px;font-size:30px">${t}</span></div>`,
  ask: (t, y, extra = "") => `<div class="abs bubble" style="left:70px;right:70px;top:${y}px;font-size:38px;${extra}">${t}<div class="send">↑</div></div>`,
  tips: (title, rows) => `${K.ttl(title, 120)}
    <div class="abs" style="left:90px;right:80px;top:330px;display:flex;flex-direction:column;gap:70px">
      ${rows.map(([ic, h, d]) => `<div style="display:flex;gap:50px;align-items:center">${img(ic, "width:170px;flex:0 0 170px")}<div style="font-size:40px;line-height:1.35"><b style="font-weight:600">${h}</b><br><span style="color:var(--soft)">${d}</span></div></div>`).join("")}
    </div>`,
  examples: (hand, title, items) => `${img(hand, "position:absolute;left:0;top:0;height:720px;max-width:470px;object-fit:cover;object-position:left top")}
    <div class="abs serif" style="left:500px;right:60px;top:380px;font-size:70px;line-height:1.08">${title}</div>
    <div class="abs" style="left:500px;right:60px;top:640px;display:flex;flex-direction:column;gap:40px;font-family:'Source Serif 4',serif;font-size:40px;line-height:1.3">${items.map(i => `<div>${i}</div>`).join("")}</div>`,
  steps3: (title, items, foot) => `${K.ttl(title, 200, 90)}
    <ol style="position:absolute;left:160px;right:120px;top:420px;font-size:46px;line-height:1.6">${items.map(i => `<li>${i}</li>`).join("")}</ol>
    ${foot ? `<div class="abs" style="left:0;right:0;top:1100px;text-align:center;font-size:30px;color:var(--soft)">${foot}</div>` : ""}`
};
