import lodash from 'lodash';

export function getStore() {
  const fetch = lodash.debounce(async () => {
    try {
    } catch (err) {}
  }, 100);

  fetch();

  return {};
}
