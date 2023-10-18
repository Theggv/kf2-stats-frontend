import type { SessionData } from '$lib/api/sessions';
import { writable } from 'svelte/store';

export const sessions = writable<SessionData[]>([]);

export const selectedSession = writable<number | null>(null, (set) => {
  const unsubscribe = sessions.subscribe(() => set(null));

  return () => unsubscribe();
});
