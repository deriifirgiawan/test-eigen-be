import { MemberEntity } from 'src/entities';
import { MemberAddDto, MemberResponseBorrowedDto } from '../../dto';

export interface IMemberService {
  getMemberById(id: number): Promise<MemberEntity>;
  getAllMember(): Promise<MemberEntity[]>;
  getAllMemberBorrowedCount(): Promise<MemberResponseBorrowedDto[]>;
  addMember(payload: MemberAddDto): Promise<MemberEntity>;
}
