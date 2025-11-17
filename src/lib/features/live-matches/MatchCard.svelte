<script lang="ts">
  import { page } from '$app/stores';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';
  import { dateDiff } from '$lib/util/date';
  import { getWaveText } from '$lib/util/converters';
  import UserProfile from './UserProfile.svelte';
  import { statusToString } from '$lib/util/enum-to-text';
  import { Accordion } from '@svelteuidev/core';
  import { GameStatus } from '$lib/api/sessions';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';
  import type { Match } from '$lib/api/matches';

  $: selected =
    $page.url.pathname.includes(`/sessions`) &&
    Number($page.params.slug) === match.session.id;

  export let match: Match;

  $: details = match.details as Required<Match['details']>;
</script>

<StyledLink href="/sessions/{match.session.id}" {selected}>
  <div class="match-view-container">
    <div class="difficulty">
      <DifficultyIcon
        difficulty={getMatchDifficulty(match.metadata.diff)}
        size="small"
      />
    </div>
    <div class="server">
      {details.server.name}
    </div>
    <div class="status">
      {statusToString(match.session.status)}
    </div>
    <div class="map">
      {details.map.name}
    </div>
    <div class="wave">
      {getWaveText(details.game_data.wave, match.session)}
    </div>
    <div class="game-length">
      {#if match.session.status === GameStatus.InProgress}
        {dateDiff(new Date(match.session.started_at || ''), new Date())}
      {/if}
    </div>
    <div class="accordion">
      {#if details.live_data.players?.length || details.live_data.spectators?.length}
        <Accordion variant="default">
          <Accordion.Item on:click={(e) => e.preventDefault()} value="0">
            <div slot="control" class="control">
              Players ({details.live_data.players?.length || 0}), Spectators ({details
                .live_data.spectators?.length || 0})
            </div>

            <div
              role="button"
              tabindex="0"
              class="content"
              on:click={(e) => e.preventDefault()}
              on:keypress={(e) => e.key === 'Enter' && e.preventDefault()}
            >
              <div class="players">
                {#if details.live_data.players}
                  <div>Players ({details.live_data.players.length})</div>
                  <div class="items">
                    {#each details.live_data.players as player (player.profile.id)}
                      <UserProfile
                        profile={player.profile}
                        playerData={{
                          level: player.level,
                          perk: player.perk,
                          prestige: player.prestige,
                        }}
                      />
                    {/each}
                  </div>
                {/if}
              </div>

              <div class="spectators">
                {#if details.live_data.spectators}
                  <div>Spectators ({details.live_data.spectators?.length})</div>
                  <div class="items">
                    {#each details.live_data.spectators as player (player.profile.id)}
                      <UserProfile profile={player.profile} />
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          </Accordion.Item>
        </Accordion>
      {/if}
    </div>
  </div>
</StyledLink>

<style>
  .match-view-container {
    display: grid;
    grid-template:
      'difficulty server server status' auto
      'difficulty map wave game-length' auto
      'accordion accordion accordion accordion' auto
      / 24px 140px auto auto;

    gap: 0.25rem 0.5rem;
    padding: 0.5rem;
    user-select: none;
    font-size: 12px;
  }

  .difficulty {
    grid-area: difficulty;
    align-self: center;
  }

  .server {
    grid-area: server;
    word-wrap: normal;
    text-wrap: pretty;
    font-weight: bold;
    font-size: 10px;
  }

  .map {
    overflow: hidden;
    grid-area: map;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .wave {
    grid-area: wave;
    text-wrap: nowrap;
  }

  .game-length {
    grid-area: game-length;
    text-wrap: nowrap;
    text-align: right;
  }

  .status {
    grid-area: status;
    text-wrap: nowrap;
    text-align: right;
  }

  .accordion {
    grid-area: accordion;
  }

  .accordion .content {
    padding: 0 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    background-color: rgb(0 0 0 / 0.1);
  }

  .players {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .spectators {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .players > .items,
  .spectators > .items {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
  }

  .spectators > .items {
    flex-direction: row;
  }

  :global(.accordion > div > div > button),
  :global(.accordion > div > div > button > span),
  :global(.accordion > div > div > div > div > div > div) {
    padding: 0 !important;
  }

  .control {
    padding: 0.25rem;
    font-size: 14px;
    font-weight: bold;
    cursor: default;
  }

  :global(.accordion > div > div) {
    border-bottom: none !important;
  }

  :global(.accordion > div > div > button) {
    background-color: rgb(0 0 0 / 0.1) !important;
  }

  :global(.accordion > div > div > button:hover) {
    background-color: rgb(0 0 0 / 0.2) !important;
  }
</style>
