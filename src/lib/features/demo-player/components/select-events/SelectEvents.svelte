<script lang="ts">
  import Select from 'svelte-select';
  import type { EventUnion } from '../../MatchDemoPlayer.data';

  export let value: EventUnion['type'][];

  let listOpen = false;
  let checked: string[] = value;
  let isChecked: any = {};

  $: {
    checked;
    computeValue();
    computeIsChecked();
  }

  type SelectOption = {
    value: EventUnion['type'];
    label: string;
  };

  const items: SelectOption[] = [
    { value: 'zedtime', label: 'Zedtime' },
    { value: 'buffs', label: 'Buffs' },
    { value: 'health', label: 'Health changes' },
    { value: 'connect', label: 'Connection messages' },
    { value: 'husk_r', label: 'Husk Rages' },
    { value: 'death', label: 'Deaths' },
  ];

  function computeIsChecked() {
    isChecked = {};
    checked.forEach((c) => (isChecked[c] = true));
  }

  function computeValue() {
    value = checked
      .map((c) => items.find((i) => i.value === c)?.value)
      .filter((x) => x !== undefined);
  }

  function handleClear(e: any) {
    if (e.type === 'clear') checked = [];
  }

  function handleChange(e: any) {
    if (e.type === 'clear' && Array.isArray(e.detail)) checked = [];
    else
      checked.includes(e.detail.value)
        ? (checked = checked.filter((i) => i != e.detail.value))
        : (checked = [...checked, e.detail.value]);
  }
</script>

<Select
  bind:listOpen
  class="events-select"
  placeholder="Select wave events"
  {items}
  value={value.length}
  multiFullItemClearable
  filterSelectedItems={false}
  closeListOnChange={false}
  containerStyles={'background: transparent;'}
  on:select={handleChange}
  on:clear={handleClear}
  --width="250px"
  --font-size="12px"
  --height="40px"
  --list-background="rgb(40 40 40)"
  --border="1px solid rgb(255 255 255 / 0.5)"
  --border-radius={listOpen ? '5px 5px 0 0' : '5px'}
  --list-border-radius="0 0 5px 5px"
  --item-first-border-radius="0"
  --item-is-active-bg="transparent"
  --item-hover-bg="rgb(255 255 255 / 0.1)"
>
  <div slot="selection" class="item">
    {#if value.length}
      Selected events: {value.length}
    {/if}
  </div>

  <div class="item" slot="item" let:item>
    <label for={item.value}>
      <input
        type="checkbox"
        id={item.value}
        bind:checked={isChecked[item.value]}
      />
    </label>
    {item.label}
  </div>
</Select>

<style>
  .item {
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;
    border-radius: 0.25rem;
    user-select: none;

    pointer-events: none;
  }

  .item:hover {
    background-color: rgb(255 255 255 / 0.1);
  }
</style>
