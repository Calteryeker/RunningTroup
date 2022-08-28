function focarLoad(id){
    document.getElementById(id).focus()
}


function focoUp(){
    focused = document.activeElement;
    elementsNav = document.getElementsByClassName('navigate');
    for(var i = 0; i < elementsNav.length; i++){
        if(elementsNav[i].tabIndex == focused.tabIndex-1){
            elementsNav[i].focus();

        }
    }
}
function focoDown(){
    focused = document.activeElement;
    elementsNav = document.getElementsByClassName('navigate');
    for(var i = 0; i < elementsNav.length; i++){
        if(elementsNav[i].tabIndex == focused.tabIndex+1){
            elementsNav[i].focus();
        }
    }
}


function navigate(path){
    window.location.assign(path)
}

function returnStart(){
    document.cookie ? navigate('../logado/iniciar.html') 
      : navigate('../semLogin/iniciar.html')
}

function logar(){

}
function cadastrar(){

}
function salvarPlacar(){

}

function gameOver(pontuacao){
    window.location.assign('./gameover.html?pontuacao='+pontuacao)
}

function gameOverMP(player, pontuacao){

}

