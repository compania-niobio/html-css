// Dados dos produtos
const produtos = [
    {
        id: 1,
        nome: 'Fone Bluetooth',
        categoria: 'fones',
        preco: 129.90,
        desconto: 99.90,
        descricao: 'Fone com excelente qualidade de som e bateria de 20h',
        emoji: '🎧'
    },
    {
        id: 2,
        nome: 'Teclado Mecânico RGB',
        categoria: 'teclados',
        preco: 349.90,
        desconto: 299.90,
        descricao: 'Teclado mecânico com iluminação RGB personalizada',
        emoji: '⌨️'
    },
    {
        id: 3,
        nome: 'Mouse Gamer',
        categoria: 'mouses',
        preco: 189.90,
        desconto: 159.90,
        descricao: 'Mouse com sensor de 12800 DPI e 8 botões programáveis',
        emoji: '🖱️'
    },
    {
        id: 4,
        nome: 'Monitor 4K 27"',
        categoria: 'monitores',
        preco: 1299.90,
        desconto: 999.90,
        descricao: 'Monitor 4K com 144Hz para jogos e trabalho profissional',
        emoji: '🖥️'
    },
    {
        id: 5,
        nome: 'Fone Wireless Premium',
        categoria: 'fones',
        preco: 249.90,
        desconto: 199.90,
        descricao: 'Fone com cancelamento de ruído ativo',
        emoji: '🎧'
    },
    {
        id: 6,
        nome: 'Teclado Sem Fio',
        categoria: 'teclados',
        preco: 159.90,
        desconto: 119.90,
        descricao: 'Teclado silencioso sem fio com alcance de 10m',
        emoji: '⌨️'
    },
    {
        id: 7,
        nome: 'Mouse Logitech',
        categoria: 'mouses',
        preco: 129.90,
        desconto: 89.90,
        descricao: 'Mouse ergonômico com bateria de 18 meses',
        emoji: '🖱️'
    },
    {
        id: 8,
        nome: 'Monitor Curvo 144Hz',
        categoria: 'monitores',
        preco: 799.90,
        desconto: 599.90,
        descricao: 'Monitor curvo 1440p com taxa de atualização de 144Hz',
        emoji: '🖥️'
    },
    {
        id: 9,
        nome: 'Fone Para Estúdio',
        categoria: 'fones',
        preco: 599.90,
        desconto: 499.90,
        descricao: 'Fone profissional com resposta de frequência 20Hz-20kHz',
        emoji: '🎧'
    },
    {
        id: 10,
        nome: 'Teclado Gamer RGB',
        categoria: 'teclados',
        preco: 429.90,
        desconto: 349.90,
        descricao: 'Teclado com macro personalizáveis e 16,8 milhões de cores',
        emoji: '⌨️'
    },
    {
        id: 11,
        nome: 'Mouse Razer Pro',
        categoria: 'mouses',
        preco: 399.90,
        desconto: 319.90,
        descricao: 'Mouse profissional com sensor 20000 DPI',
        emoji: '🖱️'
    },
    {
        id: 12,
        nome: 'Monitor Ultra Wide',
        categoria: 'monitores',
        preco: 1599.90,
        desconto: 1299.90,
        descricao: 'Monitor ultrawide 34" com 3440x1440 de resolução',
        emoji: '🖥️'
    }
];

// Carrinho
let carrinho = [];

// Elementos DOM
const gridProdutos = document.getElementById('grid-produtos');
const modal = document.getElementById('modal-carrinho');
const btnCarrinho = document.getElementById('btn-carrinho');
const btnFechar = document.querySelector('.fechar');
const btnLimpar = document.getElementById('btn-limpar-carrinho');
const btnFinalizar = document.getElementById('btn-finalizar');
const filtroButtons = document.querySelectorAll('.filtro-btn');
const carrinhoItens = document.getElementById('carrinho-itens');
const contadorCarrinho = document.getElementById('contador-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');

let filtroAtivo = 'todos';

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos(produtos);
    carregarCarrinho();
    configurarEventos();
});

