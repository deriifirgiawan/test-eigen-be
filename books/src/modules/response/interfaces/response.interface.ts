export interface ResponseError {
  readonly message: string;
  readonly property: string;
}

export interface ResponseSuccess {
  readonly message: string;
  readonly errors?: ResponseError;
  readonly data?: Record<any, any> | Record<any, any[]>;
}

export interface ResponseSuccessPagging
  extends Omit<ResponseSuccess, 'errors' | 'data'> {
  readonly total_pages: number;
  readonly current_page: number;
  readonly data: Record<string, any> | Record<string, any[]>;
}
