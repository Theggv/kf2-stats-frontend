<script lang="ts">
  import type { ServerData } from '$lib/api/servers';

  export let server: ServerData;
</script>

<div
  class="grid grid-cols-12 gap-4 p-1 transition-all duration-100 bg-gradient-to-r hover:from-blue-900 text-zinc-400"
>
  <div class="col-span-1 select-none">{server.id}</div>
  <a class="col-span-7" href="/server/{server.id}">{server.name}</a>
  <a class="col-span-4" href="steam://connect/{server.address}?appid=232090"
    >{server.address}</a
  >
</div>
