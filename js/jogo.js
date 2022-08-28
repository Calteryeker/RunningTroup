function pular(){
    document.getElementById('personagem').classList.add('pulo')
    setTimeout(jumpUnlock, 1000);
}

function jumpUnlock(){
    document.getElementById('personagem').classList.remove('pulo')
}

var pontuacao = 0
function pontuar(){
  pontuacao++;
  document.getElementById('placar').innerText = "Pontuação:" + pontuacao.toString().padStart(6, '0')
}

setInterval(pontuar, 50)
