<script lang="ts">
  export let difficulty = 1;
  export let size: 'small' | 'normal' = 'normal';

  function getColor(difficulty: number) {
    if (difficulty < 4) return '#3a3a';
    if (difficulty < 6) return '#fd2a';
    if (difficulty < 7) return '#fa4a';
    if (difficulty < 8) return '#f82a';
    if (difficulty < 9) return '#d44a';

    return '#922b';
  }

  function formatLabel(difficulty: number) {
    if (difficulty >= 20) return '20';
    if (difficulty <= 0) return '0';

    return difficulty.toFixed(1);
  }

  function getAngle(difficulty: number) {
    if (difficulty >= 10) return '360deg';
    if (difficulty <= 0) return '0deg';

    return Math.round((difficulty / 10) * 360) + 'deg';
  }
</script>

<div class="root {size}" title="Match Difficulty">
  <div class="bg"></div>
  <div
    class="arc"
    style="
        background-color: {getColor(difficulty)}; 
        mask:
          linear-gradient(#0000 0 0) content-box intersect,
          conic-gradient(#000 {getAngle(difficulty)}, #0000 0);"
  ></div>
  <div class="diff">{formatLabel(difficulty)}</div>
</div>

<style>
  .root {
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    aspect-ratio: 1;
  }

  .root.small {
    width: 24px;
  }

  .root.normal {
    width: 32px;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    padding: 3px;
    border-radius: 50%;
    box-sizing: border-box;
    border-radius: 50%;
    background: #fff4;
    mask:
      linear-gradient(#0000 0 0) content-box intersect,
      conic-gradient(#000 360deg, #0000 0);
  }

  .arc {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    padding: 3px;
    border-radius: 50%;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .diff {
    position: absolute;

    font-size: 12px;
    font-weight: bold;
    color: var(--text-primary);
  }

  .small .diff {
    font-size: 10px;
  }

  .normal .diff {
    font-size: 12px;
  }
</style>
