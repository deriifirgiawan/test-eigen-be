import { Injectable, Logger } from '@nestjs/common';
import { IBookRepository } from './book.interface';
import { BookEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookAddDto } from 'src/modules/books/dto';

@Injectable()
export class BookRepository implements IBookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly repository: Repository<BookEntity>,
  ) {}

  async findBookById(id: number): Promise<BookEntity> {
    try {
      return this.repository.findOne({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findAllUnAvailableBooks(): Promise<BookEntity[]> {
    try {
      return this.repository
        .createQueryBuilder('book')
        .select(['book.id', 'book.author', 'book.title', 'book.stock'])
        .leftJoinAndSelect('book.borrow', 'borrow')
        .where('borrow.id IS NOT NULL')
        .getMany();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findAllBooks(): Promise<BookEntity[]> {
    try {
      return this.repository.find({
        select: {
          id: true,
          author: true,
          code: true,
          stock: true,
          borrow: null,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async insertBook(payload: BookAddDto): Promise<BookEntity> {
    const requestPayload = new BookEntity();
    requestPayload.code = payload.code;
    requestPayload.title = payload.code;
    requestPayload.author = payload.author;
    requestPayload.stock = payload.stock;
    try {
      return this.repository.save(requestPayload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findAllAvailableBooks(): Promise<BookEntity[]> {
    try {
      return this.repository
        .createQueryBuilder('book')
        .select(['book.id', 'book.author', 'book.title', 'book.stock'])
        .leftJoinAndSelect('book.borrow', 'borrow')
        .where('borrow.id IS NULL')
        .getMany();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
