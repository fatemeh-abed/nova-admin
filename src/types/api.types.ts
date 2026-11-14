import type { ApiErrorCode } from './Enums/ApiErrorCode';
import type { RequestStatus } from './Enums/RequestStatus';

export interface ApiErrorShape {
  code: ApiErrorCode;
  status?: number;
}

// Generic state of a remote list held in Redux.
export interface ListState<T> {
  items: T[];
  status: RequestStatus;
  error: ApiErrorCode | null;
}
