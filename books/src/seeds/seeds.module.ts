import { Module } from '@nestjs/common';
import { SeedsController } from './seeds.controller';
import { SeedService } from './seeds.service';
import { BookModule } from 'src/modules/books/book.module';
import { MemberModule } from 'src/modules/member/member.module';
import { BookService } from 'src/modules/books/services/book.service';
import { MemberService } from 'src/modules/member/services/member.service';

@Module({
  imports: [BookModule, MemberModule],
  controllers: [SeedsController],
  providers: [SeedService, BookService, MemberService],
})
export class SeedsModule {}
