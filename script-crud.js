const btnAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioTarefa = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");

const tarefas = [];

btnAdicionarTarefa.addEventListener("click", () => {
    // Faz a alternância entre mostrar e esconder o formulário de adicionar tarefa
    formularioTarefa.classList.toggle("hidden");
})

// 
formularioTarefa.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio do formulário

    const tarefa = {
        descricao: textarea.value.trim(), // Remove espaços em branco no início e no final
    }

    tarefas.push(tarefa); // Adiciona a tarefa ao array de tarefas
    textarea.value = ""; // Limpa o campo de texto
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // Salva as tarefas no localStorage
    
    })
