import type { RequestStatus } from './Enums/RequestStatus';

export interface ApiErrorShape {
  message: string;
  status?: number;
}

// Generic state of a remote list held in Redux.
export interface ListState<T> {
  items: T[];
  status: RequestStatus;
  error: string | null;
}
