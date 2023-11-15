<script lang="ts">
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import Player from '$lib/components/player/Player.svelte';
  import PlayerWithPerk from '$lib/components/player/PlayerWithPerk.svelte';
  import { mocks, perkMocks } from '$lib/components/player/data';
  import Category from './Category.svelte';
</script>

<AutoScroll>
  <div class="root">
    <Category title="Players">
      <h2>Default</h2>
      <Player data={mocks.ggv} />
      <h2>Online</h2>
      <Player data={mocks.restren} online />
      <h2>Compact</h2>
      <Player data={mocks.ghost} compact />
      <h2>Compact Online</h2>
      <Player data={mocks.ggv} online compact />
      <h2>Link Disabled</h2>
      <Player data={mocks.restren} disableLink />
      <h2>New Tab</h2>
      <Player data={mocks.ghost} newTab />
      <h2>EGS Player</h2>
      <Player data={mocks.egs} />
    </Category>
    <Category title="Players With Perk">
      <h2>Default</h2>
      <div class="perk">
        <PlayerWithPerk data={perkMocks.ggv} />
      </div>
      <h2>Dead Player</h2>
      <div class="perk">
        <PlayerWithPerk data={perkMocks.restren} />
      </div>
      <h2>Selected</h2>
      <div class="perk">
        <PlayerWithPerk data={perkMocks.ghost} selected />
      </div>
      <h2>EGS Player</h2>
      <div class="perk">
        <PlayerWithPerk data={perkMocks.egs} />
      </div>
    </Category>
  </div>
</AutoScroll>

<style>
  .root {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    font-weight: bold;
    justify-self: right;
  }

  .perk {
    max-width: 250px;
  }
</style>
