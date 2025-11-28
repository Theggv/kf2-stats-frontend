<script lang="ts">
  import { Image } from '@svelteuidev/core';

  export let data: string;
  export let width: number = 72;

  $: formatted = data.replaceAll("'", '').toUpperCase();
</script>

<Image
  src="/assets/preview/{formatted}.PNG"
  usePlaceholder
  radius="xs"
  style="user-select:none;"
  draggable={false}
  {width}
  height={width / 2}
>
  <svelte:fragment slot="placeholder">
    <Image
      src="/assets/preview/PLACEHOLDER.PNG"
      radius="xs"
      style="user-select:none;"
      draggable={false}
      {width}
      height={width / 2}
    />
  </svelte:fragment>
</Image>
