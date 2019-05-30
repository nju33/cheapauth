import {PasswordImpl} from '../../entities/password';

const LOCAL_STORAGE_KEY = '__cheapauth__';

const isBrowser: () => boolean = () => {
  return typeof window !== 'undefined';
};

export const init: (answer: PasswordImpl) => boolean = answer => {
  if (!isBrowser()) {
    return false;
  }

  const input = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (input === null) {
    return false;
  }

  return answer.isEqual(input);
};

export const handleAuthentication: (
  answer: PasswordImpl,
  input: string,
) => boolean = (answer, input) => {
  const approval = answer.isEqual(input);

  if (!approval) {
    return false;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, input);

  return true;
};
