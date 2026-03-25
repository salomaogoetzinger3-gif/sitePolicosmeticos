const elementos = document.querySelectorAll('.animar');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('ativo');
      }, index * 300);
    }
  });
});

elementos.forEach(el => observer.observe(el));


function filtrar(categoria) {
  const produtos = document.querySelectorAll('.produto');

  produtos.forEach(produto => {
    if (categoria === 'all') {
      produto.style.display = 'list-item';
    } else if (produto.classList.contains(categoria)) {
      produto.style.display = 'list-item';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Função para mostrar a seção de produtos e esconder a home inicial
function mostrarProdutos(categoria) {
  const visitados = document.getElementById('visitados');
  const homeProdutos = document.getElementById('produtos');

  // Esconde home
  visitados.style.display = 'none';

  // Mostra produtos
  homeProdutos.style.display = 'block';

  // Filtra
  filtrar(categoria);
}

// Adiciona clique nos cards/categorias da home
const linksVisitados = document.querySelectorAll('.link-visitados');

linksVisitados.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    // Pega categoria do href, ex: #produtos?categoria=perfume
    const href = link.getAttribute('href');
    const categoria = href.split('categoria=')[1];

    mostrarProdutos(categoria);

    // Atualiza URL do hash sem recarregar
    window.location.hash = `#produtos?categoria=${categoria}`;
  });
});

// Caso o usuário entre direto via URL com hash
function pegarCategoriaDaURL() {
  const hash = window.location.hash;

  if (hash.includes('categoria=')) {
    const categoria = hash.split('categoria=')[1];

    // Esconde home inicial e mostra produtos filtrados
    mostrarProdutos(categoria);
  } else {
    // Se não tiver categoria, mostra home
    document.getElementById('visitados').style.display = 'block';
    document.getElementById('produtos').style.display = 'none';
  }
}

window.addEventListener('load', pegarCategoriaDaURL);
window.addEventListener('hashchange', pegarCategoriaDaURL);



