<script lang="ts">
  import { tickToTime } from '../../utils';

  export let tick: number;

  export let reversed: boolean = false;
</script>

<div class="root" class:reversed>
  <div class="time">{tickToTime(tick, true)}</div>
  <div class="content"><slot /></div>
</div>

<style>
  .root {
    padding: 0.25rem 0.5rem;
    display: grid;
    grid-template:
      'time content' auto
      / min-content 1fr;

    gap: 0.5rem;
    font-size: 14px;
  }

  .root.reversed {
    grid-template:
      'content time' auto
      / min-content 1fr;
  }

  .time {
    grid-area: time;
    font-size: 12px;
    font-weight: bold;
  }

  .content {
    grid-area: content;
  }
</style>
