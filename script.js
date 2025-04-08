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


let tempoDecorridoEmSegundos = 1500
let intervaloId = null


// salvando o áudio em uma variável
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const playTemporizador = new Audio('./sons/play.wav')
const pauseTemporizador = new Audio('./sons/pause.mp3')
const fimTemporizador = new Audio('./sons/beep.mp3')

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

    alterarContexto('foco')
    btnFoco.classList.add('active')
})

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    btnCurto.classList.add('active')
})

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    btnLongo.classList.add('active')
})

function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })

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
        // fimTemporizador.play()

        // desabilita o botão começar para não ser clicado novamente
        btnComecar.disabled = true
        btnComecar.classList.add('desabilitado')

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
    console.log(`Temporizador: ${tempoDecorridoEmSegundos}`);
    monstrarTempo()
}

btnComecar.addEventListener('click', iniciarOuPausar)

// variável bandeira para sinalizar quando der start ou pausa
let flag = 0

function iniciarOuPausar() {

    // quando flag for zero === start e atualizar flag para 1.
    if (flag === 0) {

        flag = 1
        playTemporizador.play()
        iconeStart.setAttribute('src', './imagens/pause.png')
        textoComecar.textContent = 'Pausar'

        // quando flag for 1 === pausar o temporizador e atualizar flag para zero novamente
    } else {

        flag = 0
        pauseTemporizador.play()
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

function monstrarTempo() {
    const tempo = tempoDecorridoEmSegundos
    tempoNaTela.innerHTML = `${tempo}`
}


monstrarTempo()