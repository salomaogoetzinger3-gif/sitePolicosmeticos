function menuShow(){
    let menuMobile = document.querySelector('.btn-expandir');
    if(menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open')
    }
}