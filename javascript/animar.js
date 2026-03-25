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

// 👇 ADICIONA ISSO
function pegarCategoriaDaURL() {
  const hash = window.location.hash;

  if (hash.includes('categoria=')) {
    const categoria = hash.split('categoria=')[1];
    filtrar(categoria);
  } else {
    filtrar('all');
  }
}

// 👇 ADICIONA ISSO
window.addEventListener('load', pegarCategoriaDaURL);
window.addEventListener('hashchange', pegarCategoriaDaURL);



