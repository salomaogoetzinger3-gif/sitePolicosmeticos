const cards = document.querySelectorAll('.link-visitados');

cards.forEach(card => {
  const img = card.querySelector('img');

  card.addEventListener('mouseenter', () => {
    img.src = img.dataset.gif;
  });

  card.addEventListener('mouseleave', () => {
    img.src = img.dataset.png;
  });
});

