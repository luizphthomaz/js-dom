const html = document.querySelector('html')
const btnFoco = document.querySelector('.app__card-button--foco')
const btnCurto = document.querySelector('.app__card-button--curto')
const btnLongo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')

btnFoco.addEventListener('click', () => {

    //  
    html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', './imagens/foco.png')
})

btnCurto.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', './imagens/descanso-curto.png')
})

btnLongo.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', './imagens/descanso-longo.png')
})

