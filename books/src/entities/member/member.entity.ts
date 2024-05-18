import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BorrowEntity } from '../borrow';

@Entity({ name: 'member' })
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.member)
  borrow?: BorrowEntity[];
}
