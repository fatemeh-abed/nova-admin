import { AxiosError } from 'axios';
import { dictionary } from '../../Dictionary';
import type { ApiErrorShape } from '../../types/api.types';

export class ApiError extends Error implements ApiErrorShape {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    if (error.code === 'ECONNABORTED') return new ApiError(dictionary.errors.timeout, status);
    if (!error.response) return new ApiError(dictionary.errors.network);
    if (status === 400 || status === 401) {
      return new ApiError(dictionary.errors.unauthorized, status);
    }
    return new ApiError(dictionary.errors.unknown, status);
  }

  return new ApiError(dictionary.errors.unknown);
};

export const getErrorMessage = (error: unknown): string => toApiError(error).message;
