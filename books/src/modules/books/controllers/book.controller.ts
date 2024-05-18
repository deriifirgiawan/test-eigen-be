import {
  Controller,
  Get,
  Query,
  Response,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/modules/response/response.service';
import { BookService } from '../services/book.service';
import { ResponseStatusCode } from 'src/decorators';
import { BookAllQueryDto } from '../dto';

@ApiTags('Books')
@Controller('book')
export class BookController {
  constructor(
    @Response() private responseService: ResponseService,
    private bookService: BookService,
  ) {}

  @ResponseStatusCode()
  @Get('/all')
  @ApiOperation({
    summary: 'End Point for Get All Books',
    description:
      'This end point has 1 query params, namely available, if you dont fill in anything or you fill the value false so as default will returned all of books, but if you fill in value true, Shows all existing books and quantities',
  })
  async getAllBooks(
    @Query()
    query: BookAllQueryDto,
  ) {
    const { available } = query;
    try {
      let response = await this.bookService.getAllBooks();

      if (String(available) === 'true' && available !== undefined) {
        response = await this.bookService.getAllAvailableBooks();
      }
      return this.responseService.success('Success Get All Books', response);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(error);
    }
  }
}
