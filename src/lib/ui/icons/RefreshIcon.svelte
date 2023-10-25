<script lang="ts">
  let el: HTMLElement;
  let spinning: boolean = false;

  export let width = 16;
  export let title = '';
</script>

<div
  on:click
  on:click={() => (spinning = true)}
  on:keypress
  tabindex="0"
  role="button"
  class="root {$$restProps.class || ''}"
  {title}
>
  <img
    bind:this={el}
    on:animationend={() => (spinning = false)}
    class="icon"
    class:spinning
    {width}
    src="/assets/refresh-icon.svg"
    alt="refresh"
  />
</div>

<style>
  .root {
    padding: 0.25rem;
  }
  .icon {
    cursor: pointer;
    transition: all 200ms;
  }

  .icon:hover {
    scale: 1.1;
  }

  .spinning {
    animation: spin 750ms forwards;
    -webkit-animation: spin 750ms forwards;
  }

  @-ms-keyframes spin {
    from {
      -ms-transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
    }
  }
  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
