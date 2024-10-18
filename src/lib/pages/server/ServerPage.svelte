<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { IoServer } from 'svelte-icons-pack/io';

  import { ListLayout, SectionLayout } from '$lib/layouts';
  import { iconSettings } from '$lib/ui/icons';
  import { ServerList } from './components';
</script>

<ListLayout>
  <SectionLayout slot="header" unroundBottom>
    <svelte:fragment slot="title">Servers</svelte:fragment>
    <svelte:fragment slot="icon">
      <Icon src={IoServer} {...iconSettings} />
    </svelte:fragment>
  </SectionLayout>

  <svelte:fragment slot="content">
    <ServerList />
  </svelte:fragment>
</ListLayout>
