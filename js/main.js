(() => {
  const cfg = window.CONFIG;
  const M = window.Mascotes;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const embaralhar = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const sessao = {
    get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch { /* sem storage, tudo bem */ } },
  };

  /* ================== Fundo animado ================== */
  function iniciarFundo() {
    const canvas = $("#fundo");
    const ctx = canvas.getContext("2d");
    const cores = ["#c77dff", "#e0aaff", "#f3c4fb", "#9d4edd", "#b57ee8"];
    const coresFogo = ["#e0aaff", "#f39ad6", "#c77dff"];
    const coresEscarlate = ["#ff4d6d", "#e0244f", "#ff8fab"];
    // fogo = fogo de raposa (kitsune), que sobe; hex = magia escarlate da Wanda
    const tipos = ["coracao", "coracao", "estrela", "estrela", "pata", "petala", "fogo", "fogo", "raposa", "hex"];
    const sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];
    let w, h, dpr, particulas = [];

    const nova = (inicio) => {
      const tipo = sorteia(tipos);
      const sobe = tipo === "fogo";
      return {
        x: Math.random() * w,
        y: inicio ? Math.random() * h : sobe ? h + 30 : -30,
        tam: 5 + Math.random() * 9,
        vy: (sobe ? -1 : 1) * (0.2 + Math.random() * 0.45),
        fase: Math.random() * Math.PI * 2,
        giro: Math.random() * Math.PI * 2,
        vgiro: (Math.random() - 0.5) * 0.01,
        tipo,
        cor: sorteia(tipo === "fogo" ? coresFogo : tipo === "hex" ? coresEscarlate : cores),
        alfa: (tipo === "hex" ? 0.2 : 0.25) + Math.random() * 0.4,
      };
    };

    function redimensionar() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const qtd = Math.round(Math.min(48, Math.max(18, w / 28)));
      while (particulas.length < qtd) particulas.push(nova(true));
      particulas.length = qtd;
    }

    function desenhar(p, t) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.giro);
      const pisca = p.tipo === "estrela" || p.tipo === "hex";
      ctx.globalAlpha = pisca ? p.alfa * (0.5 + 0.5 * Math.sin(t / 600 + p.fase)) : p.alfa;
      ctx.fillStyle = p.cor;
      const s = p.tam;
      ctx.beginPath();
      if (p.tipo === "coracao") {
        ctx.moveTo(0, s * 0.35);
        ctx.bezierCurveTo(-s * 1.1, -s * 0.3, -s * 0.5, -s * 1.1, 0, -s * 0.45);
        ctx.bezierCurveTo(s * 0.5, -s * 1.1, s * 1.1, -s * 0.3, 0, s * 0.35);
        ctx.fill();
      } else if (p.tipo === "estrela") {
        const r = s * 0.9, ri = s * 0.18;
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          const raio = i % 2 === 0 ? r : ri;
          ctx.lineTo(Math.cos(ang) * raio, Math.sin(ang) * raio);
        }
        ctx.closePath();
        ctx.shadowColor = p.cor;
        ctx.shadowBlur = 8;
        ctx.fill();
      } else if (p.tipo === "pata") {
        const k = s / 20;
        ctx.ellipse(0, 7 * k, 10 * k, 8.5 * k, 0, 0, Math.PI * 2);
        ctx.fill();
        [[-11.5, -4, 4.2, 5.2], [-4, -10.5, 4.2, 5.4], [4, -10.5, 4.2, 5.4], [11.5, -4, 4.2, 5.2]].forEach(([x, y, rx, ry]) => {
          ctx.beginPath();
          ctx.ellipse(x * k, y * k, rx * k, ry * k, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (p.tipo === "fogo") {
        // chaminha sempre em pé, tremendo de leve
        const k = s / 11;
        ctx.rotate(-p.giro);
        ctx.scale(k, k * (1 + 0.12 * Math.sin(t / 170 + p.fase)));
        ctx.shadowColor = p.cor;
        ctx.shadowBlur = 14;
        ctx.moveTo(0, -16);
        ctx.bezierCurveTo(8, -6, 11, 2, 7, 8);
        ctx.bezierCurveTo(4, 12, -4, 12, -7, 8);
        ctx.bezierCurveTo(-11, 2, -6, -4, 0, -16);
        ctx.fill();
        ctx.beginPath();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff4ff";
        ctx.ellipse(0, 4, 2.4, 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.tipo === "raposa") {
        const k = s / 10;
        [[-10, -2], [-8, -11], [-3, -6], [3, -6], [8, -11], [10, -2], [6, 4], [0, 9], [-6, 4]]
          .forEach(([x, y], i) => (i ? ctx.lineTo(x * k, y * k) : ctx.moveTo(x * k, y * k)));
        ctx.closePath();
        ctx.fill();
      } else if (p.tipo === "hex") {
        const r = s * 0.9;
        ctx.shadowColor = p.cor;
        ctx.shadowBlur = 10;
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(r * 0.15, -r * 0.15, r, 0);
        ctx.quadraticCurveTo(r * 0.15, r * 0.15, 0, r);
        ctx.quadraticCurveTo(-r * 0.15, r * 0.15, -r, 0);
        ctx.quadraticCurveTo(-r * 0.15, -r * 0.15, 0, -r);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = p.cor;
        ctx.lineWidth = 1.2;
        ctx.arc(0, 0, r * 1.35, 0, Math.PI * 1.25);
        ctx.stroke();
      } else {
        ctx.ellipse(0, 0, s * 0.45, s * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function quadro(t) {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particulas.length; i++) {
        const p = particulas[i];
        if (!reduzMovimento) {
          p.y += p.vy;
          p.x += Math.sin(t / 1800 + p.fase) * 0.3;
          p.giro += p.vgiro;
          if (p.y > h + 30 || p.y < -40) particulas[i] = nova(false);
        }
        desenhar(p, t);
      }
      if (!reduzMovimento) requestAnimationFrame(quadro);
    }

    redimensionar();
    window.addEventListener("resize", redimensionar);
    requestAnimationFrame(quadro);
  }

  /* ================== Modal ================== */
  const modal = $("#modal");
  let focoAntes = null;
  let aoFechar = null; // algo pra acontecer logo depois que o modal fechar

  function abrirModal(html) {
    focoAntes = document.activeElement;
    $("#modalConteudo").innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-fechar", modal).focus();
  }

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (focoAntes) focoAntes.focus();
    if (aoFechar) {
      const depois = aoFechar;
      aoFechar = null;
      setTimeout(depois, 350);
    }
  }

  modal.addEventListener("click", (e) => { if (e.target.closest("[data-fechar]")) fecharModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) fecharModal(); });

  /* ================== Animações ao rolar ================== */
  function iniciarReveal() {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visivel");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  function iniciarProgresso() {
    const barra = $("#barraProgresso");
    const atualizar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", atualizar, { passive: true });
    atualizar();
  }

  /* ================== 1. Senha ================== */
  function iniciarCadeado(aoAbrir) {
    const cadeado = $("#cadeado");
    if (sessao.get("manu-aberto") === "1") {
      cadeado.remove();
      aoAbrir();
      return;
    }

    $("#cadeadoLontra").innerHTML = M.lontrinha({ patasEmbaixo: true });
    $("#cadeadoGatinha").innerHTML = M.gatinha({ dormindo: true });
    if (cfg.senha.saudacao) $("#saudacaoSenha").textContent = cfg.senha.saudacao;
    $("#perguntaSenha").textContent = cfg.senha.pergunta;
    $("#senha").placeholder = cfg.senha.dica || "";

    const form = $("#formSenha");
    const input = $("#senha");
    const erro = $("#erroSenha");
    const respostas = cfg.senha.respostas.map((r) => String(r).replace(/\D/g, ""));
    let tentativas = 0;

    setTimeout(() => input.focus(), 400);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const digitado = input.value.replace(/\D/g, "");
      if (respostas.includes(digitado)) {
        erro.textContent = "";
        sessao.set("manu-aberto", "1");
        $("#cadeadoGatinha").innerHTML = M.gatinha();
        cadeado.classList.add("acertou");
        chuva(26);
        setTimeout(() => {
          cadeado.classList.add("saindo");
          aoAbrir();
          setTimeout(() => cadeado.remove(), 1100);
        }, 1300);
      } else {
        const fome = cfg.segredos && cfg.segredos.senhaFome && /fome/i.test(input.value);
        erro.textContent = fome ? cfg.segredos.senhaFome : cfg.senha.erros[tentativas % cfg.senha.erros.length];
        if (!fome) tentativas++;
        form.classList.remove("tremer");
        void form.offsetWidth;
        form.classList.add("tremer");
        input.select();
      }
    });
  }

  /* ================== 2. Hero ================== */
  function iniciarHero() {
    $("#heroNome").textContent = cfg.nome;
    $("#heroAssinatura").textContent = cfg.hero.assinatura || "";
    $("#heroFrase").textContent = cfg.hero.frase;
    iniciarApelidos();
    $("#heroGatinha").innerHTML = M.gatinha();
    $("#heroLontra").innerHTML = M.lontrinha();
    $("#rodapeNome").textContent = cfg.nome;
    const ini = cfg.inicioNamoro;
    const dois = (n) => String(n).padStart(2, "0");
    $("#rodapeData").textContent = `${dois(ini.dia)} · ${dois(ini.mes)} · ${ini.ano}  —  pra sempre`;
    document.title = `Para a ${cfg.nome} 💜`;
    $$("[data-pata]").forEach((el) => { el.innerHTML = M.pata(); });
  }

  // Os apelidos dela se escrevendo e apagando, um depois do outro
  function iniciarApelidos() {
    const el = $("#heroApelido");
    const lista = cfg.hero.apelidos || [];
    el.textContent = lista[0] || cfg.nome;
    if (reduzMovimento || lista.length < 2) return;
    let i = 0, j = lista[0].length, apagando = true;

    function passo() {
      if (apagando) {
        if (j > 0) { el.textContent = lista[i].slice(0, --j); return setTimeout(passo, 32); }
        apagando = false;
        i = (i + 1) % lista.length;
        return setTimeout(passo, 280);
      }
      if (j < lista[i].length) { el.textContent = lista[i].slice(0, ++j); return setTimeout(passo, 75); }
      apagando = true;
      setTimeout(passo, 2400);
    }
    setTimeout(passo, 3200);
  }

  // Balãozinho de mensagem, com a hora no cantinho (igual no zap)
  const bolha = (m) => `<div class="bolha bolha-${m.de === "eu" ? "eu" : "ela"}">${esc(m.texto)}${
    m.hora ? `<span class="bolha-hora">${esc(m.hora)}</span>` : ""}</div>`;
  const pausa = (m) => `<p class="chat-pausa"><span>${esc(m.pausa)}</span></p>`;

  /* ================== 3. Casal ================== */
  function iniciarCasal() {
    $("#casalCena").innerHTML = M.casal();
    $("#casalTexto").textContent = cfg.casal.texto;
    $("#miniGatinha").innerHTML = M.gatinha();
    $("#miniLontra").innerHTML = M.lontrinha();
    const item = (t) => `<li>${M.pata()}${esc(t)}</li>`;
    $("#listaGatinha").innerHTML = cfg.casal.gatinha.map(item).join("");
    $("#listaLontra").innerHTML = cfg.casal.lontrinha.map(item).join("");
    const origem = cfg.casal.origem;
    if (origem && origem.mensagens) {
      $("#origemData").textContent = origem.data || "";
      $("#casalOrigem").innerHTML = origem.mensagens.map((m) => (m.pausa ? pausa(m) : bolha(m))).join("");
    } else {
      $(".origem-chat").remove();
    }
    const d = cfg.casal.desenho;
    if (d && d.src) {
      $("#casalDesenho").innerHTML = `<img src="${esc(d.src)}" alt="${esc(d.legenda || "Nosso desenho")}" loading="lazy" data-zoom>
        <figcaption>${esc(d.legenda || "")}</figcaption>`;
    } else {
      $("#casalDesenho").parentElement.remove();
    }
    $("#rodapeCasal").innerHTML = M.casal({ agua: false });
  }

  /* ================== 3b. Coisas que são a sua cara ================== */
  function iniciarSuaCara() {
    const itens = cfg.suaCara || [];
    if (!itens.length) {
      $("#suacara").remove();
      $('#menuLista a[href="#suacara"]')?.parentElement.remove();
      return;
    }
    const artes = { kitsune: () => M.kitsune(), croft: () => M.gatinhaCroft(), escarlate: () => M.gatinhaEscarlate() };
    const giros = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2];
    $("#gradeAdesivos").innerHTML = itens.map((x, n) => `
      <div class="reveal" style="transition-delay:${(n % 4) * 0.07}s">
        <div class="adesivo" data-arte="${esc(x.arte)}" style="--giro:${giros[n % giros.length]}deg">
          <div class="adesivo-arte">${(artes[x.arte] || (() => M.adesivo(x.arte)))()}</div>
          <h3>${esc(x.titulo)}</h3>
          <p>${esc(x.texto)}</p>
        </div>
      </div>`).join("");
  }

  // Desenhinhos temáticos no canto de algumas seções
  function iniciarDecoracoes() {
    [
      ["#historia", M.gatinhaCroft(), "dir"], // a nossa aventura, com a Manuzinha Croft
      ["#frases", M.gatinhaEscarlate(), "esq"], // a princesinha escarlate
      ["#cartas", M.kitsune(), "dir", "decor-kitsune"], // a kitsune roxa
      ["#numeros", M.kitsune({ fogos: false }), "esq", "decor-kitsune"],
    ].forEach(([sel, desenho, lado, extra = ""]) => {
      $(sel)?.insertAdjacentHTML("afterbegin", `<div class="decor decor-${lado} ${extra}" aria-hidden="true">${desenho}</div>`);
    });
  }

  /* ================== 4. Contador ================== */
  function iniciarContador() {
    const i = cfg.inicioNamoro;
    const inicio = new Date(i.ano, i.mes - 1, i.dia, i.hora || 0, i.minuto || 0, 0);
    const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
      "agosto", "setembro", "outubro", "novembro", "dezembro"];
    $("#contador .sobretitulo").textContent = `desde ${i.dia} de ${meses[i.mes - 1]} de ${i.ano}`;

    const el = { d: $("#cDias"), h: $("#cHoras"), m: $("#cMin"), s: $("#cSeg") };
    const pad = (n) => String(n).padStart(2, "0");

    function tick() {
      const diff = Math.max(0, Date.now() - inicio.getTime());
      const seg = Math.floor(diff / 1000);
      el.d.textContent = Math.floor(seg / 86400).toLocaleString("pt-BR");
      el.h.textContent = pad(Math.floor((seg % 86400) / 3600));
      el.m.textContent = pad(Math.floor((seg % 3600) / 60));
      el.s.textContent = pad(seg % 60);
    }
    tick();
    setInterval(tick, 1000);

    const p = cfg.primeiraMensagem;
    if (p) {
      const desde = new Date(p.ano, p.mes - 1, p.dia, p.hora || 0, p.minuto || 0);
      $("#cConversa").textContent = Math.max(0, Math.floor((Date.now() - desde) / 86400000)).toLocaleString("pt-BR");
    } else {
      $("#contadorConversa").remove();
    }

    const call = cfg.recordeCall;
    if (call && call.horas) {
      $("#cCall").textContent = Number(call.horas).toLocaleString("pt-BR");
      const botao = $("#contadorCall .botao-print");
      if (call.print) Object.assign(botao.dataset, { zoomSrc: call.print, zoomAlt: call.legenda || "" });
      else botao.remove();
    } else {
      $("#contadorCall").remove();
    }
  }

  /* ================== 5. Álbum ================== */
  function iniciarAlbum() {
    const caixa = $("#albumEl");
    const slidesEl = $("#albumSlides");
    const pontosEl = $("#albumPontos");
    const temFotos = cfg.fotos && cfg.fotos.length > 0;

    const itens = temFotos
      ? cfg.fotos
      : cfg.frasesExemplo.map((frase, n) => ({ frase, exemplo: n }));

    slidesEl.innerHTML = itens.map((it, n) => {
      if (it.exemplo !== undefined) {
        const mascote = n % 3 === 0 ? M.casal({ agua: false }) : n % 2 ? M.gatinha() : M.lontrinha({ concha: true });
        const tom = [
          "linear-gradient(135deg,#5a189a,#9d4edd)",
          "linear-gradient(135deg,#3c096c,#c77dff)",
          "linear-gradient(135deg,#7b2cbf,#f3c4fb)",
          "linear-gradient(135deg,#240046,#9d4edd)",
          "linear-gradient(135deg,#5a189a,#e0aaff)",
        ][n % 5];
        return `<figure class="slide slide-exemplo" style="background:${tom}">
          <div class="exemplo">${mascote}<span>espaço pra uma foto nossa</span></div>
          <figcaption>${esc(it.frase)}</figcaption>
        </figure>`;
      }
      const src = esc(it.src);
      return `<figure class="slide">
        <div class="slide-fundo" style="background-image:url('${src}')"></div>
        <img src="${src}" alt="${esc(it.frase || "Foto nossa")}" ${n > 1 ? 'loading="lazy"' : ""}>
        ${it.frase ? `<figcaption>${esc(it.frase)}</figcaption>` : ""}
      </figure>`;
    }).join("");

    pontosEl.innerHTML = itens.map((_, n) => `<button aria-label="Ir para a foto ${n + 1}"></button>`).join("");

    const slides = $$(".slide", slidesEl);
    const pontos = $$("button", pontosEl);
    const conta = $("#albumConta");
    let atual = 0, timer = null, pausado = false, visivel = false;

    function ir(n) {
      slides[atual].classList.remove("ativo");
      pontos[atual].classList.remove("ativo");
      atual = (n + slides.length) % slides.length;
      const img = $("img", slides[atual]);
      if (img) { img.style.animation = "none"; void img.offsetWidth; img.style.animation = ""; }
      slides[atual].classList.add("ativo");
      pontos[atual].classList.add("ativo");
      conta.textContent = `${atual + 1} / ${slides.length}`;
    }

    function agendar() {
      clearInterval(timer);
      if (!pausado && visivel && slides.length > 1) timer = setInterval(() => ir(atual + 1), 5500);
    }

    ir(0);
    $("#albumAnt").addEventListener("click", () => { ir(atual - 1); agendar(); });
    $("#albumProx").addEventListener("click", () => { ir(atual + 1); agendar(); });
    pontos.forEach((p, n) => p.addEventListener("click", () => { ir(n); agendar(); }));

    caixa.addEventListener("mouseenter", () => { pausado = true; agendar(); });
    caixa.addEventListener("mouseleave", () => { pausado = false; agendar(); });
    caixa.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { ir(atual - 1); agendar(); }
      if (e.key === "ArrowRight") { ir(atual + 1); agendar(); }
    });

    let x0 = null;
    caixa.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    caixa.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) ir(dx < 0 ? atual + 1 : atual - 1);
      x0 = null;
      agendar();
    });

    new IntersectionObserver(([en]) => { visivel = en.isIntersecting; agendar(); }, { threshold: 0.3 }).observe(caixa);
  }

  /* ================== 6. Linha do tempo ================== */
  function iniciarLinha() {
    $("#linhaTempo").innerHTML = cfg.linhaDoTempo.map((m) => `
      <div class="tl-item reveal">
        <div class="tl-pata">${M.pata()}</div>
        <div class="glass tl-card">
          <span class="tl-data">${esc(m.data)}</span>
          <h3>${esc(m.titulo)}</h3>
          <p>${esc(m.texto)}</p>
          ${m.foto ? `<img src="${esc(m.foto)}" alt="${esc(m.titulo)}" loading="lazy" data-zoom>` : ""}
        </div>
      </div>`).join("");
  }

  /* ================== 7. Nossas conversas ================== */
  function iniciarConversas() {
    const caps = cfg.conversas || [];
    if (!caps.length) { $("#conversas").remove(); return; }

    const chips = $("#capitulos");
    const tela = $("#celularTela");
    const status = $("#celularStatus");
    const avatar = { ela: M.gatinha(), eu: M.lontrinha() };
    $("#celularAvatar").innerHTML = M.gatinha();

    chips.innerHTML = caps.map((c, n) => `
      <button role="tab" id="cap-${n}" aria-selected="false" aria-controls="celularTela" data-cap="${n}">
        <span aria-hidden="true">${esc(c.icone || "💬")}</span>${esc(c.titulo)}
      </button>`).join("");
    const botoes = $$("button", chips);

    let atual = 0, timers = [], pendentes = [];

    const dica = $("#celularDica");

    const htmlMsg = (m, i, lista) => {
      if (m.pausa) return pausa(m);
      const de = m.de === "eu" ? "eu" : "ela";
      const ant = lista[i - 1];
      const novoGrupo = !ant || ant.pausa || ant.de !== m.de;
      return `<div class="msg msg-${de}${novoGrupo ? " novo-grupo" : ""}">
        <div class="msg-avatar">${novoGrupo ? avatar[de] : ""}</div>${bolha(m)}</div>`;
    };

    const rolarFim = () => tela.scrollTo({ top: tela.scrollHeight, behavior: reduzMovimento ? "auto" : "smooth" });

    function fimAnimacao() {
      timers = [];
      dica.hidden = true;
      status.textContent = "online";
    }

    // Clicar na tela mostra tudo de uma vez
    function terminar() {
      if (!timers.length) return;
      timers.forEach(clearTimeout);
      $(".digitando", tela)?.remove();
      pendentes.forEach((h) => tela.insertAdjacentHTML("beforeend", h));
      pendentes = [];
      fimAnimacao();
    }

    function mostrar(n, animar = true) {
      timers.forEach(clearTimeout);
      timers = [];
      atual = (n + caps.length) % caps.length;
      const c = caps[atual];

      botoes.forEach((b, i) => {
        b.classList.toggle("ativo", i === atual);
        b.setAttribute("aria-selected", String(i === atual));
        b.tabIndex = i === atual ? 0 : -1;
      });
      const chip = botoes[atual];
      chips.scrollTo({ left: chip.offsetLeft - chips.clientWidth / 2 + chip.clientWidth / 2, behavior: reduzMovimento ? "auto" : "smooth" });

      $("#celularData").textContent = c.data || "";
      $("#celularCap").textContent = `${atual + 1} de ${caps.length}`;
      tela.setAttribute("aria-labelledby", `cap-${atual}`);
      tela.innerHTML = `<p class="celular-titulo">${esc(c.icone || "")} ${esc(c.titulo)}</p>`;
      tela.scrollTop = 0;
      status.textContent = "online";

      pendentes = c.mensagens.map(htmlMsg);
      if (!animar || reduzMovimento) {
        pendentes.forEach((h) => tela.insertAdjacentHTML("beforeend", h));
        pendentes = [];
        fimAnimacao();
        return;
      }

      dica.hidden = false;
      let t = 300;
      const mostrarProxima = () => {
        $(".digitando", tela)?.remove();
        tela.insertAdjacentHTML("beforeend", pendentes.shift());
        status.textContent = "online";
        rolarFim();
      };
      c.mensagens.forEach((m) => {
        if (m.pausa) {
          t += 350;
          timers.push(setTimeout(mostrarProxima, t));
          t += 450;
          return;
        }
        const de = m.de === "eu" ? "eu" : "ela";
        timers.push(setTimeout(() => {
          $(".digitando", tela)?.remove();
          tela.insertAdjacentHTML("beforeend",
            `<div class="msg msg-${de} digitando" aria-hidden="true"><div class="msg-avatar"></div><div class="bolha bolha-${de}"><i></i><i></i><i></i></div></div>`);
          status.textContent = de === "ela" ? "digitando…" : "online";
          rolarFim();
        }, t));
        t += Math.min(1100, 380 + m.texto.length * 7);
        timers.push(setTimeout(mostrarProxima, t));
        t += 180;
      });
      timers.push(setTimeout(fimAnimacao, t));
    }

    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cap]");
      if (b) mostrar(+b.dataset.cap);
    });
    chips.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      mostrar(atual + (e.key === "ArrowRight" ? 1 : -1));
      botoes[atual].focus();
    });
    $("#capAnt").addEventListener("click", () => mostrar(atual - 1));
    $("#capProx").addEventListener("click", () => mostrar(atual + 1));
    tela.addEventListener("click", terminar);

    mostrar(0, false);
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      mostrar(0);
    }, { threshold: 0.4 });
    io.observe(tela);
  }

  /* ================== 8. Frases ================== */
  function iniciarFrases() {
    const f = cfg.frases;
    if (!f) { $("#frases").remove(); return; }
    const grade = $("#gradeFrases");
    const botoes = $$("#frases .alternar button");
    $$("[data-mini]").forEach((el) => { el.innerHTML = el.dataset.mini === "gatinha" ? M.gatinha() : M.lontrinha(); });

    function mostrar(quem) {
      botoes.forEach((b) => {
        const on = b.dataset.quem === quem;
        b.classList.toggle("ativo", on);
        b.setAttribute("aria-selected", String(on));
      });
      grade.innerHTML = (f[quem] || []).map((x, n) => `
        <blockquote class="frase frase-${quem}" style="animation-delay:${Math.min(n, 10) * 0.05}s">
          <p>${esc(x.texto)}</p>
          <cite>${quem === "ela" ? "você" : "eu"}${x.data ? ` · ${esc(x.data)}` : ""}</cite>
        </blockquote>`).join("");
    }
    botoes.forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.quem)));
    mostrar("ela");
  }

  /* ================== 9. Textos ================== */
  function iniciarTextos() {
    const textos = cfg.textos || [];
    if (!textos.length) { $("#textos").remove(); return; }
    const grade = $("#gradeTextos");
    const de = (x) => (x.de === "eu" ? "eu" : "ela");
    // O primeiro ocupa a linha toda; se sobrar um sozinho no fim, ele também
    const largo = (n) => n === 0 || (n === textos.length - 1 && (textos.length - 1) % 2 === 1);
    grade.innerHTML = textos.map((x, n) => `
      <div class="reveal${largo(n) ? " texto-destaque" : ""}" style="transition-delay:${(n % 2) * 0.08}s">
        <button class="texto-card texto-${de(x)}" data-texto="${n}">
          <span class="texto-de">${de(x) === "eu" ? "de mim pra você 🦦" : "de você pra mim 🐱"}</span>
          <span class="texto-titulo">${esc(x.titulo)}</span>
          <span class="texto-trecho">${esc(x.paragrafos.join("\n"))}</span>
          <span class="texto-rodape"><span>${esc(x.data || "")}</span><span class="texto-ler">ler inteirinho →</span></span>
        </button>
      </div>`).join("");

    grade.addEventListener("click", (e) => {
      const card = e.target.closest("[data-texto]");
      if (!card) return;
      const x = textos[+card.dataset.texto];
      abrirModal(`
        <p class="modal-de">${de(x) === "eu" ? "de mim pra você" : "de você pra mim"}${x.data ? ` · ${esc(x.data)}` : ""}</p>
        <h3 id="modalTitulo">${esc(x.titulo)}</h3>
        ${x.paragrafos.map((p) => `<p>${esc(p)}</p>`).join("")}
        ${x.assinatura ? `<p class="assinatura">${esc(x.assinatura)}</p>` : ""}`);
    });
  }

  /* ================== 10. Números ================== */
  function iniciarNumeros() {
    const nums = cfg.numeros || [];
    if (!nums.length) { $("#numeros").remove(); return; }
    const grade = $("#gradeNumeros");
    // Não deixa quebrar a linha no meio de uma palavra entre aspas (“te amo”)
    const juntinho = (s) => s.replace(/“[^”]*”/g, (m) => m.replace(/ /g, "&nbsp;"));
    grade.innerHTML = nums.map((x, n) => `
      <div class="glass numero reveal" data-n="${n}" style="transition-delay:${(n % 3) * 0.08}s">
        ${x.icone ? `<span class="numero-icone" aria-hidden="true">${esc(x.icone)}</span>` : ""}
        <span class="numero-valor" data-alvo="${Number(x.num) || 0}">0</span>
        <span class="numero-rotulo">${juntinho(esc(x.rotulo))}</span>
        ${x.detalhe ? `<span class="numero-detalhe">${juntinho(esc(x.detalhe))}</span>` : ""}
        ${x.foto ? `<button class="botao-print" type="button" data-zoom-src="${esc(x.foto)}"
          data-zoom-alt="${esc(x.legenda || x.rotulo)}">ver o print 📸</button>` : ""}
      </div>`).join("");

    const contar = (el) => {
      const alvo = +el.dataset.alvo;
      if (reduzMovimento) { el.textContent = alvo.toLocaleString("pt-BR"); return; }
      const t0 = performance.now();
      const passo = (t) => {
        const k = Math.min(1, (t - t0) / 1600);
        el.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))).toLocaleString("pt-BR");
        if (k < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    };

    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        contar(en.target);
      });
    }, { threshold: 0.6 });
    $$(".numero-valor", grade).forEach((el) => io.observe(el));
  }

  /* ================== 11. Motivos ================== */
  function iniciarMotivos() {
    const lontra = $("#motivosLontra");
    lontra.innerHTML = M.lontrinha({ concha: true });
    const bilhete = $("#bilhete");
    const texto = $("#bilheteTexto");
    const conta = $("#bilheteConta");
    let fila = [], vistos = 0;

    function proximo() {
      if (fila.length === 0) {
        fila = embaralhar(cfg.motivos);
        if (vistos > 0) {
          vistos = 0;
          mostrar("Acabou a conchinha… mentira, a lontrinha encheu de novo. Os motivos nunca acabam 💜", "");
          return;
        }
      }
      vistos++;
      mostrar(fila.shift(), `motivo ${vistos} de ${cfg.motivos.length}`);
    }

    function mostrar(t, c) {
      texto.textContent = t;
      conta.textContent = c;
      bilhete.classList.remove("trocando");
      lontra.classList.remove("mexendo");
      void bilhete.offsetWidth;
      bilhete.classList.add("trocando");
      lontra.classList.add("mexendo");
    }

    $("#botaoMotivo").addEventListener("click", proximo);
    lontra.addEventListener("click", proximo);
  }

  /* ================== 8. Cartinhas ================== */
  function iniciarCartas() {
    const grade = $("#gradeCartas");
    grade.innerHTML = cfg.cartas.map((c, n) => `
      <div class="reveal" style="transition-delay:${(n % 3) * 0.08}s">
      <button class="envelope" data-carta="${n}">
        <span class="envelope-lido">já lida 💜</span>
        <span class="envelope-icone" aria-hidden="true">${esc(c.icone || "💌")}</span>
        <span class="envelope-selo">${M.pata()}</span>
        <span class="envelope-titulo">${esc(c.titulo)}</span>
      </button>
      </div>`).join("");

    grade.addEventListener("click", (e) => {
      const env = e.target.closest(".envelope");
      if (!env) return;
      const c = cfg.cartas[+env.dataset.carta];
      env.classList.add("aberto");
      setTimeout(() => {
        abrirModal(`
          <h3 id="modalTitulo">${esc(c.titulo)}</h3>
          <p>${esc(c.texto)}</p>
          <p class="assinatura">${esc(cfg.assinatura || "Sua Baianinha 🦦💜")}</p>`);
        env.classList.remove("aberto");
        env.classList.add("lido");
      }, reduzMovimento ? 0 : 550);
    });
  }

  /* ================== 13. Playlist ================== */
  function iniciarPlaylist() {
    // spotify pode ser um link só ou uma lista de links
    const links = [].concat(cfg.spotify || [])
      .map((l) => (typeof l === "string" ? { link: l } : l || {}))
      .map((l) => ({ link: String(l.link || "").trim(), rotulo: l.rotulo || "" }))
      .filter((l) => l.link);
    const musicas = cfg.musicas || [];
    if (!links.length && musicas.length === 0) {
      $('[data-se="playlist"]')?.remove();
      return;
    }
    $("#playlist").hidden = false;

    const embeds = links
      .map((l) => {
        const m = l.link.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(?:embed\/)?(playlist|album|track|artist)\/([A-Za-z0-9]+)/);
        return m && { tipo: m[1], id: m[2], rotulo: l.rotulo };
      })
      .filter(Boolean);
    const box = $("#spotifyBox");
    box.classList.toggle("duas", embeds.length > 1);
    box.innerHTML = embeds.map((m, n) => `
      <div class="playlist-player reveal" style="transition-delay:${n * 0.1}s">
        ${m.rotulo ? `<p class="playlist-rotulo">${esc(m.rotulo)}</p>` : ""}
        <iframe src="https://open.spotify.com/embed/${m.tipo}/${m.id}?utm_source=generator&theme=0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
          title="${esc(m.rotulo || `Nossa playlist no Spotify ${n + 1}`)}"></iframe>
      </div>`).join("");

    $("#listaMusicas").innerHTML = musicas.map((m) => `
      <div class="glass musica reveal">
        <div class="musica-texto">
          <h3>${esc(m.nome)} <span>· ${esc(m.artista || "")}</span></h3>
          ${m.historia ? `<p>${esc(m.historia)}</p>` : ""}
        </div>
        ${/^https:\/\//.test(m.ouvir || "") ? `<a class="musica-ouvir" href="${esc(m.ouvir)}" target="_blank" rel="noopener"
          aria-label="Ouvir ${esc(m.nome)}">▶ ouvir</a>` : ""}
      </div>`).join("");
  }

  /* ================== 14. E continua pra sempre ================== */
  function iniciarPraSempre() {
    const ps = cfg.praSempre;
    if (!ps) { $("#prasempre").remove(); return; }
    $("#praSempreTexto").textContent = ps.texto || "";

    // Primeiro encontro: "em breve" ou contagem regressiva quando tiver data
    const box = $("#encontro");
    const e = ps.encontro;
    box.innerHTML = `
      <div class="encontro-mascotes">${M.casal({ agua: false })}</div>
      <p class="encontro-titulo">Nosso primeiro abraço</p>
      <p class="encontro-quando" id="encontroQuando">em breve 🫂</p>
      <p class="encontro-nota" id="encontroNota">a data entra aqui assim que a gente marcar</p>`;
    if (e) {
      const alvo = new Date(e.ano, e.mes - 1, e.dia, e.hora || 0, e.minuto || 0);
      const pad = (n) => String(n).padStart(2, "0");
      $("#encontroNota").textContent = `${pad(e.dia)}/${pad(e.mes)}/${e.ano}`;
      const el = $("#encontroQuando");
      const tick = () => {
        const diff = alvo - Date.now();
        if (diff <= 0) { el.textContent = "já aconteceu, e foi o melhor dia 💜"; return; }
        const s = Math.floor(diff / 1000);
        const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
        el.textContent = `faltam ${d} ${d === 1 ? "dia" : "dias"}, ${h}h e ${m}min`;
        setTimeout(tick, 30000);
      };
      tick();
    }

    const giros = [-3, 2, -1.5, 3, -2, 1.5];
    $("#molduras").innerHTML = (ps.fotosJuntas || []).map((f, n) => `
      <div class="reveal" style="transition-delay:${(n % 3) * 0.08}s">
        <figure class="polaroid moldura${f.src ? " tem-foto" : ""}" style="--giro:${giros[n % giros.length]}deg">
          ${f.src
            ? `<img src="${esc(f.src)}" alt="${esc(f.legenda || "Foto nossa")}" loading="lazy" data-zoom>`
            : `<div class="moldura-vazia">${n % 2 ? M.lontrinha() : M.gatinha()}<span>em breve</span></div>`}
          <figcaption>${esc(f.legenda || "")}</figcaption>
        </figure>
      </div>`).join("");

    $("#listaSonhos").innerHTML = (ps.sonhos || []).map((s, n) => `
      <li class="glass reveal" style="transition-delay:${(n % 3) * 0.06}s">
        <span class="sonho-icone" aria-hidden="true">${esc(s.icone || "💜")}</span>${esc(s.texto)}
      </li>`).join("");
  }

  /* ================== Menu e zoom das fotos ================== */
  function iniciarMenu() {
    const botao = $("#menuBotao");
    const lista = $("#menuLista");
    const abrir = (sim) => {
      lista.hidden = !sim;
      botao.setAttribute("aria-expanded", String(sim));
      botao.setAttribute("aria-label", sim ? "Fechar menu" : "Abrir menu");
    };
    botao.addEventListener("click", () => abrir(lista.hidden));

    // O botão só aparece depois da abertura, pra não cobrir a lontrinha
    const menu = $("#menu");
    const mostrarBotao = () => {
      const longe = window.scrollY > window.innerHeight * 0.6;
      menu.classList.toggle("visivel", longe);
      if (!longe) abrir(false);
    };
    window.addEventListener("scroll", mostrarBotao, { passive: true });
    mostrarBotao();
    lista.addEventListener("click", (e) => { if (e.target.closest("a")) abrir(false); });
    document.addEventListener("click", (e) => { if (!e.target.closest("#menu")) abrir(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lista.hidden) { abrir(false); botao.focus(); }
    });

    // Tira do menu as seções que não existem (ou estão escondidas)
    $$("a", lista).forEach((a) => {
      const alvo = $(a.getAttribute("href"));
      if (!alvo || alvo.hidden) a.parentElement.remove();
    });

    // Marca a seção que está na tela
    const links = new Map($$("a", lista).map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove("atual"));
        links.get(en.target.id)?.classList.add("atual");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((_, id) => io.observe(document.getElementById(id)));

    // Fotos com data-zoom (ou botões com data-zoom-src) abrem grandonas
    document.addEventListener("click", (e) => {
      const alvo = e.target.closest("img[data-zoom], [data-zoom-src]");
      if (!alvo) return;
      const src = alvo.dataset.zoomSrc || alvo.getAttribute("src");
      const alt = alvo.dataset.zoomAlt || alvo.alt || "";
      abrirModal(`<img class="modal-foto" src="${esc(src)}" alt="${esc(alt)}">
        ${alt ? `<p class="modal-legenda" id="modalTitulo">${esc(alt)}</p>` : ""}`);
    });
  }

  /* ================== 15. Carta final ================== */
  function iniciarCarta() {
    const c = cfg.cartaFinal;
    $("#cartaSaudacao").textContent = c.saudacao;
    $("#cartaAssinatura").textContent = c.assinatura;
    $("#cartaParagrafos").innerHTML = c.paragrafos.map((p) => `<p class="carta-par">${esc(p)}</p>`).join("");

    const pars = $$(".carta-par");
    const assinatura = $("#cartaAssinatura");
    const intervalo = reduzMovimento ? 0 : 1100;

    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      pars.forEach((p, n) => setTimeout(() => p.classList.add("visivel"), n * intervalo));
      setTimeout(() => assinatura.classList.add("visivel"), pars.length * intervalo + 300);
    }, { threshold: 0.2 });
    io.observe($("#cartaFinal"));
  }

  /* ================== 11. Segredo ================== */
  function chuva(qtd = 40, itens = ["💜", M.pata()]) {
    if (reduzMovimento) return;
    for (let i = 0; i < qtd; i++) {
      const el = document.createElement("span");
      el.className = "chuva-item";
      const tam = 16 + Math.random() * 20;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.width = el.style.height = `${tam}px`;
      el.style.fontSize = `${tam}px`;
      el.style.setProperty("--giro", `${(Math.random() - 0.5) * 720}deg`);
      el.style.animationDuration = `${2.8 + Math.random() * 2.5}s`;
      el.style.animationDelay = `${Math.random() * 1.2}s`;
      el.style.color = ["#c77dff", "#e0aaff", "#f3c4fb", "#9d4edd"][i % 4];
      el.innerHTML = itens[i % itens.length];
      el.style.lineHeight = "1";
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }
  }

  function desfile() {
    if (reduzMovimento) return;
    const palco = $("#desfile");
    [M.lontrinha(), M.gatinha(), M.kitsune({ fogos: false })].forEach((svg, n) => {
      const el = document.createElement("div");
      el.className = "desfilante";
      el.style.animationDelay = `${n * 0.45}s`;
      el.innerHTML = svg;
      palco.appendChild(el);
      el.addEventListener("animationend", (e) => { if (e.target === el) el.remove(); });
    });
  }

  function iniciarSegredo() {
    const botao = $("#pataSecreta");
    botao.innerHTML = M.pata();
    botao.addEventListener("click", () => {
      chuva(50);
      desfile();
      setTimeout(() => {
        abrirModal(`
          <div class="modal-mascotes">${M.casal({ agua: false })}</div>
          <h3 id="modalTitulo">${esc(cfg.segredo.titulo)}</h3>
          <p>${esc(cfg.segredo.texto)}</p>
          <p class="assinatura">${esc(cfg.assinatura || "Sua Baianinha 🦦💜")}</p>`);
        acharSegredo("pata");
      }, reduzMovimento ? 0 : 900);
    });
  }

  /* ================== 12. Mais segredos escondidos ================== */
  const sg = cfg.segredos || {};
  const assinado = () => `<p class="assinatura">${esc(cfg.assinatura || "Sua Baianinha 🦦💜")}</p>`;
  const guardado = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sem storage, tudo bem */ } },
  };
  // A patinha sempre conta; os outros só se tiverem bloco no config
  const idsSegredos = ["pata", "fome", "caudas", "contador", "lontra", "placar"].filter((id) => id === "pata" || sg[id]);
  const nomeSegredo = (id) => (sg[id] && sg[id].nome) || "A patinha secreta";

  function achados() {
    try {
      const lista = JSON.parse(guardado.get("manu-segredos") || "[]");
      return Array.isArray(lista) ? lista.filter((id) => idsSegredos.includes(id)) : [];
    } catch { return []; }
  }

  function atualizarDica() {
    const el = $("#rodapeSegredos");
    if (!el || !sg.dica) return el?.remove();
    el.innerHTML = `${esc(sg.dica)}<br><b>${achados().length} de ${idsSegredos.length} achados</b>`;
  }

  // Avisinho que sobe do rodapé e some sozinho
  function aviso(texto, ms = 4200) {
    const el = document.createElement("div");
    el.className = "aviso";
    el.setAttribute("role", "status");
    el.textContent = texto;
    el.style.bottom = `${84 + $$(".aviso").length * 58}px`;
    el.style.setProperty("--dura", `${ms}ms`);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms + 200);
  }

  function acharSegredo(id) {
    const lista = achados();
    if (lista.includes(id)) return;
    lista.push(id);
    guardado.set("manu-segredos", JSON.stringify(lista));
    atualizarDica();
    aviso(`🔍 Segredo ${lista.length} de ${idsSegredos.length}: ${nomeSegredo(id)}`);
    if (lista.length < idsSegredos.length || !sg.todos) return;
    const festa = () => {
      chuva(60, ["💜", M.pata(), "🏆", "🍕"]);
      setTimeout(() => abrirModal(`
        <div class="modal-mascotes">${M.casal({ agua: false })}</div>
        <h3 id="modalTitulo">${esc(sg.todos.titulo)}</h3>
        <p>${esc(sg.todos.texto)}</p>${assinado()}`), reduzMovimento ? 0 : 900);
    };
    if (modal.hidden) setTimeout(festa, 2200);
    else aoFechar = festa;
  }

  // Conta toques seguidos (no máximo 2 s entre um e outro)
  function toques(el, quantos, aoCompletar, aoTocar) {
    if (!el) return;
    el.dataset.toque = "";
    let n = 0, ultimo = 0;
    el.addEventListener("click", (e) => {
      const agora = Date.now();
      n = agora - ultimo > 2000 ? 1 : n + 1;
      ultimo = agora;
      if (n >= quantos) { n = 0; aoCompletar(e); } else if (aoTocar) aoTocar(n, e);
    });
  }

  // Textinho que pula de onde a pessoa tocou
  function pipoca(e, texto) {
    const el = document.createElement("span");
    el.className = "pipoca";
    el.textContent = texto;
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  const animar = (el, classe) => {
    if (!el) return;
    el.classList.remove(classe);
    void el.offsetWidth;
    el.classList.add(classe);
  };

  /* --- A Gatinha faminta: 3 mordidas no bolo do adesivo --- */
  function segredoFome() {
    const f = sg.fome;
    const arte = $('.adesivo[data-arte="bolos"] .adesivo-arte');
    if (!f || !arte) return;
    const tamanhos = [1, 0.7, 0.4];
    let volta;
    const regenerar = (ms) => { clearTimeout(volta); volta = setTimeout(() => arte.style.removeProperty("--mordida"), ms); };
    toques(arte, 3, (e) => {
      pipoca(e, "nhac!");
      arte.style.setProperty("--mordida", 0);
      setTimeout(() => {
        abrirFome();
        acharSegredo("fome");
        regenerar(1200);
      }, reduzMovimento ? 0 : 600);
    }, (n, e) => {
      pipoca(e, "nhac!");
      arte.style.setProperty("--mordida", tamanhos[n]);
      regenerar(2600);
    });
  }

  // A comidinha voa do botão até a boca da Gatinha
  function voar(icone, de, para, pronto) {
    if (reduzMovimento || !Element.prototype.animate) return pronto();
    const a = de.getBoundingClientRect(), b = para.getBoundingClientRect();
    const x0 = a.left + a.width / 2, y0 = a.top + a.height / 2;
    const dx = b.left + b.width / 2 - x0, dy = b.top + b.height * 0.6 - y0;
    const el = document.createElement("span");
    el.className = "fome-voando";
    el.textContent = icone;
    el.style.left = `${x0}px`;
    el.style.top = `${y0}px`;
    document.body.appendChild(el);
    let chegou = false;
    const chegar = () => {
      if (chegou) return;
      chegou = true;
      el.remove();
      pronto();
    };
    el.animate([
      { transform: "translate(-50%, -50%) scale(1)" },
      { transform: `translate(calc(-50% + ${dx / 2}px), calc(-50% + ${dy / 2 - 70}px)) scale(1.25)`, offset: 0.5 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.3)`, opacity: 0.3 },
    ], { duration: 560, easing: "ease-in" }).onfinish = chegar;
    setTimeout(chegar, 800); // se a animação travar (aba em segundo plano), a comida chega mesmo assim
  }

  function abrirFome() {
    const f = sg.fome;
    abrirModal(`
      <div class="fome">
        <div class="fome-palco">
          <div class="fome-gata">${M.gatinha()}</div>
          <div class="fome-balao" id="fomeBalao">${esc(f.pedido)}</div>
        </div>
        <h3 id="modalTitulo">${esc(f.titulo)}</h3>
        <p>${esc(f.texto)}</p>
        <div class="fome-barriga"><span>barriguinha</span><div class="fome-barra"><i id="fomeNivel"></i></div><b id="fomePct">0%</b></div>
        <div class="fome-comidas">${f.comidas.map((c, i) => `
          <button type="button" class="fome-comida" data-i="${i}"><span aria-hidden="true">${esc(c.icone)}</span>${esc(c.nome)}</button>`).join("")}
        </div>
        <p class="fome-placar" id="fomePlacar" aria-live="polite"></p>
        <div class="fome-provas" id="fomeProvas" hidden>
          <h4>${esc(f.provasTitulo)}</h4>
          <div class="bolhas">${f.provas.map((m) => (m.pausa ? pausa(m) : bolha(m))).join("")}</div>
          <p class="fome-fim">${esc(f.fim)}</p>
          ${assinado()}
        </div>
      </div>`);

    const caixa = $("#modalConteudo");
    const gata = $(".fome-gata", caixa), balao = $("#fomeBalao"), placar = $("#fomePlacar");
    const botoes = $$(".fome-comida", caixa);
    let nivel = 0, pratos = 0, vezes = 0, cheia = false;

    const mostrarNivel = () => {
      $("#fomeNivel").style.width = `${Math.min(100, nivel)}%`;
      $("#fomePct").textContent = `${Math.min(100, nivel)}%`;
    };
    const falar = (t) => { balao.textContent = t; animar(balao, "pulinho"); };
    const contarPlacar = () => {
      placar.textContent = `${pratos} ${pratos === 1 ? "prato servido" : "pratos servidos"}` +
        (vezes ? ` · ficou com fome de novo ${vezes} ${vezes === 1 ? "vez" : "vezes"}` : "");
    };

    botoes.forEach((b) => b.addEventListener("click", () => {
      if (cheia) return;
      const c = f.comidas[+b.dataset.i];
      voar(c.icone, b, gata, () => {
        if (cheia || modal.hidden) return;
        pratos++;
        nivel += Number(c.enche) || 25;
        mostrarNivel();
        contarPlacar();
        animar(gata, "mastigando");
        if (nivel < 100) return falar(f.reacoes[(pratos - 1) % f.reacoes.length]);

        // Encheu a barriguinha… por uns dois segundos
        cheia = true;
        falar(f.cheia);
        gata.classList.add("cheia");
        botoes.forEach((x) => { x.disabled = true; });
        setTimeout(() => {
          cheia = false;
          nivel = 0;
          vezes++;
          gata.classList.remove("cheia");
          mostrarNivel();
          contarPlacar();
          falar(f.deNovo);
          botoes.forEach((x) => { x.disabled = false; });
          $("#fomeProvas").hidden = false;
        }, 2000);
      });
    }));
  }

  /* --- As nove caudas: 9 toques numa kitsune do canto --- */
  function segredoCaudas() {
    const c = sg.caudas;
    if (!c) return;
    $$(".decor-kitsune").forEach((dec) => {
      const desenho = $(".mascote", dec);
      toques(dec, 9, (e) => {
        pipoca(e, "9/9 ✨");
        chuva(44, [M.fogo(), "💜", M.fogo(), "🦊"]);
        setTimeout(() => {
          abrirModal(`
            <div class="modal-mascotes modal-kitsune">${M.kitsune()}</div>
            <h3 id="modalTitulo">${esc(c.titulo)}</h3>
            <p>${esc(c.texto)}</p>${assinado()}`);
          acharSegredo("caudas");
        }, reduzMovimento ? 0 : 900);
      }, (n, e) => {
        animar(desenho, "pulinho");
        if (n >= 2) pipoca(e, `${n}/9 🦊`);
      });
    });
  }

  /* --- O contador secreto: 5 toques no contador --- */
  function segredoContador() {
    const c = sg.contador;
    const alvo = $(".contador");
    if (!c || !alvo) return;
    const i = cfg.inicioNamoro;
    const inicio = new Date(i.ano, i.mes - 1, i.dia, i.hora || 0, i.minuto || 0, 0).getTime();
    toques(alvo, 5, () => {
      abrirModal(`
        <h3 id="modalTitulo">${esc(c.titulo)}</h3>
        <p>${esc(c.texto)}</p>
        <div class="segredo-lista">${c.itens.map((x, k) => `
          <div><strong data-k="${k}">${esc(x.fixo || "0")}</strong><span>${esc(x.rotulo)}</span></div>`).join("")}
        </div>${assinado()}`);
      const numeros = $$("#modalConteudo .segredo-lista strong").filter((el) => !c.itens[+el.dataset.k].fixo);
      const relogio = setInterval(() => {
        if (modal.hidden) return clearInterval(relogio);
        const seg = Math.max(0, (Date.now() - inicio) / 1000);
        numeros.forEach((el) => {
          el.textContent = Math.floor(seg * c.itens[+el.dataset.k].porSegundo).toLocaleString("pt-BR");
        });
      }, 250);
      acharSegredo("contador");
    }, (n) => { if (n >= 3) animar(alvo, "pulinho"); });
  }

  /* --- A pedrinha da lontra: 3 toques na lontrinha da abertura --- */
  function segredoLontra() {
    const l = sg.lontra;
    const el = $("#heroLontra");
    if (!l || !el) return;
    toques(el, 3, (e) => {
      pipoca(e, "🪨💜");
      setTimeout(() => {
        abrirModal(`
          <div class="modal-mascotes modal-lontra">${M.lontrinha()}</div>
          <h3 id="modalTitulo">${esc(l.titulo)}</h3>
          <p>${esc(l.texto)}</p>${assinado()}`);
        acharSegredo("lontra");
      }, reduzMovimento ? 0 : 500);
    }, (n, e) => {
      animar($(".mascote", el), "pulinho");
      pipoca(e, "🫧");
    });
  }

  /* --- O placar do te amo: 3 toques no card do “te amo” --- */
  function segredoPlacar() {
    const p = sg.placar;
    const n = (cfg.numeros || []).findIndex((x) => /te amo/i.test(x.rotulo));
    const card = p && n >= 0 && $(`.numero[data-n="${n}"]`);
    if (!card) return;
    const valor = $(".numero-valor", card), detalhe = $(".numero-detalhe", card);
    const base = Number(cfg.numeros[n].num) || 0;
    let feito = false;
    toques(card, 3, (e) => {
      pipoca(e, "💜");
      if (feito) return;
      feito = true;
      chuva(24);
      const extra = p.para - p.de, t0 = performance.now(), dura = reduzMovimento ? 0 : 1800;
      const passo = (t) => {
        const k = dura ? Math.min(1, (t - t0) / dura) : 1;
        const soma = Math.round(extra * k);
        valor.textContent = (base + soma).toLocaleString("pt-BR");
        if (detalhe) detalhe.textContent = `${p.suas} suas, ${p.de + soma} minhas…`;
        if (k < 1) return requestAnimationFrame(passo);
        if (detalhe) detalhe.textContent = p.texto;
        acharSegredo("placar");
      };
      requestAnimationFrame(passo);
    }, (k, e) => pipoca(e, "💜"));
  }

  function iniciarSegredos() {
    segredoFome();
    segredoCaudas();
    segredoContador();
    segredoLontra();
    segredoPlacar();
    atualizarDica();
  }

  /* --- Surpresas que aparecem sozinhas (depois da senha) --- */
  function surpresas() {
    const hoje = new Date();
    const i = cfg.inicioNamoro;

    // Todo dia 29 tem mesversário (e no dia certinho, aniversário de namoro)
    if (sg.mesversario && hoje.getDate() === i.dia) {
      const meses = (hoje.getFullYear() - i.ano) * 12 + (hoje.getMonth() - (i.mes - 1));
      if (meses >= 1) {
        const anos = meses / 12;
        const quanto = meses % 12 === 0 ? `${anos} ${anos === 1 ? "ano" : "anos"}` : `${meses} ${meses === 1 ? "mês" : "meses"}`;
        const texto = (meses % 12 === 0 && sg.aniversario) || sg.mesversario;
        setTimeout(() => { chuva(50); aviso(texto.replace("{n}", quanto), 8000); }, 1500);
      }
    }

    // A hora do primeiro “Oiee”
    const h = sg.hora;
    if (h) {
      const checar = () => {
        const d = new Date();
        const chave = `manu-hora-${d.toDateString()}`;
        if (d.getHours() !== h.hora || d.getMinutes() !== h.minuto || sessao.get(chave) === "1") return;
        sessao.set(chave, "1");
        chuva(30);
        aviso(h.texto, 8000);
      };
      checar();
      setInterval(checar, 20000);
    }

    // “teamo” digitado em qualquer lugar, no computador
    if (sg.teamo) {
      let ultimas = "";
      document.addEventListener("keydown", (e) => {
        if (e.target.closest("input, textarea") || e.key.length !== 1) return;
        ultimas = (ultimas + e.key.toLowerCase()).slice(-5);
        if (ultimas !== "teamo") return;
        ultimas = "";
        chuva(40);
        aviso(sg.teamo);
      });
    }
  }

  /* ================== Início ================== */
  iniciarFundo();
  iniciarHero();
  iniciarCasal();
  iniciarSuaCara();
  iniciarDecoracoes();
  iniciarContador();
  iniciarAlbum();
  iniciarLinha();
  iniciarConversas();
  iniciarFrases();
  iniciarTextos();
  iniciarNumeros();
  iniciarMotivos();
  iniciarCartas();
  iniciarPlaylist();
  iniciarPraSempre();
  iniciarCarta();
  iniciarSegredo();
  iniciarSegredos();
  iniciarMenu();
  iniciarProgresso();

  iniciarCadeado(() => {
    document.body.classList.remove("travado");
    iniciarReveal();
    surpresas();
  });
})();
