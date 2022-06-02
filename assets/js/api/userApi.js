import { apiUrl } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  Validator({
    form: '#registerForm',
    formGroupSelector: '.mc-form__group',
    errorSelector: '.mc-form__message',
    rules: [
      Validator.isRequired('#name', 'Please type your fullname'),
      Validator.isEmail('#email'),
      Validator.minLength('#pw', 6),
      Validator.isRequired('#pw'),
      Validator.isConfirmed(
        '#pwConfirm',
        () => {
          return document.querySelector('#registerForm #pw').value;
        },
        'Password not match'
      ),
    ],
    onSubmit: async (data) => {
      //   console.log(data);
      const getUser = await axios.get(apiUrl + 'users');
      const dataUser = getUser.data;
      const checkUserExist = dataUser.some((item) => {
        return item.email === data.email;
      });
      if (checkUserExist) {
        const error = document.querySelectorAll('#registerForm .mc-form__message')[1];
        error.innerText = 'Email already exist';
      } else {
        await axios.post(apiUrl + 'users', data);
        window.location.reload();
      }
    },
  });

  Validator({
    form: '#loginForm',
    formGroupSelector: '.mc-form__group',
    errorSelector: '.mc-form__message',
    rules: [
      Validator.isEmail('#emailLogin'),
      Validator.minLength('#pwLogin', 6),
      Validator.isRequired('#pwLogin'),
    ],
    onSubmit: async (data) => {
      //   console.log(data);
      const getUser = await axios.get(apiUrl + 'users');
      const dataUser = getUser.data;
      //   console.log(dataUser);
      const checkUser = dataUser.find((item) => {
        return item.email === data.email && item.password === data.password;
      });
      if (checkUser) {
        localStorage.setItem('userInfo', JSON.stringify(checkUser));
        localStorage.setItem('auth', 1);
        window.location.reload();
      } else {
        const error = document.querySelectorAll('#loginForm .mc-form__message');
        error[error.length - 1].innerText = 'Email or password incorrect';
      }
    },
  });

  Validator({
    form: '#profileForm',
    formGroupSelector: '.mc-form__group',
    errorSelector: '.mc-form__message',
    rules: [
      Validator.isRequired('#nameAuth', 'Please type your fullname'),
      Validator.isRequired('#pwAuth'),
      Validator.isConfirmed(
        '#pwAuth',
        () => {
          return document.querySelector('#profileForm #pwCheck').value;
        },
        'Wrong password'
      ),
      // Validator.minLength('#pwNew', 6),
      // Validator.isRequired('#pwNew'),
    ],
    onSubmit: async (data) => {
      console.log(data);
      const updateData = {
        name: data.name,
        password: data.passwordNew || data.passwordOld,
        ...data,
      };
      delete updateData.passwordOld;
      delete updateData.passwordNew;
      delete updateData.passwordCheck;
      console.log(updateData);
      // await axios.put(apiUrl + 'users/' + data.id, updateData);
      // localStorage.setItem('userInfo', JSON.stringify(updateData));
      // window.location.reload();
    },
  });
});
