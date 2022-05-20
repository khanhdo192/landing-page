var open = document.querySelector('#mcOpenMenu');
var close = document.querySelector('#mcCloseMenu');
var mobileMenu = document.querySelector('.mc-mobile-menu');
var openModal = document.querySelector('#openModal');
var closeModal = document.querySelector('#closeModal');
var formModal = document.querySelector('#formModal');

open.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});

close.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});

openModal.addEventListener('click', () => {
  formModal.classList.add('mc-modal-active');
});

closeModal.addEventListener('click', () => {
  formModal.classList.remove('mc-modal-active');
});

window.addEventListener('click', (e) => {
  if (e.target == formModal) {
    formModal.classList.remove('mc-modal-active');
  }
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
