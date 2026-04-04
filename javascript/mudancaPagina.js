// ─── Navegação entre páginas ───────────────────────────────────────────────
function carregarPagina(pagina) {
  const home = document.getElementById("home");
  const produtos = document.getElementById("produtos");

  home.style.display = "none";
  produtos.style.display = "none";

  if (pagina === "home") {
    home.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (pagina === "produtos") {
    produtos.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
    injetarBotaoFiltros();
  }

  if (pagina === "ofertas") {
    home.style.display = "block";
    setTimeout(() => {
      document
        .querySelector(".presentes")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// ─── Filtrar produtos ──────────────────────────────────────────────────────
let chipSelecionado = "all";

function filtrar(classe) {
  chipSelecionado = classe;

  const todos = document.querySelectorAll(".align-produtos-cards .card");
  todos.forEach((card) => {
    if (!classe || classe === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(classe) ? "block" : "none";
    }
  });

  // Destaque ativo na sidebar desktop
  document
    .querySelectorAll(".produto-link")
    .forEach((l) => l.classList.remove("ativo"));
  const linkAtivo = document.querySelector(
    `.item-produto-link[href="#produtos?categoria=${classe}"]`,
  );
  if (linkAtivo) linkAtivo.closest(".produto-link")?.classList.add("ativo");

  // Sincroniza chips do drawer mobile
  document.querySelectorAll(".filtro-chip").forEach((chip) => {
    chip.classList.toggle("ativo", chip.dataset.categoria === classe);
  });

  // Badge no botão Filtros
  const badge = document.querySelector(".filtro-ativo-badge");
  if (badge) badge.style.display = classe === "all" ? "none" : "inline-block";
}

// ─── Leitura do hash da URL ────────────────────────────────────────────────
function handleHash() {
  const hash = window.location.hash;

  if (!hash || hash === "#") {
    carregarPagina("home");
    return;
  }

  const semHash = hash.replace("#", "");
  const [secao, query] = semHash.split("?");
  const params = new URLSearchParams(query);
  const categoria = params.get("categoria");

  if (secao === "produtos") {
    carregarPagina("produtos");
    filtrar(categoria || "all");
  } else if (secao === "visitados") {
    carregarPagina("home");
    setTimeout(() => {
      document
        .getElementById("visitados")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  } else if (secao === "novidades") {
    carregarPagina("home");
    setTimeout(() => {
      document
        .getElementById("novidades")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// Destaque visual na categoria selecionada (sidebar desktop)
const links = document.querySelectorAll(".produto-link");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("ativo"));
    link.classList.add("ativo");
  });
});

// Clique nos ícones de categoria da home
document.querySelectorAll(".link-visitados").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.hash = this.getAttribute("href");
    handleHash();
  });
});

window.addEventListener("hashchange", handleHash);

window.addEventListener("load", function () {
  history.replaceState(null, "", window.location.pathname);
  carregarPagina("home");
});

// ─── Drawer Mobile ─────────────────────────────────────────────────────────
const _categorias = [
  { label: "Todos", valor: "all" },
  { label: "Perfumes", valor: "perfume" },
  { label: "Hidratantes", valor: "hidratante" },
  { label: "Sabonetes", valor: "sabonete" },
  { label: "Pedrarias", valor: "pedrarias" },
  { label: "Maquiagem", valor: "makeup" },
  { label: "protetor solar", valor: "protetor" },
  { label: "Desodorantes", valor: "desodorante" },
  { label: "Canécas", valor: "canecas" },
];

const _marcas = [
  { label: "Natura", valor: "natura" },
  { label: "O Boticário", valor: "oboticario" },
  { label: "Avon", valor: "avon" },
  { label: "Cacau Show", valor: "cacaushow" },
];

function criarDrawer() {
  if (document.getElementById("filtroDrawer")) return;

  const overlay = document.createElement("div");
  overlay.className = "filtro-overlay";
  overlay.id = "filtroOverlay";
  overlay.addEventListener("click", fecharDrawer);

  const drawer = document.createElement("div");
  drawer.className = "filtro-drawer";
  drawer.id = "filtroDrawer";

  drawer.innerHTML = `
    <div class="filtro-drawer-handle"></div>
    <div class="filtro-drawer-header">
      <h2 class="filtro-drawer-titulo">Filtros</h2>
      <button class="filtro-drawer-fechar" onclick="fecharDrawer()" aria-label="Fechar filtros">&#x2715;</button>
    </div>
    <div class="filtro-secao">
      <p class="filtro-secao-titulo">CATEGORIA</p>
      <ul class="filtro-chips">
        ${_categorias
          .map(
            (c) => `
          <li class="filtro-chip ${c.valor === chipSelecionado ? "ativo" : ""}"
              data-categoria="${c.valor}"
              onclick="selecionarChip(this, '${c.valor}')">
            ${c.label}
          </li>`,
          )
          .join("")}
      </ul>
    </div>
    <div class="filtro-secao">
      <p class="filtro-secao-titulo">MARCAS</p>
      <ul class="filtro-chips">
        ${_marcas
          .map(
            (m) => `
          <li class="filtro-chip ${m.valor === chipSelecionado ? "ativo" : ""}"
              data-categoria="${m.valor}"
              onclick="selecionarChip(this, '${m.valor}')">
            ${m.label}
          </li>`,
          )
          .join("")}
      </ul>
    </div>
    <button class="filtro-btn-aplicar" onclick="aplicarFiltro()">Ver produtos</button>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

function abrirDrawer() {
  criarDrawer();
  document.getElementById("filtroOverlay").classList.add("ativo");
  document.getElementById("filtroDrawer").classList.add("ativo");
  document.body.style.overflow = "hidden";
}

function fecharDrawer() {
  document.getElementById("filtroOverlay")?.classList.remove("ativo");
  document.getElementById("filtroDrawer")?.classList.remove("ativo");
  document.body.style.overflow = "";
}

function selecionarChip(el, categoria) {
  document
    .querySelectorAll(".filtro-chip")
    .forEach((c) => c.classList.remove("ativo"));
  el.classList.add("ativo");
  chipSelecionado = categoria;
}

function aplicarFiltro() {
  filtrar(chipSelecionado);
  fecharDrawer();
}

// ─── Injeta botão Filtros (visível só no mobile via CSS) ───────────────────
function injetarBotaoFiltros() {
  if (document.querySelector(".btn-filtros-mobile")) return;
  const areaPesquisa = document.querySelector(".align-pesquisa-produtos");
  if (!areaPesquisa) return;

  const btn = document.createElement("button");
  btn.className = "btn-filtros-mobile";
  btn.onclick = abrirDrawer;
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/>
      <line x1="8" y1="12" x2="20" y2="12"/>
      <line x1="12" y1="18" x2="20" y2="18"/>
    </svg>
    Filtros
    <span class="filtro-ativo-badge" style="display:none;">1</span>
  `;
  areaPesquisa.insertAdjacentElement("afterend", btn);
}

const barraDePesquisa = document.querySelector(".pesquisa-produtos");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const termo = barraDePesquisa.value.toLowerCase();
  const cards = document.querySelectorAll(".align-produtos-cards .card");
  cards.forEach((card) => {
    const nome = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const descricao = card.querySelector("p")?.textContent.toLowerCase() || "";
    const corresponde = nome.includes(termo) || descricao.includes(termo);
    card.style.display = corresponde ? "block" : "none";
  });
}
