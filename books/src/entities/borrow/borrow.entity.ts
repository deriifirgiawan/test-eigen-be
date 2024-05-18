import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MemberEntity } from '../member';
import { BookEntity } from '../book';

@Entity({ name: 'borrow' })
export class BorrowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MemberEntity, (member) => member.borrow)
  member: MemberEntity;

  @ManyToOne(() => BookEntity, (book) => book.borrow)
  book: BookEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowedAt: Date;
}
