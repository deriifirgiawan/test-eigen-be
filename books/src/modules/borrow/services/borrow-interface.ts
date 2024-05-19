import { BorrowEntity } from 'src/entities';

export interface IBorrowService {
  requestBorrowBook(payload: BorrowEntity): Promise<BorrowEntity>;
  findBorrowByMemberId(member_id: number): Promise<BorrowEntity>;
  findBorrowByBookId(book_id: number): Promise<BorrowEntity>;
  deleteBorrow(payload: BorrowEntity): Promise<any>;
}
