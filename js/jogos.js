// Fliperama da Gatinha: mini games estilo Pou, desenhados num <canvas>
(() => {
  const cfg = window.CONFIG;
  const M = window.Mascotes;
  const J = cfg.jogos || {};
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];
  const entre = (a, b) => a + Math.random() * (b - a);
  const limita = (v, a, b) => Math.max(a, Math.min(b, v));
  const embaralhar = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const secao = $("#jogos");
  if (!secao) return;
  const ids = ["comida", "nuvens", "lontra", "memoria"].filter((id) => J[id]);
  if (!ids.length) {
    secao.remove();
    $('#menuLista a[href="#jogos"]')?.parentElement.remove();
    return;
  }

  /* ================== Recordes (ficam no navegador dela) ================== */
  const recordes = (() => {
    try { return JSON.parse(localStorage.getItem("manu-recordes") || "{}") || {}; } catch { return {}; }
  })();
  const menorMelhor = { memoria: true };
  const unidade = { comida: ["comida", "comidas"], nuvens: ["metro", "metros"], lontra: ["ponto", "pontos"], memoria: ["jogada", "jogadas"] };
  const formatar = (id, n) => `${Number(n).toLocaleString("pt-BR")} ${unidade[id][n === 1 ? 0 : 1]}`;

  function salvarRecorde(id, valor) {
    const antigo = recordes[id];
    const bateu = antigo == null || (menorMelhor[id] ? valor < antigo : valor > antigo);
    if (bateu) {
      recordes[id] = valor;
      try { localStorage.setItem("manu-recordes", JSON.stringify(recordes)); } catch { /* sem storage, tudo bem */ }
    }
    return bateu;
  }

  /* ================== Cartões da seção ================== */
  const artes = {
    comida: () => M.gatinha(),
    nuvens: () => M.kitsune(),
    lontra: () => M.lontrinha(),
    memoria: () => M.casal({ agua: false }),
  };
  const selo = { comida: "🍕", nuvens: "☁️", lontra: "🐚", memoria: "🃏" };

  function montarGrade() {
    $("#gradeJogos").innerHTML = ids.map((id) => `
      <button class="glass jogo-cartao" type="button" data-jogo="${id}">
        <span class="jogo-cartao-arte">${artes[id]()}<span class="jogo-cartao-selo" aria-hidden="true">${selo[id]}</span></span>
        <span class="jogo-cartao-nome">${esc(J[id].nome)}</span>
        <span class="jogo-cartao-desc">${esc(J[id].descricao)}</span>
        <span class="jogo-cartao-recorde">${recordes[id] != null ? `🏆 recorde: ${formatar(id, recordes[id])}` : "ainda sem recorde"}</span>
        <span class="jogo-cartao-jogar">Jogar ▶</span>
      </button>`).join("");
  }

  /* ================== Tela do jogo ================== */
  const caixa = $("#jogo");
  const palco = $("#jogoPalco");
  const canvas = $("#jogoTela");
  const ctx = canvas.getContext("2d");
  const painel = $("#jogoPainel");
  const memoriaEl = $("#jogoMemoria");
  const hudPontos = $("#jogoPontos");
  const hudVidas = $("#jogoVidas");
  let W = 1, H = 1, dpr = 1;
  let idAtual = null, jogo = null, rodando = false, ultimo = 0, quadro = 0, focoAntes = null;

  const mostrarPontos = (t) => { hudPontos.textContent = t; };
  const mostrarVidas = (n, max = 3) => {
    hudVidas.textContent = n == null ? "" : "💜".repeat(Math.max(0, n)) + "🤍".repeat(Math.max(0, max - n));
  };

  function medir(redesenhar = true) {
    const r = palco.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, r.width);
    H = Math.max(1, r.height);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (jogo && jogo.redimensionar) jogo.redimensionar();
    if (redesenhar && jogo && !rodando && !jogo.dom) jogo.desenhar();
  }

  function abrir(id) {
    idAtual = id;
    jogo = JOGOS[id];
    focoAntes = document.activeElement;
    caixa.hidden = false;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("jogando");
    $("#jogoNome").textContent = J[id].nome;
    canvas.hidden = !!jogo.dom;
    memoriaEl.hidden = !jogo.dom;
    medir(false);
    jogo.iniciar(); // monta a cena de fundo atrás do painel
    if (!jogo.dom) jogo.desenhar();
    telaInicio();
  }

  function sair() {
    parar();
    caixa.hidden = true;
    document.body.style.overflow = "";
    document.documentElement.classList.remove("jogando");
    jogo = null;
    idAtual = null;
    if (focoAntes) focoAntes.focus();
  }

  function comecar() {
    painel.hidden = true;
    medir(false);
    jogo.iniciar();
    if (jogo.dom) return;
    rodando = true;
    ultimo = performance.now();
    cancelAnimationFrame(quadro);
    quadro = requestAnimationFrame(passo);
  }

  function passo(t) {
    if (!rodando || !jogo) return;
    const dt = Math.min(0.05, Math.max(0, (t - ultimo) / 1000));
    ultimo = t;
    jogo.atualizar(dt);
    if (jogo) jogo.desenhar();
    if (rodando) quadro = requestAnimationFrame(passo);
  }

  function parar() {
    rodando = false;
    cancelAnimationFrame(quadro);
  }

  function fimDeJogo(valor) {
    const id = idAtual;
    if (!id) return;
    parar();
    const bateu = salvarRecorde(id, valor);
    montarGrade();
    const frase = (J[id].fim || "").replace("{n}", formatar(id, valor));
    painel.innerHTML = `
      <div class="jogo-painel-caixa">
        <p class="jogo-fim-sobre">${bateu ? "🏆 novo recorde!" : "fim de jogo"}</p>
        <p class="jogo-resultado">${esc(formatar(id, valor))}</p>
        ${frase ? `<p>${esc(frase)}</p>` : ""}
        <p class="jogo-recorde">🏆 recorde: ${esc(formatar(id, recordes[id]))}</p>
        <button class="botao" type="button" data-acao="jogar">Jogar de novo ↻</button>
        <button class="jogo-link" type="button" data-acao="sair">escolher outro jogo</button>
      </div>`;
    painel.hidden = false;
    $('[data-acao="jogar"]', painel).focus();
  }

  function telaInicio() {
    const id = idAtual, j = J[id];
    painel.innerHTML = `
      <div class="jogo-painel-caixa">
        <div class="jogo-painel-arte">${artes[id]()}</div>
        <h3>${esc(j.nome)}</h3>
        <p>${esc(j.descricao)}</p>
        <p class="jogo-como">${esc(j.comoJogar)}</p>
        <p class="jogo-recorde">${recordes[id] != null ? `🏆 recorde: ${esc(formatar(id, recordes[id]))}` : ""}</p>
        <button class="botao" type="button" data-acao="jogar">Jogar ▶</button>
      </div>`;
    painel.hidden = false;
    $('[data-acao="jogar"]', painel).focus();
  }

  /* ================== Desenhinhos que todo jogo usa ================== */
  // Os mascotes viram imagem pra desenhar no canvas
  function imagemSvg(svg) {
    const vb = ((svg.match(/viewBox="([^"]+)"/) || [])[1] || "0 0 200 200").split(/\s+/).map(Number);
    const img = new Image();
    img.proporcao = vb[3] / vb[2];
    img.onload = () => { if (jogo && !rodando && !jogo.dom && !caixa.hidden) jogo.desenhar(); };
    img.src = "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svg.replace("<svg ", `<svg width="${vb[2] * 2}" height="${vb[3] * 2}" `));
    return img;
  }

  function desenharImg(img, x, y, largura, { giro = 0, espelho = false, sx = 1, sy = 1, alfa = 1 } = {}) {
    if (!img.complete || !img.naturalWidth) return;
    const altura = largura * img.proporcao;
    ctx.save();
    ctx.globalAlpha = alfa;
    ctx.translate(x, y);
    if (giro) ctx.rotate(giro);
    ctx.scale((espelho ? -1 : 1) * sx, sy);
    ctx.drawImage(img, -largura / 2, -altura / 2, largura, altura);
    ctx.restore();
  }

  // Emoji desenhado uma vez só e guardado (fica bem mais leve)
  const cacheEmoji = new Map();
  function desenharEmoji(ch, x, y, tam, giro = 0) {
    const chave = `${ch}|${Math.round(tam)}|${dpr}`;
    let c = cacheEmoji.get(chave);
    if (!c) {
      c = document.createElement("canvas");
      const lado = Math.ceil(tam * 1.4 * dpr);
      c.width = c.height = lado;
      const x2 = c.getContext("2d");
      x2.font = `${tam * dpr}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      x2.textAlign = "center";
      x2.textBaseline = "middle";
      x2.fillText(ch, lado / 2, lado / 2 + tam * dpr * 0.06);
      cacheEmoji.set(chave, c);
    }
    const lado = tam * 1.4;
    ctx.save();
    ctx.translate(x, y);
    if (giro) ctx.rotate(giro);
    ctx.drawImage(c, -lado / 2, -lado / 2, lado, lado);
    ctx.restore();
  }

  // Textinhos que sobem ("nham!", "+2 🐚")
  const flutuar = (lista, t, x, y, cor = "#fff") => lista.push({ t, x, y, cor, vida: 0.9 });
  function atualizarFlutuantes(lista, dt) {
    lista.forEach((f) => { f.vida -= dt; f.y -= 60 * dt; });
    return lista.filter((f) => f.vida > 0);
  }
  function desenharFlutuantes(lista) {
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = '700 18px "Poppins", system-ui, sans-serif';
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(26, 6, 38, .75)";
    for (const f of lista) {
      ctx.globalAlpha = Math.min(1, f.vida / 0.35);
      ctx.strokeText(f.t, f.x, f.y);
      ctx.fillStyle = f.cor;
      ctx.fillText(f.t, f.x, f.y);
    }
    ctx.restore();
  }

  const estrelas = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), r: entre(0.6, 1.8), f: entre(0, 6) }));
  function desenharEstrelas(alfa = 1) {
    const t = performance.now() / 700;
    ctx.fillStyle = "#fff";
    for (const s of estrelas) {
      ctx.globalAlpha = alfa * (0.2 + 0.4 * (1 + Math.sin(t + s.f)) / 2);
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function fundo(cima, baixo) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, cima);
    g.addColorStop(1, baixo);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function mistura(a, b, k) {
    const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
    const c = [16, 8, 0].map((s) => Math.round(((pa >> s) & 255) * (1 - k) + ((pb >> s) & 255) * k));
    return `rgb(${c.join(",")})`;
  }

  function retangulo(x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
    else ctx.rect(x, y, w, h);
  }

  /* ================== 1. Chuva de Comida (o Food Drop do Pou) ================== */
  function jogoComida() {
    const c = J.comida;
    const gata = imagemSvg(M.gatinha());
    let gx, alvo, itens, comidas, vidas, tempo, prox, flash, tremor, nham, flutuantes, esq, dir, morto, fimEm;
    const tamGata = () => limita(W * 0.27, 72, 112);
    const gataY = () => H - tamGata() * 0.5 - 8;

    return {
      iniciar() {
        gx = alvo = W / 2;
        itens = [];
        comidas = 0;
        vidas = 3;
        tempo = 0;
        prox = 0.7;
        flash = tremor = nham = 0;
        flutuantes = [];
        esq = dir = false;
        morto = false;
        fimEm = 0;
        mostrarPontos("🍕 0");
        mostrarVidas(3);
      },
      toque(x) { alvo = x; },
      tecla(k, baixo) {
        if (k === "ArrowLeft" || k === "a" || k === "A") esq = baixo;
        if (k === "ArrowRight" || k === "d" || k === "D") dir = baixo;
      },
      atualizar(dt) {
        tempo += dt;
        const t = tamGata(), gy = gataY();
        if (esq !== dir) alvo = gx + (dir ? 80 : -80);
        alvo = limita(alvo, t * 0.42, W - t * 0.42);
        gx += limita(alvo - gx, -820 * dt, 820 * dt);

        // Cai coisa nova: cada vez mais rápido e com mais lixo
        if (!morto && (prox -= dt) <= 0) {
          prox = Math.max(0.32, 0.95 - tempo * 0.012) * entre(0.7, 1.25);
          const pLixo = Math.min(0.42, 0.2 + tempo * 0.004);
          const r = Math.random();
          const tipo = vidas < 3 && r < 0.035 ? "vida" : r < 0.035 + pLixo ? "lixo" : "comida";
          itens.push({
            tipo,
            ch: tipo === "vida" ? "💜" : sorteia(tipo === "lixo" ? c.lixos : c.comidas),
            x: entre(26, W - 26),
            y: -30,
            vy: entre(150, 210) + tempo * 5,
            giro: entre(0, 6),
            vgiro: entre(-2.5, 2.5),
          });
        }

        for (const it of itens) {
          it.y += it.vy * dt;
          it.giro += it.vgiro * dt;
          if (morto || it.pego) continue;
          if (it.y > gy - t * 0.45 && it.y < gy + t * 0.2 && Math.abs(it.x - gx) < t * 0.48) {
            it.pego = true;
            if (it.tipo === "lixo") {
              vidas--;
              flash = 0.35;
              tremor = 0.3;
              mostrarVidas(vidas);
              flutuar(flutuantes, "eca! 🤢", it.x, gy - t * 0.6, "#ff8fab");
              if (vidas <= 0) { morto = true; fimEm = 1.2; }
            } else if (it.tipo === "vida") {
              vidas = Math.min(3, vidas + 1);
              nham = 0.25;
              mostrarVidas(vidas);
              flutuar(flutuantes, "+1 💜", it.x, gy - t * 0.6, "#f3c4fb");
            } else {
              comidas++;
              nham = 0.25;
              mostrarPontos(`🍕 ${comidas}`);
              flutuar(flutuantes, sorteia(["nham!", "hmmm", "😋", "+1"]), it.x, gy - t * 0.6);
            }
          }
        }
        itens = itens.filter((it) => !it.pego && it.y < H + 40);
        flash = Math.max(0, flash - dt);
        tremor = Math.max(0, tremor - dt);
        nham = Math.max(0, nham - dt);
        flutuantes = atualizarFlutuantes(flutuantes, dt);
        if (morto && (fimEm -= dt) <= 0) fimDeJogo(comidas);
      },
      desenhar() {
        const t = tamGata(), gy = gataY();
        fundo("#240838", "#5a189a");
        desenharEstrelas(0.8);
        // toalhinha de piquenique no chão
        ctx.fillStyle = "rgba(243, 196, 251, .14)";
        ctx.fillRect(0, H - 16, W, 16);
        ctx.save();
        if (tremor) ctx.translate(entre(-4, 4), entre(-3, 3));
        for (const it of itens) desenharEmoji(it.ch, it.x, it.y, 32, it.giro * 0.3);
        ctx.fillStyle = "rgba(15, 3, 24, .35)";
        ctx.beginPath();
        ctx.ellipse(gx, H - 12, t * 0.36, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        const mastiga = nham ? 1 + Math.sin(nham * 50) * 0.06 : 1;
        desenharImg(gata, gx, gy, t, { sx: mastiga, sy: 2 - mastiga, giro: morto ? 0.35 : 0 });
        ctx.restore();
        desenharFlutuantes(flutuantes);
        if (flash) {
          ctx.fillStyle = `rgba(255, 77, 109, ${flash * 0.6})`;
          ctx.fillRect(0, 0, W, H);
        }
      },
    };
  }

  /* ================== 2. Kitsune nas Nuvens (o Sky Jump do Pou) ================== */
  function jogoNuvens() {
    const kit = imagemSvg(M.kitsune({ fogos: false }));
    const fogo = imagemSvg(M.fogo());
    const G = 1800;
    let k, nuvens, topo, camY, inicioY, altura, alvo, esq, dir, morto, fimEm, flutuantes;
    const tamK = () => limita(W * 0.26, 84, 120);
    const pes = () => tamK() * 0.77 * 0.42;
    const altPulo = () => Math.min(230, H * 0.32);
    const vPulo = () => Math.sqrt(2 * G * altPulo());
    const largNuvem = () => limita(W * 0.24, 70, 108);

    function gerarAte(yLimite) {
      while (topo > yLimite) {
        const nivel = Math.max(0, (inicioY - topo) / 10);
        const vao = entre(altPulo() * 0.35, altPulo() * (0.55 + Math.min(0.25, nivel / 2000)));
        topo -= vao;
        const l = largNuvem();
        const anda = nivel > 120 && Math.random() < Math.min(0.4, nivel / 2500 + 0.1);
        const n = { x: entre(l / 2 + 6, W - l / 2 - 6), y: topo, tipo: anda ? "anda" : "normal", vx: 0 };
        if (anda) n.vx = sorteia([-1, 1]) * entre(50, 80 + Math.min(80, nivel * 0.05));
        else if (Math.random() < 0.08) n.fogo = true;
        nuvens.push(n);
        // Nuvem fofa demais, que se desfaz quando pisa
        if (nivel > 60 && Math.random() < Math.min(0.32, nivel / 3000 + 0.1)) {
          nuvens.push({ x: entre(l / 2, W - l / 2), y: topo + vao * entre(0.3, 0.7), tipo: "fragil", vx: 0 });
        }
      }
    }

    function desenharNuvem(n) {
      const l = n.largura || largNuvem(), h = l * 0.3, x = n.x, y = n.y - camY;
      if (y < -60 || y > H + 60) return;
      ctx.save();
      ctx.globalAlpha = n.caindo ? Math.max(0, 0.6 - n.caindo) : n.tipo === "fragil" ? 0.6 : 1;
      const cor = n.tipo === "anda" ? "#f3c4fb" : n.tipo === "fragil" ? "#d8b4fe" : "#fff6ff";
      ctx.fillStyle = "rgba(26, 6, 38, .25)";
      ctx.beginPath();
      ctx.ellipse(x, y + h * 0.75, l / 2, h * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = cor;
      ctx.beginPath();
      ctx.ellipse(x, y + h * 0.55, l / 2, h * 0.42, 0, 0, Math.PI * 2);
      ctx.arc(x - l * 0.2, y + h * 0.35, h * 0.45, 0, Math.PI * 2);
      ctx.arc(x + l * 0.12, y + h * 0.22, h * 0.58, 0, Math.PI * 2);
      ctx.fill();
      if (n.tipo === "fragil") {
        ctx.strokeStyle = "rgba(90, 24, 154, .5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - l * 0.25, y + h * 0.5);
        ctx.lineTo(x - l * 0.08, y + h * 0.25);
        ctx.lineTo(x + l * 0.05, y + h * 0.6);
        ctx.lineTo(x + l * 0.2, y + h * 0.3);
        ctx.stroke();
      }
      ctx.restore();
      if (n.fogo) desenharImg(fogo, x, y - 12, 22);
    }

    return {
      iniciar() {
        nuvens = [];
        flutuantes = [];
        esq = dir = false;
        alvo = null;
        morto = false;
        fimEm = 0;
        inicioY = H - 40;
        camY = 0;
        altura = 0;
        nuvens.push({ x: W / 2, y: inicioY, tipo: "normal", vx: 0, largura: Math.min(W * 0.7, 260) });
        topo = inicioY;
        k = { x: W / 2, y: inicioY - pes(), vy: -vPulo(), olhaEsq: false, gira: 0 };
        gerarAte(-H);
        mostrarPontos("0 m");
        mostrarVidas(null);
      },
      toque(x, y, tipo) { alvo = tipo === "fim" ? null : x; },
      tecla(key, baixo) {
        if (key === "ArrowLeft" || key === "a" || key === "A") esq = baixo;
        if (key === "ArrowRight" || key === "d" || key === "D") dir = baixo;
      },
      atualizar(dt) {
        const t = tamK(), p = pes();
        // Pros lados: setinhas (dá a volta na tela) ou seguindo o dedo
        if (esq !== dir) {
          k.x += (dir ? 1 : -1) * 430 * dt;
          k.olhaEsq = esq;
          if (k.x < -t / 2) k.x += W + t;
          else if (k.x > W + t / 2) k.x -= W + t;
        } else if (alvo != null) {
          const dx = limita(alvo - k.x, -720 * dt, 720 * dt);
          k.x = limita(k.x + dx, t * 0.3, W - t * 0.3);
          if (Math.abs(dx) > 0.5) k.olhaEsq = dx < 0;
        }

        const pesAntes = k.y + p;
        k.vy += G * dt;
        k.y += k.vy * dt;
        k.gira = Math.max(0, k.gira - dt);
        const pesDepois = k.y + p;

        for (const n of nuvens) {
          if (n.vx) {
            const l = largNuvem() / 2;
            n.x += n.vx * dt;
            if (n.x < l || n.x > W - l) { n.vx *= -1; n.x = limita(n.x, l, W - l); }
          }
          if (n.caindo) { n.caindo += dt; n.y += 380 * dt; }
        }

        // Pousou numa nuvem? Pula de novo
        if (!morto && k.vy > 0) {
          for (const n of nuvens) {
            if (n.caindo) continue;
            const l = (n.largura || largNuvem()) / 2;
            if (pesAntes <= n.y + 4 && pesDepois >= n.y - 2 && Math.abs(k.x - n.x) < l + t * 0.12) {
              if (n.tipo === "fragil") {
                n.caindo = 0.001;
                flutuar(flutuantes, "puf! ☁️", n.x, n.y - camY - 10, "#e0aaff");
                continue;
              }
              k.y = n.y - p;
              k.vy = -vPulo() * (n.fogo ? 1.75 : 1);
              if (n.fogo) {
                k.gira = 0.6;
                flutuar(flutuantes, "superpulo! 🔥", n.x, n.y - camY - 30, "#f39ad6");
              }
              break;
            }
          }
        }

        // A câmera sobe junto com a kitsune
        if (k.y - camY < H * 0.38) camY = k.y - H * 0.38;
        gerarAte(camY - 80);
        nuvens = nuvens.filter((n) => n.y - camY < H + 80 && (!n.caindo || n.caindo < 0.8));

        const metros = Math.max(0, Math.floor((inicioY - p - k.y) / 10));
        if (metros > altura) { altura = metros; mostrarPontos(`${altura} m`); }

        if (!morto && k.y - camY > H + t) { morto = true; fimEm = 0.3; }
        flutuantes = atualizarFlutuantes(flutuantes, dt);
        if (morto && (fimEm -= dt) <= 0) fimDeJogo(altura);
      },
      desenhar() {
        const t = tamK();
        const noite = Math.min(1, altura / 900);
        fundo(mistura("#7b2cbf", "#10021c", noite), mistura("#f3c4fb", "#3c096c", noite));
        desenharEstrelas(0.2 + noite * 0.8);
        nuvens.forEach(desenharNuvem);
        const giro = k.gira > 0 ? (k.gira / 0.6) * Math.PI * 2 * (k.olhaEsq ? -1 : 1) : limita(k.vy / 4000, -0.12, 0.12);
        desenharImg(kit, k.x, k.y - camY, t, { espelho: k.olhaEsq, giro });
        desenharFlutuantes(flutuantes);
      },
    };
  }

  /* ================== 3. Lontrinha Nadadora (estilo Flappy / Jet Pou) ================== */
  function jogoLontra() {
    const lontra = imagemSvg(M.lontrinha());
    let o, algas, pontos, morto, fimEm, flutuantes, bolhas, falta, flash, esperando;
    const tamO = () => limita(W * 0.17, 54, 74);
    const gravidade = () => H * 1.9;
    const impulso = () => -H * 0.62;
    const areia = () => H - 26;
    const larguraAlga = () => tamO() * 1.05;
    const velocidade = () => W * 0.42 + Math.min(120, pontos * 4);
    const abertura = () => Math.max(tamO() * 2.5, H * 0.3 - pontos * 2);

    const novaBolha = (x, y, r) => ({ x, y, r, vy: entre(30, 70), f: entre(0, 6) });

    function nadar() {
      if (morto) return;
      esperando = false;
      o.vy = impulso();
      for (let i = 0; i < 3; i++) bolhas.push(novaBolha(o.x - tamO() * 0.35 + entre(-6, 6), o.y + entre(0, 12), entre(2, 4.5)));
    }

    const bateu = (cx, cy, r, rx, ry, rw, rh) => {
      const nx = limita(cx, rx, rx + rw), ny = limita(cy, ry, ry + rh);
      return (cx - nx) ** 2 + (cy - ny) ** 2 < r * r;
    };

    function morrer() {
      morto = true;
      fimEm = 1;
      flash = 0.35;
    }

    function desenharAlga(x, y1, y2, deCima) {
      const l = larguraAlga(), h = y2 - y1;
      if (h <= 0) return;
      const g = ctx.createLinearGradient(x - l / 2, 0, x + l / 2, 0);
      g.addColorStop(0, "#1b8a72");
      g.addColorStop(0.5, "#3cc4a4");
      g.addColorStop(1, "#167060");
      ctx.fillStyle = g;
      retangulo(x - l / 2, y1, l, h, 14);
      ctx.fill();
      // folhinhas balançando
      ctx.fillStyle = "#4fd8b4";
      const t = performance.now() / 500;
      for (let y = deCima ? y2 - 18 : y1 + 18, i = 0; deCima ? y > y1 : y < y2; y += deCima ? -26 : 26, i++) {
        const lado = i % 2 ? 1 : -1;
        ctx.beginPath();
        ctx.ellipse(x + lado * (l / 2 + 4), y, 9, 4.5, lado * (0.5 + Math.sin(t + i) * 0.2), 0, Math.PI * 2);
        ctx.fill();
      }
      // pontinha arredondada virada pra lontra
      ctx.fillStyle = "#5ee6c2";
      retangulo(x - l / 2 - 4, deCima ? y2 - 14 : y1, l + 8, 14, 7);
      ctx.fill();
    }

    return {
      iniciar() {
        o = { x: W * 0.3, y: H * 0.45, vy: 0 };
        algas = [];
        pontos = 0;
        morto = false;
        fimEm = 0;
        flash = 0;
        esperando = true; // fica boiando até o primeiro toque
        flutuantes = [];
        falta = W * 0.55;
        bolhas = Array.from({ length: 14 }, () => novaBolha(entre(0, W), entre(0, H), entre(1.5, 4)));
        mostrarPontos("0");
        mostrarVidas(null);
      },
      toque(x, y, tipo) { if (tipo === "inicio") nadar(); },
      tecla(key, baixo, repetiu) {
        if (baixo && !repetiu && (key === " " || key === "ArrowUp" || key === "w" || key === "W")) nadar();
      },
      atualizar(dt) {
        const r = tamO() * 0.34, l = larguraAlga();
        if (esperando) {
          o.vy = 0;
          o.y = H * 0.45 + Math.sin(performance.now() / 300) * 8;
        } else {
          o.vy += gravidade() * dt;
          o.y += o.vy * dt;
        }
        if (o.y < r) { o.y = r; o.vy = Math.max(0, o.vy); }

        const v = morto || esperando ? 0 : velocidade();
        if (!morto && (falta -= v * dt) <= 0) {
          const ab = abertura(), margem = 36;
          algas.push({ x: W + l, centro: entre(margem + ab / 2, areia() - margem - ab / 2), ab, passou: false, concha: Math.random() < 0.4 });
          falta = W * 0.55 + l;
        }

        for (const a of algas) {
          a.x -= v * dt;
          if (morto) continue;
          if (!a.passou && a.x + l / 2 < o.x - r) {
            a.passou = true;
            pontos++;
            mostrarPontos(String(pontos));
          }
          if (a.concha && Math.hypot(a.x - o.x, a.centro - o.y) < r + 16) {
            a.concha = false;
            pontos += 2;
            mostrarPontos(String(pontos));
            flutuar(flutuantes, "+2 🐚", a.x, a.centro - 24, "#f3c4fb");
          }
          if (bateu(o.x, o.y, r, a.x - l / 2, -20, l, a.centro - a.ab / 2 + 20) ||
              bateu(o.x, o.y, r, a.x - l / 2, a.centro + a.ab / 2, l, H)) morrer();
        }
        algas = algas.filter((a) => a.x > -l);
        if (!morto && o.y + r > areia()) morrer();
        if (morto) o.y = Math.min(o.y, areia() - r * 0.6);

        for (const b of bolhas) {
          b.y -= b.vy * dt;
          b.x += Math.sin(performance.now() / 400 + b.f) * 10 * dt - v * dt * 0.3;
        }
        bolhas = bolhas.filter((b) => b.y > -10 && b.x > -10);
        while (bolhas.length < 14) bolhas.push(novaBolha(entre(0, W + 40), H + entre(0, 40), entre(1.5, 4)));

        flash = Math.max(0, flash - dt);
        flutuantes = atualizarFlutuantes(flutuantes, dt);
        if (morto && (fimEm -= dt) <= 0) fimDeJogo(pontos);
      },
      desenhar() {
        fundo("#3a1d78", "#12082a");
        // raios de luz vindo da superfície
        ctx.fillStyle = "rgba(224, 170, 255, .06)";
        [0.15, 0.5, 0.8].forEach((p, i) => {
          ctx.beginPath();
          ctx.moveTo(W * p, 0);
          ctx.lineTo(W * p + 50 + i * 10, 0);
          ctx.lineTo(W * p - 40 + i * 30, H);
          ctx.lineTo(W * p - 120 + i * 20, H);
          ctx.fill();
        });
        ctx.strokeStyle = "rgba(224, 170, 255, .35)";
        ctx.lineWidth = 1.2;
        for (const b of bolhas) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        for (const a of algas) {
          desenharAlga(a.x, -20, a.centro - a.ab / 2, true);
          desenharAlga(a.x, a.centro + a.ab / 2, areia() + 10, false);
          if (a.concha) desenharEmoji("🐚", a.x, a.centro, 24);
        }
        // areia
        ctx.fillStyle = "#6d4c8f";
        ctx.fillRect(0, areia(), W, H - areia());
        ctx.fillStyle = "#8a68ad";
        ctx.fillRect(0, areia(), W, 4);
        const giro = morto ? 1.2 : limita(o.vy / 900, -0.45, 0.8);
        desenharImg(lontra, o.x, o.y, tamO(), { giro });
        desenharFlutuantes(flutuantes);
        if (esperando && rodando) {
          ctx.save();
          ctx.textAlign = "center";
          ctx.font = '700 18px "Poppins", system-ui, sans-serif';
          ctx.lineWidth = 4;
          ctx.strokeStyle = "rgba(26, 6, 38, .75)";
          ctx.fillStyle = "#f3c4fb";
          ctx.globalAlpha = 0.65 + Math.sin(performance.now() / 250) * 0.35;
          ctx.strokeText("toca pra nadar 👆", W / 2, H * 0.62);
          ctx.fillText("toca pra nadar 👆", W / 2, H * 0.62);
          ctx.restore();
        }
        if (flash) {
          ctx.fillStyle = `rgba(255, 77, 109, ${flash * 0.6})`;
          ctx.fillRect(0, 0, W, H);
        }
      },
    };
  }

  /* ================== 4. Jogo da Memória ================== */
  function jogoMemoria() {
    const cartas = [
      () => M.gatinha(),
      () => M.lontrinha(),
      () => M.kitsune({ fogos: false }),
      () => M.gatinhaCroft(),
      () => M.gatinhaEscarlate(),
      () => M.adesivo("bolos"),
      () => M.adesivo("hazbin"),
      () => M.adesivo("jogar"),
    ];
    let primeira, travado, jogadas, pares;

    function ajustar() {
      const lado = Math.floor(Math.min((W - 24 - 3 * 8) / 4, (H - 24 - 3 * 8) / 4, 110));
      memoriaEl.style.setProperty("--carta", `${Math.max(40, lado)}px`);
    }

    return {
      dom: true,
      iniciar() {
        jogadas = 0;
        pares = 0;
        primeira = null;
        travado = false;
        mostrarPontos("0 jogadas");
        mostrarVidas(null);
        const baralho = embaralhar([...cartas.keys(), ...cartas.keys()]);
        memoriaEl.innerHTML = baralho.map((n) => `
          <button class="carta-memoria" type="button" data-par="${n}" aria-label="Carta">
            <span class="carta-miolo"><span class="carta-verso">${M.pata()}</span><span class="carta-frente">${cartas[n]()}</span></span>
          </button>`).join("");
        ajustar();
      },
      redimensionar: ajustar,
      virar(b) {
        if (travado || !painel.hidden || b.classList.contains("virada")) return;
        b.classList.add("virada");
        if (!primeira) { primeira = b; return; }
        jogadas++;
        mostrarPontos(`${jogadas} ${jogadas === 1 ? "jogada" : "jogadas"}`);
        const a = primeira;
        primeira = null;
        if (a.dataset.par === b.dataset.par) {
          a.classList.add("par");
          b.classList.add("par");
          if (++pares === cartas.length) setTimeout(() => { if (idAtual === "memoria") fimDeJogo(jogadas); }, 800);
          return;
        }
        travado = true;
        setTimeout(() => {
          a.classList.remove("virada");
          b.classList.remove("virada");
          travado = false;
        }, 850);
      },
    };
  }

  const fabricas = { comida: jogoComida, nuvens: jogoNuvens, lontra: jogoLontra, memoria: jogoMemoria };
  const JOGOS = Object.fromEntries(ids.map((id) => [id, fabricas[id]()]));

  /* ================== Controles ================== */
  $("#gradeJogos").addEventListener("click", (e) => {
    const b = e.target.closest("[data-jogo]");
    if (b) abrir(b.dataset.jogo);
  });
  $("#jogoSair").addEventListener("click", sair);
  painel.addEventListener("click", (e) => {
    const b = e.target.closest("[data-acao]");
    if (!b) return;
    if (b.dataset.acao === "jogar") comecar();
    else sair();
  });
  memoriaEl.addEventListener("click", (e) => {
    const b = e.target.closest(".carta-memoria");
    if (b && idAtual === "memoria") JOGOS.memoria.virar(b);
  });

  let apertado = false;
  const ponto = (e) => {
    const r = canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  canvas.addEventListener("pointerdown", (e) => {
    if (!rodando) return;
    e.preventDefault();
    apertado = true;
    try { canvas.setPointerCapture(e.pointerId); } catch { /* tudo bem */ }
    jogo.toque?.(...ponto(e), "inicio");
  });
  canvas.addEventListener("pointermove", (e) => {
    if (rodando && (apertado || e.pointerType === "mouse")) jogo.toque?.(...ponto(e), "move");
  });
  const soltar = (e) => {
    if (!apertado) return;
    apertado = false;
    if (rodando) jogo.toque?.(...ponto(e), "fim");
  };
  canvas.addEventListener("pointerup", soltar);
  canvas.addEventListener("pointercancel", soltar);

  document.addEventListener("keydown", (e) => {
    if (caixa.hidden) return;
    if (e.key === "Escape") { sair(); return; }
    if (!rodando) return;
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) e.preventDefault();
    jogo.tecla?.(e.key, true, e.repeat);
  });
  document.addEventListener("keyup", (e) => {
    if (!caixa.hidden && rodando) jogo.tecla?.(e.key, false);
  });
  window.addEventListener("resize", () => { if (!caixa.hidden) medir(); });

  montarGrade();
})();
