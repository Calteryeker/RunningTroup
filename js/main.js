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

function goEntrar(endgame){
    if(endgame){
        document.cookie ? window.location.assign('../logado/iniciar.html') 
        : window.location.assign('../semLogin/iniciar.html')
    }
    else{
        document.cookie ? window.location.assign('html/logado/iniciar.html') 
        : window.location.assign('html/semLogin/iniciar.html')
    }
    
}

function goCadastrar(){
    window.location.assign('../cadastar.html')
}
function goLogar(){
    window.location.assign('../logar.html')
}

function goLeaderboard(){
    window.location.assign('./leaderboard.html')
}
function goRecordes(){
    window.location.assign('./recordes.html')
}

function goJogar(){
    window.location.assign('../jogar/modo.html')
}
function goNumPlayers(){
    window.location.assign('./num_players.html')
}

function logar(){

}
function cadastrar(){

}
function salvarPlacar(){

}

