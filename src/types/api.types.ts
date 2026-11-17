import type { ApiErrorCode } from "./Enums/ApiErrorCode";
import type { RequestStatus } from "./Enums/RequestStatus";

export interface ApiErrorShape {
  code: ApiErrorCode;
  status?: number;
}

export interface ListState<T> {
  items: T[];
  status: RequestStatus;
  error: ApiErrorCode | null;
}
