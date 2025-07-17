<script lang="ts">
  import { ActivityCalendar } from '$lib/components/activity-calendar';
  import type { Treshhold } from '$lib/components/activity-calendar/ActivityCalendar.data';

  const data: any[] = [];
  const treshholds: Treshhold<any> = {
    title: 'Matches',
    evaluate: (value) => value.count,
    tooltip: (date, value) => `
      <div>
        <sub><b>${date.toDateString()}</b></sub>
        <div>Matches: <b>${value?.count ?? 0}</b></div>
      </div`,
    values: [0, 3, 6, 9, 12],
    colors: [
      'rgba(200, 200, 250, 0.15)',
      'rgba(200, 110, 110, 0.4)',
      'rgba(200, 110, 110, 0.6)',
      'rgba(200, 110, 110, 0.8)',
      'rgba(200, 110, 110, 1)',
    ],
  };

  function handleClick(date: Date) {
    window.alert(`clicked on ${date.toLocaleDateString()}`);
  }
</script>

<ActivityCalendar period="month" {data} treshhold={treshholds} />
<ActivityCalendar period="45-days" {data} treshhold={treshholds} />
<ActivityCalendar period="90-days" {data} treshhold={treshholds} />
<ActivityCalendar period="year" {data} treshhold={treshholds} />
