let listaFrutas = [];
const outResposta = document.querySelector("#outResposta"); // Mantém a referência ao elemento
const inFrutas = document.querySelector("#inFrutas"); // Declara no escopo global

function adicionarFrutas() {
    const frutas = inFrutas.value.trim(); // Remove espaços em branco no início e no final

    if (frutas === "") {
        alert("Por favor, insira o nome de uma fruta."); // Evita adicionar entradas vazias
        return;
    }

    listaFrutas.push(frutas); // Adiciona a fruta ao array de frutas
    outResposta.innerHTML = `${listaFrutas.join(', ')}`; // Atualiza o conteúdo do elemento
    inFrutas.value = ""; // Limpa o campo de texto
    inFrutas.focus(); // Coloca o foco de volta no campo de texto

    localStorage.setItem('listaFrutas', JSON.stringify(listaFrutas)); // Salva a lista de frutas no localStorage

}

const btnAdicionar = document.querySelector("#btnAdicionar");
btnAdicionar.addEventListener("click", adicionarFrutas);

inFrutas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") { // Verifica se a tecla pressionada é 'Enter'
        adicionarFrutas(); // Chama a função para adicionar frutas
    }
});