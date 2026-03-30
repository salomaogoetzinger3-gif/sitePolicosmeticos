function menuShow(){
    let menuMobile = document.querySelector('.mobile-menu');
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
    } else{
        menuMobile.classList.add('open')
    }
}

window.addEventListener("scroll", function () {
  const header = document.querySelector(".main-header");

  if (window.scrollY > 50) {
    header.classList.add("ativo");
  } else {
    header.classList.remove("ativo");
  }
});