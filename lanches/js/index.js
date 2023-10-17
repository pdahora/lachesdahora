
let carrinho = [];
let total = 0;

function atualizarCarrinho() {
    const carrinhoLista = document.getElementById('carrinho-lista');
    carrinhoLista.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        ${item.nome} -- R$ ${item.preco.toFixed(2)} --
        Quantidade:  ${item.quantidade}
        <button onclick="decrementarQuantidade('${item.nome}', ${item.preco})">-</button>
        <button onclick="incrementarQuantidade('${item.nome}', ${item.preco})">+</button>
        <button onclick="removerDoCarrinho    ('${item.nome}', ${item.preco})">Remover</button>
      `;
        carrinhoLista.appendChild(li);
    });

    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
        itemExistente.precoTotal = itemExistente.quantidade * preco;
    } else {
        carrinho.push({ nome, preco, quantidade: 1, precoTotal: preco });
    }

    total += preco;
    atualizarCarrinho();
}

function removerDoCarrinho(nome) {
    const itemIndex = carrinho.findIndex(item => item.nome === nome);

    if (itemIndex !== -1) {
        const itemRemovido = carrinho.splice(itemIndex, 1)[0];
        total -= itemRemovido.precoTotal;
        atualizarCarrinho();
    }
}

function incrementarQuantidade(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
        itemExistente.precoTotal = itemExistente.quantidade * preco;
        total += preco;
        atualizarCarrinho();
    }
}
function decrementarQuantidade(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente && itemExistente.quantidade > 0) {
        itemExistente.quantidade--;
        if (itemExistente.quantidade < 0) {
            itemExistente.quantidade = 0;
        }

        itemExistente.precoTotal = itemExistente.quantidade * preco;
        total -= preco;
        atualizarCarrinho();
    }
}