const token = document.cookie.split('; ').find((string) => string.startsWith('token='))?.split('=')[1]
const user = document.cookie ? JSON.parse(document.cookie.split('; ').find((string) => string.startsWith('user='))?.split('=')[1]) : undefined
const date = document.cookie.split('; ').find((string) => string.startsWith('date='))?.split('=')[1]

function toggleMusic(){
    const music_player = document.getElementById('music')
    if (window.localStorage.getItem('music') == 'off'){
        document.getElementById('muted').style.display = 'none'
        document.getElementById('sound').style.display = 'block'
        window.localStorage.setItem('music', 'on')
        music_player.play();   
    }
    else{
        document.getElementById('muted').style.display = 'block'
        document.getElementById('sound').style.display = 'none'
        window.localStorage.setItem('music', 'off')
        music_player.pause();

    }
}

function focarLoad(id){
    document.getElementById(id).focus()
    let music_player = document.getElementById('music')
    let music = window.localStorage.getItem('music')

    if(music == 'off'){
        music_player.pause()

        if(document.getElementById('sound_control') != null){
            document.getElementById('muted').style.display = 'block'
            document.getElementById('sound').style.display = 'none'
        } 
    }
    else{
        if(document.getElementById('sound_control') != null){
            document.getElementById('muted').style.display = 'none'
            document.getElementById('sound').style.display = 'block'
        }
        music_player.play()
    }

    
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


const base_url_backend = "https://running-troup-backend.herokuapp.com/"

async function logar(){
    await fetch(base_url_backend+'login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'login': document.getElementById('ipt_user').value,
            'senha': document.getElementById('ipt_pass').value
        })
    }
        
    ).then((res) => {
        if(res.status == 400){
            document.getElementById('error_login').innerText = 'Usuário ou Senha incorretos!'
            return
        }
        else{
            document.getElementById('error_login').innerText = ''
            res.json().then((json) => {
                const { user, token } = json
                const tomorrow  = new Date(); // The Date object returns today's timestamp
                tomorrow.setDate(tomorrow.getDate() + 1);

                document.cookie = 'user='+JSON.stringify(user)+'; expires='+tomorrow+'; path=/'
                document.cookie = 'token='+token+'; expires='+tomorrow+'; path=/'
                document.cookie = 'date='+tomorrow+'; expires='+tomorrow+'; path=/'
                
                window.location.assign('./logado/iniciar.html')
            })
            
        }
        //
    })
}

function logout(){
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    document.cookie = 'date=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    window.location.assign('../semLogin/iniciar.html')
}

function verifyIptSignUp(){
    return verifyUser() && verifyPass() && comparePass()
    
}

async function cadastrar(){
    if(verifyIptSignUp()){
        await fetch(base_url_backend+'signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'login': document.getElementById('ipt_user').value,
                'senha': document.getElementById('ipt_pass').value
            })
        }
            
        ).then((res) => {
            if(res.status == 409){
                document.getElementById('error_user').innerText = "Usuário Já Existe!"
                return
            }
            else{
                window.location.assign('./logar.html')
            }
           
        })
    }
}
function verifyUser(){
    const user = document.getElementById('ipt_user').value

    if(user.length != user.trim().length){
            document.getElementById('error_user').innerText = "Nome de usuário não pode ter espaços!"
            return false
    }

    if(user.trim().length < 4 || user.trim().length > 8){
        document.getElementById('error_user').innerText = "Nome de usuário deve ter entre 4 a 8 caracteres!"
        return false
    }

    var regex = new RegExp(/^(?=.*[a-zA-Z])[\.a-zA-Z0-9_]{4,8}$/)
    if(!regex.test(user)){
        document.getElementById('error_user').innerText = "Nome deve conter ao menos uma letra. Use apenas letras, números, _ ou ."
        return false;
    }

    document.getElementById('error_user').innerText = "";
    return true
}

function verifyPass(){
    const pass = document.getElementById('ipt_pass').value

    if(pass.length != pass.trim().length){
        document.getElementById('error_pass').innerText = "Senha não pode ter espaços!"
        return false
    }

    if(pass.trim().length != 8){
        document.getElementById('error_pass').innerText = "Senha deve ter 8 caracteres!"
        return false
    }

    var regex = new RegExp(/^[a-zA-Z0-9]{8,8}$/)
    if(!regex.test(pass.trim())){
        document.getElementById('error_pass').innerText = "A senha só pode ter letras e números!"
        return false
    }

    document.getElementById('error_pass').innerText = ""
    return true
}

