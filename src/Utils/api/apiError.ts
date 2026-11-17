import axios from "axios";

import { ApiErrorCode } from "../../types/Enums/ApiErrorCode";
import type { ApiErrorShape } from "../../types/api.types";

export class ApiError extends Error implements ApiErrorShape {
  readonly code: ApiErrorCode;
  readonly status?: number;

  constructor(code: ApiErrorCode, status?: number) {
    super(code);

    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

export const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError(ApiErrorCode.Unknown);
  }

  const status = error.response?.status;

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return new ApiError(ApiErrorCode.Timeout, status);
  }

  if (!error.response) {
    return new ApiError(ApiErrorCode.Network);
  }

  switch (status) {
    case 400:
      return new ApiError(ApiErrorCode.BadRequest, status);

    case 401:
      return new ApiError(ApiErrorCode.Unauthorized, status);

    case 403:
      return new ApiError(ApiErrorCode.Forbidden, status);

    case 404:
      return new ApiError(ApiErrorCode.NotFound, status);

    default:
      if (status !== undefined && status >= 500) {
        return new ApiError(ApiErrorCode.Server, status);
      }

      return new ApiError(ApiErrorCode.Unknown, status);
  }
};

export const getErrorCode = (error: unknown): ApiErrorCode =>
  toApiError(error).code;
