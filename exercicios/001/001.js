const btnTrocar = document.querySelector("#btnTrocar");

const body = document.body;

btnTrocar.addEventListener("click", () =>  {

    // se não tiver a classe "trocar" no body, adiciona a classe "trocar"
    // se já tiver a classe "trocar" no body, remove a classe "trocar"
    body.classList.toggle("trocar");
    })