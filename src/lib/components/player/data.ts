import { Perk } from '$lib/api/matches';

export type PlayerData = {
  id: number;
  name: string;
  profile_url?: string;
  avatar?: string;
};

export const mocks = {
  ggv: {
    id: 1206,
    name: 'ggv',
    profile_url: 'https://steamcommunity.com/id/the_ggv/',
    avatar:
      'https://avatars.steamstatic.com/c711f48d896bbe86228432673745404568058c57.jpg',
  },
  restren: {
    id: 371,
    name: 'Restren_24',
    profile_url: 'https://steamcommunity.com/profiles/76561198833363555/',
    avatar:
      'https://avatars.steamstatic.com/6f7f9a72cbf8dc6da955a676bb145046963c01bd.jpg',
  },
  ghost: {
    id: 521,
    name: 'low hanging nuts',
    profile_url: 'https://steamcommunity.com/id/ghost_neverbloom/',
    avatar:
      'https://avatars.steamstatic.com/19ccd15021dc4356d5e1138635a6a2c4e8bb35a8.jpg',
  },
  egs: {
    id: 1110,
    name: 'Lucaur',
  },
};

export const perkMocks = {
  ggv: {
    id: 1206,
    name: 'ggv',
    profile_url: 'https://steamcommunity.com/id/the_ggv/',
    avatar:
      'https://avatars.steamstatic.com/c711f48d896bbe86228432673745404568058c57.jpg',
    player_stats_id: 0,
    perk: Perk.Medic,
    level: 25,
    prestige: 5,
    is_dead: false,
  },
  restren: {
    id: 371,
    name: 'Restren_24',
    profile_url: 'https://steamcommunity.com/profiles/76561198833363555/',
    avatar:
      'https://avatars.steamstatic.com/6f7f9a72cbf8dc6da955a676bb145046963c01bd.jpg',
    player_stats_id: 0,
    perk: Perk.Gunslinger,
    level: 25,
    prestige: 0,
    is_dead: true,
  },
  ghost: {
    id: 521,
    name: 'low hanging nuts',
    profile_url: 'https://steamcommunity.com/id/ghost_neverbloom/',
    avatar:
      'https://avatars.steamstatic.com/19ccd15021dc4356d5e1138635a6a2c4e8bb35a8.jpg',
    player_stats_id: 0,
    perk: Perk.Commando,
    level: 25,
    prestige: 0,
    is_dead: false,
  },
  egs: {
    id: 1110,
    name: 'Lucaur',
    player_stats_id: 0,
    perk: Perk.Demolitionist,
    level: 20,
    prestige: 2,
    is_dead: true,
  },
};
