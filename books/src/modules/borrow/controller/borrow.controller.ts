import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/modules/response/response.service';
import { ResponseStatusCode } from 'src/decorators';
import { BorrowService } from '../services/borrow.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { BookService } from 'src/modules/books/services/book.service';
import { MemberService } from 'src/modules/member/services/member.service';
import { BorrowEntity } from 'src/entities';
import { addDays } from 'src/utils';

@ApiTags('Borrow')
@Controller('borrow')
export class BorrowController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
  ) {}

  @ResponseStatusCode()
  @Post('/book')
  @ApiBody({
    description: 'Request body for borrowing a book',
    schema: {
      type: 'object',
      properties: {
        code_member: { type: 'string', example: 'M001' },
        code_book: { type: 'string', example: 'JK-45' },
      },
    },
  })
  @ApiOperation({
    summary: 'End Point for Borrow Book',
    description: `Members can subscribe to books subject to conditions
- Members may not purchase more than 2 books
- Books lent are not lent to other members
- Current members are not subject to sanctions`,
  })
  async requestBorrowBook(@Body() payload: BorrowBookDto) {
    try {
      const member = await this.memberService.getMemberByCode(
        payload.code_member,
      );
      if (!member) {
        throw new NotFoundException(`Member with code ${payload.code_member}`);
      }

      const book = await this.bookService.getBookByCode(payload.code_book);
      if (!book) {
        throw new NotFoundException(`Book with code ${payload.code_book}`);
      }

      const findAvailableBorrow = await this.borrowService.findBorrowByMemberId(
        member.id,
      );
      if (findAvailableBorrow) {
        throw new BadRequestException("You've borrowed books before");
      }

      const findUnAvailableBook = await this.borrowService.findBorrowByBookId(
        book.id,
      );
      if (findUnAvailableBook) {
        throw new BadRequestException(
          'This book has been borrowed by another member',
        );
      }

      const borrow = new BorrowEntity();
      borrow.book = book;
      borrow.member = member;
      borrow.borrowedAt = new Date();

      if (
        member.is_penalized &&
        member.penalty_end_date &&
        member.penalty_end_date.getDate() <= new Date().getDate()
      ) {
        const updateMember = await this.memberService.penalizeMember(
          member.id,
          false,
        );
        if (updateMember) {
          const response = await this.borrowService.requestBorrowBook(borrow);
          return this.responseService.success('Success Borrow Book', response);
        } else {
          throw new BadRequestException(
            'Members are currently being sanctioned.',
          );
        }
      }

      const response = await this.borrowService.requestBorrowBook(borrow);
      return this.responseService.success('Success Borrow Book', response);
    } catch (error) {
      throw error;
    }
  }

  @ResponseStatusCode()
  @Post('/return-book')
  @ApiBody({
    description: 'Request body for return a book',
    schema: {
      type: 'object',
      properties: {
        code_member: { type: 'string', example: 'M001' },
        code_book: { type: 'string', example: 'JK-45' },
      },
    },
  })
  @ApiOperation({
    summary: 'End Point for Return The Book',
    description: `Members return books with conditions
- Books returned are books borrowed by members
- If books are returned after more than 7 days, members will be charged a penalty. Members who are penalized cannot borrow books for 3 days`,
  })
  async returnBook(
    @Body()
    payload: BorrowBookDto,
  ) {
    try {
      const member = await this.memberService.getMemberByCode(
        payload.code_member,
      );
      if (!member) {
        throw new NotFoundException(`Member with code ${payload.code_member}`);
      }

      const book = await this.bookService.getBookByCode(payload.code_book);
      if (!book) {
        throw new NotFoundException(`Book with code ${payload.code_book}`);
      }

      const findAvailableBorrow = await this.borrowService.findBorrowByMemberId(
        member.id,
      );
      if (!findAvailableBorrow) {
        throw new BadRequestException('loan book not found');
      }

      if (addDays(findAvailableBorrow.borrowedAt, 7) > new Date()) {
        // Add Penalized to member
        await this.memberService.penalizeMember(member.id, true);
        return;
      }

      const response =
        await this.borrowService.deleteBorrow(findAvailableBorrow);

      return this.responseService.success('Success Return Book', response);
    } catch (error) {
      throw error;
    }
  }
}
