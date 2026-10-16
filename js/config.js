/* =========================================================
   CONFIG DO SITE 💜
   Tudo que aparece escrito no site está aqui.
   Pode editar à vontade, só cuidado pra manter as aspas,
   vírgulas e colchetes no lugar.

   Tudo que aparece como mensagem ou frase de vocês foi
   conferido com a conversa exportada (Você = Anna, Minha
   Princesa = Manu), com a data e a hora de verdade.
   ========================================================= */

window.CONFIG = {
  nome: "Manu",

  // Começo do namoro: ano, mês (1-12), dia, hora, minuto
  inicioNamoro: { ano: 2026, mes: 9, dia: 29, hora: 0, minuto: 0 },

  // A primeira mensagem (07/06/2026, 22:10 no Discord)
  primeiraMensagem: { ano: 2026, mes: 6, dia: 7, hora: 22, minuto: 10 },

  // Nosso recorde de call (print do servidor angels, no Quarto da Angel Manu: 375:25:39)
  recordeCall: {
    horas: 375,
    print: "img/momentos/servidor-angels.jpg",
    legenda: "Quarto da Angel Manu, no angels: 375:25:39 de call 💜",
  },

  // Tela de entrada. A resposta compara só os números, então
  // "29/09/26", "29 09 26", "290926" e "29/09/2026" funcionam.
  senha: {
    saudacao: "Oi, Princesa",
    pergunta: "Qual é a nossa data de namoro?",
    dica: "dd/mm/aa",
    respostas: ["290926", "29092026"],
    erros: [
      "Quase, amor… tenta de novo 💜",
      "Hmm, não foi essa… pensa na nossa data 🐾",
      "A Baianinha tá torcendo por você, tenta mais uma 🦦",
      "Dica: foi o dia em que a gente virou namoradas 💜",
    ],
  },

  hero: {
    // Esses apelidos ficam se escrevendo um depois do outro na abertura
    apelidos: [
      "minha Princesa",
      "minha Gatinha",
      "minha Manuzinha Croft",
      "minha princesinha escarlate",
      "minha deusa grega",
      "o amor da minha vida",
    ],
    assinatura: "com todo amor da sua Baianinha",
    frase: "Fiz esse cantinho só pra você. Role devagar: cada pedacinho daqui foi pensado em você.",
  },

  // Seção "A Gatinha & a Lontrinha"
  casal: {
    texto:
      "Sabia que as lontras dormem de mãos dadas pra correnteza não separar uma da outra? " +
      "É assim que eu quero ficar com você: segurando firme, boiando juntinhas, " +
      "não importa a maré. A Princesa e a Baianinha, a Gatinha e a Lontrinha, sempre juntas.",
    // Trechinho do zap (12/10, de madrugada)
    origem: {
      data: "12/10",
      mensagens: [
        { de: "ela", hora: "02:42", texto: "Amr, vc veio dos macaco" },
        { de: "eu", hora: "02:42", texto: "Eu vim das lontras" },
        { de: "eu", hora: "02:42", texto: "Não dos macacos" },
        { pausa: "…" },
        { de: "eu", hora: "02:52", texto: "Eu sou claramente uma lontra branca" },
        { de: "ela", hora: "02:53", texto: "Eu sou uma gata" },
        { de: "eu", hora: "02:53", texto: "É uma gata msm" },
        { de: "ela", hora: "02:57", texto: "Miu miu miu miu" },
      ],
    },
    gatinha: [
      "Mia “miu miu miu miu” e derrete meu coração",
      "Jura que a minha gata brava não vai enfiar a unha nela, porque ela é “diferente”",
      "Princesa, deusa grega e princesinha escarlate (66 kills de Wanda!)",
      "Joga ranqueada na minha conta pra gente jogar juntas",
      "Prometeu me lembrar de tomar meu remédio",
    ],
    lontrinha: [
      "Veio das lontras, não dos macacos (é sério)",
      "É a Baianinha da Princesa, com muito orgulho",
      "Nunca solta a mão da Gatinha, nem na correnteza",
      "Dorme mal sem você e melhor em call com você",
      "Lontras guardam a pedrinha favorita no bolso. A minha é você",
    ],
    desenho: {
      src: "img/momentos/desenho.jpg",
      legenda: "a Lontrinha e a Gatinha no ônibus de batalha 🎈",
    },
  },

  /* COISAS QUE SÃO A SUA CARA
     Adesivos com desenhinhos. arte: kitsune, croft, escarlate, hazbin, terror, bolos, gata ou jogar */
  suaCara: [
    { arte: "kitsune", titulo: "A kitsune roxa", texto: "Ahri, a raposa de nove caudas. Era o seu nome no Discord quando você me mandou aquele primeiro “Oiee”." },
    { arte: "croft", titulo: "Manuzinha Croft", texto: "Você queria assistir “o negócio da Lara” comigo. Minha exploradora favorita." },
    { arte: "escarlate", titulo: "Princesinha escarlate", texto: "66 kills de Wanda no Marvel. É a melhor Wanda, né?" },
    { arte: "hazbin", titulo: "Hazbin Hotel", texto: "“Voy morre”: foi assim que você me contou que Hazbin Hotel tinha chegado no Fortnite." },
    { arte: "terror", titulo: "Noite de terror", texto: "Carrie, a Estranha, que você quis ver comigo, e It, a Coisa, que eu quero ver com você." },
    { arte: "bolos", titulo: "Chocolate e laranja", texto: "Os bolos que você ajudou sua mãe a fazer. Um dia eu provo os dois." },
    { arte: "gata", titulo: "A sua gata", texto: "“Tô esperando a gata querer terminar de comer.” Cuida bem dela por mim." },
    { arte: "jogar", titulo: "Jogar juntas", texto: "“Eu amo jogar com vc.” Marvel, Fortnite, o que for, desde que seja com você." },
  ],

  /* ÁLBUM
     { src: "img/manu/arquivo.jpg", frase: "frase que aparece na foto" } */
  fotos: [
    { src: "img/manu/manu-01.jpg", frase: "Minha Princesa, linda de qualquer jeito." },
    { src: "img/manu/manu-02.jpg", frase: "Até de óculos de filtro você é a coisa mais fofa do mundo." },
    { src: "img/manu/manu-03.jpg", frase: "Esse olhar me ganha toda vez." },
    { src: "img/manu/manu-04.jpg", frase: "Minha Gatinha, do jeitinho que eu amo." },
    { src: "img/manu/manu-05.jpg", frase: "Se eu pudesse te dar a lua, eu te daria." },
    { src: "img/manu/manu-06.jpg", frase: "Minha Manuzinha Croft, minha deusa grega." },
    { src: "img/manu/manu-07.jpg", frase: "Queria que você pudesse se ver como eu te vejo." },
    { src: "img/manu/manu-08.jpg", frase: "Vc é tão perfeita." },
    { src: "img/manu/manu-09.jpg", frase: "Minha princesinha escarlate." },
    { src: "img/manu/manu-10.jpg", frase: "Até espiando você me deixa boba. 💜" },
  ],

  // Frases usadas se a lista de fotos ficar vazia
  frasesExemplo: [
    "Cada foto nossa é um pedacinho do meu lugar favorito no mundo.",
    "A Gatinha e a Lontrinha, sempre juntinhas.",
  ],

  /* LINHA DO TEMPO
     foto é opcional: foto: "img/arquivo.jpg" */
  linhaDoTempo: [
    {
      data: "07/06/2026",
      titulo: "Oiee",
      texto:
        "Eu te mandei uma figurinha às 22:10 e um GIF às 22:21. " +
        "Você respondeu “Oiee” às 23:03, com um coraçãozinho. Valeu cada minuto de espera.",
      foto: "img/momentos/primeira-mensagem.jpg",
    },
    {
      data: "no Mimimi",
      titulo: "A call que não acabava nunca",
      texto:
        "No nosso servidor antigo, a call ficou 38 horas e 35 minutos ligada. Foi só o primeiro recorde. " +
        "E “mimimi” é o seu jeitinho de dizer que tá na hora de dormir.",
      foto: "img/momentos/servidor-mimimi.jpg",
    },
    {
      data: "29/09/2026",
      titulo: "O dia em que viramos namoradas 💜",
      texto: "O dia em que a Princesa e a Baianinha deram as mãos pra não soltar mais.",
    },
    {
      data: "30/09/2026",
      titulo: "Pra vida e até depois dela",
      texto: "No nosso primeiro dia no zap eu já te disse: “Eu quero vc pra vida e até depois dela se tiver. Pra sempre.”",
    },
    {
      data: "01/10/2026",
      titulo: "A lua e o final do ano",
      texto:
        "De manhã eu te disse que, se pudesse, te dava a lua. " +
        "De tarde te contei que a única coisa que eu fico pensando é no nosso futuro, e que eu queria ir te visitar no final do ano.",
    },
    {
      data: "02/10/2026",
      titulo: "Porto seguro",
      texto:
        "Eu te disse que queria ser o seu porto seguro, assim como você é o meu. " +
        "Aí você me contou que tinha medo de parecer grudenta demais, e eu te respondi que não ia embora, " +
        "que nunca ia te abandonar, e que eu amo quando você é grudenta comigo.",
    },
    {
      data: "03/10/2026",
      titulo: "A gente se molha juntas",
      texto: "Te prometi uma coisa: se você estiver na tempestade, a gente se molha juntas. Continua valendo pra sempre.",
    },
    {
      data: "04/10/2026",
      titulo: "“Mais é pra sempre”",
      texto:
        "Você me mandou uma mensagem linda de manhã, achando que eu tava dormindo. " +
        "Eu disse que só queria que fosse pra sempre, e você respondeu do seu jeitinho: “Mais é pra sempre”.",
    },
    {
      data: "05/10/2026",
      titulo: "A Gatinha e a Lontrinha no ônibus de batalha",
      texto: "Te mandei esse desenho: as duas em cima do ônibus do Fortnite, com balão, coraçõezinhos e patinhas.",
      foto: "img/momentos/desenho.jpg",
    },
    {
      data: "06/10/2026",
      titulo: "Sonhos multiplayer",
      texto: "“Boa noite minha princesa. Vamos nos encontrar nos sonhos multiplayer.” “Vms moh.”",
    },
    {
      data: "07/10/2026",
      titulo: "O dia em que a gente escolheu ficar",
      texto: "Nem todo dia é fácil. Mas no fim desse a gente conversou na call e escolheu ficar, e eu escolheria de novo, todas as vezes.",
    },
    {
      data: "10/10/2026",
      titulo: "O presente",
      texto:
        "Você quis me dar um presente e disse que era a primeira vez que fazia isso por alguém, de coração. " +
        "Nesse mesmo dia você me mandou um “te amooo” com 11.470 letras “o”.",
    },
    {
      data: "11/10/2026",
      titulo: "“Vm mora juntas”",
      texto:
        "Você pediu hambúrguer, eu também ia comer hambúrguer, e você disse: “A gente tem uma conexão tão grande”. " +
        "Mais tarde você sugeriu a gente morar num carrocasa.",
    },
    {
      data: "12/10/2026",
      titulo: "Eu vim das lontras",
      texto: "Você disse que eu vim dos macacos. Eu jurei que vim das lontras. Aí você avisou: “Eu sou uma gata”. Miu miu miu miu.",
    },
    {
      data: "15/10/2026",
      titulo: "Para minha Anna, meu amor",
      texto: "Você me escreveu a carta mais linda que eu já recebi. Ela tá guardada aqui embaixo, em “Textos que a gente trocou”.",
    },
    {
      data: "no Fortnite",
      titulo: "AnnalovsManu",
      texto:
        "Foi você que me mandou esse nick no zap, todo enfeitadinho, de quatro jeitos diferentes. " +
        "Agora ele tá lá no jogo pra todo mundo ver: a Anna ama a Manu.",
      foto: "img/momentos/annalovsmanu.jpg",
    },
    {
      data: "no angels",
      titulo: "Quarto da Angel Manu",
      texto:
        "No nosso servidor de agora, a call do Quarto da Angel Manu tava em 375:25:39 quando eu tirei esse print. " +
        "Mais de 15 dias com a call ligada: eu, você e a Lofi Radio. Aquelas 38 horas do Mimimi viraram aquecimento.",
      foto: "img/momentos/servidor-angels.jpg",
    },
    {
      data: "hoje",
      titulo: "E continua…",
      texto: "Esse é só o comecinho. O melhor capítulo ainda tá por vir: o do nosso primeiro abraço.",
    },
  ],

  /* NOSSAS CONVERSAS
     Cada capítulo vira uma aba com balõezinhos de mensagem, palavra por palavra.
     de: "ela" (Manu, lado esquerdo) ou "eu" (Anna, lado direito)
     hora: o horário da mensagem · { pausa: "texto" } separa trechos do mesmo dia */
  conversas: [
    {
      titulo: "Porto seguro",
      icone: "⚓",
      data: "02/10/2026",
      mensagens: [
        { de: "eu", hora: "12:28", texto: "Eu quero ser um Porto Seguro seu" },
        { de: "eu", hora: "12:28", texto: "Assim como vc é pra mim" },
        { de: "eu", hora: "12:28", texto: "Eu só tô sendo eu mesma com vc" },
        { de: "eu", hora: "12:29", texto: "E me abrindo completamente" },
        { de: "eu", hora: "12:30", texto: "Eu tenho medo de te perder" },
        { de: "ela", hora: "12:31", texto: "Eu tenho um certo trauma de parecer muito grudenta ou fofa demais, porque tenho medo de perder vc acabar indo embora por causa disso. Às vezes eu fico com receio de demonstrar demais o que sinto" },
        { de: "eu", hora: "12:32", texto: "Tá tudo bem amor" },
        { de: "eu", hora: "12:32", texto: "Eu não vou embora" },
        { de: "eu", hora: "12:32", texto: "E nunca vou te abandonar" },
        { de: "eu", hora: "12:33", texto: "E até pelo contrário, eu amo mt quando vc é grudenta cmg e fofa" },
        { de: "eu", hora: "12:33", texto: "Pode demonstrar a vontade" },
        { de: "eu", hora: "12:33", texto: "Eu sou mt grudenta tbm" },
        { de: "eu", hora: "12:33", texto: "Por mim eu viveria colada em vc" },
        { de: "eu", hora: "12:34", texto: "Eu quero te deixar segura e confortável" },
        { de: "eu", hora: "12:34", texto: "Assim como eu me sinto com vc" },
        { de: "ela", hora: "12:35", texto: "Sabia q eu te amooooooooooooooooooooooooooooooooo" },
        { de: "ela", hora: "12:35", texto: "Muito" },
        { de: "eu", hora: "12:36", texto: "Tão fofinhaaaaaa" },
        { de: "eu", hora: "12:36", texto: "Vontade de apertar essas suas bochechas" },
        { de: "eu", hora: "12:36", texto: "E te encher de beijo" },
      ],
    },
    {
      titulo: "Alma gêmea",
      icone: "🔗",
      data: "02/10/2026",
      mensagens: [
        { de: "ela", hora: "19:34", texto: "Eu te amo" },
        { de: "ela", hora: "19:34", texto: "Vc é o meu amor" },
        { de: "ela", hora: "19:35", texto: "Tudo pra mim" },
        { pausa: "um pouquinho depois" },
        { de: "eu", hora: "19:49", texto: "Eu te amo mais do q tudo" },
        { de: "eu", hora: "19:50", texto: "Eu nunca senti uma conexão tão grande com alguém antes, eu só tenho mais crtz a cada dia mais q vc é minha alma gemea" },
        { de: "ela", hora: "19:52", texto: "Entendo amr" },
        { de: "eu", hora: "19:52", texto: "E eu tenho crtz q é vc q eu quero pra minha vida inteira" },
        { de: "ela", hora: "19:53", texto: "Eu também amr" },
        { pausa: "…" },
        { de: "eu", hora: "19:55", texto: "Vc tem realmente crtz? só não quero q vc minta pra mim por pena ou algo do tipo" },
        { de: "ela", hora: "19:55", texto: "Tenho" },
        { de: "ela", hora: "19:56", texto: "Oq eu sinto por vc é verdade" },
        { de: "ela", hora: "19:56", texto: "Eu amo vc" },
        { de: "ela", hora: "19:56", texto: "Eu amo passar o meu tempo com vc" },
        { de: "ela", hora: "19:56", texto: "Eu amo jogar com vc" },
        { de: "ela", hora: "19:56", texto: "Eu amo tudo em vc" },
        { de: "ela", hora: "19:57", texto: "Eu te amoooo muito mesmo" },
        { de: "ela", hora: "19:57", texto: "Vc é tudo pra mim" },
      ],
    },
    {
      titulo: "Beleza da alma",
      icone: "✨",
      data: "04/10/2026",
      mensagens: [
        { de: "eu", hora: "17:38", texto: "Mas eu amo mais sua beleza interior ( quem vc é, sua alma ) do q sua aparência, eu não me importo mt com aparência" },
        { de: "ela", hora: "17:39", texto: "Primeiro vez que alguém fala isso pra mim" },
        { de: "eu", hora: "17:40", texto: "Mas é verdade amor" },
        { de: "eu", hora: "17:41", texto: "E tá tudo bem, tem uma primeira vez pra tudo, vc só tá sendo amada de verdade, e mesmo q eu não consiga dizer 100% com palavras oq eu sinto, vou passar todos os dias da minha vida do seu lado pra sempre se vc quiser tentando demonstrar o quanto eu te amo seja com ações ou palavras" },
        { de: "eu", hora: "17:41", texto: "Vc é a coisa mais importante da minha vida" },
        { de: "ela", hora: "17:43", texto: "Te amooooo" },
        { de: "eu", hora: "17:43", texto: "Eu tbm te amo minha princesa celestial linda perfeita maravilhosa fofa minha deusa" },
      ],
    },
    {
      titulo: "É pra sempre",
      icone: "💞",
      data: "04/10/2026",
      mensagens: [
        { de: "ela", hora: "09:14", texto: "Porq saiu?" },
        { de: "ela", hora: "09:36", texto: "Amor, provavelmente você tá dormindo, mas eu queria te falar que eu te amo tanto, mas tanto. Eu amo ficar com você, passar meus dias com você e ter você na minha vida. Quero continuar vivendo muitos momentos ao seu lado. Te amo pra sempre, minha Lady loka, minha momozinha. Te amooooooooo muitooooooooooooooooooo" },
        { de: "eu", hora: "09:51", texto: "Não sai pq eu quis minha princesa" },
        { de: "eu", hora: "09:51", texto: "Tava dormindo e caí eu acho" },
        { de: "eu", hora: "09:52", texto: "Só queria q fosse pra sempre" },
        { de: "eu", hora: "09:56", texto: "Eu tbm te amo minha princesa linda perfeita maravilhosa fofa minha Manu Croft, Minha Princesa, Minha Deusa, eu tbm te amo muitoooooooooooooooooo, mais do q tudo nesse mundo" },
        { de: "ela", hora: "10:05", texto: "Mais é pra sempre" },
      ],
    },
    {
      titulo: "Sonhos multiplayer",
      icone: "🌙",
      data: "06/10/2026",
      mensagens: [
        { de: "eu", hora: "18:39", texto: "Vou cochilar um pouquinho" },
        { de: "ela", hora: "18:41", texto: "Tá bom moh😕" },
        { de: "eu", hora: "18:44", texto: "Eu durmo mal sem vc" },
        { de: "eu", hora: "18:45", texto: "Tbm sinto sua falta minha princesa" },
        { pausa: "mais tarde" },
        { de: "eu", hora: "20:46", texto: "Boa noite minha princesa" },
        { de: "eu", hora: "20:46", texto: "Vou cochilar mais até voltar" },
        { de: "eu", hora: "20:46", texto: "Vamos nos encontrar nos sonhos multiplayer" },
        { de: "ela", hora: "20:47", texto: "Vms moh" },
        { de: "ela", hora: "20:47", texto: "Boa noite moh" },
      ],
    },
    {
      titulo: "A gente se completa",
      icone: "🧩",
      data: "10/10/2026",
      mensagens: [
        { de: "eu", hora: "04:27", texto: "Oq eu ia falar é q a gente se completa" },
        { de: "eu", hora: "04:27", texto: "Pq eu sou seu lado nerd" },
        { de: "eu", hora: "04:27", texto: "E vc é meu lado mais esqueci como fala" },
        { de: "eu", hora: "04:27", texto: "Desse nicho" },
        { de: "eu", hora: "04:27", texto: "De resto a gente é igual" },
        { de: "ela", hora: "04:27", texto: "Q fofo" },
      ],
    },
    {
      titulo: "O presente",
      icone: "🎁",
      data: "10/10/2026",
      mensagens: [
        { de: "ela", hora: "21:27", texto: "Eu quero mandar alguma coisa" },
        { de: "ela", hora: "21:32", texto: "Amor, eu te amo tanto, tanto. Quero muito te dar um presente, porque você é muito especial pra mim e merece todo o carinho do mundo. Te amo muitão, minha vida" },
        { de: "eu", hora: "21:42", texto: "Ta bom minha princesa" },
        { de: "eu", hora: "21:42", texto: "Seu desejo é uma ordem" },
        { pausa: "mais tarde" },
        { de: "eu", hora: "22:39", texto: "Só to comentando, é q eu nn gosto q gastem cmg" },
        { de: "ela", hora: "22:43", texto: "Amor, eu tô te dando esse presente porque te amo muito. É a primeira vez que faço isso por alguém, e quero que você saiba que não precisa se sentir na obrigação de me dar algo em troca, nem sentir que tem uma dívida comigo ou algo do tipo. Eu tô fazendo isso de coração, porque você é muito especial pra mim e eu quero te ver feliz" },
        { de: "ela", hora: "22:44", texto: "Te amo minha vida" },
        { de: "eu", hora: "22:52", texto: "Eu tbm te amo minha princesa fofa linda perfeita e maravilhosaaaaa" },
        { pausa: "…" },
        { de: "ela", hora: "23:00", texto: "Na próxima n quero q recuse" },
        { de: "ela", hora: "23:00", texto: "Por favor" },
        { de: "eu", hora: "23:00", texto: "Tá bom" },
        { de: "eu", hora: "23:00", texto: "Se vc diz" },
        { de: "eu", hora: "23:00", texto: "Seu desejo é uma ordem minha princesa" },
      ],
    },
    {
      titulo: "Nossa casa sobre rodas",
      icone: "🚐",
      data: "11/10/2026",
      mensagens: [
        { de: "eu", hora: "20:03", texto: "Pediu oq?" },
        { de: "ela", hora: "20:04", texto: "Hambúrguer e uma batata frita" },
        { de: "ela", hora: "20:05", texto: "Vai comer oq amor?" },
        { de: "eu", hora: "20:06", texto: "Hambúrguer provavelmente" },
        { de: "ela", hora: "20:08", texto: "A gente tem uma conexão tão grande" },
        { de: "ela", hora: "20:11", texto: "Te amo minha vida" },
        { de: "ela", hora: "20:11", texto: "Minha Lady loka" },
        { pausa: "mais tarde" },
        { de: "ela", hora: "23:12", texto: "Amorrr" },
        { de: "ela", hora: "23:12", texto: "A gente podia morar em um carrocasa" },
        { de: "eu", hora: "23:17", texto: "Motorhome?" },
        { de: "eu", hora: "23:17", texto: "Queria ter um" },
        { de: "eu", hora: "23:17", texto: "Pra trabalhar home office e viajar por ai" },
        { de: "ela", hora: "23:17", texto: "Simmm" },
        { de: "ela", hora: "23:17", texto: "Seria mt legal" },
        { de: "eu", hora: "23:18", texto: "É algo q eu sonho a um tempinho" },
        { de: "ela", hora: "23:23", texto: "Vm mora juntas" },
      ],
    },
    {
      titulo: "Família",
      icone: "🏠",
      data: "09/10/2026",
      mensagens: [
        { de: "eu", hora: "22:43", texto: "Meu quarto fica de frente pra sala" },
        { de: "eu", hora: "22:43", texto: "Minha família é meio surda" },
        { de: "ela", hora: "22:43", texto: "Já faço parte ent" },
        { de: "ela", hora: "22:43", texto: "Sou surda" },
        { de: "eu", hora: "22:44", texto: "Mas vc faz parte da família" },
      ],
    },
    {
      titulo: "Gata e Lontra",
      icone: "🐱",
      data: "12/10 e 14/10",
      mensagens: [
        { de: "ela", hora: "02:42", texto: "Amr, vc veio dos macaco" },
        { de: "eu", hora: "02:42", texto: "Eu vim das lontras" },
        { de: "eu", hora: "02:42", texto: "Não dos macacos" },
        { de: "eu", hora: "02:42", texto: "Já começa por ai" },
        { pausa: "…" },
        { de: "eu", hora: "02:52", texto: "Eu sou claramente uma lontra branca" },
        { de: "ela", hora: "02:53", texto: "Eu sou uma gata" },
        { de: "eu", hora: "02:53", texto: "É uma gata msm" },
        { de: "ela", hora: "02:57", texto: "Miu miu miu miu" },
        { pausa: "14/10, falando da gata lá de casa" },
        { de: "eu", hora: "20:52", texto: "Ela vai te enfiar a unha" },
        { de: "eu", hora: "20:52", texto: "Ela é brava" },
        { de: "ela", hora: "20:52", texto: "Sou uma gata" },
        { de: "eu", hora: "20:52", texto: "Não gosta de gente nova e nem de bicho novo" },
        { de: "ela", hora: "20:52", texto: "Vai n" },
        { de: "ela", hora: "20:52", texto: "Sou diferente" },
        { de: "eu", hora: "20:53", texto: "Vc é minha gatinha" },
        { de: "ela", hora: "20:53", texto: "Só sua" },
      ],
    },
    {
      titulo: "Eu sei q n vai",
      icone: "🤍",
      data: "15/10/2026",
      mensagens: [
        { de: "ela", hora: "20:20", texto: "Te amo" },
        { de: "ela", hora: "20:20", texto: "Vc é tudo pra mim" },
        { de: "ela", hora: "20:21", texto: "Eu nunca vou terminar com vc, eu mereço vc" },
        { de: "ela", hora: "20:21", texto: "Vc é tudo na minha vida" },
        { de: "ela", hora: "20:21", texto: "Vc me deixa feliz todos os dias" },
        { de: "ela", hora: "20:22", texto: "Vc é tudo" },
        { de: "ela", hora: "20:22", texto: "Eu amo ver vc rindo" },
        { de: "ela", hora: "20:22", texto: "Vc feliz" },
        { de: "ela", hora: "20:23", texto: "Te amo minha vida" },
        { de: "ela", hora: "20:23", texto: "Eu tenho certeza q gente vai viver mt feliz" },
        { de: "eu", hora: "20:24", texto: "Queria" },
        { de: "eu", hora: "20:24", texto: "Mas eu vou estragar tudo" },
        { de: "ela", hora: "20:24", texto: "N vai" },
        { de: "ela", hora: "20:24", texto: "Eu sinto isso" },
        { de: "ela", hora: "20:25", texto: "Eu sei q n vai" },
      ],
    },
  ],

  /* FRASES QUE EU GUARDO (palavra por palavra)
     ela: o que a Manu me disse · eu: o que eu disse pra ela */
  frases: {
    ela: [
      { texto: "Mais é pra sempre", data: "04/10" },
      { texto: "Vc é o meu amor. Tudo pra mim", data: "02/10" },
      { texto: "Oq eu sinto por vc é verdade", data: "02/10" },
      { texto: "Amr, pra mim tá tudo bem. Eu só quero ficar com você, de verdade.", data: "03/10" },
      { texto: "Vc é minha", data: "05/10" },
      { texto: "A gente tem uma conexão tão grande", data: "11/10" },
      { texto: "Eu tava pensando em vc, tava com sdds. Do nada vc manda mensagem", data: "13/10" },
      { texto: "Tô jogando ranqueada na sua conta pra gente jogar juntas. Te amo, minha vida", data: "13/10" },
      { texto: "Só sua", data: "14/10" },
      { texto: "Eu nunca vou terminar com vc, eu mereço vc. Vc é tudo na minha vida", data: "15/10" },
      { texto: "Vc me deixa feliz todos os dias", data: "15/10" },
      { texto: "N vai. Eu sinto isso. Eu sei q n vai", data: "15/10" },
      { texto: "Eu vou lembrar vc", data: "04/10, do meu remédio 💊" },
    ],
    eu: [
      { texto: "Eu nn me importo, só quero ficar do seu lado moh. Mesmo q seja só de bobeira ou conversando. Eu amo sua presença", data: "30/09" },
      { texto: "Vc é tão perfeita. Queria q vc pudesse se ver como eu te vejo", data: "30/09" },
      { texto: "Eu quero vc pra vida e até depois dela se tiver. Pra sempre", data: "30/09" },
      { texto: "Se eu pudesse te dar a lua, eu te daria. Mas sou só uma baiana pobre e noiada", data: "01/10" },
      { texto: "Só nn amo pq amar só amo vc", data: "01/10" },
      { texto: "vc é o amor da minha vida e eu quero passar o resto da minha vida ao seu lado e até dps disso se tiver", data: "02/10" },
      { texto: "To ficando maluca. De pensar dms em vc", data: "03/10" },
      { texto: "se vc tiver na tempestade, a gente vai se molhar juntas", data: "03/10" },
      { texto: "vc só tá sendo amada de verdade", data: "04/10" },
      { texto: "Pq eu quero casar com vc, realizar nossos sonhos e construir nossa família", data: "05/10" },
      { texto: "Vamos nos encontrar nos sonhos multiplayer", data: "06/10" },
      { texto: "Oq eu ia falar é q a gente se completa", data: "10/10" },
      { texto: "Eu amo falar com vc e quando vc me manda mensagem", data: "13/10" },
    ],
  },

  /* TEXTOS QUE A GENTE TROCOU (palavra por palavra)
     Viram cartinhas que abrem num modal. de: "ela" ou "eu"
     Na carta de 15/10 tirei só duas partes mais íntimas e uma frase muito pesada. */
  textos: [
    {
      de: "ela",
      data: "15/10/2026 · 20:56",
      titulo: "Para minha Anna, meu amor.",
      paragrafos: [
        "Anna, eu amo quando você tá feliz, quando você tá rindo, amo quando você toma banho conversando comigo, amo quando você me lembra das coisas. Amo quando você fala “eu te amo, minha princesa”. Eu amo tudo em você, meu amor, até os pequenos detalhes.",
        "Você me faz feliz, sim, e eu nunca senti tanta felicidade assim antes. Minha vida era um caos e já não sabia mais o que fazer com tanta coisa acontecendo. Mas aí você entrou na minha vida e trouxe uma felicidade que eu nem sabia que ainda podia sentir. Você me ajudou a enxergar as coisas de outra forma e se tornou alguém muito especial pra mim.",
        "Eu quero muito fazer você feliz também, amor. Quero ser alguém que te faça sorrir, que te dê carinho, que te escute quando você precisar e que fique do seu lado nos dias bons e nos dias ruins. Quero que você se sinta amada, querida e especial, porque é exatamente isso que você é pra mim.",
        "Te amo, minha Anna. Te amo, meu amor, te amo, minha vida, te amo, minha Lady loka, te amo, minha bebê. Você é tudo pra mim, minha princesa, e eu sou muito feliz por ter você na minha vida.",
        "Eu quero ter um futuro com você, quero viver muitas coisas ao seu lado, criar memórias, dar risadas por coisas bobas, passar horas conversando com você e continuar me apaixonando por cada detalhe seu. Quero que a gente cresça juntas, aprenda juntas e construa uma história linda, do nosso jeitinho.",
        "Eu não sei explicar tudo o que sinto por você, porque parece que nenhuma palavra é suficiente pra demonstrar o tamanho desse amor. Só sei que você se tornou uma das partes mais bonitas da minha vida e que eu quero continuar cuidando do que a gente tem.",
        "Eu te amo muito, minha Anna. Minha princesa, minha bb, minha Lady loka",
        "Que a gente ainda tenha muitos meses, muitos anos e muitas histórias pra contar. Que a gente continue escolhendo uma à outra, conversando, se entendendo e construindo nosso futuro juntinhas.",
        "Eu te amo, meu amor. Hoje, amanhã e em todos os dias que a vida permitir que a gente compartilhe. Minha Anna, minha vida, meu amor",
      ],
    },
    {
      de: "ela",
      data: "04/10/2026 · 09:36",
      titulo: "Achando que eu tava dormindo",
      paragrafos: [
        "Amor, provavelmente você tá dormindo, mas eu queria te falar que eu te amo tanto, mas tanto. Eu amo ficar com você, passar meus dias com você e ter você na minha vida. Quero continuar vivendo muitos momentos ao seu lado.",
        "Te amo pra sempre, minha Lady loka, minha momozinha. Te amooooooooo muitooooooooooooooooooo",
      ],
    },
    {
      de: "ela",
      data: "10/10/2026 · 22:43",
      titulo: "De coração",
      paragrafos: [
        "Amor, eu tô te dando esse presente porque te amo muito. É a primeira vez que faço isso por alguém, e quero que você saiba que não precisa se sentir na obrigação de me dar algo em troca, nem sentir que tem uma dívida comigo ou algo do tipo.",
        "Eu tô fazendo isso de coração, porque você é muito especial pra mim e eu quero te ver feliz",
      ],
    },
    {
      de: "eu",
      data: "03/10/2026 · 18:08",
      titulo: "A gente vai se molhar juntas",
      paragrafos: [
        "Moh, se precisar conversar eu to aqui, a gente nn precisa nem jogar, eu amo ficar com vc fazendo qualquer coisa, eu amo sua presença, se eu puder ajudar no q for possível eu ajudo, tenta descansar um pouquinho amor, nn é só vc q é azarada amor, mas eu tive sorte na minha vida de te conhecer e te ter, eu sempre vou estar do seu lado independente do q acontecer, se vc tiver na tempestade, a gente vai se molhar juntas, eu te amo minha princesa, vc é tudo pra mim",
      ],
    },
    {
      de: "eu",
      data: "04/10/2026 · 17:38",
      titulo: "Amada de verdade",
      paragrafos: [
        "Mas eu amo mais sua beleza interior ( quem vc é, sua alma ) do q sua aparência, eu não me importo mt com aparência",
        "E tá tudo bem, tem uma primeira vez pra tudo, vc só tá sendo amada de verdade, e mesmo q eu não consiga dizer 100% com palavras oq eu sinto, vou passar todos os dias da minha vida do seu lado pra sempre se vc quiser tentando demonstrar o quanto eu te amo seja com ações ou palavras",
        "Vc é a coisa mais importante da minha vida",
      ],
    },
    {
      de: "eu",
      data: "05/10/2026 · 03:21",
      titulo: "Nosso futuro",
      paragrafos: [
        "Eu vou dar tudo de mim e toda minha energia e sangue",
        "Pra melhorar e correr atrás de tudo",
        "Pra gente ter nosso futuro",
        "Pq eu quero casar com vc, realizar nossos sonhos e construir nossa família",
      ],
    },
  ],

  /* NOSSO ZAP EM NÚMEROS (contados na conversa exportada, de 30/09 a 16/10) */
  numeros: [
    { icone: "💬", num: 4864, rotulo: "mensagens", detalhe: "com figurinhas, fotos e áudios, em pouco mais de duas semanas" },
    { icone: "💜", num: 109, rotulo: "mensagens com “te amo”", detalhe: "65 suas, 44 minhas… você tá ganhando 😤" },
    { icone: "👑", num: 77, rotulo: "mensagens com “princesa”", detalhe: "76 minhas. E ainda é pouco" },
    { icone: "🫶", num: 32, rotulo: "mensagens com “minha vida”", detalhe: "22 suas, 10 minhas" },
    { icone: "🔁", num: 11470, rotulo: "letras “o”", detalhe: "num único “te amooo…” seu, em 10/10" },
    {
      icone: "📞", num: 375, rotulo: "horas numa call só",
      detalhe: "e 25 minutos, no Quarto da Angel Manu. O recorde antigo era 38 horas, lá no Mimimi",
      foto: "img/momentos/servidor-angels.jpg",
      legenda: "Quarto da Angel Manu, no angels: 375:25:39 de call 💜",
    },
  ],

  // MOTIVOS: quanto mais, melhor!
  motivos: [
    "Seu “Oiee” mudou a minha vida inteira.",
    "Você mia “miu miu miu miu” e eu derreto toda vez.",
    "Porque eu amo a sua alma antes de tudo, e ela é a mais linda que eu já conheci.",
    "Você joga ranqueada na minha conta só pra gente poder jogar juntas.",
    "Você prometeu me lembrar de tomar meu remédio.",
    "Seu “te amooo” com 11.470 letras “o”.",
    "Você diz “Mais é pra sempre” como se fosse a coisa mais óbvia do mundo. E é.",
    "Porque você é minha Princesa, e eu sou a sua Baianinha.",
    "Você quer morar comigo num carrocasa.",
    "Você me chama pra dormir em call, e eu durmo mal sem você.",
    "Seu coração enorme, que escolhe cuidar de mim.",
    "Você me chama de “minha vida”, e eu acredito.",
    "Porque até o lanche a gente escolhe igual, sem combinar.",
    "Você é a minha princesinha escarlate, a melhor Wanda do mundo.",
    "Você me faz rir até das coisas mais bobas.",
    "Porque com você eu posso ser eu mesma de verdade.",
    "Você me escreveu a carta mais linda que eu já recebi.",
    "Você disse “Só sua”, e eu nunca mais esqueci.",
    "Você disse “Eu sei q n vai” quando eu achei que ia estragar tudo.",
    "Porque a gente se completa.",
    "Porque você é a minha Manuzinha Croft, e eu vou em qualquer aventura com você.",
    "Porque você é a minha kitsune roxa, de nove caudas e um coração enorme.",
    "Simplesmente porque é você. Sempre vai ser você.",
  ],

  // CARTINHAS "abra quando..."
  cartas: [
    {
      icone: "🌧️",
      titulo: "Abra quando estiver triste",
      texto:
        "Ei, Princesa. Se você tá lendo isso, é porque o dia não tá fácil. " +
        "Lembra do que eu te prometi: se você estiver na tempestade, a gente se molha juntas. " +
        "Respira fundo, se enrola na coberta e me chama. Sua Baianinha tá a uma mensagem de distância. Sempre.",
    },
    {
      icone: "🌙",
      titulo: "Abra quando sentir saudade",
      texto:
        "Eu também tô com saudade, pode ter certeza. " +
        "Fecha os olhos e imagina a gente boiando de mãos dadas, igual lontrinhas. " +
        "Falta pouco pro nosso primeiro abraço, e eu vou te apertar tão forte que a saudade vai sair correndo.",
    },
    {
      icone: "✨",
      titulo: "Abra quando não conseguir dormir",
      texto:
        "Gatinha sem sono, vem cá. Me chama numa call e dorme comigo, que eu também durmo mal sem você. " +
        "Se eu já estiver dormindo, a gente se encontra nos sonhos multiplayer. Hora do mimimi, meu amor.",
    },
    {
      icone: "🪞",
      titulo: "Abra quando duvidar de si mesma",
      texto:
        "Você é linda, inteligente, forte e única. Lembra: eu amo a sua alma antes de tudo. " +
        "Queria que você pudesse se ver como eu te vejo, porque aí você nunca mais duvidaria de nada. " +
        "Eu acredito em você, minha Princesa. Muito.",
    },
    {
      icone: "🥺",
      titulo: "Abra quando ficar com medo de ser grudenta",
      texto:
        "Pode ser grudenta. Pode ser fofa demais. Pode mandar mil mensagens seguidas. " +
        "Eu não vou embora e nunca vou te abandonar. Por mim eu viveria colada em você. " +
        "Eu quero ser o seu porto seguro, lembra?",
    },
    {
      icone: "🎉",
      titulo: "Abra quando estiver feliz",
      texto:
        "Que coisa boa! Quero saber de tudo, cada detalhe. " +
        "Sua felicidade é a minha também. Me conta agora, que eu já tô sorrindo daqui.",
    },
  ],

  /* PLAYLIST
     Cole os links das playlists do Spotify. Pode ter uma ou várias.
     Se ficar vazio, a seção não aparece. */
  // Pode ser só o link ou { link, rotulo } pra aparecer um nomezinho em cima do player.
  // A playlist precisa estar pública no Spotify, senão o player mostra "Page not found".
  spotify: [
    { link: "https://open.spotify.com/playlist/269jH1V9ZbjF961DgOMYk1", rotulo: "a playlist dela 🐱" },
    { link: "https://open.spotify.com/playlist/2Yb3m6UKl5sXSjXR7gU3rl", rotulo: "a minha playlist 🦦" },
  ],

  // Opcional: a história de cada música (ouvir: link pra tocar, aparece um botãozinho)
  musicas: [
    { nome: "Perfeição (Nice/Lin Ling)", ouvir: "https://youtu.be/2JkEcrPd67k", artista: "AniRap e VMZ", historia: "Essa aqui me lembra um pouco de eu e você." },
    { nome: "Your Name", ouvir: "https://youtu.be/3CQTwoVut-8", artista: "VMZ", historia: "Essa também." },
    { nome: "Amor (Animes)", ouvir: "https://youtu.be/NG6jiXWnM8Q", artista: "VMZ feat. Grupo Halel", historia: "Essa também. Toda música bonita agora tem um pouco de você." },
    { nome: "Euforia (Undertale)", ouvir: "https://youtu.be/0Ic6ylMiB4c", artista: "VMZ feat. Anny", historia: "A minha favorita de quase todas. Um pedacinho de mim pra você." },
    { nome: "Vício de Amor", ouvir: "https://youtu.be/ZLzDMCS6pPY", artista: "Anny feat. Chrono", historia: "Outra favorita minha. E o nome já diz tudo." },
  ],

  /* E CONTINUA PRA SEMPRE
     fotosJuntas: quando a gente se encontrar, é só pôr o src de cada foto.
     encontro: a data do nosso primeiro encontro, quando a gente marcar.
       Ex: encontro: { ano: 2026, mes: 12, dia: 20 }
       Enquanto for null, aparece "em breve". */
  praSempre: {
    texto:
      "A gente ainda não se encontrou pessoalmente, e mesmo assim você já é a pessoa mais importante da minha vida. " +
      "Essas molduras estão esperando por nós. Cada uma vai ganhar uma foto quando a gente viver esse momento.",
    fotosJuntas: [
      { legenda: "nosso primeiro abraço", src: "" },
      { legenda: "a primeira foto juntinhas", src: "" },
      { legenda: "dormir juntas, sem call", src: "" },
      { legenda: "maratona no mesmo sofá", src: "" },
      { legenda: "a nossa casa", src: "" },
      { legenda: "viajando de motorhome", src: "" },
    ],
    sonhos: [
      { icone: "🫂", texto: "Ir te visitar no final do ano" },
      { icone: "🏠", texto: "Morar juntas" },
      { icone: "🚐", texto: "Um motorhome pra trabalhar e viajar por aí" },
      { icone: "✈️", texto: "Ir pra Coreia do Sul juntas" },
      { icone: "🍿", texto: "Assistir Carrie e It, a Coisa no mesmo sofá" },
      { icone: "💍", texto: "Casar com você e construir a nossa família" },
    ],
    encontro: null,
  },

  // CARTA FINAL
  cartaFinal: {
    saudacao: "Minha Princesa,",
    paragrafos: [
      "Se você chegou até aqui, é porque rolou o site inteirinho, e eu já tô sorrindo só de imaginar você lendo.",
      "Tudo começou com uma figurinha minha e um “Oiee” seu, que chegou quase uma hora depois. Eu não fazia ideia de que ali tava começando a minha história favorita. Hoje eu sei: foi o dia mais sortudo da minha vida.",
      "Eu te disse uma vez que queria ser o seu porto seguro, assim como você é o meu. E quando você me contou que tinha medo de ser grudenta demais, eu te respondi que amo quando você é grudenta comigo. Deixa eu repetir aqui, pra ficar guardado: eu não vou embora. E se um dia vier tempestade, a gente se molha juntas.",
      "Eu ainda não te abracei, ainda não segurei sua mão, ainda não vi seu sorriso de pertinho. Mas já passei mais de 375 horas numa call só com você, e ainda acho pouco. Eu nunca senti uma conexão tão grande com alguém. Você é a minha alma gêmea, minha Gatinha, minha Manuzinha Croft, minha princesinha escarlate.",
      "Eu quero você pra vida e até depois dela, se tiver. Quero ir te visitar, quero o nosso primeiro abraço, quero dormir juntas sem precisar de call, quero o nosso motorhome rodando por aí, quero a Coreia do Sul, quero casar com você e construir a nossa família.",
      "Enquanto esse dia não chega, a gente se encontra nos sonhos multiplayer. E quando ele chegar, eu prometo segurar sua mão igual lontrinha, pra correnteza nenhuma separar a gente.",
      "Obrigada por ser exatamente quem você é. Eu te amo, hoje e em cada segundo daquele contador lá em cima. E como você mesma disse: é pra sempre.",
    ],
    assinatura: "Sua Baianinha 🦦💜",
  },

  // Assinatura das cartinhas e mensagens
  assinatura: "Sua Baianinha 🦦💜",

  // EASTER EGG: mensagem que aparece ao achar a patinha escondida
  segredo: {
    titulo: "Você achou a patinha secreta! 🐾",
    texto:
      "Sabia que você ia achar, Gatinha curiosa. 💜 " +
      "Esse é o nosso segredinho: vale um abraço bem apertado, " +
      "um beijo demorado e um dia inteiro do jeito que você quiser, " +
      "assim que a gente se encontrar. É só me mostrar essa tela.",
  },

  // MAIS SEGREDOS: cada um se abre tocando várias vezes em algum lugar do site.
  // O rodapé mostra quantos ela já achou. Apague um bloco pra tirar aquele segredo.
  segredos: {
    dica: "psiu… este site tem segredos escondidos. Às vezes é só insistir um pouquinho. 🐾",
    pata: { nome: "A patinha secreta" },

    // Toque 3 vezes no bolo do adesivo “Chocolate e laranja”
    fome: {
      nome: "A Gatinha faminta",
      titulo: "Tô com fome 🥺",
      texto: "Você comeu o bolo inteiro… e mesmo assim. É a frase que eu mais escuto na call, quase toda hora. Então toma: dá comida pra Gatinha e vê o que acontece.",
      pedido: "me dá comida? 🥺",
      comidas: [
        { icone: "🍕", nome: "pizza", enche: 35 },
        { icone: "🍔", nome: "hambúrguer", enche: 30 },
        { icone: "🍟", nome: "batata frita", enche: 20 },
        { icone: "🍛", nome: "strogonoff", enche: 35 },
        { icone: "🍫", nome: "bolo de chocolate", enche: 25 },
        { icone: "🍊", nome: "bolo de laranja", enche: 25 },
      ],
      reacoes: ["nham nham 😋", "hmmm…", "que delícia", "mais um pouquinho", "nhac!"],
      cheia: "tô cheia… 😮‍💨",
      deNovo: "…tô com fome 🥺",
      provasTitulo: "As provas 🕵️",
      provas: [
        { pausa: "01/10" },
        { de: "eu", texto: "Fazer oq de bom amor?", hora: "09:49" },
        { de: "ela", texto: "Comer", hora: "09:49" },
        { pausa: "04/10" },
        { de: "ela", texto: "Eu vou colocar comida pra mim", hora: "13:08" },
        { de: "eu", texto: "Vai comer oq de bom minha princesa?", hora: "13:08" },
        { de: "ela", texto: "Strogonoff", hora: "13:17" },
        { pausa: "08/10" },
        { de: "ela", texto: "Eu vou comer pizza já já", hora: "20:27" },
        { pausa: "09/10" },
        { de: "ela", texto: "Vou comer alguma coisa", hora: "15:39" },
        { de: "ela", texto: "Tô com fome", hora: "15:39" },
        { de: "ela", texto: "Vou comer mt", hora: "15:42" },
        { pausa: "11/10" },
        { de: "ela", texto: "Eu pedir algo pra comer", hora: "20:03" },
        { de: "eu", texto: "Pediu oq?", hora: "20:03" },
        { de: "ela", texto: "Hambúrguer e uma batata frita", hora: "20:04" },
        { pausa: "12/10 · três vezes numa madrugada só" },
        { de: "ela", texto: "Eu tô comprando alguma coisa para mim comer", hora: "01:03" },
        { de: "ela", texto: "Agr vou comer alguma coisa", hora: "02:36" },
        { de: "ela", texto: "Vou comer alguma coisa", hora: "05:41" },
        { pausa: "13/10 · evento raríssimo" },
        { de: "ela", texto: "To sem fome", hora: "19:08" },
      ],
      fim: "E isso é só o zap. Na call é quase toda hora: “tô com fome”. E eu amo cada vez. Um dia eu vou estar do seu lado pra te encher de comida de verdade. 🍕💜",
    },

    // Toque 9 vezes numa das kitsunes do canto (Cartinhas ou Números)
    caudas: {
      nome: "As nove caudas",
      titulo: "Nove toques, nove caudas 🦊",
      texto: "Dizem que uma kitsune ganha uma cauda nova a cada cem anos. Eu quero ficar do seu lado tempo suficiente pra ver você ganhar todas as nove.",
    },

    // Toque 5 vezes no contador
    contador: {
      nome: "O contador secreto",
      titulo: "Contei de outro jeito 💓",
      texto: "Dias, horas e minutos é pouco. Então contei assim:",
      itens: [
        { rotulo: "segundos juntas", porSegundo: 1 },
        { rotulo: "batidas do meu coração, todas suas (contando 80 por minuto)", porSegundo: 80 / 60 },
        { rotulo: "vezes que eu pensei em você", fixo: "∞" },
      ],
    },

    // Toque 3 vezes na lontrinha da abertura
    lontra: {
      nome: "A pedrinha da lontra",
      titulo: "A pedrinha favorita 🦦",
      texto: "Sabia que lontra tem um bolsinho de pele debaixo do braço? É ali que ela guarda a pedrinha favorita dela, e leva pra todo lado. A minha pedrinha favorita é você: vou te levar comigo pra sempre.",
    },

    // Toque 3 vezes no card do “te amo”, lá nos números
    placar: {
      nome: "O placar do te amo",
      suas: 65,
      de: 44,
      para: 66,
      texto: "65 suas, 66 minhas… agora quem tá ganhando sou eu 😤💜",
    },

    // Quando ela achar todos
    todos: {
      titulo: "Você achou todos os segredos! 🏆",
      texto: "Gatinha curiosa do jeito que eu amo. O prêmio: quando a gente se encontrar, a comida é toda por minha conta. Pizza, hambúrguer, batata frita, strogonoff, bolo… E quando você disser que tá com fome de novo, a gente come de novo. 💜",
    },

    // Surpresas que não precisam achar: aparecem sozinhas
    mesversario: "Hoje é dia 29: {n} de namoro! Feliz mesversário, minha Gatinha 💜",
    aniversario: "Hoje é 29 de setembro: {n} de namoro! Feliz aniversário de namoro, minha Gatinha 💜",
    hora: { hora: 23, minuto: 3, texto: "23:03… foi exatamente nessa hora que você me mandou o primeiro “Oiee”. 💜" },
    senhaFome: "Primeiro a senha, depois o lanche 🍕",
    teamo: "Eu também te amo 💜",
  },
};
