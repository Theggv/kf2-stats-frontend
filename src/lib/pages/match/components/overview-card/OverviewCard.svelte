<script lang="ts">
  import type { UserProfile } from '$lib/api/common';

  export let title: string;
  export let value: string;
  export let profile: UserProfile | undefined;
</script>

<div class="card">
  <a
    class="avatar"
    href={profile?.profile_url}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={profile?.avatar} alt="" />
  </a>
  <div class="category">{title}</div>
  <div class="name">{profile?.name}</div>
  <div class="value">{value}</div>
</div>

<style>
  .card {
    display: grid;
    grid-template:
      'avatar category' max-content
      'avatar name' max-content
      'avatar value' max-content
      / max-content 1fr;
    user-select: none;
  }

  .card .avatar {
    grid-area: avatar;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    margin: 1rem;
  }

  .card .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .card .category {
    grid-area: category;
    font-size: 20px;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
  }

  .card .name {
    grid-area: name;
  }

  .card .value {
    grid-area: value;
  }
</style>
