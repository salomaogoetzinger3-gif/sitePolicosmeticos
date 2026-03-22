const offset = 100; // altura do header

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const id = link.getAttribute('href');
    const section = document.querySelector(id);

    const top = section.offsetTop - offset;

    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });
  });
});