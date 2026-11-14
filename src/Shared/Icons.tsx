import type { ReactNode } from 'react';
export type IconName = 'dashboard' | 'products' | 'users' | 'search' | 'plus' | 'close' | 'bag';
const paths: Record<IconName, ReactNode> = {
 dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
 products: <><path d="m3 7 9-4 9 4v10l-9 4-9-4z"/><path d="m3 7 9 4 9-4M12 11v10"/></>,
 users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5"/></>,
 search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
 plus: <path d="M12 5v14M5 12h14"/>,
 close: <path d="M5 5l14 14M19 5 5 19"/>,
 bag: <><rect x="4" y="7" width="16" height="14" rx="2"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
};
export const Icon = ({name,size=20}: {name:IconName;size?:number}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
