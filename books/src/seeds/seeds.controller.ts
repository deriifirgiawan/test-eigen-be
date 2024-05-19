import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seeds.service';
import { BookService } from 'src/modules/books/services/book.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller({ path: 'seeds' })
export class SeedsController {
  constructor(
    private seedService: SeedService,
    private bookService: BookService,
  ) {}

  @Post()
  @ApiExcludeEndpoint()
  async create() {
    try {
      const books = await this.bookService.getAllAvailableBooks();

      if (books.length === 0) {
        return this.seedService.run();
      }
    } catch (error) {
      console.log('Controller Seed: ', error);
      throw error;
    }
  }
}
