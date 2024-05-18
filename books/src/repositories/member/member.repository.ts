import { Injectable, Logger } from '@nestjs/common';
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
    try {
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
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async createMember(payload: MemberAddDto): Promise<MemberEntity> {
    try {
      return this.repository.save(payload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findAllMember(): Promise<MemberEntity[]> {
    try {
      return this.repository.find();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findMemberById(id: number): Promise<MemberEntity> {
    try {
      return this.repository.findOne({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
