const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list"); // Seleciona a lista de tarefas
let paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] // Recupera as tarefas do localStorage (inverso do stringfy) ou inicializa como um array vazio;

let tarefaSelecionada = null
let liTarefaSelecionada = null

function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // Salva as tarefas no localStorage 
}

function criarTarefa(tarefa) {
    const li = document.createElement("li"); // Cria um elemento <li>
    li.classList.add("app__section-task-list-item");

    const svg = document.createElement("svg");
    svg.innerHTML = `
        
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            </svg>
        
    `

    const paragrafo = document.createElement("p");
    paragrafo.textContent = tarefa.descricao; // Define o texto do parágrafo como a descrição da tarefa
    paragrafo.classList.add("app__section-task-list-item-description");


    const botao = document.createElement("button");
    botao.classList.add("app_button-edit");   

    botao.onclick = () => {
       const novaDescricao = prompt('Qual é o nome da nova tarefa?')
       
       if (novaDescricao) {
           paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
           atualizarTarefas()
       } else {
        exibirMensagem('Digite uma nova tarefa!')
       }


    }

    // FALTA ADICIONAR A FUNCIONALIDADE DE EXCLUIR TAREFA
    const imagemExcluir = document.createElement("img");

    const imagemEdit = document.createElement("img");

    imagemExcluir.setAttribute('src', './imagens/trash.png')
    imagemEdit.setAttribute('src', './imagens/edit.png')

    botao.append(imagemEdit)
    li.append(svg, paragrafo, imagemExcluir, botao); // Adiciona o SVG, o parágrafo e o botão ao <li>

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete')

        // botão editar desabilitado
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
             document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
                
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = ''
                tarefaSelecionada = null
                liTarefaSelecionada = null
                return
            }
    
            tarefaSelecionada = tarefa
            liTarefaSelecionada = li
            paragrafoDescricaoTarefa.textContent = tarefa.descricao
           
            li.classList.add('app__section-task-list-item-active')
        }
    }


    return li; // Retorna o elemento <li> completo
}

btnAdicionarTarefa.addEventListener("click", () => {
    // Faz a alternância entre mostrar e esconder o formulário de adicionar tarefa
    formularioTarefa.classList.toggle("hidden");
    textarea.focus()
})

// 
formularioTarefa.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const tarefa = {
        descricao: textarea.value.trim(), // Remove espaços em branco no início e no final
    }

    tarefas.push(tarefa); // Adiciona a tarefa ao array de tarefas
    textarea.value = ""; // Limpa o campo de texto
    
    const elementoTarefa = criarTarefa(tarefa); // Cria o elemento de tarefa
    ulTarefas.append(elementoTarefa); // Adiciona o elemento de tarefa à lista de tarefas
    atualizarTarefas()
    textarea.value = ""; // Limpa o campo de texto após adicionar a tarefa
})

// para cada tarefa no array de tarefas, cria um elemento de tarefa e adiciona à lista de tarefas
tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa); // Cria a tarefa na lista
    ulTarefas.append(elementoTarefa); // Adiciona a tarefa à lista de tarefas
})

function limparFormulario() {
    textarea.value = ''
}

function exibirMensagem(texto, duracao = 3000) {
  const div = document.getElementById('mensagem');
  div.textContent = texto;
  div.classList.add('visivel');

  setTimeout(() => {
    div.classList.remove('visivel');
  }, duracao);
}


const btnSalvar = document.querySelector('.app__form-footer__button--confirm')

textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        btnSalvar.click()
    }
})

const btnDeletar = document.querySelector('.app__form-footer__button--delete')
btnDeletar.onclick = () => {
    limparFormulario()
    textarea.focus()
}



const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

btnCancelar.addEventListener('click', () => {
    limparFormulario()
    formularioTarefa.classList.add('hidden')
})

// customizando o evento para quando o cronômetro zerar. Será adicionado cor de fundo verde na tarefa que estiver selecionada.
document.addEventListener('cronometroFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')

        // botão editar desabilitado
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true

        atualizarTarefas()
    }
})

btnRemoverConcluidas.onclick = () => {
    const seletor = '.app__section-task-list-item-complete'
    document.querySelectorAll(seletor).forEach(elemento => {

        // exclui um elemento do DOM
        elemento.remove()
    })

    paragrafoDescricaoTarefa.textContent = ''
    tarefas = tarefas.filter(tarefa => !tarefa.completa)

    // atualiza tarefas no localStorage
    atualizarTarefas()
}