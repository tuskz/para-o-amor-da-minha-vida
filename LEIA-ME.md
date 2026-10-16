# Site da Manu 💜🐱🦦

## ⚠️ Antes de publicar
Publique **só** estes arquivos e pastas:

```
index.html
css/
js/
img/
```

**Nunca** suba a pasta `Conversa com ela…` nem a pasta `Fotos/`. A conversa exportada tem informação pessoal (telefone, endereço, senhas que vocês trocaram) e as fotos originais são pesadas e têm metadados. Tudo que o site precisa já foi copiado e otimizado em `img/`.

O `.gitignore` já deixa essas pastas de fora se você usar GitHub. No Netlify Drop, arraste uma pasta nova que tenha só os quatro itens acima.

Lembre que quem tiver o link consegue ver as fotos dela. A senha é só um charme, não uma proteção de verdade. Então não divulgue o link.

## Como editar
Todos os textos ficam em **`js/config.js`**: datas, senha, apelidos, linha do tempo, conversas, frases, textos, números, motivos, cartinhas, playlist, "pra sempre", carta final e a mensagem secreta. É só editar o texto entre aspas e manter as vírgulas no lugar.

## Fotos
- **Álbum:** as fotos dela ficam em `img/manu/` e são listadas em `fotos: [...]`, cada uma com uma frase.
- **Linha do tempo:** cada marco pode ter `foto: "img/momentos/arquivo.jpg"`.
- Dica: fotos com até ~1600px de largura carregam bem mais rápido no celular.

## E continua pra sempre 🫂
Quando vocês se encontrarem:
1. Coloque as fotos de vocês em `img/juntas/`.
2. Em `praSempre.fotosJuntas`, preencha o `src` da moldura certa:
   ```js
   { legenda: "nosso primeiro abraço", src: "img/juntas/abraco.jpg" },
   ```
3. Quando marcarem a data, troque `encontro: null` por, por exemplo, `encontro: { ano: 2026, mes: 12, dia: 20 }`. Aparece uma contagem regressiva.

## Conversas
Cada capítulo em `conversas` vira uma aba com balõezinhos. `de: "ela"` fica do lado esquerdo (com a Gatinha) e `de: "eu"` do lado direito (com a Lontrinha). Dá pra criar capítulos novos copiando um bloco.

## Playlist
Em `spotify: [...]` dá pra pôr um ou vários links de playlist. A seção só aparece quando tiver algum link ou música listada.

**A playlist precisa estar pública** no Spotify, senão o player mostra "Page not found". Pra deixar pública: na playlist, `⋯` → *Tornar pública*. Cada item pode ter um `rotulo`, que aparece em cima do player.

Cada música em `musicas` pode ter `ouvir: "link"`, que vira um botãozinho ▶ ouvir.

## Recorde de call
Em `recordeCall` ficam as horas (aparecem no contador) e o print. O card de horas em `numeros` e o marco "Quarto da Angel Manu" na linha do tempo usam o mesmo print; se bater um recorde novo, é só trocar a imagem `img/momentos/servidor-angels.jpg` e os números.

## Ver no computador
Dá pra abrir o `index.html` direto no navegador.

## Publicado 🌐
O site está no ar em **https://tuskz.github.io/para-o-amor-da-minha-vida/** (GitHub Pages, repositório `tuskz/para-o-amor-da-minha-vida`).

Pra atualizar depois de mudar alguma coisa, abra o terminal nesta pasta e rode:

```
git add -A
git commit -m "atualiza o site"
git push
```

Em 1 ou 2 minutos o link já mostra a versão nova. O `.gitignore` continua deixando a conversa e a pasta `Fotos/` de fora.

Depois, gere um QR code do link e coloque num cartãozinho pra entregar pra ela. 💌

## Easter egg e segredos
Tem uma patinha roxa quase invisível no rodapé. 🐾

E mais 5 segredos que abrem tocando várias vezes em algum lugar. Onde fica cada um e os textos estão no bloco `segredos` do `js/config.js`. O rodapé mostra quantos ela já achou (fica salvo no navegador dela). Também tem surpresas que aparecem sozinhas: todo dia 29, às 23:03, e quando ela escreve "fome" ou "te amo" no lugar da senha.
