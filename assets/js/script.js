var open = document.querySelector('#mcOpenMenu');
var close = document.querySelector('#mcCloseMenu');

var mobileMenu = document.querySelector('.mc-mobile-menu');

open.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});

close.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});

const hideMenu = () => {
  let userWidth = window.innerWidth;
  if (userWidth > 768) {
    mobileMenu.style.transform = 'translateX(100%)';
    open.removeEventListener('click', () => {
      mobileMenu.style.transform = 'translateX(0)';
    });
    close.removeEventListener('click', () => {
      mobileMenu.style.transform = 'translateX(100%)';
    });
  }
};

window.addEventListener('resize', hideMenu);
window.addEventListener('load', hideMenu);
