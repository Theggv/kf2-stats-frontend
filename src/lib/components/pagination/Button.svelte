<script lang="ts">
  export let disabled: boolean = false;
  export let selected: boolean = false;

  export let style: string | undefined = undefined;
</script>

<button class="btn" class:disabled class:selected on:click {disabled} {style}>
  <slot />
</button>

<style>
  .btn {
    padding: 0.25rem;
    border-bottom: 1px solid transparent;
  }

  .btn.selected {
    font-weight: bold;
    border-bottom: 1px solid white;
  }

  .btn.disabled {
    opacity: 0.5;
  }
</style>
