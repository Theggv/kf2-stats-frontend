<script lang="ts">
  import { formatDate } from '$lib/util/date';

  export let date: string;
</script>

<div class="root">
  <div class="title">
    {formatDate(date)}
  </div>
</div>

<style>
  .root {
    position: sticky;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    background: rgba(200, 200, 250, 0.15);
  }

  .title {
    font-size: 20px;
  }
</style>
