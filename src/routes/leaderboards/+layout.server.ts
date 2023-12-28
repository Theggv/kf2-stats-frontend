import { SITE_NAME } from '$lib';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  return {
    metatags: {
      title: `Leaderboards | ${SITE_NAME}`,
      openGraph: {
        title: `Leaderboards | ${SITE_NAME}`,
      },
    },
  };
};
