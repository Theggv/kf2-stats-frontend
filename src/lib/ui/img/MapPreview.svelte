<script lang="ts">
  export let data: string;
  export let width: number = 72;

  $: formatted = data.replaceAll("'", '').toUpperCase();
  $: pathname = `/assets/preview/${formatted}.PNG`;
  $: placeholder = `/assets/preview/PLACEHOLDER.PNG`;

  $: loaded = false;
  $: error = false;
  $: data && (error = false);

  $: src = !loaded ? pathname : !error ? pathname : placeholder;
</script>

<img
  class="preview"
  {src}
  alt=""
  hidden={error}
  {width}
  height={width / 2}
  on:load={() => (loaded = true)}
  on:error={() => (error = true)}
/>

{#if error}
  <img class="preview" src={placeholder} alt="" {width} height={width / 2} />
{/if}

<style>
  .preview {
    border-radius: 0.25rem;
  }
</style>