// Renderizar produtos
function renderizarProdutos(produtosParaRender) {
    gridProdutos.innerHTML = '';

    produtosParaRender.forEach(produto => {
        const div = document.createElement('div');
        div.className = 'produto';
        div.innerHTML = `
            <div class="produto-imagem">${produto.emoji}</div>
            <div class="produto-info">
                <div class="produto-categoria">${produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1)}</div>
                <h3 class="produto-titulo">${produto.nome}</h3>
                <p class="produto-descricao">${produto.descricao}</p>
                <div class="produto-preco">
                    R$ ${produto.desconto.toFixed(2)}
                    <span class="desconto">R$ ${produto.preco.toFixed(2)}</span>
                </div>
                <button class="btn-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
                    + Adicionar ao Carrinho
                </button>
            </div>
        `;
        gridProdutos.appendChild(div);
    });

    atualizarBotoesAdicionados();
}

// Filtrar produtos
function filtrarProdutos(categoria) {
    if (categoria === 'todos') {
        renderizarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(produtosFiltrados);
    }
}

// Eventos de filtro
filtroButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filtroButtons.forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        filtroAtivo = btn.dataset.filtro;
        filtrarProdutos(filtroAtivo);
    });
});

// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarContadorCarrinho();
    atualizarBotoesAdicionados();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// Remover do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    renderizarCarrinho();
    atualizarContadorCarrinho();
    atualizarBotoesAdicionados();
}

// Alterar quantidade
function alterarQuantidade(id, quantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        if (quantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            item.quantidade = quantidade;
            salvarCarrinho();
            renderizarCarrinho();
        }
    }
}

// Renderizar carrinho
function renderizarCarrinho() {
    carrinhoItens.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<div class="carrinho-vazio">Seu carrinho está vazio</div>';
        totalCarrinho.textContent = 'R$ 0,00';
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.desconto * item.quantidade;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'carrinho-item';
        div.innerHTML = `
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p>${item.emoji} Preço unitário: R$ ${item.desconto.toFixed(2)}</p>
            </div>
            <div class="item-controles">
                <button class="quantidade-btn" onclick="alterarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                <input type="number" class="item-quantidade" value="${item.quantidade}" min="1" onchange="alterarQuantidade(${item.id}, this.value)">
                <button class="quantidade-btn" onclick="alterarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                <span class="item-preco">R$ ${subtotal.toFixed(2)}</span>
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
            </div>
        `;
        carrinhoItens.appendChild(div);
    });

    totalCarrinho.textContent = `R$ ${total.toFixed(2)}`;
}

// Atualizar contador
function atualizarContadorCarrinho() {
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadorCarrinho.textContent = total;
}

// Atualizar status dos botões
function atualizarBotoesAdicionados() {
    document.querySelectorAll('.btn-adicionar').forEach((btn, index) => {
        const produto = produtos[index % produtos.length];
        const existeNoCarrinho = carrinho.some(item => item.id === produto.id);
        if (existeNoCarrinho) {
            btn.classList.add('adicionado');
            btn.textContent = '✓ No Carrinho';
        } else {
            btn.classList.remove('adicionado');
            btn.textContent = '+ Adicionar ao Carrinho';
        }
    });
}

// Modal
function abrirModal() {
    modal.style.display = 'block';
    renderizarCarrinho();
}

function fecharModal() {
    modal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Limpar carrinho
function limparCarrinho() {
    if (carrinho.length > 0 && confirm('Deseja limpar todo o carrinho?')) {
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
        atualizarBotoesAdicionados();
    }
}

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Carrinho vazio! Adicione produtos antes de finalizar a compra.');
        return;
    }
    
    const total = carrinho.reduce((acc, item) => acc + (item.desconto * item.quantidade), 0);
    alert(`Compra realizada com sucesso!\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela sua compra!`);
    
    carrinho = [];
    salvarCarrinho();
    fecharModal();
    atualizarContadorCarrinho();
    atualizarBotoesAdicionados();
}

// Notificação
function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = mensagem;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 2000);
}

// LocalStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarContadorCarrinho();
        atualizarBotoesAdicionados();
    }
}

// Eventos
function configurarEventos() {
    btnCarrinho.addEventListener('click', abrirModal);
    btnFechar.addEventListener('click', fecharModal);
    btnLimpar.addEventListener('click', limparCarrinho);
    btnFinalizar.addEventListener('click', finalizarCompra);
}
