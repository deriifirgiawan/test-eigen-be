import { BookEntity } from 'src/entities';
import { BookAddDto } from '../../dto';

export interface IBookService {
  getAllAvailableBooks(): Promise<BookEntity[]>;
  getAllUnAvailableBooks(): Promise<BookEntity[]>;
  getAllBooks(): Promise<BookEntity[]>;
  getBookByCode(code: string): Promise<BookEntity>;
  addBook(payload: BookAddDto): Promise<BookEntity>;
}
