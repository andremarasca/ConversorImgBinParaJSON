// https://github.com/foliojs/png.js
// https://github.com/image-size/image-size

var PNG = require("png-js");

let nomeImagem = "RACIOCINIO";
let caminhoImagem = __dirname + `/Entrada/${nomeImagem}.png`;

var sizeOf = require("image-size");
var dimensions = sizeOf(caminhoImagem);

function embaralhar(array) {
  let ultimo = array.length - 1;
  let m = array.length;
  let t;
  let i;
  while (m--) {
    i = Math.round(Math.random() * ultimo);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

PNG.decode(caminhoImagem, (pixels) => {
  let blocosPretos = [];
  let blocosBrancos = [];
  let M = dimensions.height;
  let N = dimensions.width;
  let L = pixels.length / (M * N);
  let u = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let cor = false;
      for (let k = 0; k < L; k++) {
        if (pixels[u++] <= 127) {
          cor = true;
        }
      }
      if (cor) {
        blocosPretos.push([M - i, 0, j]);
      } else {
        blocosBrancos.push([M - i, 0, j]);
      }
    }
  }
  let blocos = { blocks: [] };
  blocos.blocks = blocosBrancos.length < blocosPretos.length ? blocosBrancos : blocosPretos;
  embaralhar(blocos.blocks);
  let cJSON = JSON.stringify(blocos);
  console.log(cJSON);
  const caminho = __dirname + `/Saida/${nomeImagem}.json`;
  require("fs").writeFile(caminho, cJSON, (err) => {
    console.log(err || "Arquivo Salvo!");
  });
});
