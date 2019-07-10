export const RegisterValidation = (stateKey, value) => {
  let errors = {};

  switch (stateKey) {
    case 'username':
      errors.username = value.length < 3 ? 'minimum 3 characters required' : '';
      break;
    case 'email':
      errors.email = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)
        ? ''
        : 'invalid email address';
      break;
    case 'password':
      errors.password = value.length < 6 ? 'minimum 6 characters required' : '';
      break;
    case 'passwordConfirmation':
      errors.passwordConfirmation =
        value.length < 6 ? 'minimum 6 characters required' : '';
      break;
    default:
      break;
  }

  return errors;
};

export const passwordMatch = (password, passwordConfirmation) => {
  return password === passwordConfirmation;
};

export const formEmpty = ({
  username,
  email,
  password,
  passwordConfirmation
}) => {
  let errors = {};

  if (username === '') errors.username = 'insert username';
  if (email === '') errors.email = 'insert email';
  if (password === '') errors.password = 'insert password';
  if (passwordConfirmation === '')
    errors.passwordConfirmation = 'retype password';
  return errors;
};
