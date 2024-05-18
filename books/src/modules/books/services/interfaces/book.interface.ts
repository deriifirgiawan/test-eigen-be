import { BookEntity } from 'src/entities';
import { BookAddDto } from '../../dto';

export interface IBookService {
  getAllAvailableBooks(): Promise<BookEntity[]>;
  getAllBooks(): Promise<BookEntity[]>;
  addBook(payload: BookAddDto): Promise<BookEntity>;
}
