/* Nossa Casinha: a casinha estilo Pou da Kitsune e do Cachorrinho 🏡🦊🐶
   Cômodos com setinhas, barrinhas de fome/banho/diversão/energia, geladeira, loja, guarda-roupa,
   decoração de cada cômodo, a Lista da Manu, o Cineminha e os mini games (js/jogos.js) valendo moedinhas.
   Tudo fica salvo só no navegador dela (localStorage "manu-casinha"). */
(() => {
  const cfg = window.CONFIG;
  const C = cfg.casinha;
  const M = window.Mascotes;
  const raiz = document.querySelector("#casinhaApp");
  if (!raiz || !C || !M || !M.g) {
    document.querySelector("#casinha")?.remove();
    document.querySelector('#menuLista a[href="#casinha"]')?.parentElement.remove();
    return;
  }

  const $ = (s, el = raiz) => el.querySelector(s);
  const $$ = (s, el = raiz) => [...el.querySelectorAll(s)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const sorteia = (l) => l[Math.floor(Math.random() * l.length)];
  const limita = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const entre = (a, b) => a + Math.random() * (b - a);
  const depois = (ms, fn) => setTimeout(fn, ms);
  const hoje = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const O = "#2a0a3d"; // contorno grossinho, igual ao Pou
  const tr = `stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;

  /* ================== Desenhinhos ================== */
  const ic = (corpo, vb = "0 0 64 64") => `<svg viewBox="${vb}" aria-hidden="true" focusable="false">${corpo}</svg>`;
  const coracaoP = (x, y, s, cor) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -4 C-3 -10 -12 -9 -12 -2 C-12 5 -3 9 0 13 C3 9 12 5 12 -2 C12 -9 3 -10 0 -4 Z" fill="${cor}"/>`;

  function toldo() {
    let s = `<path d="M7 27 L12 9 H52 L57 27 Z" fill="#fff"/>`;
    for (let i = 0; i < 6; i += 2) {
      const t0 = 12 + (i * 40) / 6, t1 = 12 + ((i + 1) * 40) / 6, b0 = 7 + (i * 50) / 6, b1 = 7 + ((i + 1) * 50) / 6;
      s += `<path d="M${t0} 9 L${t1} 9 L${b1} 27 L${b0} 27 Z" fill="#f15bb5"/>`;
    }
    return s + `<path d="M7 27 L12 9 H52 L57 27 Z" fill="none" ${tr}/>
      <path d="M7 27 q4.17 6 8.33 0 q4.17 6 8.33 0 q4.17 6 8.33 0 q4.17 6 8.33 0 q4.17 6 8.33 0 q4.17 6 8.33 0" fill="#fff" ${tr}/>`;
  }

  const ICONES = {
    loja: ic(`<rect x="12" y="27" width="40" height="29" rx="3" fill="#fff" ${tr}/>
      <rect x="17" y="35" width="15" height="12" rx="2" fill="#bde0fe" ${tr}/>
      <rect x="36" y="35" width="11" height="21" rx="1.5" fill="#c77dff" ${tr}/>${toldo()}`),
    geladeira: ic(`<rect x="15" y="5" width="34" height="54" rx="7" fill="#f6ecff" ${tr}/>
      <path d="M15 24 H49" fill="none" ${tr}/>
      <rect x="41" y="11" width="4" height="8" rx="2" fill="${O}"/><rect x="41" y="29" width="4" height="14" rx="2" fill="${O}"/>
      <rect x="21" y="11" width="10" height="8" rx="1.5" fill="#ffd166" ${tr} stroke-width="2"/>
      ${coracaoP(27, 36, 0.42, "#f15bb5")}`),
    guardaRoupa: ic(`<rect x="11" y="9" width="42" height="47" rx="4" fill="#d08c5c" ${tr}/>
      <path d="M8 9 H56" ${tr} stroke-width="4"/><path d="M32 9 V56" ${tr}/>
      <path d="M17 16 H27 M37 16 H47" stroke="#f0b98d" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28.5" cy="33" r="2.4" fill="${O}"/><circle cx="35.5" cy="33" r="2.4" fill="${O}"/>
      <path d="M16 56 V61 M48 56 V61" ${tr}/>`),
    abajur: (ligado) => ic(`${ligado ? `<circle cx="32" cy="21" r="21" fill="#fff3b0" opacity=".75"/>` : ""}
      <path d="M17 30 L24 9 H40 L47 30 Z" fill="${ligado ? "#ffd166" : "#bfae96"}" ${tr}/>
      <path d="M32 30 V45" ${tr} stroke-width="4"/><ellipse cx="32" cy="50" rx="13" ry="7" fill="#7b2cbf" ${tr}/>`),
    chuveiro: ic(`<path d="M12 58 V16 Q12 8 20 8 H31 V14" fill="none" ${tr} stroke-width="4"/>
      <path d="M22 14 H40 L45 23 H17 Z" fill="#d6dde8" ${tr}/>
      <g fill="#4cc9f0" ${tr} stroke-width="2"><path d="M23 30 q2.5 4 0 7 q-2.5 -3 0 -7z"/><path d="M32 33 q2.5 4 0 7 q-2.5 -3 0 -7z"/>
      <path d="M41 30 q2.5 4 0 7 q-2.5 -3 0 -7z"/><path d="M27 45 q2.5 4 0 7 q-2.5 -3 0 -7z"/><path d="M37 47 q2.5 4 0 7 q-2.5 -3 0 -7z"/></g>`),
    sabonete: ic(`<circle cx="21" cy="15" r="6" fill="#fff" ${tr} stroke-width="2"/><circle cx="35" cy="10" r="4" fill="#fff" ${tr} stroke-width="2"/>
      <circle cx="45" cy="19" r="5" fill="#fff" ${tr} stroke-width="2"/>
      <rect x="9" y="26" width="46" height="27" rx="12" fill="#f8b4e0" ${tr}/>
      <path d="M17 33 H39" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>`),
    controle: ic(`<path d="M18 20 Q32 16 46 20 Q58 23 59 40 Q60 54 50 54 Q44 54 40 46 H24 Q20 54 14 54 Q4 54 5 40 Q6 23 18 20 Z" fill="#9d4edd" ${tr}/>
      <path d="M21.5 26 H26.5 V30.5 H31 V35.5 H26.5 V40 H21.5 V35.5 H17 V30.5 H21.5 Z" fill="#fff"/>
      <circle cx="45" cy="29" r="3.3" fill="#f15bb5"/><circle cx="51" cy="35" r="3.3" fill="#ffd166"/>
      <circle cx="39" cy="35" r="3.3" fill="#4cc9f0"/><circle cx="45" cy="41" r="3.3" fill="#7ae582"/>`),
    bola: ic(`<circle cx="32" cy="32" r="24" fill="#9d4edd"/>
      <path d="M9.5 30 Q32 41 54.5 27" stroke="#ffd166" stroke-width="7" fill="none"/>
      <path d="M21 11 Q31 31 25 55" stroke="#fff" stroke-width="5" fill="none"/>
      <circle cx="32" cy="32" r="24" fill="none" ${tr}/>
      <ellipse cx="21" cy="19" rx="5" ry="3" fill="#fff" opacity=".6" transform="rotate(-30 21 19)"/>`),
    claquete: ic(`<rect x="9" y="27" width="46" height="29" rx="4" fill="#3c096c" ${tr}/>
      <path d="M9 27 L51 14 L54 23 L12 36 Z" fill="#fff" ${tr}/>
      <path d="M21 23 L25 31 M31 20 L35 28 M41 17 L45 25" stroke="${O}" stroke-width="4"/>
      <path d="M16 44 H42 M16 50 H33" stroke="#e0aaff" stroke-width="3" stroke-linecap="round"/>`),
    pipoca: ic(`<g fill="#fff3c4" ${tr} stroke-width="2.2"><circle cx="20" cy="22" r="7"/><circle cx="31" cy="15" r="8"/>
      <circle cx="43" cy="21" r="7.5"/><circle cx="26" cy="26" r="6"/><circle cx="38" cy="27" r="6"/></g>
      <path d="M13 28 H51 L45 58 H19 Z" fill="#fff"/>
      <path d="M22 28 L24.5 58 M32 28 V58 M42 28 L39.5 58" stroke="#f15bb5" stroke-width="5"/>
      <path d="M13 28 H51 L45 58 H19 Z" fill="none" ${tr}/>`),
    caderninho: ic(`<rect x="14" y="7" width="38" height="50" rx="5" fill="#c77dff" ${tr}/>
      <path d="M21 7 V57" ${tr}/>${coracaoP(36, 30, 0.62, "#fff")}
      <g fill="${O}"><circle cx="14" cy="17" r="2.6"/><circle cx="14" cy="29" r="2.6"/><circle cx="14" cy="41" r="2.6"/></g>`),
    carta: ic(`<rect x="8" y="16" width="48" height="34" rx="4" fill="#fff" ${tr}/>
      <path d="M8 18 L32 35 L56 18" fill="none" ${tr}/>${coracaoP(32, 39, 0.5, "#f15bb5")}`),
    casa: ic(`<path d="M14 27 L32 11 L50 27 V54 H14 Z" fill="#fff" ${tr}/>
      <path d="M7 31 L32 8 L57 31" fill="none" ${tr} stroke-width="4"/>
      <rect x="27" y="38" width="10" height="16" rx="1.5" fill="#c77dff" ${tr}/>${coracaoP(32, 26, 0.38, "#f15bb5")}`),
  };

  const MOEDA = ic(`<circle cx="16" cy="16" r="13.5" fill="#ffd166" stroke="#b7791f" stroke-width="2.5"/>
    <circle cx="16" cy="16" r="9" fill="none" stroke="#e9a93a" stroke-width="2"/>${coracaoP(16, 15.5, 0.34, "#e9a93a")}`, "0 0 32 32");

  const STATUS = [
    { id: "fome", nome: "Fome", sala: "cozinha", pensa: "🍕",
      icone: ic(`<path d="M19.5 4.5a8 8 0 0 0-7.3 11.2l-5.4 5.4a3 3 0 1 0-2.1 4.2 3 3 0 1 0 4.2-2.1l5.4-5.4A8 8 0 1 0 19.5 4.5z" fill="${O}"/>`, "0 0 32 32") },
    { id: "higiene", nome: "Banho", sala: "banheiro", pensa: "🛁",
      icone: ic(`<circle cx="12" cy="18" r="7" fill="none" stroke="${O}" stroke-width="3"/><circle cx="22" cy="9.5" r="4.5" fill="none" stroke="${O}" stroke-width="3"/><circle cx="23.5" cy="23" r="3" fill="${O}"/>`, "0 0 32 32") },
    { id: "diversao", nome: "Diversão", sala: "jogos", pensa: "🎾",
      icone: ic(`<circle cx="16" cy="16" r="12" fill="none" stroke="${O}" stroke-width="3"/><circle cx="11.5" cy="13" r="2.2" fill="${O}"/><circle cx="20.5" cy="13" r="2.2" fill="${O}"/><path d="M10 18.5 q6 6 12 0" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>`, "0 0 32 32") },
    { id: "energia", nome: "Energia", sala: "quarto", pensa: "😴",
      icone: ic(`<path d="M18 3 L7 18 h7 l-2 11 L25 13 h-7 z" fill="${O}" stroke="${O}" stroke-width="1.5" stroke-linejoin="round"/>`, "0 0 32 32") },
  ];

  // Comidas que não têm emoji bonito
  const ARTE_COMIDA = {
    coxinha: ic(`<path d="M32 5 C40 18 53 30 53 43 C53 55 43 60 32 60 C21 60 11 55 11 43 C11 30 24 18 32 5 Z" fill="#e8a33d" ${tr}/>
      <path d="M31 11 C35 19 40 24 43 31" stroke="#f8d27a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g fill="#b9701f"><circle cx="22" cy="44" r="1.8"/><circle cx="30" cy="51" r="1.6"/><circle cx="41" cy="46" r="1.8"/><circle cx="36" cy="38" r="1.4"/><circle cx="25" cy="34" r="1.4"/><circle cx="45" cy="53" r="1.3"/></g>`),
    brigadeiro: ic(`<path d="M13 38 H51 L46 57 H18 Z" fill="#c77dff" ${tr}/>
      <path d="M20 39 L22 56 M27 39 L28 56 M34 39 V56 M41 39 L40 56 M47 39 L44 56" stroke="#7b2cbf" stroke-width="1.8"/>
      <circle cx="32" cy="29" r="16" fill="#4a2617" ${tr}/>
      <g fill="#8a5434"><rect x="24" y="20" width="5" height="2.2" rx="1" transform="rotate(30 26 21)"/><rect x="34" y="18" width="5" height="2.2" rx="1" transform="rotate(-20 36 19)"/>
      <rect x="38" y="28" width="5" height="2.2" rx="1" transform="rotate(60 40 29)"/><rect x="22" y="31" width="5" height="2.2" rx="1" transform="rotate(-40 24 32)"/>
      <rect x="30" y="36" width="5" height="2.2" rx="1" transform="rotate(10 32 37)"/><rect x="31" y="26" width="5" height="2.2" rx="1" transform="rotate(80 33 27)"/></g>
      <ellipse cx="25" cy="22" rx="4" ry="2.4" fill="#fff" opacity=".35" transform="rotate(-35 25 22)"/>`),
    acai: ic(`<path d="M10 30 Q22 18 32 22 Q44 16 54 30 Z" fill="#4b1d5e" ${tr}/>
      <path d="M8 30 H56 Q54 55 32 57 Q10 55 8 30 Z" fill="#f6ecff" ${tr}/>
      <path d="M8 30 H56" ${tr}/><path d="M22 27 q5 -6 10 -1 t10 -2" stroke="#6b3a1f" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      ${coracaoP(42, 21, 0.45, "#e63946")}<g fill="#e9c46a"><circle cx="18" cy="26" r="2.2"/><circle cx="26" cy="23" r="1.8"/><circle cx="35" cy="25" r="2"/></g>
      <path d="M14 40 Q32 48 50 40" stroke="#c77dff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>`),
  };

  /* ================== Cômodos e decoração ================== */
  const SALAS = [
    { id: "cozinha", nome: "Cozinha", icone: "🍳", parede: "azulejo", piso: "xadrez" },
    { id: "banheiro", nome: "Banheiro", icone: "🛁", parede: "bolhas", piso: "azulejo" },
    { id: "quarto", nome: "Quarto", icone: "🛏️", parede: "estrelas", piso: "carpete" },
    { id: "jogos", nome: "Sala de Jogos", icone: "🎮", parede: "xadrez", piso: "tacos" },
    { id: "cinema", nome: "Cineminha", icone: "🍿", parede: "veludo", piso: "carpete" },
    { id: "cantinho", nome: "Cantinho da Manu", icone: "💜", parede: "patinhas", piso: "tacos" },
  ];
  const salaPorId = Object.fromEntries(SALAS.map((s) => [s.id, s]));

  const svgUrl = (w, h, d) =>
    `url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${d}</svg>`)}')`;
  const coracaoTile = (x, y, s, cor) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -4 C-3 -10 -12 -9 -12 -2 C-12 5 -3 9 0 13 C3 9 12 5 12 -2 C12 -9 3 -10 0 -4 Z" fill="${cor}"/>`;
  const pataTile = (x, y, giro, cor) => `<g transform="translate(${x} ${y}) rotate(${giro})" fill="${cor}">
    <ellipse cx="0" cy="5" rx="7" ry="6"/><ellipse cx="-8" cy="-3" rx="3" ry="3.8"/><ellipse cx="-3" cy="-8" rx="3" ry="3.8"/>
    <ellipse cx="3" cy="-8" rx="3" ry="3.8"/><ellipse cx="8" cy="-3" rx="3" ry="3.8"/></g>`;
  const estrelinha = (x, y, s, cor) =>
    `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 Q1.5 -1.5 10 0 Q1.5 1.5 0 10 Q-1.5 1.5 -10 0 Q-1.5 -1.5 0 -10 Z" fill="${cor}"/>`;

  const PAREDES = {
    azulejo: { nome: "Azulejo de cozinha", preco: 0, fundo: `${svgUrl(36, 36, `<rect width="36" height="36" fill="#fbf7ff"/><rect x="1" y="1" width="34" height="34" rx="3" fill="none" stroke="#e2cff7" stroke-width="2"/><circle cx="18" cy="18" r="3.5" fill="#efdcff"/>`)}` },
    bolhas: { nome: "Bolhinhas", preco: 0, fundo: `${svgUrl(64, 64, `<circle cx="14" cy="16" r="7" fill="none" stroke="#fff" stroke-width="2" opacity=".9"/><circle cx="46" cy="42" r="10" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/><circle cx="42" cy="12" r="3" fill="#fff" opacity=".7"/><circle cx="18" cy="50" r="4" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/>`)}, linear-gradient(#d4f1ff, #b9dcf7)` },
    estrelas: { nome: "Noite estrelada", preco: 0, fundo: `${svgUrl(80, 80, `${estrelinha(16, 14, 0.7, "#ffd166")}<circle cx="56" cy="24" r="1.7" fill="#fff"/><circle cx="34" cy="52" r="1.3" fill="#fff" opacity=".8"/>${estrelinha(62, 62, 0.5, "#e0aaff")}<circle cx="10" cy="66" r="1.2" fill="#fff" opacity=".7"/>`)}, linear-gradient(#3c1361, #23083b)` },
    xadrez: { nome: "Xadrez gamer", preco: 0, fundo: "repeating-conic-gradient(#e2cdfb 0 25%, #d0b2f8 0 50%) 0 0 / 44px 44px" },
    veludo: { nome: "Cortina de veludo", preco: 0, fundo: "repeating-linear-gradient(90deg, #5c1236 0 9px, #7d1d4b 9px 20px, #5c1236 20px 28px)" },
    patinhas: { nome: "Patinhas", preco: 0, fundo: `${svgUrl(70, 70, `${pataTile(18, 18, -15, "#dcc7fb")}${pataTile(52, 52, 20, "#dcc7fb")}`)}, #f3e8ff` },
    lilas: { nome: "Lilás clarinho", preco: 30, fundo: "linear-gradient(#f2e6ff, #e3cffc)" },
    listras: { nome: "Listrinhas", preco: 40, fundo: "repeating-linear-gradient(90deg, #fdf0ff 0 18px, #f3d6ff 18px 36px)" },
    bolinhas: { nome: "Bolinhas", preco: 40, fundo: "radial-gradient(circle, #f7a8de 5px, transparent 6px) 0 0 / 30px 30px, radial-gradient(circle, #f7a8de 5px, transparent 6px) 15px 15px / 30px 30px, #ffeaf7" },
    coracoes: { nome: "Coraçõezinhos", preco: 60, fundo: `${svgUrl(64, 64, `${coracaoTile(16, 16, 0.7, "#f7a8de")}${coracaoTile(48, 48, 0.7, "#e7b6f5")}`)}, #fff0f8` },
    nuvens: { nome: "Céu de nuvem", preco: 70, fundo: `${svgUrl(110, 90, `<g fill="#fff" opacity=".9"><circle cx="22" cy="30" r="9"/><circle cx="33" cy="25" r="12"/><circle cx="46" cy="31" r="8"/><rect x="22" y="30" width="24" height="9" rx="4.5"/></g><g fill="#fff" opacity=".75"><circle cx="78" cy="68" r="6"/><circle cx="86" cy="64" r="8"/><circle cx="95" cy="69" r="5.5"/><rect x="78" y="68" width="17" height="6" rx="3"/></g>`)}, linear-gradient(#c7e6ff, #ecdcff)` },
    floresta: { nome: "Floresta da kitsune", preco: 90, fundo: `${svgUrl(80, 96, `<path d="M22 96 V78 H9 L22 58 H13 L26 36 L39 58 H30 L43 78 H30 V96 Z" fill="#2a0c47"/><path d="M62 96 V84 H53 L62 70 H56 L65 56 L74 70 H68 L77 84 H68 V96 Z" fill="#331058"/><circle cx="58" cy="26" r="3.5" fill="#e0aaff" opacity=".8"/><circle cx="58" cy="26" r="7" fill="#e0aaff" opacity=".2"/><circle cx="14" cy="16" r="2" fill="#f39ad6" opacity=".8"/>`)}, linear-gradient(#4a1d78, #1f0a35)` },
    tumba: { nome: "Tumba da Lara Croft", preco: 90, fundo: `${svgUrl(64, 40, `<rect width="64" height="40" fill="#bda27b"/><path d="M0 19 H64 M0 39 H64 M20 0 V19 M52 0 V19 M4 19 V39 M36 19 V39" stroke="#8f7553" stroke-width="2.5"/><path d="M40 6 l3 4 -2 3" stroke="#8f7553" stroke-width="1.4" fill="none"/>`)}` },
    hazbin: { nome: "Hotel Hazbin", preco: 90, fundo: `${svgUrl(40, 40, `<rect width="40" height="40" fill="#7a1028"/><path d="M20 4 L36 20 L20 36 L4 20 Z" fill="none" stroke="#d4af37" stroke-width="1.5" opacity=".75"/><circle cx="20" cy="20" r="2.6" fill="#d4af37"/>`)}` },
  };

  const PISOS = {
    xadrez: { nome: "Xadrez", preco: 0, fundo: "repeating-conic-gradient(#ffffff 0 25%, #e6d3fc 0 50%) 0 0 / 40px 40px" },
    azulejo: { nome: "Azulejo", preco: 0, fundo: `${svgUrl(40, 40, `<rect width="40" height="40" fill="#eef7ff"/><path d="M0 1 H40 M1 0 V40" stroke="#c4d9ec" stroke-width="2"/>`)}` },
    carpete: { nome: "Carpete roxo", preco: 0, fundo: "radial-gradient(circle, rgba(255,255,255,.13) 1px, transparent 1.6px) 0 0 / 7px 7px, linear-gradient(#7b2cbf, #5a189a)" },
    tacos: { nome: "Taco de madeira", preco: 0, fundo: "repeating-linear-gradient(90deg, rgba(70,35,10,.28) 0 2px, transparent 2px 46px), linear-gradient(#c99566, #a8754b)" },
    grama: { nome: "Gramadinho", preco: 50, fundo: "radial-gradient(circle, rgba(255,255,255,.12) 1px, transparent 2px) 0 0 / 9px 9px, linear-gradient(#86cf5a, #519b37)" },
    nuvem: { nome: "Tapete de nuvem", preco: 60, fundo: "radial-gradient(circle at 30% 40%, #fff 0 22%, transparent 23%) 0 0 / 46px 34px, linear-gradient(#ffd6f0, #f3b6e1)" },
    pedra: { nome: "Pedra de tumba", preco: 60, fundo: `${svgUrl(50, 50, `<rect width="50" height="50" fill="#a8916d"/><path d="M0 1 H50 M1 0 V50" stroke="#7e6849" stroke-width="2.5"/><circle cx="18" cy="30" r="2" fill="#8f7553"/>`)}` },
    roxinho: { nome: "Madeira roxinha", preco: 70, fundo: "repeating-linear-gradient(90deg, rgba(30,0,50,.3) 0 2px, transparent 2px 40px), linear-gradient(#9d6bd6, #6f3fb0)" },
  };

  // Móveis fixos de cada cômodo (lugar: "parede" no meio lá em cima, "esq"/"dir" no chão do fundo)
  const MOVEIS = {
    janelaDia: { lugar: "parede", vb: "0 0 120 100", arte: () => `
      <rect x="14" y="10" width="92" height="74" rx="8" fill="#fff" ${tr}/>
      <rect x="22" y="18" width="76" height="58" rx="4" fill="#bde0fe"/>
      <circle cx="78" cy="36" r="10" fill="#ffd166"/>
      <g fill="#fff"><circle cx="38" cy="58" r="7"/><circle cx="47" cy="53" r="9"/><circle cx="57" cy="59" r="6"/></g>
      <path d="M60 18 V76 M22 47 H98" stroke="#fff" stroke-width="5"/>
      <rect x="22" y="18" width="76" height="58" rx="4" fill="none" ${tr}/>
      <path d="M8 6 H40 Q30 42 18 92 H8 Z" fill="#f3a6e0" ${tr}/><path d="M112 6 H80 Q90 42 102 92 H112 Z" fill="#f3a6e0" ${tr}/>
      <path d="M4 6 H116" ${tr} stroke-width="5"/>` },
    janelaNoite: { lugar: "parede", vb: "0 0 120 100", arte: () => `
      <rect x="14" y="10" width="92" height="74" rx="8" fill="#fff" ${tr}/>
      <rect x="22" y="18" width="76" height="58" rx="4" fill="#1d0b3a"/>
      <circle cx="76" cy="38" r="11" fill="#ffe8a3"/><circle cx="82" cy="34" r="10" fill="#1d0b3a"/>
      ${estrelinha(38, 32, 0.5, "#ffd166")}${estrelinha(52, 60, 0.35, "#e0aaff")}<circle cx="88" cy="62" r="1.6" fill="#fff"/>
      <path d="M60 18 V76 M22 47 H98" stroke="#fff" stroke-width="5"/>
      <rect x="22" y="18" width="76" height="58" rx="4" fill="none" ${tr}/>
      <path d="M8 6 H38 Q30 42 18 92 H8 Z" fill="#7b2cbf" ${tr}/><path d="M112 6 H82 Q90 42 102 92 H112 Z" fill="#7b2cbf" ${tr}/>
      <path d="M4 6 H116" ${tr} stroke-width="5"/>` },
    bancada: { lugar: "dir", vb: "0 -14 120 124", arte: () => `
      <path class="cs-vapor" d="M40 6 q-5 -6 0 -12 M52 4 q5 -6 0 -12" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M28 12 H64 V28 Q64 33 59 33 H33 Q28 33 28 28 Z" fill="#9aa4b6" ${tr}/><path d="M24 12 H68" ${tr}/><circle cx="46" cy="8" r="3" fill="${O}"/>
      <rect x="6" y="42" width="108" height="66" rx="5" fill="#f6ecff" ${tr}/>
      <rect x="2" y="33" width="116" height="12" rx="4" fill="#c77dff" ${tr}/>
      <rect x="16" y="58" width="52" height="40" rx="5" fill="#3c2a4d" ${tr}/><rect x="23" y="66" width="38" height="18" rx="3" fill="#ffb86b" opacity=".6"/>
      <circle cx="26" cy="51" r="3.3" fill="${O}"/><circle cx="38" cy="51" r="3.3" fill="${O}"/><circle cx="50" cy="51" r="3.3" fill="${O}"/>
      <rect x="78" y="56" width="28" height="44" rx="4" fill="#fff" ${tr}/><path d="M86 66 H98" ${tr}/>` },
    espelho: { lugar: "parede", vb: "0 0 80 100", arte: () => `
      <ellipse cx="40" cy="50" rx="30" ry="40" fill="#f39ad6" ${tr}/>
      <ellipse cx="40" cy="50" rx="22" ry="31" fill="#dff4ff" ${tr}/>
      <path d="M28 34 L40 22 M28 46 L46 28" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      ${coracaoP(40, 10, 0.55, "#fff")}` },
    banheira: { lugar: "dir", vb: "0 0 140 104", arte: () => `
      <g fill="#fff" ${tr} stroke-width="2"><circle cx="30" cy="34" r="9"/><circle cx="48" cy="28" r="12"/><circle cx="70" cy="32" r="10"/><circle cx="92" cy="27" r="12"/><circle cx="110" cy="34" r="8"/></g>
      <g transform="translate(36 6)"><ellipse cx="14" cy="22" rx="14" ry="9" fill="#ffd166" ${tr} stroke-width="2.5"/><circle cx="23" cy="10" r="8" fill="#ffd166" ${tr} stroke-width="2.5"/>
      <path d="M30 10 L37 12 L30 15 Z" fill="#f4845f" ${tr} stroke-width="2"/><circle cx="25" cy="8" r="1.6" fill="${O}"/></g>
      <path d="M6 42 H134 V58 Q134 94 100 94 H40 Q6 94 6 58 Z" fill="#fff" ${tr}/>
      <rect x="2" y="36" width="136" height="12" rx="6" fill="#f6ecff" ${tr}/>
      <path d="M26 92 l-5 9 M114 92 l5 9" ${tr} stroke-width="5"/>
      <path d="M122 36 V20 Q122 13 113 13 H105" fill="none" ${tr} stroke-width="5"/>` },
    cama: { lugar: "dir", vb: "0 0 150 100", arte: () => `
      <path d="M112 22 Q112 6 128 6 H134 Q148 6 148 22 V94 H112 Z" fill="#7b2cbf" ${tr}/>
      ${coracaoP(131, 24, 0.55, "#f39ad6")}
      <rect x="4" y="48" width="138" height="28" rx="10" fill="#fff" ${tr}/>
      <ellipse cx="114" cy="44" rx="18" ry="9" fill="#fff" ${tr}/>
      <path d="M4 56 Q4 46 15 46 H96 Q105 61 96 78 H15 Q4 78 4 67 Z" fill="#c77dff" ${tr}/>
      ${coracaoP(32, 60, 0.45, "#f3c4fb")}${coracaoP(62, 64, 0.38, "#f3c4fb")}
      <path d="M12 76 V94 M136 76 V94" ${tr} stroke-width="6"/>` },
    neon: { lugar: "parede", vb: "0 0 160 64", arte: () => `
      <rect x="4" y="6" width="152" height="52" rx="12" fill="#1a0626" ${tr}/>
      <text x="80" y="41" text-anchor="middle" font-family="Fredoka, Poppins, sans-serif" font-weight="700" font-size="24"
        fill="#ffe6fa" stroke="#f15bb5" stroke-width="1.2" class="cs-neon">GAME ON</text>
      ${coracaoP(20, 30, 0.45, "#f15bb5")}${coracaoP(140, 30, 0.45, "#f15bb5")}` },
    fliperama: { lugar: "esq", vb: "0 0 90 140", toque: "jogos", arte: () => `
      <path d="M14 18 Q14 6 26 6 H64 Q76 6 76 18 V136 H14 Z" fill="#7b2cbf" ${tr}/>
      <rect x="20" y="12" width="50" height="14" rx="3" fill="#f15bb5" ${tr} stroke-width="2.5"/>
      <text x="45" y="23.5" text-anchor="middle" font-family="Fredoka, Poppins, sans-serif" font-weight="700" font-size="10" fill="#fff">PLAY</text>
      <rect x="20" y="31" width="50" height="38" rx="4" fill="#10021c" ${tr} stroke-width="2.5"/>
      <g fill="#f15bb5"><rect x="35" y="41" width="6" height="6"/><rect x="49" y="41" width="6" height="6"/><rect x="29" y="47" width="32" height="6"/><rect x="35" y="53" width="20" height="6"/><rect x="41" y="59" width="8" height="5"/></g>
      <path d="M10 76 H80 L76 94 H14 Z" fill="#9d4edd" ${tr}/>
      <path d="M30 85 V75" ${tr} stroke-width="4"/><circle cx="30" cy="73" r="5" fill="#f15bb5" ${tr} stroke-width="2"/>
      <circle cx="52" cy="85" r="4" fill="#ffd166" ${tr} stroke-width="2"/><circle cx="63" cy="83" r="4" fill="#4cc9f0" ${tr} stroke-width="2"/>
      <rect x="38" y="104" width="14" height="18" rx="2" fill="#5a189a" ${tr} stroke-width="2.5"/><path d="M45 108 V118" stroke="#ffd166" stroke-width="2"/>` },
    pipoqueira: { lugar: "dir", vb: "0 -6 80 128", arte: () => `
      <path d="M4 12 L40 -2 L76 12 Z" fill="#e63946" ${tr}/>
      <rect x="10" y="12" width="60" height="56" rx="6" fill="#ffeef8" ${tr}/>
      <g fill="#fff3c4" stroke="#e9c46a" stroke-width="1.2"><circle cx="20" cy="58" r="6"/><circle cx="31" cy="60" r="6"/><circle cx="43" cy="58" r="6"/><circle cx="55" cy="60" r="6"/><circle cx="62" cy="55" r="5"/>
      <circle cx="26" cy="51" r="5.5"/><circle cx="38" cy="50" r="6"/><circle cx="50" cy="51" r="5.5"/><circle cx="32" cy="43" r="5"/><circle cx="45" cy="42" r="5"/></g>
      <path d="M18 20 L26 30" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <rect x="10" y="68" width="60" height="38" rx="4" fill="#e63946" ${tr}/>
      <text x="40" y="93" text-anchor="middle" font-family="Fredoka, Poppins, sans-serif" font-weight="700" font-size="15" fill="#fff">POP</text>
      <circle cx="22" cy="112" r="7" fill="#fff" ${tr}/><circle cx="58" cy="112" r="7" fill="#fff" ${tr}/>` },
    estante: { lugar: "esq", vb: "0 0 90 132", toque: "lista", arte: () => {
      const livro = (x, y, w, h, cor, giro = 0) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${cor}" ${tr} stroke-width="2" transform="rotate(${giro} ${x + w / 2} ${y + h})"/>`;
      return `<rect x="6" y="6" width="78" height="122" rx="4" fill="#a86f45" ${tr}/>
        <rect x="12" y="12" width="66" height="110" fill="#6e4224"/>
        ${livro(15, 18, 9, 26, "#9d4edd")}${livro(25, 22, 8, 22, "#f15bb5")}${livro(34, 16, 10, 28, "#ffd166")}${livro(45, 20, 8, 24, "#4cc9f0")}${livro(58, 22, 9, 22, "#e63946", 14)}
        ${livro(15, 58, 8, 24, "#7ae582")}${livro(24, 54, 10, 28, "#c77dff")}${livro(35, 60, 8, 22, "#f3a6e0")}
        <g transform="translate(46 52) scale(.14)">${M.g.kitsune({ fogos: false })}</g>
        ${livro(15, 96, 10, 24, "#3c096c")}${livro(26, 94, 9, 26, "#e63946")}${livro(36, 98, 8, 22, "#ffd166")}
        <path d="M62 120 Q60 106 64 98" stroke="#fff" stroke-width="1.5" fill="none"/><ellipse cx="64" cy="94" rx="7" ry="8.5" fill="#e63946" ${tr} stroke-width="2"/>
        <rect x="12" y="46" width="66" height="6" fill="#c08457" ${tr} stroke-width="2"/><rect x="12" y="84" width="66" height="6" fill="#c08457" ${tr} stroke-width="2"/>`;
    } },
    mural: { lugar: "parede", vb: "0 0 140 100", toque: "lista", arte: () => `
      <rect x="6" y="6" width="128" height="88" rx="6" fill="#a86f45" ${tr}/>
      <rect x="14" y="14" width="112" height="72" rx="3" fill="#d9a066"/>
      <g transform="rotate(-6 40 40)"><rect x="22" y="22" width="36" height="32" rx="2" fill="#fff3b0"/><path d="M27 32 H53 M27 39 H49 M27 46 H45" stroke="#c9a227" stroke-width="2" stroke-linecap="round"/></g>
      <g transform="rotate(5 96 44)"><rect x="78" y="22" width="38" height="34" rx="2" fill="#f8c9ee"/>${coracaoP(97, 37, 0.6, "#f15bb5")}</g>
      <g transform="rotate(-3 70 70)"><rect x="40" y="58" width="58" height="22" rx="2" fill="#fff"/>
      <text x="69" y="73" text-anchor="middle" font-family="Fredoka, Poppins, sans-serif" font-weight="600" font-size="10" fill="#7b2cbf">Lista da Manu</text></g>
      <circle cx="40" cy="24" r="3" fill="#e63946"/><circle cx="97" cy="24" r="3" fill="#4cc9f0"/><circle cx="69" cy="60" r="3" fill="#7ae582"/>` },
  };
  const MOVEIS_SALA = {
    cozinha: ["janelaDia", "bancada"],
    banheiro: ["espelho", "banheira"],
    quarto: ["janelaNoite", "cama"],
    jogos: ["neon", "fliperama"],
    cinema: ["telao", "pipoqueira"],
    cantinho: ["mural", "estante"],
  };

  // Enfeites da loja: cada um tem um lugarzinho certo no cômodo
  const ENFEITES = {
    luzinhas: { nome: "Luzinhas", preco: 80, lugar: "teto", vb: "0 0 300 46", arte: () => {
      const y = (x) => {
        const [a, b, c] = x <= 150 ? [6, 30, 8] : [8, 30, 6];
        const t = (x <= 150 ? x : x - 150) / 150;
        return (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;
      };
      const cores = ["#ffd166", "#f15bb5", "#4cc9f0", "#7ae582", "#c77dff"];
      let s = `<path d="M0 6 Q75 30 150 8 Q225 30 300 6" stroke="#3c096c" stroke-width="2" fill="none"/>`;
      for (let i = 1; i < 12; i++) {
        const x = i * 25, yy = y(x);
        s += `<rect x="${x - 2.5}" y="${yy - 1}" width="5" height="5" rx="1" fill="#3c096c"/>
          <ellipse class="cs-lampada" style="animation-delay:${(i % 4) * 0.35}s" cx="${x}" cy="${yy + 10}" rx="5" ry="7" fill="${cores[i % cores.length]}"/>`;
      }
      return s;
    } },
    bandeirinhas: { nome: "Bandeirinhas", preco: 50, lugar: "teto", vb: "0 0 300 46", arte: () => {
      const cores = ["#f15bb5", "#ffd166", "#4cc9f0", "#7ae582", "#c77dff", "#e63946"];
      let s = `<path d="M0 6 Q150 26 300 6" stroke="#3c096c" stroke-width="2" fill="none"/>`;
      for (let i = 0; i < 12; i++) {
        const x = 12 + i * 25, t = x / 300, yy = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 26 + t ** 2 * 6;
        s += `<path d="M${x - 9} ${yy} L${x + 9} ${yy + 1} L${x} ${yy + 22} Z" fill="${cores[i % cores.length]}" ${tr} stroke-width="1.6"/>`;
      }
      return s;
    } },
    quadroCasal: { nome: "Quadro da Gatinha e da Lontrinha", preco: 60, lugar: "paredeEsq", vb: "0 0 100 80", arte: () => `
      <rect x="4" y="4" width="92" height="72" rx="5" fill="#ffd166" ${tr}/><rect x="11" y="11" width="78" height="58" rx="2" fill="#f3e8ff"/>
      <svg x="12" y="14" width="76" height="52" viewBox="0 0 400 240">${M.g.casal({ agua: false })}</svg>` },
    posterCroft: { nome: "Pôster da Manuzinha Croft", preco: 90, lugar: "paredeDir", vb: "0 0 80 100", arte: () => `
      <rect x="4" y="4" width="72" height="92" rx="3" fill="#bda27b" ${tr}/><rect x="10" y="10" width="60" height="64" fill="#3cc4b4" opacity=".35"/>
      <svg x="10" y="10" width="60" height="64" viewBox="0 0 200 200">${M.g.gatinhaCroft()}</svg>
      <text x="40" y="88" text-anchor="middle" font-family="Fredoka, Poppins, sans-serif" font-weight="700" font-size="8.5" fill="#5e3a26">MANUZINHA CROFT</text>
      <circle cx="12" cy="8" r="2.5" fill="#e63946"/><circle cx="68" cy="8" r="2.5" fill="#e63946"/>` },
    quadroHazbin: { nome: "Quadro do Hazbin Hotel", preco: 70, lugar: "paredeEsq", vb: "0 0 90 90", arte: () => `
      <rect x="4" y="4" width="82" height="82" rx="5" fill="#2a0a3d" ${tr}/><rect x="11" y="11" width="68" height="68" rx="2" fill="#7a1028"/>
      <svg x="13" y="13" width="64" height="64" viewBox="0 0 120 120">${M.adesivo("hazbin").replace(/^<svg[^>]*>|<\/svg>$/g, "")}</svg>` },
    relogio: { nome: "Relógio de gatinha", preco: 60, lugar: "paredeDir", vb: "0 0 70 110", arte: () => `
      <path d="M35 76 Q40 96 30 104" stroke="#7b2cbf" stroke-width="7" fill="none" stroke-linecap="round" class="cs-pendulo"/>
      <path d="M12 26 L14 4 L28 16 Z M58 26 L56 4 L42 16 Z" fill="#9d4edd" ${tr}/>
      <rect x="8" y="14" width="54" height="64" rx="24" fill="#9d4edd" ${tr}/>
      <circle cx="35" cy="48" r="20" fill="#fff" ${tr}/>
      <path d="M35 48 V35 M35 48 L45 52" ${tr} stroke-width="3.5"/><circle cx="35" cy="48" r="2.5" fill="${O}"/>
      <circle cx="26" cy="24" r="3.4" fill="${O}"/><circle cx="44" cy="24" r="3.4" fill="${O}"/>` },
    planta: { nome: "Plantinha", preco: 40, lugar: "chaoEsq", vb: "0 0 70 100", arte: () => `
      <g fill="#52b788" ${tr} stroke-width="2.5"><path d="M35 62 Q10 50 8 22 Q30 28 35 62 Z"/><path d="M35 62 Q60 50 62 20 Q40 28 35 62 Z"/><path d="M35 62 Q24 30 36 6 Q48 30 35 62 Z"/></g>
      <path d="M35 60 V40 M30 50 L20 34 M40 50 L50 32" stroke="#2d6a4f" stroke-width="2" fill="none"/>
      <path d="M14 60 H56 L50 96 H20 Z" fill="#f39ad6" ${tr}/><path d="M12 60 H58" ${tr} stroke-width="5"/>` },
    abajurLua: { nome: "Abajur de lua", preco: 70, lugar: "chaoEsq", vb: "0 0 70 110", arte: () => `
      <circle cx="35" cy="34" r="30" fill="#fff3b0" opacity=".35" class="cs-brilho"/>
      <circle cx="35" cy="34" r="22" fill="#ffe8a3" ${tr}/><circle cx="44" cy="28" r="18" fill="#fff8dc"/>
      <circle cx="28" cy="38" r="3" fill="#f0d68a"/><circle cx="36" cy="46" r="2" fill="#f0d68a"/>
      <path d="M35 56 V96" ${tr} stroke-width="4"/><ellipse cx="35" cy="100" rx="16" ry="6" fill="#7b2cbf" ${tr}/>` },
    pelucia: { nome: "Pelúcia de Lontrinha", preco: 80, lugar: "chaoDir", vb: "0 0 200 200", arte: () => M.g.lontrinha({ concha: true }) },
    caminha: { nome: "Caminha de pet", preco: 50, lugar: "chaoDir", vb: "0 0 120 70", arte: () => `
      <ellipse cx="60" cy="44" rx="56" ry="22" fill="#9d4edd" ${tr}/><ellipse cx="60" cy="40" rx="40" ry="13" fill="#f3c4fb" ${tr}/>
      ${coracaoP(60, 38, 0.5, "#f15bb5")}` },
    tapete: { nome: "Tapete redondo", preco: 60, lugar: "tapete", vb: "0 0 300 70", arte: () => `
      <ellipse cx="150" cy="35" rx="146" ry="31" fill="#f3c4fb" ${tr}/><ellipse cx="150" cy="35" rx="124" ry="23" fill="none" stroke="#c77dff" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>
      ${coracaoP(150, 32, 0.8, "#f39ad6")}` },
  };

  /* ================== Roupinhas (desenhadas por cima do bichinho, olhos em 78/122) ================== */
  const ROUPAS = {
    coroa: { nome: "Coroa de princesa", preco: 60, lugar: "cabeca", arte: `
      <g transform="translate(0 2)"><path d="M82 46 L77 23 L90 34 L100 16 L110 34 L123 23 L118 46 Z" fill="#ffd166" stroke="#e9a93a" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="77" cy="22" r="3.4" fill="#ffd166" stroke="#e9a93a" stroke-width="1.5"/><circle cx="100" cy="15" r="3.8" fill="#ffd166" stroke="#e9a93a" stroke-width="1.5"/>
      <circle cx="123" cy="22" r="3.4" fill="#ffd166" stroke="#e9a93a" stroke-width="1.5"/><path d="M100 30 l5 6 -5 6 -5 -6 Z" fill="#c77dff"/>
      <circle cx="88" cy="40" r="2.4" fill="#f39ad6"/><circle cx="112" cy="40" r="2.4" fill="#f39ad6"/></g>` },
    lacinho: { nome: "Lacinho rosa", preco: 40, lugar: "cabeca", arte: `
      <g transform="translate(66 52) rotate(-18)"><path d="M0 0 L-22 -13 Q-28 0 -22 13 Z" fill="#f39ad6" stroke="#c9409a" stroke-width="3" stroke-linejoin="round"/>
      <path d="M0 0 L22 -13 Q28 0 22 13 Z" fill="#f39ad6" stroke="#c9409a" stroke-width="3" stroke-linejoin="round"/>
      <circle r="6.5" fill="#ff7cc8" stroke="#c9409a" stroke-width="3"/></g>` },
    bruxa: { nome: "Chapéu de bruxa", preco: 90, lugar: "cabeca", arte: `
      <g transform="rotate(-8 100 46)"><ellipse cx="100" cy="48" rx="52" ry="11" fill="#3c096c" stroke="${O}" stroke-width="3"/>
      <path d="M68 46 Q80 2 116 -26 Q106 12 132 46 Z" fill="#5a189a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M70 37 Q100 46 130 37 L132 46 Q100 55 68 46 Z" fill="#c77dff" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>
      ${estrelinha(102, 14, 0.75, "#ffd166")}</g>` },
    bone: { nome: "Boné gamer", preco: 50, lugar: "cabeca", arte: `
      <path d="M58 54 Q60 18 100 16 Q140 18 142 54 Z" fill="#7b2cbf" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M118 50 Q158 42 176 54 Q152 64 118 58 Z" fill="#5a189a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="100" cy="17" r="4.5" fill="#f15bb5" stroke="${O}" stroke-width="2"/>${coracaoP(94, 36, 0.55, "#f3c4fb")}` },
    festa: { nome: "Chapéu de festa", preco: 40, lugar: "cabeca", arte: `
      <path d="M78 50 L100 -4 L122 50 Z" fill="#4cc9f0" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M85 33 L113 33 M91 18 L108 18" stroke="#ffd166" stroke-width="5"/><path d="M78 50 L122 50" stroke="#f15bb5" stroke-width="5" stroke-linecap="round"/>
      <circle cx="100" cy="-6" r="7" fill="#f15bb5" stroke="${O}" stroke-width="2.5"/>` },
    fone: { nome: "Fone gamer", preco: 100, lugar: "cabeca", arte: `
      <path d="M46 96 Q42 34 100 32 Q158 34 154 96" stroke="${O}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M46 96 Q42 34 100 32 Q158 34 154 96" stroke="#9d4edd" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="32" y="78" width="24" height="34" rx="10" fill="#5a189a" stroke="${O}" stroke-width="3"/>
      <rect x="144" y="78" width="24" height="34" rx="10" fill="#5a189a" stroke="${O}" stroke-width="3"/>
      <circle cx="44" cy="95" r="4" fill="#f15bb5"/><circle cx="156" cy="95" r="4" fill="#f15bb5"/>` },
    tiara: { nome: "Tiara escarlate", preco: 120, lugar: "cabeca", arte: `
      <path d="M62 56 Q84 52 92 34 L100 8 L108 34 Q116 52 138 56 Q118 61 108 51 L100 45 L92 51 Q82 61 62 56 Z"
        fill="#e0244f" stroke="#9e1238" stroke-width="3" stroke-linejoin="round"/><path d="M100 21 L104 35 L100 40 L96 35 Z" fill="#ff8fab"/>` },
    oculosCroft: { nome: "Óculos da Lara Croft", preco: 80, lugar: "olhos", arte: `
      <path d="M63 80 L50 76 M137 80 L150 76" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="78" cy="84" r="15" fill="rgba(42,10,61,.82)" stroke="#ffd166" stroke-width="3.5"/>
      <circle cx="122" cy="84" r="15" fill="rgba(42,10,61,.82)" stroke="#ffd166" stroke-width="3.5"/>
      <path d="M93 82 Q100 76 107 82" stroke="#ffd166" stroke-width="3" fill="none"/>
      <circle cx="72" cy="78" r="3.5" fill="#fff" opacity=".55"/><circle cx="116" cy="78" r="3.5" fill="#fff" opacity=".55"/>` },
    oculosCoracao: { nome: "Óculos de coração", preco: 60, lugar: "olhos", arte: `
      <path d="M62 80 L50 76 M138 80 L150 76" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
      <path transform="translate(78 81) scale(1.35)" d="M0 -4 C-3 -10 -12 -9 -12 -2 C-12 5 -3 9 0 13 C3 9 12 5 12 -2 C12 -9 3 -10 0 -4 Z" fill="rgba(241,91,181,.72)" stroke="#c9409a" stroke-width="2.4"/>
      <path transform="translate(122 81) scale(1.35)" d="M0 -4 C-3 -10 -12 -9 -12 -2 C-12 5 -3 9 0 13 C3 9 12 5 12 -2 C12 -9 3 -10 0 -4 Z" fill="rgba(241,91,181,.72)" stroke="#c9409a" stroke-width="2.4"/>
      <path d="M92 80 Q100 75 108 80" stroke="#c9409a" stroke-width="3" fill="none"/>` },
    oculosNerd: { nome: "Óculos redondinho", preco: 50, lugar: "olhos", arte: `
      <path d="M63 80 L50 76 M137 80 L150 76" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
      <rect x="62" y="70" width="32" height="28" rx="11" fill="rgba(224,170,255,.22)" stroke="#5a189a" stroke-width="4"/>
      <rect x="106" y="70" width="32" height="28" rx="11" fill="rgba(224,170,255,.22)" stroke="#5a189a" stroke-width="4"/>
      <path d="M94 82 Q100 78 106 82" stroke="#5a189a" stroke-width="3.5" fill="none"/>` },
    gravata: { nome: "Gravatinha borboleta", preco: 40, lugar: "pescoco", arte: `
      <g transform="translate(100 138)"><path d="M0 0 L-18 -11 Q-22 0 -18 11 Z" fill="#7b2cbf" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M0 0 L18 -11 Q22 0 18 11 Z" fill="#7b2cbf" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="-5" y="-6" width="10" height="12" rx="3" fill="#9d4edd" stroke="${O}" stroke-width="2.5"/></g>` },
    bandana: { nome: "Bandana de bolinha", preco: 50, lugar: "pescoco", arte: `
      <path d="M62 128 Q100 146 138 128 L100 174 Z" fill="#f15bb5" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <g fill="#fff"><circle cx="84" cy="140" r="2.6"/><circle cx="100" cy="148" r="2.6"/><circle cx="116" cy="140" r="2.6"/><circle cx="92" cy="156" r="2.6"/><circle cx="108" cy="156" r="2.6"/><circle cx="100" cy="166" r="2.2"/></g>` },
    cachecol: { nome: "Cachecol listrado", preco: 60, lugar: "pescoco", arte: `
      <path d="M114 138 L122 178 L106 180 L102 142 Z" fill="#c77dff" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M108 160 L121 158 M110 170 L122 169" stroke="#fff" stroke-width="3"/>
      <path d="M58 122 Q100 148 142 122 L143 136 Q100 162 57 136 Z" fill="#c77dff" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M72 132 L74 145 M88 137 L89 151 M112 137 L111 151 M128 132 L126 145" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>` },
    perolas: { nome: "Colar de pérolas", preco: 90, lugar: "pescoco", arte: (() => {
      let s = "";
      for (let i = 0; i <= 12; i++) {
        const t = i / 12, x = (1 - t) ** 2 * 64 + 2 * (1 - t) * t * 100 + t ** 2 * 136, y = (1 - t) ** 2 * 129 + 2 * (1 - t) * t * 154 + t ** 2 * 129;
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="#fff" stroke="#d9c3ee" stroke-width="1.6"/>`;
      }
      return s + `<circle cx="100" cy="148" r="6" fill="#f3c4fb" stroke="#c77dff" stroke-width="2"/>`;
    })() },
  };
  const LUGARES_ROUPA = [["cabeca", "Cabeça"], ["olhos", "Olhos"], ["pescoco", "Pescoço"]];
  const VB_PET = "-50 -40 300 270";
  const VB_LUGAR = { cabeca: "38 -32 124 98", olhos: "40 58 120 54", pescoco: "50 112 100 72" };

  /* ================== Comidas, falas e bichinhos ================== */
  const COMIDAS = C.comidas || [];
  const comidaPorId = Object.fromEntries(COMIDAS.map((c) => [c.id, c]));
  const arteComida = (c) => (c.arte && ARTE_COMIDA[c.arte]) || `<span class="cs-emoji">${esc(c.icone || "🍽️")}</span>`;
  const PETS = C.pets && C.pets.length ? C.pets.filter((p) => M.g[p.id]) : [];
  if (!PETS.length) return;
  const GANHO = {
    comida: (v) => v * 2,
    nuvens: (v) => v / 4,
    lontra: (v) => v * 3,
    memoria: (v) => Math.max(8, 48 - (v - 8) * 3),
  };

  /* ================== Estado salvo ================== */
  const CHAVE = "manu-casinha";
  const STATS = ["fome", "higiene", "diversao", "energia"];
  const novoEstado = () => ({
    moedas: C.moedasIniciais ?? 150,
    xp: 0,
    sala: "cozinha",
    ativo: PETS[0].id,
    atualizado: Date.now(),
    presente: "",
    nomes: {},
    pets: Object.fromEntries(PETS.map((p, i) => [p.id, {
      fome: i ? 70 : 42, higiene: i ? 58 : 82, diversao: i ? 55 : 66, energia: i ? 82 : 72,
      roupa: i ? { pescoco: "gravata" } : { cabeca: "coroa" },
    }])),
    geladeira: { ...(C.geladeiraInicial || {}) },
    tem: { roupas: ["coroa", "lacinho", "gravata"], paredes: [], pisos: [], enfeites: [] },
    salas: {},
    vistos: {},
  });

  let estado = novoEstado();
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && typeof salvo === "object") {
      const base = novoEstado();
      estado = { ...base, ...salvo, tem: { ...base.tem, ...(salvo.tem || {}) } };
      PETS.forEach((p) => {
        const s = (salvo.pets || {})[p.id] || {};
        estado.pets[p.id] = { ...base.pets[p.id], ...s, roupa: { ...(s.roupa || base.pets[p.id].roupa) } };
        STATS.forEach((k) => { if (!Number.isFinite(estado.pets[p.id][k])) estado.pets[p.id][k] = base.pets[p.id][k]; });
      });
      if (!salaPorId[estado.sala]) estado.sala = "cozinha";
      if (!estado.pets[estado.ativo]) estado.ativo = PETS[0].id;
      // O tempo passou desde a última visita: dá fominha, sujinha, tédio e soninho (sem exagero)
      const horas = Math.min(72, Math.max(0, (Date.now() - (salvo.atualizado || Date.now())) / 3.6e6));
      decair(horas, 8);
    }
  } catch { /* sem localStorage, a casinha funciona do mesmo jeito (só não lembra) */ }

  const VISTOS_INICIAIS = Object.fromEntries((cfg.listasManu?.praAssistir || []).map((f) => [f.id, !!f.visto]));
  const visto = (id) => (id in estado.vistos ? estado.vistos[id] : VISTOS_INICIAIS[id]);

  let salvarDepois = 0;
  function salvar() {
    estado.atualizado = Date.now();
    clearTimeout(salvarDepois);
    salvarDepois = depois(400, () => {
      try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch { /* tudo bem */ }
    });
  }

  function decair(horas, piso = 5) {
    const porHora = { fome: 6, higiene: 4, diversao: 5, energia: 3 };
    PETS.forEach((p) => STATS.forEach((k) => {
      const v = estado.pets[p.id][k];
      if (v > piso) estado.pets[p.id][k] = Math.max(piso, v - porHora[k] * horas);
    }));
  }

  const nomeDe = (id) => estado.nomes[id] || PETS.find((p) => p.id === id).nome;
  const generoDe = (id) => PETS.find((p) => p.id === id).genero || "a";
  const pet = (id = estado.ativo) => estado.pets[id];
  const nivel = () => 1 + Math.floor(estado.xp / 40);
  const salaInfo = (id = estado.sala) => {
    const s = salaPorId[id];
    estado.salas[id] = estado.salas[id] || {};
    const d = estado.salas[id];
    return { ...s, parede: d.parede || s.parede, piso: d.piso || s.piso, enfeites: d.enfeites || {} };
  };
  const linha = (chave, id) => {
    const l = C.falas?.[chave];
    const t = Array.isArray(l) ? sorteia(l) : l || "";
    return t.replace(/\{a\}/g, generoDe(id));
  };

  /* ================== Estado só desta visita ================== */
  const tmp = {
    rosto: {},        // carinha temporária { olhos, boca, ate }
    luz: true,        // abajur do quarto
    dormiuEm: 0,
    sessao: null,     // filme sorteado no Cineminha
    sessaoDeu: false,
    bola: false,
    chutes: 0,
    espuma: {},       // quantas bolhinhas cada um tem
    comida: null,     // comida que aparece no botão da cozinha
    folha: null,      // painel aberto
    abaLoja: "comidas",
    abaRoupa: "cabeca",
    abaLista: "comidas",
    arraste: null,
    ultimoCarinho: 0,
    falou: false,
  };

  /* ================== Esqueleto ================== */
  raiz.innerHTML = `
    <div class="cs-topo">
      <div class="cs-linha">
        <div class="cs-moedas" title="Moedinhas"><span class="cs-moeda-icone">${MOEDA}</span><b id="csMoedas">0</b></div>
        <div class="cs-status">${STATUS.map((s) => `
          <button class="cs-stat" type="button" data-acao="stat" data-stat="${s.id}">
            <span class="cs-stat-nivel"></span>${s.icone}
          </button>`).join("")}</div>
        <div class="cs-nivel" title="Nível da casinha"><span>⭐</span><b id="csNivel">1</b></div>
      </div>
      <div class="cs-linha">
        <button class="cs-quadrado" type="button" data-acao="mapa" aria-label="Mapa da casinha">${ICONES.casa}</button>
        <button class="cs-quadrado cs-seta" type="button" data-acao="anterior" aria-label="Cômodo anterior">
          ${ic(`<path d="M38 14 L20 32 L38 50" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`)}</button>
        <button class="cs-sala-nome cs-contorno" type="button" data-acao="mapa" id="csSalaNome"></button>
        <button class="cs-quadrado cs-seta" type="button" data-acao="proxima" aria-label="Próximo cômodo">
          ${ic(`<path d="M26 14 L44 32 L26 50" fill="none" stroke="${O}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`)}</button>
        <button class="cs-quadrado cs-ajuda" type="button" data-acao="ajuda" aria-label="Como funciona">?</button>
      </div>
    </div>
    <div class="cs-cena" id="csCena">
      <div class="cs-parede"></div>
      <div class="cs-piso"></div>
      <div class="cs-moveis" id="csMoveis"></div>
      <div class="cs-pets">${PETS.map((p) => `
        <div class="cs-pet" data-pet="${p.id}" role="button" tabindex="0">
          <div class="cs-pet-arte"></div>
          <div class="cs-espuma"></div>
          <span class="cs-pensa" hidden></span>
          <span class="cs-fala" hidden></span>
          <span class="cs-pet-nome"></span>
        </div>`).join("")}</div>
      <div class="cs-efeitos" id="csEfeitos"></div>
      <div class="cs-escuro" aria-hidden="true"></div>
      <p class="cs-aviso" id="csAviso" role="status" aria-live="polite"></p>
    </div>
    <div class="cs-base" id="csBase"></div>
    <div class="cs-folha" id="csFolha" hidden></div>`;

  const cena = $("#csCena");
  const efeitos = $("#csEfeitos");
  const base = $("#csBase");
  const folha = $("#csFolha");
  const petEl = (id) => $(`.cs-pet[data-pet="${id}"]`);

  /* ================== Bichinhos ================== */
  const dormindo = () => estado.sala === "quarto" && !tmp.luz;

  function rostoDe(id) {
    const r = tmp.rosto[id];
    if (r && r.ate > Date.now()) return r;
    if (dormindo()) return { olhos: "fechados", boca: "sorriso" };
    const p = pet(id);
    if (STATS.some((k) => p[k] < 25)) return { olhos: "tristes", boca: "triste" };
    return { olhos: "abertos", boca: id === "cachorrinho" ? "lingua" : "sorriso" };
  }

  function sujeira(h) {
    if (h >= 55) return "";
    const a = Math.min(1, (55 - h) / 40).toFixed(2);
    let s = `<g opacity="${a}" fill="#86623f"><ellipse cx="70" cy="160" rx="10" ry="6.5"/><ellipse cx="130" cy="170" rx="8" ry="5"/>
      <ellipse cx="120" cy="58" rx="7" ry="4.5"/><ellipse cx="64" cy="94" rx="5.5" ry="3.8"/><ellipse cx="104" cy="182" rx="7" ry="4.5"/>
      <circle cx="82" cy="170" r="2.6"/><circle cx="136" cy="152" r="3"/><circle cx="90" cy="66" r="2.4"/></g>`;
    if (h < 30) {
      s += `<g class="cs-fedor" stroke="#a3c97f" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".85">
        <path d="M30 120 q-7 -9 0 -18 t0 -18"/><path d="M170 120 q7 -9 0 -18 t0 -18"/><path d="M44 96 q-5 -7 0 -14"/></g>`;
    }
    return s;
  }

  const ultimaArte = {};
  function desenharPet(id) {
    const p = pet(id);
    const r = rostoDe(id);
    const corpo = M.g[id]({ fogos: false, olhos: r.olhos, boca: r.boca });
    const roupas = ["pescoco", "olhos", "cabeca"].map((l) => ROUPAS[p.roupa?.[l]]?.arte || "").join("");
    const zzz = dormindo()
      ? `<g class="m-zzz" fill="#e0aaff" font-family="Fredoka, Poppins, sans-serif" font-weight="700">
          <text x="150" y="30" font-size="26">z</text><text x="170" y="10" font-size="19">z</text><text x="186" y="-6" font-size="14">z</text></g>`
      : "";
    // Mesma arte de antes? Não redesenha (senão a piscadinha recomeça)
    const chave = `${r.olhos}|${r.boca}|${Math.round(p.higiene / 5)}|${JSON.stringify(p.roupa)}|${!!zzz}`;
    const el = petEl(id);
    if (ultimaArte[id] !== chave) {
      ultimaArte[id] = chave;
      $(".cs-pet-arte", el).innerHTML = M.svg(corpo + sujeira(p.higiene) + roupas + zzz, VB_PET, `cs-pet-svg pet-${id}`);
    }
    const ativo = id === estado.ativo;
    el.classList.toggle("ativo", ativo);
    el.classList.toggle("dormindo", dormindo());
    el.setAttribute("aria-label", ativo ? `${nomeDe(id)}: fazer carinho` : `Cuidar de ${nomeDe(id)}`);
    $(".cs-pet-nome", el).textContent = nomeDe(id);
    // Balãozinho de pensamento com o que está faltando
    const pensa = $(".cs-pensa", el);
    const precisa = STATUS.filter((s) => p[s.id] < 30).sort((a, b) => p[a.id] - p[b.id])[0];
    const mostrar = precisa && !dormindo() && $(".cs-fala", el).hidden;
    pensa.hidden = !mostrar;
    if (mostrar) pensa.textContent = precisa.pensa;
  }
  const desenharPets = () => PETS.forEach((p) => desenharPet(p.id));

  function carinha(id, olhos, boca, ms = 1200) {
    tmp.rosto[id] = { olhos, boca, ate: Date.now() + ms };
    desenharPet(id);
    depois(ms + 30, () => desenharPet(id));
  }

  let falaTimer = {};
  function falar(id, texto, ms = 2600) {
    if (!texto) return;
    const el = petEl(id);
    const f = $(".cs-fala", el);
    f.textContent = texto;
    f.hidden = false;
    f.classList.toggle("longa", texto.length > 46);
    $(".cs-pensa", el).hidden = true;
    clearTimeout(falaTimer[id]);
    falaTimer[id] = depois(ms, () => { f.hidden = true; desenharPet(id); });
  }

  function pular(id) {
    const el = $(".cs-pet-arte", petEl(id));
    el.classList.remove("pulo");
    void el.offsetWidth;
    el.classList.add("pulo");
    depois(650, () => el.classList.remove("pulo"));
  }

  function coracoes(id, qtd = 3, emoji = "💜") {
    const r = petEl(id).getBoundingClientRect(), c = cena.getBoundingClientRect();
    for (let i = 0; i < qtd; i++) {
      const s = document.createElement("span");
      s.className = "cs-flutua";
      s.textContent = emoji;
      s.style.left = `${r.left - c.left + r.width * entre(0.3, 0.7)}px`;
      s.style.top = `${r.top - c.top + r.height * entre(0.15, 0.35)}px`;
      s.style.animationDelay = `${i * 0.12}s`;
      efeitos.append(s);
      depois(1600 + i * 120, () => s.remove());
    }
  }

  function mexer(id, mudancas) {
    const p = pet(id);
    Object.entries(mudancas).forEach(([k, v]) => { p[k] = limita(p[k] + v); });
  }

  function ganharXp(n) {
    const antes = nivel();
    estado.xp += n;
    if (nivel() > antes) {
      estado.moedas += 20;
      avisar(`⭐ Nível ${nivel()}! Ganhou 20 moedinhas`);
      PETS.forEach((p) => { pular(p.id); coracoes(p.id, 2, "⭐"); });
    }
  }

  /* ================== Barra de cima ================== */
  function corDoNivel(v) {
    return v > 60 ? "#7ae582" : v > 30 ? "#ffd166" : "#ff6b6b";
  }
  function desenharTopo() {
    $("#csMoedas").textContent = Math.floor(estado.moedas).toLocaleString("pt-BR");
    $("#csNivel").textContent = nivel();
    const p = pet();
    STATUS.forEach((s) => {
      const b = $(`.cs-stat[data-stat="${s.id}"]`);
      const v = Math.round(p[s.id]);
      const n = $(".cs-stat-nivel", b);
      n.style.height = `${v}%`;
      n.style.background = corDoNivel(v);
      b.classList.toggle("baixo", v < 30);
      b.setAttribute("aria-label", `${s.nome} de ${nomeDe(estado.ativo)}: ${v}%`);
      b.title = `${s.nome}: ${v}%`;
    });
  }

  let avisoTimer = 0;
  function avisar(texto, ms = 2600) {
    const a = $("#csAviso");
    a.textContent = texto;
    a.classList.add("mostrar");
    clearTimeout(avisoTimer);
    avisoTimer = depois(ms, () => a.classList.remove("mostrar"));
  }

  /* ================== Cômodo ================== */
  const vbArte = (vb, arte, classe = "") => `<svg viewBox="${vb}" class="${classe}" aria-hidden="true" focusable="false">${arte}</svg>`;

  function telao() {
    const fila = (cfg.listasManu?.praAssistir || []).filter((f) => !visto(f.id));
    let corpo;
    if (tmp.sessao) {
      const f = tmp.sessao;
      corpo = `<span class="cs-telao-mini">sessão de hoje</span><strong>${esc(f.icone || "🎬")} ${esc(f.titulo)}</strong>
        ${f.link ? `<a href="${esc(f.link)}" target="_blank" rel="noopener noreferrer">▶ assistir agora</a>` : `<span class="cs-telao-mini">${esc(f.nota || "")}</span>`}`;
    } else {
      corpo = `<span class="cs-telao-mini">Cineminha</span><strong>🍿 ${fila.length ? `${fila.length} na fila` : "tudo visto!"}</strong>
        <span class="cs-telao-mini">aperta em Sessão</span>`;
    }
    return `<div class="cs-movel cs-lugar-parede cs-telao ${tmp.sessao ? "ligado" : ""}" data-acao="assistir" role="button" tabindex="0" aria-label="Lista pra assistir">
      <div class="cs-telao-tela">${corpo}</div></div>`;
  }

  function desenharMoveis() {
    const s = salaInfo();
    let h = "";
    if (s.enfeites.tapete && ENFEITES[s.enfeites.tapete]) {
      const e = ENFEITES[s.enfeites.tapete];
      h += `<div class="cs-enfeite cs-lugar-tapete">${vbArte(e.vb, e.arte())}</div>`;
    }
    (MOVEIS_SALA[s.id] || []).forEach((id) => {
      if (id === "telao") { h += telao(); return; }
      const m = MOVEIS[id];
      const toque = m.toque ? ` data-acao="${m.toque}" role="button" tabindex="0"` : "";
      h += `<div class="cs-movel cs-lugar-${m.lugar} cs-movel-${id}"${toque}>${vbArte(m.vb, m.arte())}</div>`;
    });
    Object.entries(s.enfeites).forEach(([lugar, id]) => {
      const e = ENFEITES[id];
      if (!e || lugar === "tapete") return;
      h += `<div class="cs-enfeite cs-lugar-${e.lugar} cs-enfeite-${id}">${vbArte(e.vb, e.arte())}</div>`;
    });
    if (estado.presente !== hoje()) {
      h += `<button class="cs-presente" type="button" data-acao="presente" aria-label="Abrir o presente do dia">
        ${ic(`<rect x="10" y="26" width="44" height="32" rx="3" fill="#c77dff" ${tr}/><rect x="6" y="18" width="52" height="12" rx="3" fill="#9d4edd" ${tr}/>
        <path d="M32 18 V58" stroke="#ffd166" stroke-width="7"/><path d="M32 18 V58" fill="none" ${tr} stroke-width="1.5"/>
        <path d="M32 18 Q20 4 14 12 Q12 20 32 18 Q52 20 50 12 Q44 4 32 18 Z" fill="#ffd166" ${tr}/>`)}</button>`;
    }
    if (tmp.bola) h += `<button class="cs-bola" type="button" data-acao="chutar" aria-label="Chutar a bola" style="left:${tmp.bolaX ?? 50}%">${ICONES.bola}</button>`;
    $("#csMoveis").innerHTML = h;
  }

  function desenharSala() {
    const s = salaInfo();
    cena.dataset.sala = s.id;
    raiz.dataset.sala = s.id;
    $(".cs-parede", cena).style.background = PAREDES[s.parede]?.fundo || PAREDES.lilas.fundo;
    $(".cs-piso", cena).style.background = PISOS[s.piso]?.fundo || PISOS.tacos.fundo;
    base.style.setProperty("--piso", PISOS[s.piso]?.fundo || PISOS.tacos.fundo);
    $("#csSalaNome").textContent = s.nome;
    $("#csSalaNome").classList.toggle("longo", s.nome.length > 11);
    $("#csSalaNome").setAttribute("aria-label", `${s.nome}. Abrir o mapa da casinha`);
    cena.classList.toggle("apagado", dormindo());
    cena.classList.toggle("cinema-escuro", !!tmp.sessao);
    desenharMoveis();
    desenharBase();
    desenharPets();
    desenharTopo();
  }

  function irPara(id) {
    if (!salaPorId[id] || id === estado.sala) { fecharFolha(); return; }
    // Saiu do cômodo: acende a luz, acaba a sessão, guarda a bola
    if (!tmp.luz) acordar(false);
    tmp.sessao = null;
    tmp.bola = false;
    $$(".cs-bilhete", efeitos).forEach((b) => b.remove());
    // A espuma fica no banheiro
    $$(".cs-bolha", raiz).forEach((b) => b.remove());
    tmp.espuma = {};
    estado.sala = id;
    salvar();
    fecharFolha();
    desenharSala();
  }
  const passo = (d) => {
    const i = SALAS.findIndex((s) => s.id === estado.sala);
    irPara(SALAS[(i + d + SALAS.length) % SALAS.length].id);
  };

  /* ================== Botões de baixo (mudam em cada cômodo, igual ao Pou) ================== */
  const botao = (acao, icone, nome, extra = "") =>
    `<button class="cs-botao ${extra}" type="button" data-acao="${acao}"><span class="cs-botao-icone">${icone}</span><span class="cs-botao-nome cs-contorno">${nome}</span></button>`;

  function comidasNaGeladeira() {
    return COMIDAS.filter((c) => (estado.geladeira[c.id] || 0) > 0);
  }

  function desenharBase() {
    const loja = botao("loja", ICONES.loja, "Loja");
    let meio = "", esq = "";
    switch (estado.sala) {
      case "cozinha": {
        esq = botao("geladeira", ICONES.geladeira, "Geladeira");
        const lista = comidasNaGeladeira();
        if (!lista.some((c) => c.id === tmp.comida)) tmp.comida = lista[0]?.id || null;
        const c = comidaPorId[tmp.comida];
        meio = c
          ? `<div class="cs-carrossel">
              <button class="cs-mini-seta" type="button" data-acao="comidaAnt" aria-label="Comida anterior" ${lista.length < 2 ? "disabled" : ""}>‹</button>
              <button class="cs-comida-atual" type="button" data-arrasta="comida" aria-label="Dar ${esc(c.nome)} (arrasta até a boquinha ou toca)">
                ${arteComida(c)}<span class="cs-qtd">${estado.geladeira[c.id]}</span></button>
              <button class="cs-mini-seta" type="button" data-acao="comidaProx" aria-label="Próxima comida" ${lista.length < 2 ? "disabled" : ""}>›</button>
              <span class="cs-botao-nome cs-contorno">${esc(c.nome)}</span>
            </div>`
          : botao("lojaComidas", `<span class="cs-emoji">🍽️</span>`, "Geladeira vazia!", "cs-centro");
        break;
      }
      case "banheiro":
        esq = botao("chuveiro", ICONES.chuveiro, "Chuveiro");
        meio = `<button class="cs-botao cs-centro" type="button" data-arrasta="sabonete" aria-label="Sabonete: esfrega no bichinho ou toca">
          <span class="cs-botao-icone">${ICONES.sabonete}</span><span class="cs-botao-nome cs-contorno">Sabonete</span></button>`;
        break;
      case "quarto":
        esq = botao("guardaRoupa", ICONES.guardaRoupa, "Guarda-roupa");
        meio = botao("abajur", ICONES.abajur(tmp.luz), tmp.luz ? "Apagar luz" : "Acender", "cs-centro");
        break;
      case "jogos":
        esq = botao("jogos", ICONES.controle, "Jogos");
        meio = botao("bola", ICONES.bola, tmp.bola ? "Guardar bola" : "Bola", "cs-centro");
        break;
      case "cinema":
        esq = botao("assistir", ICONES.claquete, "Pra assistir");
        meio = botao("sessao", ICONES.pipoca, tmp.sessao ? "Acabou" : "Sessão", "cs-centro");
        break;
      case "cantinho":
        esq = botao("lista", ICONES.caderninho, "Lista da Manu");
        meio = botao("recadinho", ICONES.carta, "Recadinho", "cs-centro");
        break;
    }
    const focado = base.contains(document.activeElement) ? document.activeElement.dataset.acao || document.activeElement.dataset.arrasta : null;
    base.innerHTML = esq + meio + loja;
    if (focado) base.querySelector(`[data-acao="${focado}"], [data-arrasta="${focado}"]`)?.focus({ preventScroll: true });
  }

  /* ================== Comer ================== */
  function pontoDaBoca(id) {
    const r = $(".cs-pet-arte", petEl(id)).getBoundingClientRect();
    const c = raiz.getBoundingClientRect();
    return { x: r.left - c.left + r.width * 0.5, y: r.top - c.top + r.height * 0.55 };
  }

  function voar(html, de, para, ms, classe = "") {
    const v = document.createElement("div");
    v.className = `cs-voando ${classe}`;
    v.innerHTML = html;
    v.style.left = `${de.x}px`;
    v.style.top = `${de.y}px`;
    raiz.append(v);
    if (!reduzMovimento && v.animate) {
      v.animate([
        { transform: "translate(-50%, -50%) scale(1)" },
        { transform: `translate(calc(-50% + ${(para.x - de.x) / 2}px), calc(-50% + ${(para.y - de.y) / 2 - 60}px)) scale(.9)`, offset: 0.5 },
        { transform: `translate(calc(-50% + ${para.x - de.x}px), calc(-50% + ${para.y - de.y}px)) scale(.45)` },
      ], { duration: ms, easing: "ease-in", fill: "forwards" });
    }
    depois(ms, () => v.remove());
  }

  function alimentar(id, comidaId, de) {
    const c = comidaPorId[comidaId];
    if (!c || !(estado.geladeira[c.id] > 0)) return;
    if (id !== estado.ativo) { estado.ativo = id; desenharPets(); desenharTopo(); }
    const p = pet(id);
    if (!c.eca && p.fome >= 96) {
      // Igualzinho a dona: tá cheia… e logo depois tá com fome de novo
      carinha(id, "felizes", "mastiga", 1600);
      falar(id, linha("cheia", id), 1700);
      depois(1900, () => falar(id, linha("deNovo", id), 2400));
      return;
    }
    const boca = pontoDaBoca(id);
    const origem = de || (() => {
      const r = $(".cs-comida-atual", base)?.getBoundingClientRect() || base.getBoundingClientRect();
      const q = raiz.getBoundingClientRect();
      return { x: r.left - q.left + r.width / 2, y: r.top - q.top + r.height / 2 };
    })();
    estado.geladeira[c.id]--;
    desenharBase();
    tmp.rosto[id] = { olhos: "abertos", boca: "aberta", ate: Date.now() + 520 };
    desenharPet(id);
    voar(arteComida(c), origem, boca, 480, "cs-comida-voando");
    depois(480, () => {
      if (c.eca) {
        carinha(id, "eca", "eca", 1500);
        falar(id, linha("eca", id));
        mexer(id, { diversao: -6 });
        ganharXp(1);
      } else {
        // Mastiga: abre e fecha a boquinha
        let n = 0;
        const mastigar = () => {
          tmp.rosto[id] = { olhos: "felizes", boca: n % 2 ? "aberta" : "mastiga", ate: Date.now() + 400 };
          desenharPet(id);
          if (++n < 5) depois(170, mastigar);
          else carinha(id, "felizes", id === "cachorrinho" ? "lingua" : "sorriso", 900);
        };
        mastigar();
        mexer(id, { fome: c.enche, energia: c.energia || 0, higiene: -2 });
        falar(id, linha("comendo", id), 1500);
        ganharXp(2);
        if (pet(id).fome >= 96) {
          depois(1700, () => falar(id, linha("cheia", id), 1600));
          if (id === PETS[0].id) depois(3500, () => falar(id, linha("deNovo", id), 2400));
        }
      }
      salvar();
      desenharTopo();
      desenharBase();
    });
  }

  function trocarComida(d) {
    const lista = comidasNaGeladeira();
    if (lista.length < 2) return;
    const i = lista.findIndex((c) => c.id === tmp.comida);
    tmp.comida = lista[(i + d + lista.length) % lista.length].id;
    desenharBase();
  }

  /* ================== Banho ================== */
  function bolhinha(id, fx, fy) {
    tmp.espuma[id] = (tmp.espuma[id] || 0) + 1;
    if ($$(".cs-bolha", petEl(id)).length > 34) return;
    const b = document.createElement("span");
    b.className = "cs-bolha";
    const t = entre(14, 30);
    b.style.cssText = `left:${fx * 100}%;top:${fy * 100}%;width:${t}px;height:${t}px`;
    $(".cs-espuma", petEl(id)).append(b);
  }

  function esfregarEm(id, x, y) {
    const r = $(".cs-pet-arte", petEl(id)).getBoundingClientRect();
    const fx = (x - r.left) / r.width, fy = (y - r.top) / r.height;
    if (fx < 0.2 || fx > 0.8 || fy < 0.12 || fy > 0.95) return;
    bolhinha(id, fx, fy);
    if (!tmp.rosto[id] || tmp.rosto[id].ate < Date.now()) carinha(id, "felizes", id === "cachorrinho" ? "lingua" : "sorriso", 700);
  }

  function esfregarSozinho() {
    const id = estado.ativo;
    let n = 0;
    const r = $(".cs-pet-arte", petEl(id)).getBoundingClientRect();
    const sab = document.createElement("div");
    sab.className = "cs-voando cs-sabonete-voando";
    sab.innerHTML = ICONES.sabonete;
    raiz.append(sab);
    const q = raiz.getBoundingClientRect();
    const vai = () => {
      const fx = entre(0.32, 0.68), fy = entre(0.3, 0.85);
      sab.style.left = `${r.left - q.left + r.width * fx}px`;
      sab.style.top = `${r.top - q.top + r.height * fy}px`;
      bolhinha(id, fx, fy);
      if (n === 0) carinha(id, "felizes", id === "cachorrinho" ? "lingua" : "sorriso", 1800);
      if (++n < 14) depois(110, vai);
      else depois(200, () => sab.remove());
    };
    vai();
  }

  function banho() {
    if (tmp.banhando) return;
    tmp.banhando = true;
    const chuva = document.createElement("div");
    chuva.className = "cs-chuveiro";
    chuva.innerHTML = `<span class="cs-chuveiro-cano">${ICONES.chuveiro}</span>` +
      Array.from({ length: 34 }, (_, i) => `<i style="left:${(i * 37) % 100}%;animation-delay:${((i * 7) % 10) / 10}s"></i>`).join("");
    efeitos.append(chuva);
    PETS.forEach((p) => carinha(p.id, "fechados", "sorriso", 1700));
    depois(1700, () => {
      chuva.remove();
      tmp.banhando = false;
      const limpos = [];
      PETS.forEach((p) => {
        const e = tmp.espuma[p.id] || 0;
        if (e >= 8) pet(p.id).higiene = 100;
        else if (e > 0) mexer(p.id, { higiene: 45 });
        if (e > 0) limpos.push(p.id);
        $$(".cs-bolha", petEl(p.id)).forEach((b) => b.remove());
        tmp.espuma[p.id] = 0;
      });
      const alguem = limpos.length > 0;
      if (!alguem) mexer(estado.ativo, { higiene: 15 });
      const quem = !alguem || limpos.includes(estado.ativo) ? estado.ativo : limpos[0];
      carinha(quem, "felizes", quem === "cachorrinho" ? "lingua" : "sorriso", 1400);
      falar(quem, alguem ? linha("limpa", quem) : "só água? passa o sabonete! 🧼");
      coracoes(quem, 3, "✨");
      ganharXp(alguem ? 4 : 1);
      salvar();
      desenharPets();
      desenharTopo();
    });
  }

  /* ================== Arrastar comida e sabonete ================== */
  raiz.addEventListener("pointerdown", (e) => {
    const b = e.target.closest("[data-arrasta]");
    if (!b || e.button > 0) return;
    tmp.arraste = { tipo: b.dataset.arrasta, id: e.pointerId, x0: e.clientX, y0: e.clientY, moveu: false, fantasma: null, ultimo: 0, botao: b };
    try { b.setPointerCapture(e.pointerId); } catch { /* tudo bem */ }
  });
  raiz.addEventListener("pointermove", (e) => {
    const a = tmp.arraste;
    if (!a || a.id !== e.pointerId) return;
    if (!a.moveu && Math.hypot(e.clientX - a.x0, e.clientY - a.y0) < 8) return;
    e.preventDefault();
    const q = raiz.getBoundingClientRect();
    if (!a.moveu) {
      a.moveu = true;
      a.fantasma = document.createElement("div");
      a.fantasma.className = "cs-fantasma";
      a.fantasma.innerHTML = a.tipo === "comida" ? arteComida(comidaPorId[tmp.comida]) : ICONES.sabonete;
      raiz.append(a.fantasma);
      if (a.tipo === "comida") PETS.forEach((p) => { tmp.rosto[p.id] = { olhos: "abertos", boca: "aberta", ate: Date.now() + 60000 }; desenharPet(p.id); });
    }
    a.fantasma.style.left = `${e.clientX - q.left}px`;
    a.fantasma.style.top = `${e.clientY - q.top}px`;
    if (a.tipo === "sabonete" && performance.now() - a.ultimo > 55) {
      a.ultimo = performance.now();
      const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest(".cs-pet");
      if (alvo && raiz.contains(alvo)) esfregarEm(alvo.dataset.pet, e.clientX, e.clientY);
    }
  });
  const soltar = (e) => {
    const a = tmp.arraste;
    if (!a || a.id !== e.pointerId) return;
    tmp.arraste = null;
    if (a.fantasma) a.fantasma.remove();
    if (a.tipo === "comida") PETS.forEach((p) => { if (tmp.rosto[p.id]?.boca === "aberta") delete tmp.rosto[p.id]; desenharPet(p.id); });
    if (e.type === "pointercancel") return;
    if (!a.moveu) {
      if (a.tipo === "comida") alimentar(estado.ativo, tmp.comida);
      else esfregarSozinho();
      return;
    }
    tmp.acabouDeArrastar = Date.now();
    if (a.tipo === "comida") {
      const alvo = document.elementFromPoint(e.clientX, e.clientY)?.closest(".cs-pet");
      if (alvo && raiz.contains(alvo)) {
        const q = raiz.getBoundingClientRect();
        alimentar(alvo.dataset.pet, tmp.comida, { x: e.clientX - q.left, y: e.clientY - q.top });
      }
    }
  };
  raiz.addEventListener("pointerup", soltar);
  raiz.addEventListener("pointercancel", soltar);

  /* ================== Quarto ================== */
  function apagar() {
    tmp.luz = false;
    tmp.dormiuEm = Date.now();
    PETS.forEach((p) => { delete tmp.rosto[p.id]; $(".cs-fala", petEl(p.id)).hidden = true; });
    desenharSala();
  }
  function acordar(redesenhar = true) {
    tmp.luz = true;
    const dormiu = Date.now() - tmp.dormiuEm > 3000;
    if (redesenhar) {
      desenharSala();
      if (dormiu) {
        const id = estado.ativo;
        carinha(id, "felizes", id === "cachorrinho" ? "lingua" : "sorriso", 1400);
        falar(id, linha("acordar", id));
      }
    }
  }

  /* ================== Bola ================== */
  function chutar() {
    const bola = $(".cs-bola", cena);
    if (!bola) return;
    const de = tmp.bolaX ?? 50;
    let para = entre(16, 84);
    if (Math.abs(para - de) < 18) para = de > 50 ? entre(16, 40) : entre(60, 84);
    tmp.bolaX = para;
    const dx = ((para - de) / 100) * cena.clientWidth;
    if (!reduzMovimento && bola.animate) {
      bola.animate([
        { transform: "translate(-50%, 0) rotate(0deg)" },
        { transform: `translate(calc(-50% + ${dx / 2}px), -${cena.clientHeight * 0.32}px) rotate(${dx > 0 ? 200 : -200}deg)`, offset: 0.5 },
        { transform: `translate(calc(-50% + ${dx}px), 0) rotate(${dx > 0 ? 400 : -400}deg)` },
      ], { duration: 650, easing: "ease-in-out" });
    }
    depois(650, () => {
      const b = $(".cs-bola", cena);
      if (b) b.style.left = `${para}%`;
      const perto = PETS.map((p, i) => ({ id: p.id, x: i ? 72 : 28 })).sort((a, b2) => Math.abs(a.x - para) - Math.abs(b2.x - para))[0].id;
      if (pet(perto).energia < 12) { falar(perto, `tô cansad${generoDe(perto)}… 😮‍💨`); return; }
      pular(perto);
      carinha(perto, "felizes", perto === "cachorrinho" ? "lingua" : "sorriso", 900);
      PETS.forEach((p) => mexer(p.id, { diversao: p.id === perto ? 5 : 3, energia: -1 }));
      if (++tmp.chutes % 2 === 0) ganharXp(1);
      if (tmp.chutes % 6 === 0) falar(perto, sorteia(["de novo! de novo!", "gooool! ⚽", "essa foi longe! 🎾"]));
      salvar();
      desenharTopo();
    });
  }

  /* ================== Cineminha ================== */
  function sessao() {
    if (tmp.sessao) {
      tmp.sessao = null;
      desenharSala();
      return;
    }
    const fila = (cfg.listasManu?.praAssistir || []).filter((f) => !visto(f.id));
    if (!fila.length) {
      avisar("Vocês já viram tudo da lista! 💜");
      return;
    }
    tmp.sessao = sorteia(fila);
    desenharSala();
    if (!tmp.sessaoDeu) {
      tmp.sessaoDeu = true;
      PETS.forEach((p) => mexer(p.id, { diversao: 12 }));
      ganharXp(3);
      salvar();
      desenharTopo();
    }
    PETS.forEach((p, i) => depois(400 + i * 300, () => { carinha(p.id, "felizes", "sorriso", 1600); coracoes(p.id, 2, "🍿"); }));
    falar(estado.ativo, `hoje é ${tmp.sessao.titulo}! 🎬`, 2800);
  }

  /* ================== Recadinho (os motivos do site) ================== */
  function recadinho() {
    const motivos = cfg.motivos || [];
    if (!motivos.length) return;
    $$(".cs-bilhete", efeitos).forEach((b) => b.remove());
    const b = document.createElement("div");
    b.className = "cs-bilhete";
    b.innerHTML = `<button class="cs-fechar" type="button" data-acao="fecharBilhete" aria-label="Fechar recadinho">✕</button>
      <p>${esc(sorteia(motivos))}</p><span>— sua Baianinha 🦦💜</span>`;
    efeitos.append(b);
    PETS.forEach((p) => { carinha(p.id, "felizes", "sorriso", 1500); coracoes(p.id, 2); });
    mexer(estado.ativo, { diversao: 4 });
    ganharXp(1);
    salvar();
    desenharTopo();
  }

  /* ================== Painéis (folhas que sobem de baixo) ================== */
  let focoAntes = null;
  function abrirFolha(tipo, titulo, corpo) {
    const novo = tmp.folha !== tipo;
    const rolagem = !novo ? $(".cs-folha-corpo", folha)?.scrollTop || 0 : 0;
    if (folha.hidden) focoAntes = document.activeElement;
    tmp.folha = tipo;
    folha.innerHTML = `
      <div class="cs-folha-caixa" role="dialog" aria-modal="true" aria-labelledby="csFolhaTitulo">
        <div class="cs-folha-topo"><h3 id="csFolhaTitulo">${titulo}</h3>
          <button class="cs-fechar" type="button" data-acao="fecharFolha" aria-label="Fechar">✕</button></div>
        <div class="cs-folha-corpo">${corpo}</div>
      </div>`;
    folha.hidden = false;
    $(".cs-folha-corpo", folha).scrollTop = rolagem;
    if (novo) $(".cs-fechar", folha).focus({ preventScroll: true });
  }
  function fecharFolha() {
    if (folha.hidden) return;
    folha.hidden = true;
    folha.innerHTML = "";
    tmp.folha = null;
    if (focoAntes && raiz.contains(focoAntes)) focoAntes.focus({ preventScroll: true });
  }
  const reabrir = () => { if (tmp.folha && PAINEIS[tmp.folha]) PAINEIS[tmp.folha](); };

  const precoBotao = (preco, acao, tipo, id) =>
    `<button class="cs-comprar ${estado.moedas < preco ? "caro" : ""}" type="button" data-acao="${acao}" data-tipo="${tipo}" data-id="${id}">
      <span class="cs-moeda-mini">${MOEDA}</span>${preco}</button>`;

  const abas = (lista, atual, acao) => `<div class="cs-abas" role="tablist">${lista.map(([id, nome]) =>
    `<button type="button" role="tab" aria-selected="${id === atual}" class="${id === atual ? "atual" : ""}" data-acao="${acao}" data-aba="${id}">${nome}</button>`).join("")}</div>`;

  const miniPet = (id, roupaExtra) => {
    const p = pet(id);
    const roupa = { ...p.roupa, ...(roupaExtra || {}) };
    const roupas = ["pescoco", "olhos", "cabeca"].map((l) => ROUPAS[roupa[l]]?.arte || "").join("");
    return M.svg(M.g[id]({ fogos: false, olhos: "felizes", boca: id === "cachorrinho" ? "lingua" : "sorriso" }) + roupas, VB_PET, "cs-mini-pet");
  };

  const PAINEIS = {
    geladeira() {
      const lista = comidasNaGeladeira();
      abrirFolha("geladeira", "🧊 Geladeira", lista.length
        ? `<p class="cs-dica">Escolhe o que vai pro pratinho. Depois arrasta até a boquinha de quem você quiser (ou só toca).</p>
          <div class="cs-grade">${lista.map((c) => `
            <button class="cs-item ${c.id === tmp.comida ? "atual" : ""}" type="button" data-acao="escolherComida" data-id="${c.id}">
              <span class="cs-item-arte">${arteComida(c)}</span><span class="cs-item-nome">${esc(c.nome)}</span>
              <span class="cs-item-info">${c.eca ? "ela odeia 🤢" : `+${c.enche} 🍗`} · tem ${estado.geladeira[c.id]}</span>
            </button>`).join("")}</div>
          <button class="cs-largo" type="button" data-acao="lojaComidas">Comprar mais comidinha 🛒</button>`
        : `<p class="cs-vazio">A geladeira tá vazia 😱</p><button class="cs-largo" type="button" data-acao="lojaComidas">Ir na loja 🛒</button>`);
    },

    loja() {
      const aba = tmp.abaLoja;
      let corpo = "";
      if (aba === "comidas") {
        corpo = `<div class="cs-grade">${COMIDAS.map((c) => `
          <div class="cs-item">
            <span class="cs-item-arte">${arteComida(c)}</span><span class="cs-item-nome">${esc(c.nome)}</span>
            <span class="cs-item-info">${c.eca ? "ela odeia 🤢" : `+${c.enche} 🍗${c.energia ? ` +${c.energia} ⚡` : ""}`} · tem ${estado.geladeira[c.id] || 0}</span>
            ${precoBotao(c.preco, "comprar", "comida", c.id)}
          </div>`).join("")}</div>`;
      } else if (aba === "roupas") {
        corpo = `<p class="cs-dica">Comprando aqui já veste em ${esc(nomeDe(estado.ativo))}. Pra trocar depois: Quarto → Guarda-roupa.</p>` +
          LUGARES_ROUPA.map(([lugar, nome]) => `<h4 class="cs-subtitulo">${nome}</h4><div class="cs-grade">${Object.entries(ROUPAS)
            .filter(([, r]) => r.lugar === lugar).map(([id, r]) => `
            <div class="cs-item">
              <span class="cs-item-arte cs-item-roupa">${vbArte(VB_LUGAR[lugar], r.arte)}</span><span class="cs-item-nome">${esc(r.nome)}</span>
              ${estado.tem.roupas.includes(id) ? `<span class="cs-tem">já é sua ✓</span>` : precoBotao(r.preco, "comprar", "roupa", id)}
            </div>`).join("")}</div>`).join("");
      } else {
        const s = salaInfo();
        const linhaCasa = (titulo, catalogo, tipo, atual, desenho) => `<h4 class="cs-subtitulo">${titulo}</h4><div class="cs-grade">${Object.entries(catalogo).map(([id, it]) => {
          const tem = it.preco === 0 || estado.tem[tipo].includes(id);
          const usando = atual(id);
          return `<div class="cs-item ${usando ? "atual" : ""}">
            <span class="cs-item-arte cs-item-casa">${desenho(id, it)}</span><span class="cs-item-nome">${esc(it.nome)}</span>
            ${!tem ? precoBotao(it.preco, "comprar", tipo, id)
              : usando ? (tipo === "enfeites" ? `<button class="cs-usar" type="button" data-acao="usar" data-tipo="${tipo}" data-id="${id}">tirar daqui</button>` : `<span class="cs-tem">usando ✓</span>`)
              : `<button class="cs-usar" type="button" data-acao="usar" data-tipo="${tipo}" data-id="${id}">usar aqui</button>`}
          </div>`;
        }).join("")}</div>`;
        corpo = `<p class="cs-dica">Decorando: <b>${esc(s.nome)}</b>. Cada cômodo guarda a decoração dele.</p>` +
          linhaCasa("Papel de parede", PAREDES, "paredes", (id) => s.parede === id, (id, it) => `<span class="cs-amostra" style="background:${it.fundo}"></span>`) +
          linhaCasa("Piso", PISOS, "pisos", (id) => s.piso === id, (id, it) => `<span class="cs-amostra" style="background:${it.fundo}"></span>`) +
          linhaCasa("Enfeites", ENFEITES, "enfeites", (id) => Object.values(s.enfeites).includes(id), (id, it) => vbArte(it.vb, it.arte()));
      }
      abrirFolha("loja", `<span class="cs-folha-icone">${ICONES.loja}</span> Loja`, `
        <div class="cs-saldo"><span class="cs-moeda-mini">${MOEDA}</span> ${Math.floor(estado.moedas)} moedinhas</div>
        ${abas([["comidas", "Comidas"], ["roupas", "Roupinhas"], ["casa", "Casa"]], aba, "abaLoja")}${corpo}`);
    },

    guardaRoupa() {
      const id = estado.ativo;
      const lugar = tmp.abaRoupa;
      const minhas = Object.entries(ROUPAS).filter(([rid, r]) => r.lugar === lugar && estado.tem.roupas.includes(rid));
      const outro = PETS.find((p) => p.id !== id);
      abrirFolha("guardaRoupa", `<span class="cs-folha-icone">${ICONES.guardaRoupa}</span> Guarda-roupa`, `
        <div class="cs-provador">${miniPet(id)}<div><b>${esc(nomeDe(id))}</b>
          ${outro ? `<button class="cs-usar" type="button" data-acao="trocarPet">trocar pr${generoDe(outro.id)} ${esc(nomeDe(outro.id))}</button>` : ""}</div></div>
        ${abas(LUGARES_ROUPA, lugar, "abaRoupa")}
        <div class="cs-grade">
          <div class="cs-item ${!pet(id).roupa[lugar] ? "atual" : ""}"><span class="cs-item-arte"><span class="cs-emoji">🚫</span></span><span class="cs-item-nome">Nada</span>
            ${pet(id).roupa[lugar] ? `<button class="cs-usar" type="button" data-acao="vestir" data-id="">tirar</button>` : `<span class="cs-tem">✓</span>`}</div>
          ${minhas.map(([rid, r]) => `<div class="cs-item ${pet(id).roupa[lugar] === rid ? "atual" : ""}">
            <span class="cs-item-arte cs-item-roupa">${vbArte(VB_LUGAR[lugar], r.arte)}</span><span class="cs-item-nome">${esc(r.nome)}</span>
            ${pet(id).roupa[lugar] === rid ? `<span class="cs-tem">vestindo ✓</span>` : `<button class="cs-usar" type="button" data-acao="vestir" data-id="${rid}">vestir</button>`}
          </div>`).join("")}
        </div>
        <button class="cs-largo" type="button" data-acao="lojaRoupas">Mais roupinhas na loja 🛒</button>`);
    },

    jogos() {
      const lista = window.Fliperama?.lista() || [];
      abrirFolha("jogos", `<span class="cs-folha-icone">${ICONES.controle}</span> Jogos`, lista.length ? `
        <p class="cs-dica">Cada partida vale moedinhas pra gastar na loja 🪙 e deixa ${esc(nomeDe(estado.ativo))} feliz (mas cansa e dá fome, igual a gente).</p>
        <div class="cs-jogos">${lista.map((j) => `
          <button class="cs-jogo" type="button" data-acao="jogar" data-id="${j.id}">
            <span class="cs-jogo-arte">${j.arte}<span class="cs-jogo-selo">${j.selo}</span></span>
            <span class="cs-jogo-texto"><b>${esc(j.nome)}</b><span>${esc(j.descricao)}</span>
            <small>${j.recorde ? `🏆 recorde: ${esc(j.recorde)}` : "ainda sem recorde"}</small></span>
            <span class="cs-jogo-play">▶</span>
          </button>`).join("")}</div>` : `<p class="cs-vazio">Os joguinhos não carregaram 😢</p>`);
    },

    assistir() {
      const lista = cfg.listasManu?.praAssistir || [];
      const vistos = lista.filter((f) => visto(f.id)).length;
      abrirFolha("assistir", `<span class="cs-folha-icone">${ICONES.claquete}</span> Pra assistir`, `
        <p class="cs-dica">Nossa fila do Cineminha. Vai marcando conforme a gente vê juntas: ${vistos} de ${lista.length} ✓</p>
        <ul class="cs-filmes">${lista.map((f) => `
          <li class="${visto(f.id) ? "visto" : ""}">
            <label><input type="checkbox" data-visto="${esc(f.id)}" ${visto(f.id) ? "checked" : ""}>
              <span class="cs-filme-icone">${esc(f.icone || "🎬")}</span>
              <span class="cs-filme-texto"><b>${esc(f.titulo)}</b><small>${esc(f.nota || "")}</small></span></label>
            ${/^https:\/\//.test(f.link || "") ? `<a href="${esc(f.link)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${esc(f.titulo)}">▶</a>` : ""}
          </li>`).join("")}</ul>
        <button class="cs-largo" type="button" data-acao="sessaoDaLista">🍿 Sortear a sessão de hoje</button>`);
    },

    lista() {
      const d = cfg.listasManu || {};
      const aba = tmp.abaLista;
      const cartoes = (cats) => cats.map((cat) => `
        <div class="cs-nota"><h4>${esc(cat.titulo)}</h4><ul>${(cat.itens || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");
      let corpo = "";
      if (aba === "comidas") corpo = (d.comidaFavorita ? `<p class="cs-destaque">${esc(d.comidaFavorita)}</p>` : "") + cartoes(d.comidas || []);
      else if (aba === "outras") corpo = cartoes(d.outras || []);
      else corpo = cartoes([{ titulo: "Nem pensar 🙅‍♀️", itens: d.naoGosta || [] }]) +
        `<p class="cs-dica">Psiu: na loja tem banana, tomate e pepino. Dá pros bichinhos pra ver o que acontece 🤭</p>`;
      abrirFolha("lista", `<span class="cs-folha-icone">${ICONES.caderninho}</span> Lista da Manu`, `
        <p class="cs-dica">Tudo que eu adoro descobrir sobre você 💜</p>
        ${abas([["comidas", "Comidas"], ["outras", "Ela curte"], ["nao", "Não gosta"]], aba, "abaLista")}
        <div class="cs-notas">${corpo}</div>`);
    },

    mapa() {
      const ordem = ["quarto", "banheiro", "cinema", "cantinho", "cozinha", "jogos"];
      abrirFolha("mapa", `<span class="cs-folha-icone">${ICONES.casa}</span> Mapa da casinha`, `
        <div class="cs-mapa">
          <div class="cs-telhado">${coracaoSvg()}</div>
          <div class="cs-andares">${ordem.map((id) => {
            const s = salaInfo(id);
            return `<button class="cs-mapa-sala ${id === estado.sala ? "atual" : ""}" type="button" data-acao="irSala" data-id="${id}">
              <span class="cs-mapa-parede" style="background:${PAREDES[s.parede]?.fundo}"></span>
              <span class="cs-mapa-piso" style="background:${PISOS[s.piso]?.fundo}"></span>
              <span class="cs-mapa-icone">${s.icone}</span>
              <span class="cs-mapa-nome">${esc(s.nome)}</span>
              ${id === estado.sala ? `<span class="cs-mapa-aqui">vocês estão aqui 🦊🐶</span>` : ""}
            </button>`;
          }).join("")}</div>
          <div class="cs-gramado"></div>
        </div>`);
    },

    ajuda() {
      abrirFolha("ajuda", "Como cuidar dos bichinhos", `
        <ul class="cs-ajuda-lista">
          <li><span>${STATUS[0].icone}</span><p><b>Fome</b>: Cozinha. Arrasta a comida até a boquinha (ou só toca nela). A Kitsune… bom, a Kitsune sempre tá com fome.</p></li>
          <li><span>${STATUS[1].icone}</span><p><b>Banho</b>: Banheiro. Esfrega o sabonete no bichinho até fazer espuma e depois liga o chuveiro.</p></li>
          <li><span>${STATUS[2].icone}</span><p><b>Diversão</b>: Sala de Jogos (joguinhos e bola), Cineminha, carinho e recadinho.</p></li>
          <li><span>${STATUS[3].icone}</span><p><b>Energia</b>: Quarto. Apaga a luz e deixa eles dormirem um pouquinho. Café também ajuda ☕</p></li>
        </ul>
        <p class="cs-dica">Toca num bichinho pra cuidar dele; toca de novo pra fazer carinho. Tocar numa barrinha lá em cima leva pro cômodo certo. As moedinhas vêm dos joguinhos e do presente do dia 🎁</p>
        <h4 class="cs-subtitulo">Nomes</h4>
        <div class="cs-nomes">${PETS.map((p) => `<label>${p.id === "kitsune" ? "🦊" : "🐶"}
          <input type="text" maxlength="16" data-nome="${p.id}" value="${esc(nomeDe(p.id))}" autocomplete="off" spellcheck="false"></label>`).join("")}</div>`);
    },
  };
  const coracaoSvg = () => ic(coracaoP(32, 30, 1.7, "#f15bb5"));

  /* ================== Comprar e usar ================== */
  function comprar(tipo, id) {
    const it = tipo === "comida" ? comidaPorId[id] : tipo === "roupa" ? ROUPAS[id] : tipo === "paredes" ? PAREDES[id] : tipo === "pisos" ? PISOS[id] : ENFEITES[id];
    if (!it) return;
    if (estado.moedas < it.preco) {
      const falta = Math.ceil(it.preco - estado.moedas);
      avisar(`Faltam ${falta} moedinhas. Joga na Sala de Jogos! 🎮`);
      $(".cs-moedas").classList.remove("tremer");
      void raiz.offsetWidth;
      $(".cs-moedas").classList.add("tremer");
      return;
    }
    estado.moedas -= it.preco;
    if (tipo === "comida") {
      estado.geladeira[id] = (estado.geladeira[id] || 0) + 1;
      tmp.comida = tmp.comida || id;
      avisar(`${it.icone || "🍽️"} ${it.nome} foi pra geladeira!`, 1600);
    } else if (tipo === "roupa") {
      estado.tem.roupas.push(id);
      pet().roupa[it.lugar] = id;
      carinha(estado.ativo, "felizes", "sorriso", 1400);
      coracoes(estado.ativo, 3, "✨");
      falar(estado.ativo, "ficou lind" + generoDe(estado.ativo) + "? 🥰");
      ganharXp(3);
    } else {
      estado.tem[tipo].push(id);
      usar(tipo, id, true);
      ganharXp(3);
    }
    salvar();
    desenharTopo();
    if (estado.sala === "cozinha") desenharBase();
    reabrir();
  }

  function usar(tipo, id, comprou = false) {
    const s = estado.salas[estado.sala] = estado.salas[estado.sala] || {};
    if (tipo === "paredes") s.parede = id;
    else if (tipo === "pisos") s.piso = id;
    else if (tipo === "enfeites") {
      const e = ENFEITES[id];
      s.enfeites = s.enfeites || {};
      if (s.enfeites[e.lugar] === id && !comprou) delete s.enfeites[e.lugar];
      else s.enfeites[e.lugar] = id;
    }
    salvar();
    desenharSala();
    if (!comprou) reabrir();
    else avisar("Ficou uma graça! ✨", 1600);
  }

  /* ================== Presente do dia ================== */
  function abrirPresente() {
    if (estado.presente === hoje()) return;
    estado.presente = hoje();
    const valor = C.presenteDoDia ?? 40;
    estado.moedas += valor;
    avisar(`🎁 Presente do dia: +${valor} moedinhas! Com amor, sua Lontrinha 💜`, 3400);
    PETS.forEach((p) => { pular(p.id); coracoes(p.id, 3, "🪙"); });
    salvar();
    desenharMoveis();
    desenharTopo();
  }

  /* ================== Cliques ================== */
  function tocarPet(id) {
    if (Date.now() - (tmp.acabouDeArrastar || 0) < 350) return;
    if (dormindo()) { falar(id, "zzz… 💤", 1200); return; }
    if (id !== estado.ativo) {
      estado.ativo = id;
      salvar();
      desenharPets();
      desenharTopo();
      pular(id);
      falar(id, sorteia([`oi! 💜`, "é minha vez? 🥺", "eba!"]), 1500);
      return;
    }
    // Carinho
    const agora = Date.now();
    carinha(id, "felizes", id === "cachorrinho" ? "lingua" : "sorriso", 1100);
    coracoes(id, 2);
    pular(id);
    if (agora - tmp.ultimoCarinho > 700) {
      mexer(id, { diversao: 3 });
      ganharXp(1);
      salvar();
      desenharTopo();
    }
    tmp.ultimoCarinho = agora;
    if (Math.random() < 0.35) falar(id, linha("carinho", id), 1500);
  }

  raiz.addEventListener("click", (e) => {
    // Pelo teclado (sem ponteiro) o prato e o sabonete funcionam como um toque
    const arrasta = e.target.closest("[data-arrasta]");
    if (arrasta && e.detail === 0) {
      if (arrasta.dataset.arrasta === "comida") alimentar(estado.ativo, tmp.comida);
      else esfregarSozinho();
      return;
    }
    const petAlvo = e.target.closest(".cs-pet");
    if (petAlvo && !e.target.closest("[data-acao]")) { tocarPet(petAlvo.dataset.pet); return; }
    const b = e.target.closest("[data-acao]");
    if (!b || !raiz.contains(b)) return;
    const { acao } = b.dataset;
    const id = b.dataset.id;
    switch (acao) {
      case "anterior": passo(-1); break;
      case "proxima": passo(1); break;
      case "mapa": PAINEIS.mapa(); break;
      case "irSala": irPara(id); break;
      case "ajuda": PAINEIS.ajuda(); break;
      case "fecharFolha": fecharFolha(); break;
      case "stat": {
        const s = STATUS.find((x) => x.id === b.dataset.stat);
        avisar(`${s.nome} de ${nomeDe(estado.ativo)}: ${Math.round(pet()[s.id])}%`, 1800);
        irPara(s.sala);
        break;
      }
      case "geladeira": PAINEIS.geladeira(); break;
      case "escolherComida": tmp.comida = id; desenharBase(); fecharFolha(); break;
      case "comidaAnt": trocarComida(-1); break;
      case "comidaProx": trocarComida(1); break;
      case "loja": PAINEIS.loja(); break;
      case "lojaComidas": tmp.abaLoja = "comidas"; PAINEIS.loja(); break;
      case "lojaRoupas": tmp.abaLoja = "roupas"; PAINEIS.loja(); break;
      case "abaLoja": tmp.abaLoja = b.dataset.aba; PAINEIS.loja(); break;
      case "abaRoupa": tmp.abaRoupa = b.dataset.aba; PAINEIS.guardaRoupa(); break;
      case "abaLista": tmp.abaLista = b.dataset.aba; PAINEIS.lista(); break;
      case "comprar": comprar(b.dataset.tipo, id); break;
      case "usar": usar(b.dataset.tipo, id); break;
      case "chuveiro": banho(); break;
      case "guardaRoupa": PAINEIS.guardaRoupa(); break;
      case "vestir": {
        const lugar = tmp.abaRoupa;
        if (id) pet().roupa[lugar] = id;
        else delete pet().roupa[lugar];
        salvar();
        desenharPets();
        if (id) { carinha(estado.ativo, "felizes", "sorriso", 1200); coracoes(estado.ativo, 2, "✨"); }
        PAINEIS.guardaRoupa();
        break;
      }
      case "trocarPet": {
        const outro = PETS.find((p) => p.id !== estado.ativo);
        if (outro) { estado.ativo = outro.id; salvar(); desenharPets(); desenharTopo(); PAINEIS.guardaRoupa(); }
        break;
      }
      case "abajur": if (tmp.luz) apagar(); else acordar(); break;
      case "jogos": PAINEIS.jogos(); break;
      case "jogar": fecharFolha(); window.Fliperama?.abrir(id); break;
      case "bola": tmp.bola = !tmp.bola; tmp.bolaX = 50; desenharMoveis(); desenharBase(); break;
      case "chutar": chutar(); break;
      case "assistir": PAINEIS.assistir(); break;
      case "sessao": sessao(); break;
      case "sessaoDaLista": fecharFolha(); tmp.sessao = null; sessao(); break;
      case "lista": PAINEIS.lista(); break;
      case "recadinho": recadinho(); break;
      case "fecharBilhete": b.closest(".cs-bilhete")?.remove(); break;
      case "presente": abrirPresente(); break;
    }
  });

  // Enter/espaço nos bichinhos e nos móveis que abrem coisas
  raiz.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !folha.hidden) { e.stopPropagation(); fecharFolha(); return; }
    if (e.key !== "Enter" && e.key !== " ") return;
    const alvo = e.target.closest('.cs-pet, .cs-movel[role="button"]');
    if (!alvo || e.target.closest("button, input, a")) return;
    e.preventDefault();
    alvo.click();
  });

  raiz.addEventListener("change", (e) => {
    const c = e.target.closest("[data-visto]");
    if (!c) return;
    estado.vistos[c.dataset.visto] = c.checked;
    c.closest("li")?.classList.toggle("visto", c.checked);
    if (c.checked) PETS.forEach((p) => coracoes(p.id, 2, "🎬"));
    salvar();
    if (estado.sala === "cinema") desenharMoveis();
    const lista = cfg.listasManu?.praAssistir || [];
    const dica = $(".cs-folha-corpo .cs-dica", folha);
    if (dica) dica.textContent = `Nossa fila do Cineminha. Vai marcando conforme a gente vê juntas: ${lista.filter((f) => visto(f.id)).length} de ${lista.length} ✓`;
  });

  raiz.addEventListener("input", (e) => {
    const n = e.target.closest("[data-nome]");
    if (!n) return;
    const v = n.value.trim().slice(0, 16);
    if (v) estado.nomes[n.dataset.nome] = v;
    else delete estado.nomes[n.dataset.nome];
    salvar();
    desenharPets();
  });

  /* ================== Mini games valem moedinhas ================== */
  document.addEventListener("fliperama:fim", (e) => {
    const { id, valor, extras } = e.detail;
    const ganho = Math.max(1, Math.round((GANHO[id] || (() => 5))(valor)));
    estado.moedas += ganho;
    mexer(estado.ativo, { diversao: 22, energia: -8, fome: -6, higiene: -4 });
    ganharXp(4);
    extras.push(`+${ganho} moedinhas 🪙 pra casinha`);
    salvar();
    desenharTopo();
    desenharPets();
  });

  /* ================== O tempo passando ================== */
  let ultimo = Date.now();
  let segundos = 0;
  setInterval(() => {
    const agora = Date.now();
    const dt = Math.min(5, (agora - ultimo) / 1000);
    ultimo = agora;
    decair((dt / 3600) * 4, 3);
    if (dormindo()) PETS.forEach((p) => mexer(p.id, { energia: 2.2 * dt }));
    if (++segundos % 5 === 0) salvar();
    if (!visivel) return;
    desenharTopo();
    desenharPets();
    // De vez em quando alguém reclama do que está faltando
    if (segundos % 18 === 0 && folha.hidden && !dormindo()) {
      const quem = sorteia(PETS).id;
      const p = pet(quem);
      const falta = STATUS.filter((s) => p[s.id] < 30).sort((a, b) => p[a.id] - p[b.id])[0];
      const fala = falta ? { fome: "fome", higiene: "suja", diversao: "tedio", energia: "sono" }[falta.id] : quem === PETS[0].id && Math.random() < 0.4 ? "fome" : null;
      if (fala) falar(quem, linha(fala, quem));
    }
  }, 1000);

  // Só mexe no desenho quando a casinha está na tela; na primeira vez a Kitsune já avisa que tá com fome
  let visivel = false;
  new IntersectionObserver((entradas) => {
    visivel = entradas[0].isIntersecting;
    if (visivel && !tmp.falou) {
      tmp.falou = true;
      depois(900, () => falar(PETS[0].id, linha("fome", PETS[0].id), 3000));
    }
  }, { threshold: 0.35 }).observe(raiz);
  new IntersectionObserver((entradas) => {
    document.documentElement.classList.toggle("na-casinha", entradas[0].intersectionRatio >= 0.55);
  }, { threshold: [0, 0.55] }).observe(raiz);

  desenharSala();
})();
