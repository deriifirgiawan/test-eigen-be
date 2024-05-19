import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BorrowEntity } from '../borrow';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @OneToOne(() => BorrowEntity, (borrow) => borrow.book)
  borrow?: BorrowEntity;
}
