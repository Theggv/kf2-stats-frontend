import { debounce } from '$lib/util';

export function getStore() {
  const fetch = debounce(async () => {
    try {
    } catch (err) {}
  }, 100);

  fetch();

  return {};
}
