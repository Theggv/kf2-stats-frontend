<script lang="ts">
  import { ActivityCalendar } from '$lib/components/activity-calendar';
  import { getContext } from 'svelte';
  import { UserProfileMapsName, type UserProfileMapsType } from './Maps.store';
  import { treshhold } from './Maps.data';

  const store = getContext<UserProfileMapsType>(UserProfileMapsName);
  const { filter, activity, year } = store;

  let date_from: Date | undefined;
  let date_to: Date | undefined;

  $: filter.update((prev) => ({ ...prev, date_from, date_to }));
</script>

<div class="activity">
  <ActivityCalendar
    period="year"
    data={$activity}
    {treshhold}
    clickBehaviour="range"
    to={$year === new Date().getFullYear()
      ? new Date()
      : new Date($year + 1, 0, 0)}
    on:rangeSelected={(e) => {
      date_from = e.detail.from;
      date_to = e.detail.to;
    }}
    on:rangeClear={() => {
      date_from = undefined;
      date_to = undefined;
    }}
  />
</div>

<style>
  .activity {
    margin: 0 auto;
  }
</style>
