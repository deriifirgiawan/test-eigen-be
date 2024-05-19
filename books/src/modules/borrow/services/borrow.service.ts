import { Inject, Injectable } from '@nestjs/common';
import { IBorrowService } from './borrow-interface';
import { BorrowEntity } from 'src/entities';
import { IBorrowRepository } from 'src/repositories/borrow/borrow.interface';

@Injectable()
export class BorrowService implements IBorrowService {
  constructor(
    @Inject('IBorrowRepository')
    private readonly borrowRepository: IBorrowRepository,
  ) {}

  async deleteBorrow(payload: BorrowEntity): Promise<any> {
    return await this.borrowRepository.deleteBorrow(payload);
  }

  async findBorrowByBookId(book_id: number): Promise<BorrowEntity> {
    return await this.borrowRepository.findBorrowByBookId(book_id);
  }

  async findBorrowByMemberId(member_id: number): Promise<BorrowEntity> {
    return await this.borrowRepository.findBorrowByMemberId(member_id);
  }

  async requestBorrowBook(payload: BorrowEntity): Promise<BorrowEntity> {
    return await this.borrowRepository.borrowBook(payload);
  }
}
