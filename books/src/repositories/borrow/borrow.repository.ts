import { BorrowEntity } from 'src/entities';
import { IBorrowRepository } from './borrow.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BorrowRepository implements IBorrowRepository {
  constructor(
    @InjectRepository(BorrowEntity)
    private readonly repository: Repository<BorrowEntity>,
  ) {}

  async deleteBorrow(payload: BorrowEntity): Promise<any> {
    try {
      return this.repository.delete(payload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findBorrowByBookId(id: number): Promise<BorrowEntity> {
    try {
      return this.repository.findOne({ where: { book: { id } } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findBorrowByMemberId(id: number): Promise<BorrowEntity> {
    try {
      return this.repository.findOne({ where: { member: { id } } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async borrowBook(payload: BorrowEntity): Promise<BorrowEntity> {
    try {
      return this.repository.save(payload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
