export class BaseHttpError extends Error {
  status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;

    Error.captureStackTrace(this);
  }
}

export function createAppError(name: string, status: number) {
  return class HttpError extends BaseHttpError {
    constructor(message: string) {
      super(message, name, status);
    }
  };
}
