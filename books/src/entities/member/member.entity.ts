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

  @Column({ default: false })
  is_penalized?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  penalty_end_date?: Date;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.member)
  borrow?: BorrowEntity[];
}
