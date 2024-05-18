import { BookEntity } from 'src/entities';
import { BookAddDto } from 'src/modules/books/dto';

export interface IBookRepository {
  findAllAvailableBooks(): Promise<BookEntity[]>;
  findAllBooks(): Promise<BookEntity[]>;
  insertBook(payload: BookAddDto): Promise<BookEntity>;
}
