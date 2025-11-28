<script lang="ts">
  import MediaQuery from 'svelte-media-queries';

  export let sticky = false;
</script>

<div class="block" class:sticky>
  <div class="header">
    <div class="icon">
      <MediaQuery query="(max-width: 600px)" let:matches>
        {#if !matches}
          <slot name="icon" />
        {/if}
      </MediaQuery>
    </div>
    <div class="preview">
      <MediaQuery query="(max-width: 600px)" let:matches>
        {#if !matches}
          <slot name="preview" />
        {/if}
      </MediaQuery>
    </div>
    <div class="title">
      <slot name="title" />
    </div>
    <div class="subtitle">
      <slot name="subtitle" />
    </div>
  </div>
  <div class="content">
    <slot name="content" />
  </div>
</div>

<style>
  .block {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.2);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .sticky {
    position: sticky;
    top: 0;
  }

  .header {
    padding: 1rem 1rem 0.5rem 1rem;
    font-size: 16px;
    display: grid;
    grid-template:
      'icon preview title' auto
      'icon preview subtitle' auto
      / auto 72px 1fr;
    gap: 0 0.5rem;
  }

  .icon {
    grid-area: icon;
    align-self: center;
  }

  .preview {
    grid-area: preview;
    align-self: center;
  }

  .title {
    grid-area: title;
  }

  .subtitle {
    grid-area: subtitle;
  }

  @media (max-width: 600px) {
    .header {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }

    .title,
    .subtitle {
      text-align: center;
    }
  }

  .subtitle {
    font-weight: bold;
    font-size: 14px;
    color: var(--text-secondary);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
