import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { MatchData } from '$lib/api/matches';
import { SITE_NAME } from '$lib';
import { Status } from '$lib/api/sessions';
import { diffToString, modeToString } from '$lib/util/enum-to-text';
import { dateDiff } from '$lib/util/date';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const sessionId = Number(params.id);
  if (isNaN(sessionId)) {
    throw error(400, 'session_id should be a number');
  }

  const match: MatchData = await fetch(`/api/matches/${sessionId}`).then((x) =>
    x.json()
  );

  return {
    sessionId,
    metatags: {
      title: `${match.server?.name} | ${SITE_NAME}`,
      openGraph: {
        title: `${match.server?.name} | ${SITE_NAME}`,
        description: getDescription(match),
        type: 'profile',
      },
    },
    metadata: {
      themeColor: getColorByStatus(match.session.status),
    },
  };
};

function getColorByStatus(status: Status): string {
  switch (status) {
    case Status.Lobby:
    case Status.InProgress:
      return '#B8C544';
    case Status.Win:
      return '#2E9E2E';
    case Status.Lose:
      return '#D96464';
    default:
      return '#D4D4D4';
  }
}

function getDescription(data: MatchData): string {
  let body = '';

  body += `${data.map?.name} — `;

  if (data.cd_data) {
    body += `CD ${data.cd_data.spawn_cycle} ${data.cd_data.max_monsters}mm`;
    body += getZedsType(data.cd_data.zeds_type);
  } else {
    body += `${modeToString(data.session.mode)} `;
    body += `${diffToString(data.session.diff)}`;

    if (data.session.started_at) {
      body += ' — ';
      if (data.session.completed_at) {
        body += dateDiff(
          new Date(data.session.started_at),
          new Date(data.session.completed_at)
        );
      } else {
        body += dateDiff(
          new Date(data.session.started_at),
          new Date(data.session.updated_at)
        );
      }
    }
  }

  return body;
}

function getZedsType(type: string) {
  switch (type.toLowerCase()) {
    case 'harder':
      return ' HZ';
    case 'nightcore':
      return ' NCZ';
    default:
      return '';
  }
}
