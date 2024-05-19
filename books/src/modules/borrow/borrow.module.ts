import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, BorrowEntity, MemberEntity } from 'src/entities';
import { BorrowService } from './services/borrow.service';
import { BorrowRepository } from 'src/repositories/borrow/borrow.repository';
import { BorrowController } from './controller/borrow.controller';
import { BookService } from '../books/services/book.service';
import { MemberService } from '../member/services/member.service';
import { BookRepository } from 'src/repositories/book/book.repository';
import { MemberRepository } from 'src/repositories/member/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, BookEntity, MemberEntity])],
  providers: [
    { provide: 'IBorrowRepository', useClass: BorrowRepository },
    { provide: 'IBookRepository', useClass: BookRepository },
    { provide: 'IMemberRepository', useClass: MemberRepository },
    BorrowService,
    BookService,
    MemberService,
  ],
  exports: [
    'IBorrowRepository',
    BorrowService,
    'IBookRepository',
    BookService,
    'IMemberRepository',
    MemberService,
  ],
  controllers: [BorrowController],
})
export class BorrowModule {}
