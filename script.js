const URL = "https://srsfnmcfcegyzksescdc.supabase.co";

const KEY = "sb_publishable_qiBWuQjwoZ-9mjLxS4T2Hw_ZmS6Ku3P";


// SALVAR PRODUTO
async function salvar() {

    const nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite o nome do produto!");
        return;
    }

    const resposta = await fetch(
        URL + "/rest/v1/produtos",
        {
            method: "POST",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome
            })
        }
    );

    if (resposta.ok) {

        document.getElementById("mensagem").innerText =
            "Produto salvo!";

        document.getElementById("nome").value = "";

        listarProdutos();

    } else {

        document.getElementById("mensagem").innerText =
            "Erro ao salvar.";

    }
}


// LISTAR PRODUTOS
async function listarProdutos() {

    const resposta = await fetch(
        URL + "/rest/v1/produtos?select=*",
        {
            method: "GET",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY
            }
        }
    );

    const produtos = await resposta.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const item = document.createElement("li");

        item.innerText =
            produto.id + " - " + produto.nome;

        lista.appendChild(item);

    });
}


// CARREGAR PRODUTOS AO ABRIR A PÁGINA
listarProdutos();
// SALVAR PREÇO
async function salvarPreco() {

    const valor = document.getElementById("valor").value;

    if (valor === "" || Number(valor) < 0) {
        alert("Digite um preço válido!");
        return;
    }

    const resposta = await fetch(
        URL + "/rest/v1/preco",
        {
            method: "POST",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                valor: Number(valor)
            })
        }
    );

    if (resposta.ok) {

        document.getElementById("mensagemPreco").innerText =
            "Preço salvo com sucesso!";

        document.getElementById("valor").value = "";

        listarPrecos();

    } else {

        const erro = await resposta.text();

        console.error(erro);

        document.getElementById("mensagemPreco").innerText =
            "Erro ao salvar o preço. Confira o console.";

    }
}


// LISTAR PREÇOS
async function listarPrecos() {

    const resposta = await fetch(
        URL + "/rest/v1/preco?select=*",
        {
            method: "GET",

            headers: {
                "apikey": KEY,
                "Authorization": "Bearer " + KEY
            }
        }
    );

    if (!resposta.ok) {
        console.error(await resposta.text());
        return;
    }

    const precos = await resposta.json();

    const lista = document.getElementById("listaPrecos");

    lista.innerHTML = "";

    precos.forEach(preco => {

        const item = document.createElement("li");

        item.innerText =
            preco.id + " - R$ " +
            Number(preco.valor).toFixed(2).replace(".", ",");

        lista.appendChild(item);

    });
}


// CARREGAR PREÇOS AO ABRIR A PÁGINA
listarPrecos();
