/* Mascotes: a Gatinha roxa (Manu, a Princesa, de coroinha) e a Lontrinha (a Baianinha, de lacinho) 🐱🦦
   Cada função devolve um SVG em texto pra colocar com innerHTML. */

window.Mascotes = (() => {
  const C = {
    roxo: "#9d4edd",
    roxoEsc: "#7b2cbf",
    barriga: "#d4b0f5",
    pata: "#b57ee8",
    rosa: "#f39ad6",
    bochecha: "#f3a6e0",
    orelhaIn: "#f8c9ee",
    escuro: "#2a0a3d",
    bigode: "#f0dcff",
    lontra: "#8a6478",
    lontraEsc: "#6e4c5f",
    focinho: "#efe2ea",
    lontraBarriga: "#d8c0cd",
    concha: "#f8c9ee",
    ouro: "#ffd166",
    ouroEsc: "#e9a93a",
  };

  // Coroinha da Princesa
  const coroa = `
    <g class="m-coroa">
      <path d="M84 46 L80 26 L91 35 L100 19 L109 35 L120 26 L116 46 Z"
        fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="80" cy="25" r="3" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="1.5"/>
      <circle cx="100" cy="18" r="3.4" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="1.5"/>
      <circle cx="120" cy="25" r="3" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="1.5"/>
      <path d="M100 32 l4.5 5.5 -4.5 5.5 -4.5 -5.5 Z" fill="#c77dff"/>
      <circle cx="89" cy="41" r="2.2" fill="${C.rosa}"/>
      <circle cx="111" cy="41" r="2.2" fill="${C.rosa}"/>
    </g>`;

  // Fitinha da Baianinha (lacinho amarelo na orelha)
  const fitinha = `
    <g class="m-fitinha">
      <path d="M58 50 L44 40 L46 58 Z" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M58 50 L72 40 L70 58 Z" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M56 52 Q52 64 48 70 M60 52 Q64 64 68 70" stroke="${C.ouro}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="58" cy="50" r="4.5" fill="${C.ouroEsc}"/>
    </g>`;

  const olhoAberto = (cx, cy, rx, ry) => `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.escuro}"/>
    <circle cx="${cx + rx * 0.35}" cy="${cy - ry * 0.38}" r="${rx * 0.38}" fill="#fff"/>
    <circle cx="${cx - rx * 0.35}" cy="${cy + ry * 0.4}" r="${rx * 0.18}" fill="#fff"/>`;

  const olhoFechado = (cx, cy, w) => `
    <path d="M${cx - w} ${cy} Q${cx} ${cy + w * 0.9} ${cx + w} ${cy}" stroke="${C.escuro}"
      stroke-width="3.5" fill="none" stroke-linecap="round"/>`;

  const coracao = (x, y, s, cor) => `
    <path transform="translate(${x} ${y}) scale(${s})"
      d="M0 -4 C-3 -10 -12 -9 -12 -2 C-12 5 -3 9 0 13 C3 9 12 5 12 -2 C12 -9 3 -10 0 -4 Z"
      fill="${cor}"/>`;

  /* ---------- Carinhas dos bichinhos da casinha (olhos em 78/122, y 84) ---------- */
  function olhosPet(tipo = "abertos", rx = 10, ry = 12) {
    const L = 78, R = 122, Y = 84;
    const traco = `stroke="${C.escuro}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
    if (tipo === "fechados") return olhoFechado(L, Y + 2, rx) + olhoFechado(R, Y + 2, rx);
    if (tipo === "felizes") {
      return [L, R].map((x) => `<path d="M${x - rx} ${Y + 4} Q${x} ${Y - ry * 1.1} ${x + rx} ${Y + 4}" ${traco}/>`).join("");
    }
    if (tipo === "eca") {
      return `<path d="M${L - 8} ${Y - 7} L${L + 7} ${Y} L${L - 8} ${Y + 7}" ${traco}/>` +
        `<path d="M${R + 8} ${Y - 7} L${R - 7} ${Y} L${R + 8} ${Y + 7}" ${traco}/>`;
    }
    const abertos = `<g class="m-piscar">${olhoAberto(L, Y, rx, ry)}${olhoAberto(R, Y, rx, ry)}</g>`;
    if (tipo === "tristes") {
      return abertos +
        `<path d="M${L - 13} ${Y - 14} L${L + 7} ${Y - 21}" ${traco} stroke-width="3.2"/>` +
        `<path d="M${R + 13} ${Y - 14} L${R - 7} ${Y - 21}" ${traco} stroke-width="3.2"/>`;
    }
    return abertos;
  }

  function bocaPet(tipo = "sorriso", y = 109) {
    const traco = `stroke="${C.escuro}" stroke-width="2.6" fill="none" stroke-linecap="round"`;
    const sorriso = `<path d="M100 ${y} Q96 ${y + 6} 90 ${y + 3} M100 ${y} Q104 ${y + 6} 110 ${y + 3}" ${traco}/>`;
    switch (tipo) {
      case "aberta":
        return `<ellipse cx="100" cy="${y + 8}" rx="9.5" ry="9" fill="${C.escuro}"/>` +
          `<ellipse cx="100" cy="${y + 12.5}" rx="6" ry="3.8" fill="${C.rosa}"/>`;
      case "mastiga":
        return `<path d="M91 ${y + 5} Q100 ${y + 10} 109 ${y + 5}" ${traco} stroke-width="3"/>`;
      case "triste":
        return `<path d="M90 ${y + 9} Q100 ${y + 1} 110 ${y + 9}" ${traco}/>`;
      case "eca":
        return `<path d="M87 ${y + 7} q3.25 -5 6.5 0 t6.5 0 t6.5 0 t6.5 0" ${traco}/>` +
          `<path d="M104 ${y + 8} q4 9 9 4" stroke="#8bd17c" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      case "lingua":
        return `<path d="M95 ${y + 3} Q100 ${y + 17} 105 ${y + 3} Z" fill="${C.rosa}"/>` + sorriso;
      default:
        return sorriso;
    }
  }

  /* ---------- Gatinha roxa (viewBox 0 0 200 200) ---------- */
  function gatinhaG({ dormindo = false, princesa = true } = {}) {
    const olhos = dormindo
      ? olhoFechado(78, 90, 11) + olhoFechado(122, 90, 11)
      : `<g class="m-piscar">${olhoAberto(78, 88, 11, 13)}${olhoAberto(122, 88, 11, 13)}</g>`;

    const zzz = dormindo
      ? `<g class="m-zzz" fill="${C.barriga}" font-family="Poppins, sans-serif" font-weight="600">
          <text x="150" y="40" font-size="18">z</text>
          <text x="164" y="24" font-size="13">z</text>
          <text x="174" y="12" font-size="10">z</text>
        </g>`
      : "";

    return `
    <g class="m-gatinha">
      <path class="m-rabo" d="M136 174 Q182 170 174 124 Q170 104 156 106"
        stroke="${C.roxoEsc}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="150" rx="48" ry="42" fill="${C.roxo}"/>
      <ellipse cx="100" cy="160" rx="28" ry="26" fill="${C.barriga}"/>
      <ellipse cx="80" cy="188" rx="15" ry="9" fill="${C.pata}"/>
      <ellipse cx="120" cy="188" rx="15" ry="9" fill="${C.pata}"/>
      <path d="M54 66 L58 18 L92 46 Z" fill="${C.roxo}" stroke="${C.roxo}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M146 66 L142 18 L108 46 Z" fill="${C.roxo}" stroke="${C.roxo}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M64 54 L64 32 L82 46 Z" fill="${C.orelhaIn}" stroke="${C.orelhaIn}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M136 54 L136 32 L118 46 Z" fill="${C.orelhaIn}" stroke="${C.orelhaIn}" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="100" cy="88" rx="56" ry="47" fill="${C.roxo}"/>
      <path d="M88 46 Q92 56 90 64 M100 44 L100 62 M112 46 Q108 56 110 64"
        stroke="${C.roxoEsc}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".55"/>
      ${olhos}
      <ellipse cx="64" cy="106" rx="9" ry="5.5" fill="${C.bochecha}" opacity=".65"/>
      <ellipse cx="136" cy="106" rx="9" ry="5.5" fill="${C.bochecha}" opacity=".65"/>
      <path d="M94 101 L106 101 L100 108 Z" fill="${C.rosa}" stroke="${C.rosa}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M100 108 Q96 115 89 111 M100 108 Q104 115 111 111"
        stroke="${C.escuro}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <g stroke="${C.bigode}" stroke-width="2" stroke-linecap="round" opacity=".9">
        <line x1="58" y1="100" x2="30" y2="94"/><line x1="58" y1="107" x2="30" y2="109"/>
        <line x1="142" y1="100" x2="170" y2="94"/><line x1="142" y1="107" x2="170" y2="109"/>
      </g>
      <path d="M62 124 Q100 142 138 124" stroke="${C.concha}" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${coracao(100, 136, 0.6, C.rosa)}
      ${princesa ? coroa : ""}
      ${zzz}
    </g>`;
  }

  /* ---------- Lontrinha (viewBox 0 0 200 200) ---------- */
  function lontrinhaG({ concha = false, patasEmbaixo = false, laco = true } = {}) {
    let patas;
    if (concha) {
      patas = `
        <g class="m-concha">
          <path d="M100 114 L80 142 Q100 154 120 142 Z" fill="${C.concha}" stroke="${C.rosa}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M100 116 L92 146 M100 116 L100 148 M100 116 L108 146" stroke="${C.rosa}" stroke-width="2" stroke-linecap="round"/>
        </g>
        <ellipse cx="80" cy="138" rx="11" ry="9" fill="${C.lontraEsc}"/>
        <ellipse cx="120" cy="138" rx="11" ry="9" fill="${C.lontraEsc}"/>`;
    } else if (patasEmbaixo) {
      patas = `
        <ellipse cx="66" cy="190" rx="13" ry="9" fill="${C.lontraEsc}"/>
        <ellipse cx="134" cy="190" rx="13" ry="9" fill="${C.lontraEsc}"/>`;
    } else {
      patas = `
        <ellipse cx="86" cy="134" rx="11" ry="9" fill="${C.lontraEsc}"/>
        <ellipse cx="114" cy="134" rx="11" ry="9" fill="${C.lontraEsc}"/>`;
    }

    return `
    <g class="m-lontra">
      <path class="m-rabo" d="M132 182 Q166 182 184 164"
        stroke="${C.lontraEsc}" stroke-width="18" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="150" rx="46" ry="46" fill="${C.lontra}"/>
      <ellipse cx="100" cy="160" rx="30" ry="32" fill="${C.lontraBarriga}"/>
      <ellipse cx="80" cy="194" rx="14" ry="7" fill="${C.lontraEsc}"/>
      <ellipse cx="120" cy="194" rx="14" ry="7" fill="${C.lontraEsc}"/>
      <circle cx="58" cy="58" r="11" fill="${C.lontraEsc}"/>
      <circle cx="142" cy="58" r="11" fill="${C.lontraEsc}"/>
      <circle cx="58" cy="58" r="5.5" fill="${C.lontraBarriga}"/>
      <circle cx="142" cy="58" r="5.5" fill="${C.lontraBarriga}"/>
      <ellipse cx="100" cy="88" rx="52" ry="45" fill="${C.lontra}"/>
      <ellipse cx="100" cy="106" rx="32" ry="22" fill="${C.focinho}"/>
      <g class="m-piscar">${olhoAberto(78, 84, 8, 9)}${olhoAberto(122, 84, 8, 9)}</g>
      <ellipse cx="62" cy="100" rx="8" ry="5" fill="${C.bochecha}" opacity=".6"/>
      <ellipse cx="138" cy="100" rx="8" ry="5" fill="${C.bochecha}" opacity=".6"/>
      <ellipse cx="100" cy="98" rx="10" ry="6.5" fill="${C.escuro}"/>
      <ellipse cx="97" cy="96" rx="3" ry="1.8" fill="#fff" opacity=".7"/>
      <path d="M100 104 Q94 112 87 108 M100 104 Q106 112 113 108"
        stroke="${C.escuro}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <g fill="${C.lontraEsc}" opacity=".5">
        <circle cx="80" cy="106" r="1.8"/><circle cx="76" cy="112" r="1.8"/><circle cx="84" cy="113" r="1.8"/>
        <circle cx="120" cy="106" r="1.8"/><circle cx="124" cy="112" r="1.8"/><circle cx="116" cy="113" r="1.8"/>
      </g>
      ${patas}
      ${laco ? fitinha : ""}
    </g>`;
  }

  /* ---------- Cachorrinho preto e branco (viewBox 0 0 200 200) ---------- */
  function cachorrinhoG({ olhos = "abertos", boca = "lingua" } = {}) {
    const branco = "#fdf9ff", sombra = "#e7dcf0", preto = "#2b2433", mancha = "#3a3044";
    return `
    <g class="m-cachorrinho">
      <path class="m-rabo" d="M140 162 Q170 152 166 120" stroke="${preto}" stroke-width="13" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="152" rx="46" ry="42" fill="${branco}"/>
      <path d="M57 146 Q58 120 82 116 Q90 134 76 152 Q64 162 57 146 Z" fill="${preto}"/>
      <ellipse cx="100" cy="163" rx="26" ry="24" fill="${sombra}"/>
      <ellipse cx="80" cy="189" rx="15" ry="9" fill="${preto}"/>
      <ellipse cx="120" cy="189" rx="15" ry="9" fill="${branco}" stroke="${sombra}" stroke-width="2.5"/>
      <ellipse cx="100" cy="88" rx="55" ry="47" fill="${branco}"/>
      <ellipse cx="100" cy="52" rx="14" ry="8.5" fill="${preto}"/>
      <ellipse cx="124" cy="82" rx="21" ry="23" fill="${mancha}" transform="rotate(14 124 82)"/>
      <ellipse cx="122" cy="84" rx="12.5" ry="14.5" fill="${branco}"/>
      <path d="M57 50 Q30 48 26 80 Q23 108 39 117 Q54 122 58 99 Q63 74 57 50 Z" fill="${preto}"/>
      <path d="M143 50 Q170 48 174 80 Q177 108 161 117 Q146 122 142 99 Q137 74 143 50 Z" fill="${preto}"/>
      <path d="M50 62 Q38 72 36 92" stroke="${mancha}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
      <ellipse cx="100" cy="109" rx="27" ry="19" fill="#ffffff"/>
      ${olhosPet(olhos, 9, 11)}
      <ellipse cx="64" cy="104" rx="8" ry="5" fill="${C.bochecha}" opacity=".6"/>
      <ellipse cx="138" cy="106" rx="8" ry="5" fill="${C.bochecha}" opacity=".6"/>
      <ellipse cx="100" cy="100" rx="10" ry="7" fill="${preto}"/>
      <ellipse cx="96.5" cy="97.5" rx="3.2" ry="1.9" fill="#fff" opacity=".75"/>
      ${bocaPet(boca, 107)}
      <path d="M62 128 Q100 145 138 128" stroke="${C.roxo}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="141" r="7.5" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="2"/>
      ${coracao(100, 141, 0.32, C.ouroEsc)}
    </g>`;
  }

  /* ================== Coisas que são a cara dela ================== */
  const T = {
    kitsune: "#a259e6",
    kitsuneEsc: "#6f2dbd",
    ponta: "#f6ecff",
    fogo: "#e0aaff",
    fogoRosa: "#f39ad6",
    corda: "#e05a8a",
    teal: "#3cc4b4",
    couro: "#8b5a3c",
    couroEsc: "#5e3a26",
    arma: "#3a3245",
    tranca: "#4a1772",
    escarlate: "#e0244f",
    escarlateEsc: "#9e1238",
    capa: "#8f1d45",
    capaIn: "#b8325e",
  };
  let uid = 0;

  // Fogo de raposa (kitsunebi): chaminha lilás que fica flutuando
  const fogoRaposa = (x, y, s, atraso = 0) => `
    <g class="m-fogo" style="animation-delay:${atraso}s">
      <g transform="translate(${x} ${y}) scale(${s})">
        <path d="M0 -20 C9 -9 13 0 9 8 C6 14 -6 14 -9 8 C-13 0 -7 -7 0 -20 Z" fill="${T.fogo}" opacity=".35"/>
        <path d="M0 -13 C6 -5 9 1 6 6 C4 10 -4 10 -6 6 C-9 1 -4 -3 0 -13 Z" fill="${T.fogoRosa}" opacity=".9"/>
        <ellipse cx="0" cy="3" rx="2.6" ry="3.6" fill="#fff4ff"/>
      </g>
    </g>`;

  // Brilhinho de 4 pontas
  const brilho = (x, y, s, cor) => `
    <path transform="translate(${x} ${y}) scale(${s})" d="M0 -10 Q1.5 -1.5 10 0 Q1.5 1.5 0 10 Q-1.5 1.5 -10 0 Q-1.5 -1.5 0 -10 Z" fill="${cor}"/>`;

  /* ---------- Kitsune roxa de nove caudas (viewBox 0 0 200 200) ---------- */
  function kitsuneG({ fogos = true, olhos = "abertos", boca = "sorriso" } = {}) {
    const id = `kt${++uid}`;
    // cauda fofinha em pluma, com a pontinha clara virando pra fora
    const forma = "M0 0 C-20 -24 -30 -66 -14 -100 C-6 -116 10 -124 22 -118 C14 -108 18 -96 22 -80 C28 -50 18 -18 0 0 Z";
    const cauda = (ang, escura) => `
      <g transform="translate(100 160) rotate(${ang}) scale(${ang < 0 ? -1 : 1} 1) scale(${escura ? 0.86 : 0.95})">
        <path d="${forma}" fill="${escura ? T.kitsuneEsc : T.kitsune}"/>
        <g clip-path="url(#${id})"><ellipse cx="9" cy="-123" rx="25" ry="25" fill="${T.ponta}"/></g>
        <path d="${forma}" fill="none" stroke="${escura ? T.tranca : T.kitsuneEsc}" stroke-width="2.4" opacity=".6"/>
      </g>`;
    // oito caudas abertas em leque atrás do corpo; a nona fica enroladinha nas patas
    const angulos = [-102, -80, -58, -36, 36, 58, 80, 102];
    const caudas = angulos.filter((_, i) => i % 2).map((a) => cauda(a, true)).join("") +
      angulos.filter((_, i) => i % 2 === 0).map((a) => cauda(a, false)).join("");

    return `
    <defs><clipPath id="${id}"><path d="${forma}"/></clipPath></defs>
    <g class="m-kitsune">
      <g class="m-caudas">${caudas}</g>
      <ellipse cx="100" cy="152" rx="42" ry="38" fill="${T.kitsune}"/>
      <path d="M76 126 Q100 118 124 126 Q122 142 114 152 L108 145 L100 160 L92 145 L86 152 Q78 142 76 126 Z" fill="${T.ponta}"/>
      <ellipse cx="80" cy="186" rx="14" ry="9" fill="${T.kitsuneEsc}"/>
      <ellipse cx="120" cy="186" rx="14" ry="9" fill="${T.kitsuneEsc}"/>
      <ellipse cx="80" cy="189" rx="9" ry="5" fill="${T.ponta}"/>
      <ellipse cx="120" cy="189" rx="9" ry="5" fill="${T.ponta}"/>
      <path d="M136 164 Q170 196 122 201 Q94 203 78 195" stroke="${T.kitsuneEsc}" stroke-width="24" fill="none" stroke-linecap="round" opacity=".6"/>
      <path d="M136 164 Q170 196 122 201 Q94 203 78 195" stroke="${T.kitsune}" stroke-width="19" fill="none" stroke-linecap="round"/>
      <circle cx="76" cy="194" r="10.5" fill="${T.ponta}"/>
      <path d="M52 72 L56 10 L94 46 Z" fill="${T.kitsune}" stroke="${T.kitsune}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M148 72 L144 10 L106 46 Z" fill="${T.kitsune}" stroke="${T.kitsune}" stroke-width="8" stroke-linejoin="round"/>
      <path d="M53 24 L56 10 L67 20 Z" fill="${T.kitsuneEsc}" stroke="${T.kitsuneEsc}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M147 24 L144 10 L133 20 Z" fill="${T.kitsuneEsc}" stroke="${T.kitsuneEsc}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M62 60 L63 30 L84 48 Z" fill="${C.orelhaIn}" stroke="${C.orelhaIn}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M138 60 L137 30 L116 48 Z" fill="${C.orelhaIn}" stroke="${C.orelhaIn}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M44 92 Q46 50 100 46 Q154 50 156 92 L170 104 L152 109 Q140 134 100 135 Q60 134 48 109 L30 104 Z" fill="${T.kitsune}"/>
      <path d="M30 104 L48 98 L50 109 Z M170 104 L152 98 L150 109 Z" fill="${T.ponta}"/>
      <path d="M56 100 Q70 93 86 100 Q100 92 114 100 Q130 93 144 100 Q138 130 100 133 Q62 130 56 100 Z" fill="${T.ponta}"/>
      <path d="M100 54 L105 62 L100 70 L95 62 Z" fill="${C.rosa}"/>
      ${olhosPet(olhos, 10, 12)}
      ${olhos === "abertos" ? `<path d="M67 77 Q60 72 54 74 M133 77 Q140 72 146 74" stroke="${C.escuro}" stroke-width="3" fill="none" stroke-linecap="round"/>` : ""}
      <ellipse cx="64" cy="106" rx="8" ry="5" fill="${C.bochecha}" opacity=".7"/>
      <ellipse cx="136" cy="106" rx="8" ry="5" fill="${C.bochecha}" opacity=".7"/>
      <ellipse cx="100" cy="104" rx="6.5" ry="4.5" fill="${C.escuro}"/>
      ${bocaPet(boca, 109)}
      <path d="M66 131 Q100 146 134 131" stroke="${T.corda}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="143" r="7.5" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="2"/>
      <path d="M95 145 L105 145 M100 145 L100 150" stroke="${C.ouroEsc}" stroke-width="1.8" stroke-linecap="round"/>
    </g>
    ${fogos ? fogoRaposa(14, 42, 1.1) + fogoRaposa(188, 32, 0.95, 1.1) + fogoRaposa(100, 14, 0.7, 2.1) : ""}`;
  }

  /* ---------- Gatinha Croft: a Manuzinha Croft exploradora (viewBox 0 0 200 200) ---------- */
  function gatinhaCroftG() {
    const elos = [0, 1, 2, 3, 4, 5].map((i) =>
      `<ellipse cx="${141 + i * 2.2}" cy="${114 + i * 10.5}" rx="8" ry="7" fill="${T.tranca}" stroke="#2e0b4a" stroke-width="1.5"/>`).join("");
    const coldre = (x, giro) => `
      <g transform="rotate(${giro} ${x + 6} 180)">
        <rect x="${x + 2}" y="160" width="8" height="15" rx="2.5" fill="${T.arma}"/>
        <rect x="${x}" y="170" width="13" height="22" rx="3.5" fill="${T.couroEsc}"/>
        <path d="M${x + 2} 176 H${x + 11}" stroke="${T.couro}" stroke-width="2"/>
      </g>`;
    return `
    ${gatinhaG({ princesa: false })}
    <g class="m-croft">
      <path d="M58 140 Q100 154 142 140 Q148 158 144 172 Q100 186 56 172 Q52 158 58 140 Z" fill="${T.teal}"/>
      <path d="M75 128 L77 146 M125 128 L123 146" stroke="${T.teal}" stroke-width="6" stroke-linecap="round"/>
      ${coldre(52, 8)}${coldre(136, -8)}
      <path d="M56 170 Q100 185 144 170" stroke="${T.couro}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <rect x="95" y="173" width="10" height="8" rx="2" fill="${C.ouro}" stroke="${C.ouroEsc}" stroke-width="1.5"/>
      <g class="m-tranca">${elos}
        <rect x="148" y="171" width="10" height="6" rx="2" fill="${C.ouro}"/>
        <path d="M150 177 L148 186 L153 182 L158 186 L156 177 Z" fill="${T.tranca}"/>
      </g>
      <g transform="translate(70 40) rotate(-14)">
        <circle cx="0" cy="0" r="9" fill="#2a0a3d" stroke="${C.ouro}" stroke-width="2"/>
        <circle cx="22" cy="2" r="9" fill="#2a0a3d" stroke="${C.ouro}" stroke-width="2"/>
        <path d="M9 0 Q11 -3 13 1" stroke="${C.ouro}" stroke-width="2" fill="none"/>
        <circle cx="-3" cy="-3" r="2.5" fill="#fff" opacity=".5"/><circle cx="19" cy="-1" r="2.5" fill="#fff" opacity=".5"/>
      </g>
    </g>`;
  }

  /* ---------- Gatinha escarlate: a princesinha escarlate (viewBox 0 0 200 200) ---------- */
  function gatinhaEscarlateG() {
    const esfera = (x, y, atraso) => `
      <g class="m-magia" style="animation-delay:${atraso}s">
        <circle cx="${x}" cy="${y}" r="15" fill="${T.escarlate}" opacity=".18"/>
        <circle cx="${x}" cy="${y}" r="9" fill="${T.escarlate}" opacity=".45"/>
        <path d="M${x - 8} ${y + 2} q4 -12 12 -6 q6 6 -2 10 q-6 2 -6 -4" stroke="#ff8fab" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        ${brilho(x + 12, y - 14, 0.5, "#ff8fab")}
      </g>`;
    return `
    <path d="M50 118 Q28 168 34 198 L166 198 Q172 168 150 118 Z" fill="${T.capa}"/>
    <path d="M58 124 Q42 168 46 198 L62 198 Q58 160 70 128 Z" fill="${T.capaIn}" opacity=".7"/>
    ${gatinhaG({ princesa: false })}
    <g class="m-tiara">
      <path d="M64 56 Q84 52 92 34 L100 10 L108 34 Q116 52 136 56 Q118 60 108 51 L100 45 L92 51 Q82 60 64 56 Z"
        fill="${T.escarlate}" stroke="${T.escarlateEsc}" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M100 22 L104 36 L100 41 L96 36 Z" fill="#ff8fab"/>
    </g>
    ${esfera(26, 150, 0)}${esfera(176, 156, 1.3)}`;
  }

  /* ---------- Adesivos pequenos (viewBox 0 0 120 120) ---------- */
  const adesivos = {
    // Hazbin Hotel: a maçã e o patinho de borracha
    hazbin: `
      <path d="M60 38 C50 27 28 29 25 50 C22 72 37 99 52 101 C56 101 58 98 60 98 C62 98 64 101 68 101 C83 99 98 72 95 50 C92 29 70 27 60 38 Z" fill="#e63946"/>
      <ellipse cx="41" cy="54" rx="6" ry="11" fill="#fff" opacity=".35" transform="rotate(18 41 54)"/>
      <path d="M60 38 Q60 26 66 17" stroke="#6b3e26" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M64 24 Q78 12 88 22 Q76 31 64 24 Z" fill="#52b788"/>
      <ellipse cx="92" cy="100" rx="15" ry="10" fill="${C.ouro}"/>
      <circle cx="100" cy="85" r="9" fill="${C.ouro}"/>
      <path d="M108 86 L116 88 L108 91 Z" fill="#f4845f"/>
      <circle cx="102" cy="83" r="1.8" fill="${C.escuro}"/>
      <path d="M82 98 Q90 104 98 98" stroke="${C.ouroEsc}" stroke-width="2" fill="none" stroke-linecap="round"/>
      ${brilho(24, 22, 0.8, C.ouro)}`,
    // Noite de terror: pipoca e o balão vermelho
    terror: `
      <path d="M86 64 Q78 84 88 108" stroke="#f6ecff" stroke-width="1.6" fill="none"/>
      <ellipse cx="88" cy="40" rx="18" ry="22" fill="#e63946"/>
      <ellipse cx="81" cy="32" rx="4" ry="7" fill="#fff" opacity=".4" transform="rotate(20 81 32)"/>
      <path d="M84 61 L88 66 L92 61 Z" fill="#c1121f"/>
      <g fill="#fff3c4" stroke="#f1d78a" stroke-width="1">
        <circle cx="25" cy="55" r="7"/><circle cx="36" cy="49" r="8"/><circle cx="48" cy="51" r="7.5"/><circle cx="58" cy="56" r="6.5"/>
        <circle cx="31" cy="44" r="6"/><circle cx="44" cy="42" r="6.5"/>
      </g>
      <path d="M18 58 L64 58 L57 108 L25 108 Z" fill="#fff"/>
      <path d="M27 58 L35 58 L35 108 L30 108 Z M44 58 L52 58 L49 108 L42 108 Z" fill="#e63946"/>
      <path d="M18 58 L64 58" stroke="#f6ecff" stroke-width="3" stroke-linecap="round"/>`,
    // Os bolos de chocolate e de laranja
    bolos: `
      <path d="M10 66 L48 54 L58 66 L20 78 Z" fill="#8a5434"/>
      <path d="M20 78 L58 66 L58 94 L20 106 Z" fill="#5a3420"/>
      <path d="M10 66 L20 78 L20 106 L10 94 Z" fill="#43261a"/>
      <path d="M20 92 L58 80" stroke="#f3d2b3" stroke-width="3"/>
      <path d="M58 60 L96 48 L108 60 L70 72 Z" fill="#ffc46b"/>
      <path d="M70 72 L108 60 L108 88 L70 100 Z" fill="#f4a259"/>
      <path d="M58 60 L70 72 L70 100 L58 88 Z" fill="#d9822b"/>
      <path d="M70 86 L108 74" stroke="#fff1d6" stroke-width="3"/>
      <circle cx="88" cy="53" r="9" fill="#ff9f1c" stroke="#fff1d6" stroke-width="2"/>
      <path d="M88 44 V62 M79 53 H97 M82 47 L94 59 M94 47 L82 59" stroke="#fff1d6" stroke-width="1.2"/>
      <circle cx="34" cy="62" r="5" fill="#e63946"/><path d="M34 57 Q36 52 40 51" stroke="#52b788" stroke-width="2" fill="none"/>`,
    // A gata dela: potinho de comida com peixinho
    gata: `
      <path d="M20 74 L100 74 L91 100 Q60 108 29 100 Z" fill="${C.rosa}"/>
      <ellipse cx="60" cy="74" rx="40" ry="9" fill="${C.orelhaIn}"/>
      <g fill="#a5683f"><circle cx="46" cy="72" r="4"/><circle cx="56" cy="70" r="4"/><circle cx="66" cy="72" r="4"/><circle cx="74" cy="70" r="3.5"/><circle cx="52" cy="75" r="3.5"/></g>
      <ellipse cx="62" cy="56" rx="18" ry="9" fill="#8ecae6"/>
      <path d="M44 56 L33 47 L35 56 L33 65 Z" fill="#8ecae6"/>
      <circle cx="72" cy="54" r="2" fill="${C.escuro}"/>
      <path d="M58 50 Q62 56 58 62" stroke="#5fa8d3" stroke-width="1.6" fill="none"/>
      <path d="M48 86 Q60 92 72 86" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".7"/>
      ${coracao(98, 30, 0.8, C.rosa)}`,
    // Jogar juntas: controle com botõezinhos de coração
    jogar: `
      <path d="M30 46 Q60 38 90 46 Q107 50 109 74 Q111 98 96 98 Q86 98 80 85 L40 85 Q34 98 24 98 Q9 98 11 74 Q13 50 30 46 Z" fill="${C.roxo}"/>
      <path d="M30 46 Q60 38 90 46 Q100 48 104 56 Q60 46 16 56 Q20 48 30 46 Z" fill="#fff" opacity=".18"/>
      <path d="M31 58 H39 V64 H45 V72 H39 V78 H31 V72 H25 V64 H31 Z" fill="#f6ecff"/>
      <circle cx="84" cy="58" r="5" fill="${C.rosa}"/><circle cx="94" cy="68" r="5" fill="${C.ouro}"/>
      <circle cx="74" cy="68" r="5" fill="#8ecae6"/><circle cx="84" cy="78" r="5" fill="${T.teal}"/>
      ${coracao(60, 66, 0.55, C.rosa)}`,
  };

  const svg = (conteudo, viewBox = "0 0 200 200", classe = "") =>
    `<svg class="mascote ${classe}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${conteudo}</svg>`;

  /* ---------- As duas de mãos dadas (viewBox 0 0 400 240) ---------- */
  function casalG({ agua = true } = {}) {
    const ondas = agua
      ? `<g class="m-agua">
          <path d="M-40 196 Q-15 186 10 196 T60 196 T110 196 T160 196 T210 196 T260 196 T310 196 T360 196 T410 196 T460 196 V240 H-40 Z"
            fill="#c77dff" opacity=".28"/>
          <path class="m-onda2" d="M-40 208 Q-15 200 10 208 T60 208 T110 208 T160 208 T210 208 T260 208 T310 208 T360 208 T410 208 T460 208 V240 H-40 Z"
            fill="#e0aaff" opacity=".22"/>
        </g>`
      : "";
    return `
      <g class="m-boiar">
        <g transform="translate(30 10)">${lontrinhaG()}</g>
        <g transform="translate(170 10)">${gatinhaG()}</g>
        <path d="M168 150 Q186 152 198 160" stroke="${C.lontra}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M232 150 Q214 152 202 160" stroke="${C.roxo}" stroke-width="15" fill="none" stroke-linecap="round"/>
        <circle cx="195" cy="161" r="9" fill="${C.lontraEsc}"/>
        <circle cx="205" cy="161" r="9" fill="${C.pata}"/>
        <g class="m-coracao-flutua">${coracao(198, 62, 1.25, C.rosa)}</g>
      </g>
      ${ondas}`;
  }

  return {
    gatinha: (op) => svg(gatinhaG(op), "0 0 200 200", "gatinha"),
    lontrinha: (op) => svg(lontrinhaG(op), "0 0 200 200", "lontrinha"),
    cachorrinho: (op) => svg(cachorrinhoG(op), "0 0 200 200", "cachorrinho"),
    casal: (op) => svg(casalG(op), "0 0 400 240", "casal"),
    kitsune: (op) => svg(kitsuneG(op), "-50 0 300 230", "kitsune"),
    fogo: () => svg(fogoRaposa(0, 0, 1), "-14 -22 28 38", "fogo"),
    gatinhaCroft: () => svg(gatinhaCroftG(), "0 0 200 200", "gatinha croft"),
    gatinhaEscarlate: () => svg(gatinhaEscarlateG(), "0 0 200 200", "gatinha escarlate"),
    adesivo: (nome) => (adesivos[nome] ? svg(adesivos[nome], "0 0 120 120", `adesivo-${nome}`) : ""),
    // Peças soltas pra casinha montar os bichinhos com roupinha e sujeira por cima
    g: { kitsune: kitsuneG, cachorrinho: cachorrinhoG, gatinha: gatinhaG, lontrinha: lontrinhaG, casal: casalG, gatinhaCroft: gatinhaCroftG },
    svg,
    pata: (cor = "currentColor") => `
      <svg class="pata" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="20" cy="27" rx="10" ry="8.5" fill="${cor}"/>
        <ellipse cx="8.5" cy="16" rx="4.2" ry="5.2" fill="${cor}"/>
        <ellipse cx="16" cy="9.5" rx="4.2" ry="5.4" fill="${cor}"/>
        <ellipse cx="24" cy="9.5" rx="4.2" ry="5.4" fill="${cor}"/>
        <ellipse cx="31.5" cy="16" rx="4.2" ry="5.2" fill="${cor}"/>
      </svg>`,
  };
})();
