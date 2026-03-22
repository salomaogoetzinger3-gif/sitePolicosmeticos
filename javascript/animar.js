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