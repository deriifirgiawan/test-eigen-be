import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsConfig: CorsOptions = {
  origin: true,
  allowedHeaders: [
    'Accept',
    'Accept-Version',
    'Content-Type',
    'Api-Version',
    'Origin',
    'X-Requested-With',
    'Authorization',
  ],
  credentials: true,
};
