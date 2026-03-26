function carregarPagina(pagina) {
  const home = document.getElementById('home')
  const produtos = document.getElementById('produtos')

  home.style.display = 'none'
  produtos.style.display = 'none'

  if (pagina === 'home') {
    home.style.display = 'block'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (pagina === 'produtos') {
    produtos.style.display = 'block'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (pagina === 'ofertas') {
    home.style.display = 'block'
    setTimeout(() => {
      document.querySelector('.presentes')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}

function filtrar(classe) {
  const todos = document.querySelectorAll('.align-produtos-cards .card')
  todos.forEach(card => {
    card.style.display = card.classList.contains(classe) ? 'block' : 'none'
  })
}

function handleHash() {
  const hash = window.location.hash

  if (!hash || hash === '#') {
    carregarPagina('home')
    return
  }

  const semHash = hash.replace('#', '')
  const [secao, query] = semHash.split('?')
  const params = new URLSearchParams(query)
  const categoria = params.get('categoria')

  if (secao === 'produtos') {
    carregarPagina('produtos')

    const todos = document.querySelectorAll('.align-produtos-cards .card')
    todos.forEach(card => {
      if (!categoria || categoria === 'all') {
        card.style.display = 'block'
      } else {
        card.style.display = card.classList.contains(categoria) ? 'block' : 'none'
      }
    })

  } else if (secao === 'visitados') {
    carregarPagina('home')
    setTimeout(() => {
      document.getElementById('visitados')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)

  } else if (secao === 'novidades') {
    carregarPagina('home')
    setTimeout(() => {
      document.getElementById('novidades')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}

// Destaque visual na categoria selecionada
const links = document.querySelectorAll('.produto-link')
links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(l => l.classList.remove('ativo'))
    link.classList.add('ativo')
  })
})

// Clique nos ícones de categoria da home
document.querySelectorAll('.link-visitados').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    window.location.hash = this.getAttribute('href')
    handleHash()
  })
})

window.addEventListener('hashchange', handleHash)
window.addEventListener('load', handleHash)