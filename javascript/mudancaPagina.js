function carregarPagina(pagina) {
  const home = document.getElementById('home')
  const produtos = document.getElementById('produtos')

  // esconde tudo
  home.style.display = 'none'
  produtos.style.display = 'none'

  // mostra só o escolhido
  if (pagina === 'home') {
    home.style.display = 'block'
  }

  if (pagina === 'produtos') {
    produtos.style.display = 'block'
  }
}

const links = document.querySelectorAll('.produto-link')

links.forEach(link => {
  link.addEventListener('click', () => {
    // remove de todos
    links.forEach(l => l.classList.remove('ativo'))

    // adiciona no clicado
    link.classList.add('ativo')
  })
})