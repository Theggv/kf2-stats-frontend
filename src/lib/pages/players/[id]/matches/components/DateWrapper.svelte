<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;
</script>

<div class="datetime">
  <div class="title">
    <div class="date">
      {new Date(data.updated_at).toDateString()}
    </div>
  </div>
  <div class="time">
    {new Date(data.updated_at).toLocaleTimeString()}
  </div>
</div>

<style>
  .datetime {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 275px;
    font-size: 14px;
  }

  .title {
    color: var(--text-secondary);
    font-size: 12px;
  }

  .datetime .time {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

  .datetime .date {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
</style>
