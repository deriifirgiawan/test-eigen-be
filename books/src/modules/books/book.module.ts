import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/entities';
import { BookService } from './services/book.service';
import { BookRepository } from 'src/repositories/book/book.repository';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [
    { provide: 'IBookRepository', useClass: BookRepository },
    BookService,
  ],
  exports: ['IBookRepository', BookService],
  controllers: [BookController],
})
export class BookModule {}
