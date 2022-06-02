const open = document.querySelector('#mcOpenMenu');
const close = document.querySelector('#mcCloseMenu');
const mobileMenu = document.querySelector('.mc-mobile-menu');

const openLoginModal = document.querySelector('#openLoginModal');
const closeLoginModal = document.querySelector('#closeLoginModal');
const loginModal = document.querySelector('#loginModal');
const goToLogin = document.querySelector('#goToLogin');

const openRegisterModal = document.querySelector('#goToRegister');
const closeRegisterModal = document.querySelector('#closeRegisterModal');
const registerModal = document.querySelector('#registerModal');

const openProfileModal = document.querySelector('#openProfileModal');
const closeProfileModal = document.querySelector('#closeProfileModal');
const profileModal = document.querySelector('#profileModal');

const openRosterModal = document.querySelector('#openRosterModal');
const closeRosterModal = document.querySelector('#closeRosterModal');
const rosterModal = document.querySelector('#rosterModal');

const showUsername = document.querySelector('#userNameNav');
const showDropdown = document.querySelector('.mc-header-secondary-nav__log-in');

const logout = document.querySelector('#btnLogout');

const getUser = JSON.parse(localStorage.getItem('userInfo'));
const checkAuth = JSON.parse(localStorage.getItem('auth'));

const defaultAvaUrl = './assets/images/default-ava.png';

const handleMobileMenu = () => {
  open.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(0)';
  });

  close.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(100%)';
  });
};

const handleAuthor = () => {
  if (checkAuth === 1 && getUser) {
    const getName = getUser?.name.split(' ').slice(-1).join('');
    showUsername.innerText = getName;
    showDropdown.classList.add('showSecondNav');

    openProfileModal.addEventListener('click', () => {
      profileModal.classList.add('mc-modal-active');
    });

    openRosterModal.addEventListener('click', () => {
      rosterModal.classList.add('mc-modal-active');
    });

    logout.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload();
    });
  } else {
    showDropdown.classList.remove('showSecondNav');
    handleFormLogin();
  }
};

const handleFormLogin = () => {
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
};

const handleCloseModal = () => {
  closeLoginModal.addEventListener('click', () => {
    loginModal.classList.remove('mc-modal-active');
  });
  closeRegisterModal.addEventListener('click', () => {
    registerModal.classList.remove('mc-modal-active');
  });
  closeProfileModal.addEventListener('click', () => {
    profileModal.classList.remove('mc-modal-active');
    preImage.src = !getUser.profileImg ? defaultAvaUrl : getUser.profileImg;
  });
  closeRosterModal.addEventListener('click', () => {
    rosterModal.classList.remove('mc-modal-active');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      loginModal.classList.remove('mc-modal-active');
      registerModal.classList.remove('mc-modal-active');
      rosterModal.classList.remove('mc-modal-active');
      profileModal.classList.remove('mc-modal-active');
      preImage.src = !getUser.profileImg ? defaultAvaUrl : getUser.profileImg;
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
    if (e.target == profileModal) {
      profileModal.classList.remove('mc-modal-active');
      preImage.src = !getUser.profileImg ? defaultAvaUrl : getUser.profileImg;
    }
  });
};

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

const showAvatar = () => {
  const ava = document.querySelector('.mc-header-log-in__avatar');
  ava.innerHTML = !getUser.profileImg
    ? '<i class="mc-header-log-in__user-icon fa-regular fa-circle-user"></i>'
    : `<img src='${getUser.profileImg}' class='mc-header-log-in__user-ava' alt='avatar'/>`;
};

window.addEventListener('resize', hideMenu);
window.addEventListener('load', hideMenu);
handleMobileMenu();
handleAuthor();
handleCloseModal();
showAvatar();

const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    // pauseOnMouseEnter: true,
  },
  effect: 'fade',
});
