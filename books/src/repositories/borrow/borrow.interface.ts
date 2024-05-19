import { BorrowEntity } from 'src/entities';

export interface IBorrowRepository {
  findBorrowByMemberId(id: number): Promise<BorrowEntity>;
  findBorrowByBookId(id: number): Promise<BorrowEntity>;
  borrowBook(payload: BorrowEntity): Promise<BorrowEntity>;
  deleteBorrow(payload: BorrowEntity): Promise<any>;
}
