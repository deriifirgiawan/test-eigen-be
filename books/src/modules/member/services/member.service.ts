import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MemberEntity } from 'src/entities';
import { IMemberService } from './interfaces/member.interface';
import { IMemberRepository } from 'src/repositories/member/member.interface';
import { MemberAddDto, MemberResponseBorrowedDto } from '../dto';
import { addDays } from 'src/utils';

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @Inject('IMemberRepository')
    private readonly repository: IMemberRepository,
  ) {}

  async penalizeMember(
    member_id: number,
    status: boolean,
  ): Promise<MemberEntity> {
    try {
      const member = await this.getMemberById(member_id);
      if (!member) {
        throw new BadRequestException('Member Not Found');
      }

      member.is_penalized = status;
      member.penalty_end_date = status ? addDays(new Date(), 3) : null;
      return await this.repository.createMember(member);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getMemberByCode(code: string): Promise<MemberEntity> {
    try {
      return this.repository.findMemberByCode(code);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

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
      const response = await this.repository.findAllMember();
      return response.map((value) => {
        return {
          id: value.id,
          code: value.code,
          name: value.name,
        };
      });
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
