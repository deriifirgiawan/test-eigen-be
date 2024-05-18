import { Injectable, Logger } from '@nestjs/common';
import { BookService } from 'src/modules/books/services/book.service';
import { MemberService } from 'src/modules/member/services/member.service';
import { booksSeeds, memberSeeds } from './data';

@Injectable()
export class SeedService {
  constructor(
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
  ) {}

  async run() {
    try {
      if ((await this.bookService.getAllAvailableBooks()).length === 0) {
        for (let i = 0; i < booksSeeds.length; i++) {
          await this.bookService.addBook(booksSeeds[i]);
        }
      }

      if ((await this.memberService.getAllMember()).length === 0) {
        for (let i = 0; i < memberSeeds.length; i++) {
          await this.memberService.addMember(memberSeeds[i]);
        }
      }
    } catch (error) {
      Logger.error('Failed Sed', error);
      throw error;
    }
  }
}
