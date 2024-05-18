import { Inject, Injectable, Logger } from '@nestjs/common';
import { MemberEntity } from 'src/entities';
import { IMemberService } from './interfaces/member.interface';
import { IMemberRepository } from 'src/repositories/member/member.interface';
import { MemberAddDto, MemberResponseBorrowedDto } from '../dto';

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @Inject('IMemberRepository')
    private readonly repository: IMemberRepository,
  ) {}

  async getAllMemberBorrowedCount(): Promise<MemberResponseBorrowedDto[]> {
    try {
      const members = await this.repository.findAllMemberWithBorrowed();

      return members
        .map((member: any) => {
          return {
            code: member.code,
            member_id: member.member_id,
            name: member.name,
            borrowed_books_count: parseInt(member.borrowed_books_count, 10),
          };
        })
        .reverse();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async addMember(payload: MemberAddDto): Promise<MemberEntity> {
    try {
      return this.repository.createMember(payload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getAllMember(): Promise<MemberEntity[]> {
    try {
      return this.repository.findAllMember();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getMemberById(id: number): Promise<MemberEntity> {
    try {
      return this.repository.findMemberById(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
