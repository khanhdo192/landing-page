var open = document.querySelector('#mcOpenMenu');
var close = document.querySelector('#mcCloseMenu');
var mobileMenu = document.querySelector('.mc-mobile-menu');

var openModal = document.querySelector('#openModal');
var closeModal = document.querySelector('#closeModal');
var formModal = document.querySelector('#formModal');

var openRosterModal = document.querySelector('#openRosterModal');
var closeRosterModal = document.querySelector('#closeRosterModal');
var rosterModal = document.querySelector('#rosterModal');

open.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});

close.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});

openModal.addEventListener('click', () => {
  formModal.classList.add('mc-modal-active');
});
openRosterModal.addEventListener('click', () => {
  rosterModal.classList.add('mc-modal-active');
});

closeModal.addEventListener('click', () => {
  formModal.classList.remove('mc-modal-active');
});
closeRosterModal.addEventListener('click', () => {
  rosterModal.classList.remove('mc-modal-active');
});

window.addEventListener('click', (e) => {
  if (e.target == formModal) {
    formModal.classList.remove('mc-modal-active');
  }
  if (e.target == rosterModal) {
    rosterModal.classList.remove('mc-modal-active');
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

const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    // pauseOnMouseEnter: true,
  },
  effect: 'fade',
});
