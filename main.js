let listaItens = [];
let itemEditar;

const itemNovo = document.getElementById("input-novoElemento");
const form = document.getElementById("form");
const itensNovos = document.getElementById("itensNovos");
const itensComprados = document.getElementById("itensComprados");
const listaRecuperada = localStorage.getItem("listaItens");

function atualizaLocalStorage() {
    localStorage.setItem("listaItens", JSON.stringify(listaItens));
}

if (listaRecuperada) {
    listaItens = JSON.parse(listaRecuperada);
} else {
    listaItens = [];
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    salvarElementos();
    adicionarMantimentos();
});

function salvarElementos() {
    const valorItem = itemNovo.value;
    const checarItem = listaItens.some((elemento) => elemento.valor.toUpperCase() === valorItem.toUpperCase());

    if (checarItem) {
        alert("Item já está na lista");
    } else {
        listaItens.push({
            valor: valorItem,
            checar: false,
        });
    }
}

function adicionarMantimentos() {
    itensNovos.innerHTML = "";
    itensComprados.innerHTML = "";

    listaItens.forEach((elemento, index) => {
        if (elemento.checar) {
            itensComprados.innerHTML += ` <li id="item-comprado" data-value="${index}">
            <div>
            <input type="checkbox" checked class="input-marca" />
            <span id="item-comp">${elemento.valor}</span>
            </div>
            <i class="mdi mdi-delete deletar"></i>
        </li>`;
        } else {
            itensNovos.innerHTML += ` <li id="novo-item" data-value="${index}">
            <div class="inputs-in">
            <input type="checkbox" class="input-marca" />
            <input type="text" id="item" value="${elemento.valor}" class="input" ${index != itemEditar ? "disabled" : ""}></input>
            </div>
            <div class="icons">
           ${index == itemEditar ? '<i onclick="salvarEdicao()" class="mdi mdi-content-save-check"></i>' : '<i class="mdi mdi-file-edit-outline editar"></i>'}
            <i class="mdi mdi-delete deletar"></i>
            </div>
        </li>`;
        }

        itemNovo.value = "";
        itemNovo.focus();
    });

    const inputCheck = document.querySelectorAll("input[type='checkbox']");

    inputCheck.forEach((elemento) => {
        elemento.addEventListener("click", (ev) => {
            const valor = ev.target.parentElement.parentElement.getAttribute("data-value");
            listaItens[valor].checar = ev.target.checked;
            console.log(listaItens[valor].checar);
            adicionarMantimentos();
        });
    });

    const deletarObjetos = document.querySelectorAll(".deletar");
    deletarObjetos.forEach((elemento) => {
        elemento.addEventListener("click", (ev) => {
            const valor = ev.target.parentElement.parentElement.getAttribute("data-value");
            listaItens.splice(valor, 1);
            adicionarMantimentos();
        });
    });

    const editarItens = document.querySelectorAll(".editar");
    editarItens.forEach((elemento) => {
        elemento.addEventListener("click", (ev) => {
            itemEditar = ev.target.parentElement.parentElement.getAttribute("data-value");
            adicionarMantimentos();
        });
    });

    atualizaLocalStorage();
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemEditar}"] input[type="text"]`);

    listaItens[itemEditar].valor = itemEditado.value;
    console.log(listaItens);
    itemEditar = -1;
    adicionarMantimentos();
}
