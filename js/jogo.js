const player_controller = document.getElementById("personagem");
const params_check = new URLSearchParams(window.location.search)
const mp_game = params_check.has('actual')

function pular(){
  if(mp_game){
    player_controller.classList.remove('run_'+params_check.get('actual'))
    player_controller.classList.add('pulo_'+params_check.get('actual'))
  }
  else{
    player_controller.classList.remove('run_1')
    player_controller.classList.add('pulo_1')
  }
    
  setTimeout(jumpUnlock, 1000);
}

function jumpUnlock(){
  if(mp_game){
    player_controller.classList.remove('pulo_'+params_check.get('actual'))
    player_controller.classList.add('run_'+params_check.get('actual'))
  }
  else{
    player_controller.classList.remove('pulo_1')
    player_controller.classList.add('run_1')
  }
    
}

var pontuacao = 0
function pontuar(){
  pontuacao++;
  document.getElementById('placar').innerText = "Pontuação:" + pontuacao.toString().padStart(6, '0')
}

setTimeout(()=>{
    setInterval(pontuar, 50)
},2000)

