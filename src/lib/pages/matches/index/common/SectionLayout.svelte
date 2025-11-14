<script lang="ts">
  export let sticky = false;
</script>

<div class="block" class:sticky>
  <div class="title">
    <slot name="icon" />
    <div>
      <div>
        <slot name="title" />
      </div>
      <div class="subtitle">
        <slot name="subtitle" />
      </div>
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
    border-radius: 0.5rem;
  }

  .sticky {
    position: sticky;
    top: 0;
  }

  .title {
    padding: 1rem;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
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
    padding-bottom: 1rem;
  }
</style>
