import {
  TimePeriod,
  UserAnalyticsApiService,
  type GetPlayedMapsRequest,
  type GetPlayedMapsResponseItem,
  type PlayTimeHistItem,
} from '$lib/api/analytics';
import type { TokenPayload } from '$lib/api/auth';
import { debounce } from '$lib/util';
import { derived, writable, type Readable } from 'svelte/store';

export type ActivityType = Pick<PlayTimeHistItem, 'period' | 'count'>;

type AvailableFilters = Omit<GetPlayedMapsRequest, 'user_id'>;

export function getStore(user: Readable<TokenPayload | null>) {
  const userIdStore = writable<number | null>(null);

  const filter = writable<AvailableFilters>({});

  const maps = writable<GetPlayedMapsResponseItem[]>([]);

  const year = writable<number>(new Date().getFullYear());
  const activity = writable<ActivityType[]>([]);

  const isOwner = derived(
    [user, userIdStore],
    ([user, userId]) => !!user && user.user_id === userId
  );

  const fetch = debounce(async (user_id: number, args: AvailableFilters) => {
    try {
      await UserAnalyticsApiService.getMaps({
        user_id,
        ...args,
      }).then(({ data }) => maps.set(data.items));
    } catch (err) {}
  }, 100);

  const playtimeArgs = derived(
    [isOwner, userIdStore, year, filter],
    ([isOwner, userId, year, filter]) => ({ isOwner, userId, year, filter })
  );

  const fetchPlaytimeHist = debounce(
    async (user_id: number, year: number, filter: AvailableFilters) => {
      try {
        const isCurrentYear = year === new Date().getFullYear();

        await UserAnalyticsApiService.getPlaytimeHist({
          ...filter,
          user_id,
          period: TimePeriod.Day,
          date_from: isCurrentYear
            ? new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
            : new Date(year, 0, 1),
          date_to: isCurrentYear ? new Date() : new Date(year + 1, 0, 0),
        }).then(({ data }) =>
          activity.set(
            data.items.map((x) => ({ period: x.period, count: x.count }))
          )
        );
      } catch (err) {}
    },
    100
  );

  const args = derived([userIdStore, filter], ([userId, filter]) => ({
    userId,
    filter,
  }));

  playtimeArgs.subscribe((args) => {
    if (!args.userId || !args.isOwner) return;

    fetchPlaytimeHist(args.userId, args.year, args.filter);
  });

  args.subscribe((args) => {
    if (!args.userId) return;

    fetch(args.userId, args.filter);
  });

  return { userIdStore, isOwner, filter, maps, activity, year };
}

export type UserProfileMapsType = ReturnType<typeof getStore>;
export const UserProfileMapsName = 'user-profile/maps';
