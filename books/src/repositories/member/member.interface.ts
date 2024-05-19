import { MemberEntity } from 'src/entities';
import { MemberAddDto } from 'src/modules/member/dto';

export interface IMemberRepository {
  findMemberById(id: number): Promise<MemberEntity>;
  findMemberByCode(code: string): Promise<MemberEntity>;
  findAllMember(): Promise<MemberEntity[]>;
  createMember(payload: MemberAddDto): Promise<MemberEntity>;
  findAllMemberWithBorrowed(): Promise<any[]>;
}
