export const getNextId = (items: ReadonlyArray<{ id: number }>): number =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
