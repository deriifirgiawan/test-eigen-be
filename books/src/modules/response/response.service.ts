import { BadRequestException, Injectable } from '@nestjs/common';
import { ResponseSuccess, ResponseSuccessPagging } from './interfaces';

@Injectable()
export class ResponseService {
  success(
    message: string,
    data?: Record<string, any> | Record<string, any[]>,
  ): ResponseSuccess {
    if (data) {
      return {
        message: message,
        data: data,
      };
    }

    return {
      message: message,
    };
  }

  paging(
    message: string,
    totalPage: number,
    currentPage: number,
    data: Record<string, any>[],
  ): ResponseSuccessPagging {
    return {
      message: message,
      total_pages: totalPage,
      current_page: currentPage,
      data,
    };
  }

  error(error: any) {
    if (error.driverError && error.code === '23502') {
      throw new BadRequestException('Missing required field');
    }
  }
}
