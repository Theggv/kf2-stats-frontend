import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  return { date: url.searchParams.get('date') };
};
