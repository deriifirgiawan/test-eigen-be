import { Controller, Get, Query, Response } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/modules/response/response.service';
import { BookService } from '../services/book.service';
import { ResponseStatusCode } from 'src/decorators';
import { BookAllQueryDto } from '../dto';

@ApiTags('Book')
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
      'This endpoint has 1 query parameter, which is available, if nothing is filled in or the value is true then by default it will return all books, but if the value is filled in false, displays all the books and the amount available',
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

      if (String(available) === 'false' && available !== undefined) {
        response = await this.bookService.getAllUnAvailableBooks();
      }
      return this.responseService.success('Success Get All Books', response);
    } catch (error) {
      throw error;
    }
  }
}
