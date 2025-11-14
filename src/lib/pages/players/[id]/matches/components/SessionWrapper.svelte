<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
  import { getTimeSinceNow } from '$lib/util/date';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;

  $: mapNameLength = data.map.name.length;
</script>

<a
  class="match"
  href="/sessions/{data.session.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="title">
    <div class="server">
      {data.server.name}
    </div>
  </div>
  <div class="secondary" class:long={mapNameLength >= 18}>
    <div class="map" title={data.map.name}>
      {data.map.name}
    </div>
    <div class="time">
      {getTimeSinceNow(new Date(data.updated_at), true)}
    </div>
  </div>
</a>

<style>
  .match {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 225px;
    font-size: 12px;
  }

  .title {
    color: var(--text-secondary);
    font-size: 14px;
  }

  .match .secondary {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

  .match .map,
  .match .server {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .match .server {
    font-size: 10px;
  }

  .match .map {
    max-width: 125px;
  }

  .match .secondary.long:hover .map {
    overflow: visible;
  }

  .match .secondary.long:hover .time {
    opacity: 0;
  }

  .match .time {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .match .time::before {
    font-size: 10px;
    content: '•';
  }
</style>
