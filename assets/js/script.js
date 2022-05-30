var open = document.querySelector('#mcOpenMenu');
var close = document.querySelector('#mcCloseMenu');
var mobileMenu = document.querySelector('.mc-mobile-menu');

var openLoginModal = document.querySelector('#openLoginModal');
var closeLoginModal = document.querySelector('#closeLoginModal');
var loginModal = document.querySelector('#loginModal');
var goToLogin = document.querySelector('#goToLogin');

var openRegisterModal = document.querySelector('#goToRegister');
var closeRegisterModal = document.querySelector('#closeRegisterModal');
var registerModal = document.querySelector('#registerModal');

var openRosterModal = document.querySelector('#openRosterModal');
var closeRosterModal = document.querySelector('#closeRosterModal');
var rosterModal = document.querySelector('#rosterModal');

var showUsername = document.querySelector('#userNameNav');
var showDropdown = document.querySelector('.mc-header-secondary-nav__log-in');

var logout = document.querySelector('#btnLogout');

const getUser = JSON.parse(localStorage.getItem('userInfo'));
const checkAuth = JSON.parse(localStorage.getItem('auth'));

if (checkAuth === 1 && getUser) {
  const getName = getUser?.name.split(' ').slice(-1).join('');
  showUsername.innerText = getName;
  showDropdown.classList.add('showSecondNav');
  logout.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
  });
} else {
  showDropdown.classList.remove('showSecondNav');
  openLoginModal.addEventListener('click', () => {
    loginModal.classList.add('mc-modal-active');
  });
  goToLogin.addEventListener('click', () => {
    registerModal.classList.remove('mc-modal-active');
    loginModal.classList.add('mc-modal-active');
  });
  openRegisterModal.addEventListener('click', () => {
    loginModal.classList.remove('mc-modal-active');
    registerModal.classList.add('mc-modal-active');
  });
}

openRosterModal.addEventListener('click', () => {
  rosterModal.classList.add('mc-modal-active');
});
open.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(0)';
});

close.addEventListener('click', () => {
  mobileMenu.style.transform = 'translateX(100%)';
});

closeLoginModal.addEventListener('click', () => {
  loginModal.classList.remove('mc-modal-active');
});
closeRegisterModal.addEventListener('click', () => {
  registerModal.classList.remove('mc-modal-active');
});
closeRosterModal.addEventListener('click', () => {
  rosterModal.classList.remove('mc-modal-active');
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    loginModal.classList.remove('mc-modal-active');
    registerModal.classList.remove('mc-modal-active');
    rosterModal.classList.remove('mc-modal-active');
  }
});

window.addEventListener('click', (e) => {
  if (e.target == loginModal) {
    loginModal.classList.remove('mc-modal-active');
  }
  if (e.target == registerModal) {
    registerModal.classList.remove('mc-modal-active');
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
