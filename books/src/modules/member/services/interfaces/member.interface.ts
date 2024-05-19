import { MemberEntity } from 'src/entities';
import { MemberAddDto, MemberResponseBorrowedDto } from '../../dto';

export interface IMemberService {
  getMemberById(id: number): Promise<MemberEntity>;
  getMemberByCode(code: string): Promise<MemberEntity>;
  getAllMember(): Promise<MemberEntity[]>;
  getAllMemberBorrowedCount(): Promise<MemberResponseBorrowedDto[]>;
  addMember(payload: MemberAddDto): Promise<MemberEntity>;
  penalizeMember(member_id: number, status: boolean): Promise<MemberEntity>;
}