function comparePass(){
    const pass = document.getElementById('ipt_pass').value
    const conf_pass = document.getElementById('ipt_conf_pass').value

    if(conf_pass.length != 8 || pass != conf_pass){
        document.getElementById('error_conf_pass').innerText = "As senhas não são iguais!"
        return false
    }
    else{
        document.getElementById('error_conf_pass').innerText = ""
        return true
    }
}

async function salvarPlacar(pontuacao){
    await fetch(base_url_backend+'record', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorizathion': 'Bearer '+ token
        },
        body: JSON.stringify({
            recorde: pontuacao
        })
    }
        
    ).then(async (res) => {
        await res.json().then((data) => {
            user.recordes = data
            document.cookie = 'user='+JSON.stringify(user)+'; expires='+date+'; path=/'
        })
    })
}

function gameOver(pontuacao){
    window.location.assign('./gameover.html?pontuacao='+pontuacao)
}

async function verifyRecords(pontuacao){
    var best_pontuation = 0
    const recordes = user.recordes
    if(recordes.length != 0){
        const worsts = recordes.filter((recorde)=>{
            return recorde < pontuacao
        })
        if(worsts.length > 0){
            best_pontuation = pontuacao
        }
        best_pontuation != 0 ? salvarPlacar(best_pontuation) : undefined
    }
    else{
        salvarPlacar(pontuacao)
    }
    
}

async function carregarLeaderboard(){
    focarLoad('inicio')
    await fetch(base_url_backend+'leaderboard', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorizathion': 'Bearer '+ token
        },
    }
        
    ).then((res) => {
        if(res.status == 400){
            document.getElementById('error_load').innerText = "Falha ao carregar Placar de Líderes!"
            return
        }
        else{
            res.json().then((data) =>{
                for(var i = 1; (i-1) < data.length; i++){
                    const { username, pontuacao } = data[i-1]
                    document.getElementById(''+i).innerText = ''+(i)+'º. '+ username + ' - ' + pontuacao.toString().padStart(6, '0')
                }
                document.getElementById('loader').style.display = 'none'
                document.getElementById('ranking').style.display = 'flex'
            })
        }
       
    })
}

async function carregarRecordes(){
    focarLoad('inicio')

    for(var i = 1; (i-1) < 5; i++){
        if (user.recordes[i-1]){
            document.getElementById(''+i).innerText = ''+i+'º. '+(user.recordes[i-1].toString().padStart(6, '0'))
        }
        else{
            document.getElementById(''+i).innerText = ''+i+'º. N/A'
        }
        
    }
    document.getElementById('loader').style.display = 'none'
    document.getElementById('ranking').style.display = 'flex'
}

async function carregarPlacar(foco, solo){
    focarLoad(foco)
    const params = new URLSearchParams(window.location.search)
    const pontuation = params.get('pontuacao')
    if(solo && user != undefined){
        await verifyRecords(parseInt(pontuation))
    }
    document.getElementById('pontuacao').innerText = "Sua Pontuação: " + pontuation.padStart(6, '0')
}

function carregarPlacarMP(){
    focarLoad('btt_jogar')
    const params = new URLSearchParams(window.location.search)
    pontuacao_players = []
    for(var i = 1; i <= params.get('num_players'); i++){
        pontuacao_players.push({
            jogador: i,
            pontuacao: parseInt(params.get('p'+i))
        })
    }

    pontuacao_players.sort(function (a,b) {
        const best_a = a.pontuacao
        const best_b = b.pontuacao
         
        return best_b - best_a
    })

    var rank = 1;
    pontuacao_players.forEach(element => {
        document.getElementById(''+rank).innerText = ''+rank +'º. Jogador '+ element.jogador +' - ' + element.pontuacao.toString().padStart(6, '0')
        document.getElementById(''+rank).style.display = 'table-cell';
        rank++;
    });

    const empates = pontuacao_players.filter((element)=>{
        if (element.pontuacao == pontuacao_players[0].pontuacao){
            return true
        }
        return false
    })
    
    if (empates.length != 1 && empates.length < pontuacao_players.length){
        var string_empates = ''
        for (var i = 1; i <= empates.length; i++){
            if (i+1 == empates.length){
                string_empates = string_empates + ''+empates[i-1].jogador + ' e '+empates[i].jogador
                break
            }
            string_empates = string_empates + ''+empates[i].jogador + ', '
        }
        document.getElementById('winner').innerText = 'Os Jogadores '
         + string_empates + ' empataram!'
    }
    else if (empates.length == pontuacao_players.length){
        document.getElementById('winner').innerText = 'Todos os jogadores empataram!'
    }
    else{
        document.getElementById('winner').innerText = 'O Jogador '+ pontuacao_players[0].jogador
        +' é o vencedor!'
    }
    
}

