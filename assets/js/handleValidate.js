function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  const selectorRules = {};

  // validate
  function validate(inputElement, rule) {
    const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
      options.errorSelector
    );
    let errorMessage;

    // get rules of selector
    const rules = selectorRules[rule.selector];

    // loop each rule and check
    for (let i = 0; i < rules.length; ++i) {
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
  const formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      e.preventDefault();

      const isFormValid = true;

      // loop each rules and validate
      options.rules.forEach(function (rule) {
        const inputElement = formElement.querySelector(rule.selector);
        const isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // submit with javascript
        if (typeof options.onSubmit === 'function') {
          const enableInputs = formElement.querySelectorAll('[name]');
          const formValues = Array.from(enableInputs).reduce(function (values, input) {
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
                if (input.files.length != 0) {
                  values[input.name] =
                    input.files.length == 0
                      ? JSON.parse(localStorage.getItem('userInfo')).profileImg
                      : document.querySelector('#preImg').src;
                } else {
                  values[input.name] = JSON.parse(localStorage.getItem('userInfo')).profileImg;
                }
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

      const inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        // onblur
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        // oninput
        inputElement.oninput = function () {
          const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
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
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
