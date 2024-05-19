import { BookEntity } from 'src/entities';
import { BookAddDto } from 'src/modules/books/dto';

export interface IBookRepository {
  findAllAvailableBooks(): Promise<BookEntity[]>;
  findAllUnAvailableBooks(): Promise<BookEntity[]>;
  findAllBooks(): Promise<BookEntity[]>;
  findBookById(id: number): Promise<BookEntity>;
  findBookByCode(code: string): Promise<BookEntity>;
  insertBook(payload: BookAddDto): Promise<BookEntity>;
}
