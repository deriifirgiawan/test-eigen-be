import { applyDecorators, Inject, UseInterceptors } from '@nestjs/common';
import { ResponseService } from 'src/modules/response';
import { ResponseInterceptor } from 'src/modules/response/interfaces/response.interceptor';

export function Response(): (
  target: Record<string, any>,
  key: string | symbol,
  index?: number,
) => void {
  return Inject(ResponseService);
}

export function ResponseStatusCode() {
  return applyDecorators(UseInterceptors(ResponseInterceptor));
}
