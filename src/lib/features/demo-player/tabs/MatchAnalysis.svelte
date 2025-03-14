<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../MatchDemoPlayer.store';

  import { getUserProfileByUserIndex } from '../MatchDemoPlayer.data';

  const store = getContext<ContextType>(ContextName);
  const { demo } = store;

  $: users = $demo.players;

  $: overallBuffsPercent =
    $demo.analytics.buffs_uptime.buffed_ticks /
    Math.max($demo.analytics.buffs_uptime.total_ticks, 1);

  $: buffsUptime =
    $demo.analytics.buffs_uptime.detailed.toSorted(
      (a, b) =>
        b.buffed_ticks / Math.max(0, b.total_ticks) -
        a.buffed_ticks / Math.max(0, a.total_ticks)
    ) || [];
</script>

<div class="root">
  <div class="zedtime">
    <div class="title">Zed time</div>

    <div class="content">
      <div class="item">
        <div class="name">Average duration</div>
        <div class="value">
          {$demo.analytics.zedtime.zt_duration_seconds.avg.toFixed(2)}s
        </div>
      </div>

      <div class="item">
        <div class="name">Highest duration</div>
        <div class="value">
          {$demo.analytics.zedtime.zt_duration_seconds.max.toFixed(2)}s
        </div>
      </div>

      <hr />

      <div class="item">
        <div class="name">Average first proc time</div>
        <div class="value">
          {($demo.analytics.zedtime.first_zt_tick.avg / 100).toFixed(2)}s
        </div>
      </div>

      <div class="item">
        <div class="name">Worst first proc time</div>
        <div class="value">
          {($demo.analytics.zedtime.first_zt_tick.max / 100).toFixed(2)}s
        </div>
      </div>

      <hr />

      <div class="item">
        <div class="name">Average time between zt</div>
        <div class="value">
          {$demo.analytics.zedtime.time_between_zt_seconds.avg.toFixed(2)}s
        </div>
      </div>

      <div class="item">
        <div class="name">Worst time between zt</div>
        <div class="value">
          {$demo.analytics.zedtime.time_between_zt_seconds.max.toFixed(2)}s
        </div>
      </div>

      <hr />

      <div class="item">
        <div class="name">Average extends count</div>
        <div class="value">
          {$demo.analytics.zedtime.avg_extends_count.toFixed(2)}
        </div>
      </div>

      <div class="item">
        <div class="name">Average extend duration</div>
        <div class="value">
          {$demo.analytics.zedtime.avg_extend_duration.toFixed(2)}s
        </div>
      </div>
    </div>
  </div>

  <div class="buffs">
    <div class="title">Buffs Uptime</div>

    <div class="item">
      <div class="name">Overall</div>
      <div class="value">{(overallBuffsPercent * 100).toFixed(2)}%</div>
    </div>

    <hr />

    <div class="content">
      {#each buffsUptime as item (item)}
        {@const profile = getUserProfileByUserIndex(item.user_index, users)}
        {@const percent = item.buffed_ticks / Math.max(item.total_ticks, 1)}

        <div class="item">
          <div class="name">{profile?.name}</div>
          <div class="value">{(percent * 100).toFixed(2)}%</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="summary">
    <div class="title">Summary</div>

    <div class="item">
      <div class="name">Average Kills / s</div>
      <div class="value">
        {$demo.analytics.summary.avg_kills_per_second.toFixed(2)}
      </div>
    </div>
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template:
      'summary zedtime buffs' auto
      / 250px 250px 1fr;

    gap: 0.5rem 1rem;

    height: 100%;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .root > .buffs {
    grid-area: buffs;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .root > .buffs > .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .root > .buffs > .content {
    max-height: calc(100% - 100px);
    gap: 0.125rem;
    padding: 0;
  }

  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item > .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .root > .zedtime {
    grid-area: zedtime;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .root > .summary {
    grid-area: summary;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .content::-webkit-scrollbar {
    width: 12px;
  }

  .content::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  .content::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #9ca3af;
  }
</style>
