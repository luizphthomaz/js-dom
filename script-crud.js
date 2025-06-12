const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list"); // Seleciona a lista de tarefas
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [] // Recupera as tarefas do localStorage (inverso do stringfy) ou inicializa como um array vazio;

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
        alert('Digite uma nova tarefa!')
       }


    }

    const imagemBotao = document.createElement("img");

    imagemBotao.setAttribute('src', './imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg, paragrafo, botao); // Adiciona o SVG, o parágrafo e o botão ao <li>

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
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
    formularioTarefa.classList.add("hidden"); // Esconde o formulário de adicionar tarefa
})

// para cada tarefa no array de tarefas, cria um elemento de tarefa e adiciona à lista de tarefas
tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa); // Cria a tarefa na lista
    ulTarefas.append(elementoTarefa); // Adiciona a tarefa à lista de tarefas
})

function limparFormulario() {
    textarea.value = ''
    formularioTarefa.classList.add('hidden')
}


const btnCancelar = document.querySelector('.app__form-footer__button--cancel')

btnCancelar.addEventListener('click', limparFormulario)
