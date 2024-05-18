import { Inject, Injectable, Logger } from '@nestjs/common';
import { IBookService } from './interfaces/book.interface';
import { IBookRepository } from 'src/repositories/book/book.interface';
import { BookEntity } from 'src/entities';
import { BookAddDto } from '../dto';

@Injectable()
export class BookService implements IBookService {
  constructor(
    @Inject('IBookRepository')
    private readonly bookRepository: IBookRepository,
  ) {}

  async getAllBooks(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.findAllBooks();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async addBook(payload: BookAddDto): Promise<BookEntity> {
    try {
      return await this.bookRepository.insertBook(payload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getAllAvailableBooks(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.findAllAvailableBooks();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
