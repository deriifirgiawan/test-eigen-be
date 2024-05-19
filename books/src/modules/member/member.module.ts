import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from 'src/entities';
import { MemberService } from './services/member.service';
import { MemberRepository } from 'src/repositories/member/member.repository';
import { MemberController } from './controllers/member.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  providers: [
    MemberService,
    { provide: 'IMemberRepository', useClass: MemberRepository },
  ],
  exports: ['IMemberRepository', MemberService],
  controllers: [MemberController],
})
export class MemberModule {}
