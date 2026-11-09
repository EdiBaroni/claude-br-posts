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

// Slides dos posts de notícia (robô diário). O robô escreve noticias/<dia>/post.json
// e o gerador transforma cada slide com K.nx. Tipos: capa, tela, texto, lista, pedido, final.
K.nxTopo = s => `<div class="top"><span class="eyebrow">${s.rotulo || "Claude · Anthropic"}</span>${s.selo ? `<span class="badge" style="background:${s.cor || "var(--clay)"}">${s.selo}</span>` : ""}</div>`;
K.nx = s => {
  if (s.tipo === "final") return { type: "center", title: s.titulo, sub: s.sub, src: s.fonte, bg: s.bg };
  if (s.tipo === "capa" && !s.tela) return { bg: s.bg, html: `<div class="feat nx" style="justify-content:center">
      ${K.nxTopo(s)}
      <h2 class="serif" style="font-size:${s.tamanho || 104}px;margin-top:70px">${s.titulo}</h2>
      ${s.sub ? `<p class="note" style="font-size:42px;margin-top:50px">${s.sub}</p>` : ""}
    </div>` };
  if (s.tipo === "capa" || s.tipo === "tela") return { bg: s.bg, html: `<div class="feat nx">
      ${K.nxTopo(s)}
      <h2 class="serif" style="${s.tamanho ? `font-size:${s.tamanho}px` : ""}">${s.titulo}</h2>
      <div class="media">${img(s.tela, "", "shadow")}</div>
      ${s.sub ? `<p class="note">${s.sub}</p>` : ""}
    </div>` };
  if (s.tipo === "texto") return { bg: s.bg, html: `<div class="feat nx">
      ${K.nxTopo(s)}
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px">
        <h2 class="serif" style="margin-top:0">${s.titulo}</h2>
        <div style="margin-top:56px;display:flex;flex-direction:column;gap:40px;font-size:46px;line-height:1.42;color:var(--soft)">
          ${(s.paragrafos || []).map(p => `<p>${p}</p>`).join("")}
        </div>
      </div>
    </div>` };
  if (s.tipo === "lista") return { bg: s.bg, html: `<div class="feat nx">
      ${K.nxTopo(s)}
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px">
      <h2 class="serif" style="margin-top:0">${s.titulo}</h2>
      <div style="margin-top:64px;display:flex;flex-direction:column;gap:52px">
        ${(s.itens || []).map(([ic, h, d]) => `<div style="display:flex;gap:36px;align-items:center">
          <div style="flex:0 0 116px;height:116px;border-radius:28px;background:#fff;box-shadow:0 8px 24px rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;font-size:60px">${ic}</div>
          <div style="font-size:42px;line-height:1.32"><b style="font-weight:600">${h}</b>${d ? `<br><span style="color:var(--soft)">${d}</span>` : ""}</div>
        </div>`).join("")}
      </div>
      </div>
    </div>` };
  if (s.tipo === "pedido") return { bg: s.bg, html: `<div class="feat nx">
      ${K.nxTopo(Object.assign({ rotulo: "Experimente pedir" }, s))}
      <h2 class="serif">${s.titulo}</h2>
      <div style="flex:1;display:flex;align-items:center"><div class="bubble" style="width:100%;font-size:40px">${s.pedido}<div class="send">↑</div></div></div>
      ${s.sub ? `<p class="note">${s.sub}</p>` : ""}
    </div>` };
  return { bg: s.bg, html: `<div class="center"><h2 class="serif">Tipo de slide desconhecido: ${s.tipo}</h2></div>` };
};
