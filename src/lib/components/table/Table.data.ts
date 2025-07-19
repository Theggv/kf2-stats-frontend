import type { Component } from '@svelteuidev/core';

export type TableColumn<T extends { key: string }> = {
  id: string;
  label: string;
  render: (item: T, index: number) => number | string | Component;
  sorting?: {
    direction: 'asc' | 'desc';
    compare: (direction: 'asc' | 'desc') => (a: T, b: T) => number;
  };
  width?: number;
};
