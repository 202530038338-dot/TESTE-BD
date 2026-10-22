const URL = "https://srsfnmcfcegyzksescdc.supabase.co";

const KEY = "sb_publishable_qiBWuQjwoZ-9mjLxS4T2Hw_ZmS6Ku3P";


// SALVAR NOME E PREÇO DO PRODUTO
async function salvar() {

    const nome = document.getElementById("nome").value.trim();

    const preco = document.getElementById("preco").value;

    if (nome === "") {
        alert("Digite o nome do produto!");
        return;
    }

    if (preco === "" || !Number.isFinite(Number(preco)) || Number(preco) < 0) {
        alert("Digite um preço válido!");
        return;
    }

    try {

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
                    nome: nome,
                    preco: Number(preco)
                })
            }
        );

        if (resposta.ok) {

            document.getElementById("mensagem").innerText =
                "Produto salvo com sucesso!";

            document.getElementById("nome").value = "";
            document.getElementById("preco").value = "";

            listarProdutos();

        } else {

            const erro = await resposta.text();

            console.error(erro);

            document.getElementById("mensagem").innerText =
                "Erro ao salvar. Confira o console.";

        }

    } catch (erro) {

        console.error(erro);

        document.getElementById("mensagem").innerText =
            "Não foi possível conectar ao Supabase.";

    }
}


// LISTAR NOME E PREÇO DOS PRODUTOS
async function listarProdutos() {

    try {

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

        if (!resposta.ok) {
            console.error(await resposta.text());
            return;
        }

        const produtos = await resposta.json();

        const lista = document.getElementById("lista");

        lista.innerHTML = "";

        produtos.forEach(produto => {

            const item = document.createElement("li");

            const precoFormatado = Number(produto.preco)
                .toFixed(2)
                .replace(".", ",");

            item.innerText =
                produto.id + " - " +
                produto.nome + " - R$ " +
                precoFormatado;

            lista.appendChild(item);

        });

    } catch (erro) {

        console.error("Erro ao consultar produtos:", erro);

    }
}


// CARREGAR PRODUTOS AO ABRIR A PÁGINA
listarProdutos();
