const imagens = document.querySelectorAll('.gif');

imagens.forEach(img => {
  img.addEventListener('click', () => {

    if (img.classList.contains('ativo')) {
      img.src = img.dataset.png;
      img.classList.remove('ativo');
    } else {
      img.src = img.dataset.gif;
      img.classList.add('ativo');
    }

  });
});