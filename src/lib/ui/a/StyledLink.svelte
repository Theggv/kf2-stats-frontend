<script lang="ts">
  export let href: string;
  export let selected = false;
  export let rounded = true;
</script>

<a {href} class="root {$$restProps.class || ''}" class:selected class:rounded>
  <slot />
</a>

<style>
  .root {
    position: relative;
    z-index: 10;
  }

  .root::before {
    content: '';
    display: block;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background: linear-gradient(to right, var(--hover-primary), transparent);
    transition: opacity 100ms;
    border-radius: inherit;
  }

  .rounded {
    border-radius: 0.5rem;
  }

  .root:not(.selected):hover::before {
    opacity: 1;
  }

  .root.selected::before {
    background: linear-gradient(to right, var(--selected-primary), transparent);
    opacity: 1;
  }
</style>
