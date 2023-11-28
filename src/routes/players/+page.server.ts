import { SITE_NAME } from '$lib';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    metadata: {
      title: `Players | ${SITE_NAME}`,
      openGraph: {
        title: `Players | ${SITE_NAME}`,
      },
    },
  };
};
