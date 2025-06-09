const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const checkboxMusica = document.querySelector('.toggle-switch')
const btnComecar = document.querySelector('#start-pause')
const iconeStart = document.querySelector('.app__card-primary-butto-icon')
const textoComecar = document.querySelector('#textoComecar')
const btnReiniciar = document.querySelector('#restart')
const tempoNaTela = document.querySelector('#timer')
const menuDeMusicas = document.querySelector('.menu-musicas')
const listaDeMusicas = document.querySelector('#listaDeMusicas')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null


// salvando o áudio em uma variável
let musica = new Audio('./sons/luna-rise-part-one.mp3')

function tocarAudio(caminho) {
    const som = new Audio(caminho)
    som.play()
}


let menuMusicasAberto = false
menuDeMusicas.addEventListener('click', () => {

        if (menuMusicasAberto == false) {
            listaDeMusicas.style.display = 'inline-block'
            menuMusicasAberto = true
            
        } else {
            listaDeMusicas.style.display = 'none'
            menuMusicasAberto = false
        }

})

listaDeMusicas.addEventListener('change', (event) => {

    // quando o usuário trocar de música
    const novaMusica = event.target.value
    musica.src = novaMusica

    // checkbox desmarcado 
    musicaFocoInput.checked = false
})

// para o aúdio ser tocado o tempo todo
musica.loop = true

// quando o input checkbox for acionado (trocar de estado)
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


btnFoco.addEventListener('click', () => {
    selecionarModo(1500, 'foco', btnFoco)
})

btnCurto.addEventListener('click', () => {
    selecionarModo(300, 'descanso-curto', btnCurto)
})

btnLongo.addEventListener('click', () => {
    selecionarModo(900, 'descanso-longo', btnLongo)
})

function selecionarModo(tempo, contexto, botaoSelecionado) {
    tempoDecorridoEmSegundos = tempo
    alterarContexto(contexto)
    botoes.forEach(botao => botao.classList.remove('active'))
    botaoSelecionado.classList.add('active')
}

function alterarContexto(contexto) {
    mostrarTempo()

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            

        break;

        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície,<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>`

        break;
    
        default:
        break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        musica.pause()
        musica.currentTime = 0
        checkboxMusica.disabled = true
        checkboxMusica.classList.add('desabilitado')

        // final do temporizador
        tocarAudio('./sons/beep.mp3')

        // desabilita o botão começar para não ser clicado novamente
        btnComecar.disabled = true
        btnComecar.classList.add('desabilitado')

        // depois de 2 segundos aparece o botão reiniciar
        setTimeout(() => {
            btnReiniciar.style.display = 'flex'
        }, 2000)
        
        btnReiniciar.addEventListener('click', () => {
            location.reload()
        })
        return
    }

    // contagem decrescente de 1 em 1
    tempoDecorridoEmSegundos--
    mostrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

// variável bandeira para sinalizar quando der start ou pausa
let temporizadorAtivo = false

function iniciarOuPausar() {

    // se não estiver com a classe active será desabilitado
    if (!btnFoco.classList.contains('active')) {
        btnFoco.disabled = true
        btnFoco.classList.add('desabilitado')
    }
    if (!btnCurto.classList.contains('active')) {
        btnCurto.disabled = true
        btnCurto.classList.add('desabilitado')
    }
    if (!btnLongo.classList.contains('active')) {
        btnLongo.disabled = true
        btnLongo.classList.add('desabilitado')
    }


    // quando temporizador não estiver ativado === start e atualizar para true.
    if (temporizadorAtivo === false) {

        temporizadorAtivo = true

        // play no temporizador
        tocarAudio('./sons/play.wav')
        iconeStart.setAttribute('src', './imagens/pause.png')
        textoComecar.textContent = 'Pausar'

    } else {

        temporizadorAtivo = false

        // pause no temporizador
        tocarAudio('./sons/pause.mp3')
        iconeStart.setAttribute('src', './imagens/play_arrow.png')
        textoComecar.textContent = 'Continuar'
    }

    if (intervaloId) {
        zerar()
        return
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null

}

function mostrarTempo() {
    // multiplicado o tempo que está em milisegundos para minutos
    const tempo = new Date(tempoDecorridoEmSegundos * 1000 )

    // colocar minutos em formato string
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`

}
mostrarTempo()

