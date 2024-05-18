import { Injectable } from '@nestjs/common';
import { MemberEntity } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMemberRepository } from './member.interface';
import { MemberAddDto } from 'src/modules/member/dto';

@Injectable()
export class Memberepository implements IMemberRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>,
  ) {}

  async findAllMemberWithBorrowed(): Promise<any[]> {
    return this.repository
      .createQueryBuilder('member')
      .leftJoin('member.borrow', 'borrow')
      .select('member.code', 'code')
      .addSelect('member.id', 'member_id')
      .addSelect('member.name', 'name')
      .addSelect('COUNT(borrow.id)', 'borrowed_books_count')
      .groupBy('member.code')
      .addGroupBy('member.id')
      .addGroupBy('member.name')
      .getRawMany();
  }
  createMember(payload: MemberAddDto): Promise<MemberEntity> {
    return this.repository.save(payload);
  }
  findAllMember(): Promise<MemberEntity[]> {
    return this.repository.find();
  }
  findMemberById(id: number): Promise<MemberEntity> {
    return this.repository.findOne({ where: { id } });
  }
}
