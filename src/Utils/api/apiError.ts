import { AxiosError } from 'axios';
import { ApiErrorCode } from '../../types/Enums/ApiErrorCode';
import type { ApiErrorShape } from '../../types/api.types';

// Errors carry a code, not display text, so the UI can translate them
// into the current language through the dictionary.
export class ApiError extends Error implements ApiErrorShape {
  readonly code: ApiErrorCode;
  readonly status?: number;

  constructor(code: ApiErrorCode, status?: number) {
    super(code);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    if (error.code === 'ECONNABORTED') return new ApiError(ApiErrorCode.Timeout, status);
    if (!error.response) return new ApiError(ApiErrorCode.Network);
    if (status === 400 || status === 401) return new ApiError(ApiErrorCode.Unauthorized, status);
    return new ApiError(ApiErrorCode.Unknown, status);
  }

  return new ApiError(ApiErrorCode.Unknown);
};

export const getErrorCode = (error: unknown): ApiErrorCode => toApiError(error).code;
