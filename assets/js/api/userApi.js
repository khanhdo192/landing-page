const userApi = 'http://localhost:3000/users';
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
      const getUser = await axios.get(userApi);
      const dataUser = getUser.data;
      const checkUserExist = dataUser.some((item) => {
        return item.email === data.email;
      });
      if (checkUserExist) {
        const error = document.querySelectorAll('#registerForm .mc-form__message')[1];
        error.innerText = 'Email already exist';
      } else {
        await axios.post(userApi, data);
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
      const getUser = await axios.get(userApi);
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
});

function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  // validate
  function validate(inputElement, rule) {
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
      options.errorSelector
    );
    var errorMessage;

    // get rules of selector
    var rules = selectorRules[rule.selector];

    // loop each rule and check
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'));
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add('invalid');
    } else {
      errorElement.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
    }

    return !errorMessage;
  }

  // get element of form need validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      // loop each rules and validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // submit with javascript
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]');
          var formValues = Array.from(enableInputs).reduce(function (values, input) {
            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked'
                ).value;
                break;
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'file':
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }

            return values;
          }, {});
          options.onSubmit(formValues);
        }
        // submit default
        else {
          formElement.submit();
        }
      }
    };

    // loop each rule and handle events
    options.rules.forEach(function (rule) {
      // save rules of input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // onblur
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // oninput
        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
            options.errorSelector
          );
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        };
      });
    });
  }
}

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || 'Please type this field';
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message || 'Email not valid';
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Please type minimum ${min} character`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || 'Value incorrect';
    },
  };
};
