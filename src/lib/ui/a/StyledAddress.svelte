<script lang="ts">
  export let address: string;
</script>

<div class="root">
  <a href="steam://connect/{address}?appid=232090"><slot /></a>
  <div
    on:click={() => navigator.clipboard.writeText(address)}
    on:keypress
    tabindex="0"
    role="button"
    class="copy"
  >
    <img src="/assets/copy-icon.png" alt="" />
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .root > a {
    border-bottom: 2px solid var(--text-primary);
    max-width: fit-content;
  }

  .copy {
    transition: all 100ms;
    padding: 0.25rem;
  }

  .copy:hover {
    scale: 1.1;
  }

  img {
    width: 16px;
    filter: invert(1);
  }
</style>
