function carregarPagina(pagina) {
  const home = document.getElementById('home')
  const conteudo = document.getElementById('conteudo')

  if (pagina === 'home') {
    home.style.display = 'block'
    conteudo.innerHTML = ''
    return
  }

  // esconde a home para outras páginas
  home.style.display = 'none'

  if (pagina === 'produtos') {
    conteudo.innerHTML = ''
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