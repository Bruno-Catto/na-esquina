const produtos = [
  {
    nome: "Camisa Polo",
    categoria: "Roupas",
    preco: "R$ 60,00",
    loja: "Loja Estilo",
    endereco: "Rua Afonso Pena, 123",
    imagem: "https://via.placeholder.com/250"
  },
  {
    nome: "Chuveiro Elétrico",
    categoria: "Construção",
    preco: "R$ 90,00",
    loja: "Construcenter",
    endereco: "Av. Central, 456",
    imagem: "https://via.placeholder.com/250"
  },
  {
    nome: "Fone Bluetooth",
    categoria: "Eletrônicos",
    preco: "R$ 120,00",
    loja: "Tech Loja",
    endereco: "Rua das Flores, 789",
    imagem: "https://via.placeholder.com/250"
  }
];

const listaProdutos = document.getElementById("lista-produtos");
const searchInput = document.getElementById("search");

function exibirProdutos(lista) {
  listaProdutos.innerHTML = "";
  lista.forEach(prod => {
    const card = `<div class="card-produto">
      <img src="${prod.imagem}" alt="${prod.nome}">
      <h3>${prod.nome}</h3>
      <p><strong>Preço:</strong> ${prod.preco}</p>
      <p><strong>Loja:</strong> ${prod.loja}</p>
      <p><strong>Endereço:</strong> ${prod.endereco}</p>
    </div>`;
    listaProdutos.innerHTML += card;
  });
}

function filtrarCategoria(categoria) {
  const filtrados = produtos.filter(p => p.categoria === categoria);
  exibirProdutos(filtrados);
}

searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase();
  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    p.loja.toLowerCase().includes(termo)
  );
  exibirProdutos(filtrados);
});

function abrirCadastro() {
  document.getElementById('modalCadastro').style.display = 'flex';
}

function fecharCadastro() {
  document.getElementById('modalCadastro').style.display = 'none';
}

function enviarCadastro() {
  const nome = document.getElementById('nomeLoja').value;
  const endereco = document.getElementById('enderecoLoja').value;
  const categoria = document.getElementById('categoriaLoja').value;
  if (nome && endereco && categoria) {
    alert("Loja cadastrada com sucesso!\nNome: " + nome + "\nEndereço: " + endereco + "\nCategoria: " + categoria);
    fecharCadastro();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}

exibirProdutos(produtos);

// ----------------------------
// Função de Testes Integrada
// ----------------------------

function rodarTestes() {
  const output = [];
  const print = (msg, ok = true) => {
    console.log(`${ok ? '✅' : '❌'} ${msg}`);
    output.push(`${ok ? '✅' : '❌'} ${msg}`);
  };

  try {
    const produtosTeste = [
      {
        nome: "Produto Teste",
        categoria: "Roupas",
        preco: "R$ 99,00",
        loja: "Loja X",
        endereco: "Rua Teste",
        imagem: "https://via.placeholder.com/250"
      }
    ];

    exibirProdutos(produtosTeste);
    const cards = document.querySelectorAll('.card-produto');
    if (cards.length === 1 && cards[0].textContent.includes("Produto Teste")) {
      print("exibirProdutos() funciona corretamente");
    } else {
      print("exibirProdutos() falhou ao exibir produto", false);
    }

    filtrarCategoria("Roupas");
    const filtrados = document.querySelectorAll('.card-produto');
    if (filtrados.length >= 1 && filtrados[0].textContent.includes("Camisa Polo")) {
      print("filtrarCategoria() funciona corretamente");
    } else {
      print("filtrarCategoria() não retornou produto esperado", false);
    }

    abrirCadastro();
    const modal = document.getElementById('modalCadastro');
    if (modal && modal.style.display === 'flex') {
      print("abrirCadastro() exibe o modal corretamente");
    } else {
      print("abrirCadastro() não exibiu o modal", false);
    }

    searchInput.value = "fone";
    searchInput.dispatchEvent(new Event("input"));
    const resultadosBusca = document.querySelectorAll('.card-produto');
    const encontrou = Array.from(resultadosBusca).some(c => c.textContent.toLowerCase().includes("fone"));
    if (encontrou) {
      print("Busca por nome funciona corretamente");
    } else {
      print("Busca por nome falhou", false);
    }

  } catch (err) {
    print("Erro ao executar testes: " + err.message, false);
  }

  return output;
}
