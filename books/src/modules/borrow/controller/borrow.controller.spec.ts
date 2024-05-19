import { Test, TestingModule } from '@nestjs/testing';
import { BorrowController } from './borrow.controller';
import { ResponseService } from 'src/modules/response/response.service';
import { BorrowService } from '../services/borrow.service';
import { BookService } from 'src/modules/books/services/book.service';
import { MemberService } from 'src/modules/member/services/member.service';
import { BorrowBookDto } from '../dto/borrow-book.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BorrowEntity, BookEntity, MemberEntity } from 'src/entities';

describe('BorrowController', () => {
  let controller: BorrowController;
  let responseService: ResponseService;
  let borrowService: BorrowService;
  let bookService: BookService;
  let memberService: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowController],
      providers: [
        {
          provide: ResponseService,
          useValue: {
            success: jest.fn(),
          },
        },
        {
          provide: BorrowService,
          useValue: {
            findBorrowByMemberId: jest.fn(),
            findBorrowByBookId: jest.fn(),
            requestBorrowBook: jest.fn(),
          },
        },
        {
          provide: BookService,
          useValue: {
            getBookByCode: jest.fn(),
          },
        },
        {
          provide: MemberService,
          useValue: {
            getMemberByCode: jest.fn(),
            penalizeMember: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BorrowController>(BorrowController);
    responseService = module.get<ResponseService>(ResponseService);
    borrowService = module.get<BorrowService>(BorrowService);
    bookService = module.get<BookService>(BookService);
    memberService = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('requestBorrowBook', () => {
    it('should throw NotFoundException if member is not found', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };

      jest.spyOn(memberService, 'getMemberByCode').mockResolvedValueOnce(null);

      await expect(controller.requestBorrowBook(payload)).rejects.toThrow(
        new NotFoundException(`Member with code ${payload.code_member}`),
      );
    });

    it('should throw NotFoundException if book is not found', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };

      jest.spyOn(memberService, 'getMemberByCode').mockResolvedValueOnce({
        id: 1,
        code: 'M001',
        name: 'John Doe',
        is_penalized: false,
      } as MemberEntity);
      jest.spyOn(bookService, 'getBookByCode').mockResolvedValueOnce(null);

      await expect(controller.requestBorrowBook(payload)).rejects.toThrow(
        new NotFoundException(`Book with code ${payload.code_book}`),
      );
    });

    it('should throw BadRequestException if member has already borrowed a book', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };

      jest.spyOn(memberService, 'getMemberByCode').mockResolvedValueOnce({
        id: 1,
        code: 'M001',
        name: 'John Doe',
        is_penalized: false,
      } as MemberEntity);
      jest.spyOn(bookService, 'getBookByCode').mockResolvedValueOnce({
        id: 1,
        code: 'JK-45',
        title: 'Some Book',
        author: 'Some Author',
        stock: 1,
      } as BookEntity);
      jest.spyOn(borrowService, 'findBorrowByMemberId').mockResolvedValueOnce({
        id: 1,
        member: {} as MemberEntity,
        book: {} as BookEntity,
        borrowedAt: new Date(),
      } as BorrowEntity);

      await expect(controller.requestBorrowBook(payload)).rejects.toThrow(
        new BadRequestException("You've borrowed books before"),
      );
    });

    it('should throw BadRequestException if book has already been borrowed by another member', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };

      jest.spyOn(memberService, 'getMemberByCode').mockResolvedValueOnce({
        id: 1,
        code: 'M001',
        name: 'John Doe',
        is_penalized: false,
      } as MemberEntity);
      jest.spyOn(bookService, 'getBookByCode').mockResolvedValueOnce({
        id: 1,
        code: 'JK-45',
        title: 'Some Book',
        author: 'Some Author',
        stock: 1,
      } as BookEntity);
      jest
        .spyOn(borrowService, 'findBorrowByMemberId')
        .mockResolvedValueOnce(null);
      jest.spyOn(borrowService, 'findBorrowByBookId').mockResolvedValueOnce({
        id: 1,
        member: {} as MemberEntity,
        book: {} as BookEntity,
        borrowedAt: new Date(),
      } as BorrowEntity);

      await expect(controller.requestBorrowBook(payload)).rejects.toThrow(
        new BadRequestException(
          'This book has been borrowed by another member',
        ),
      );
    });

    it('should throw BadRequestException if member is penalized', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };
      const member = {
        id: 1,
        code: 'M001',
        name: 'John Doe',
        is_penalized: true,
        penalty_end_date: new Date(Date.now() + 100000), // Future date to ensure the penalty is active
      } as MemberEntity;

      jest
        .spyOn(memberService, 'getMemberByCode')
        .mockResolvedValueOnce(member);
      jest.spyOn(bookService, 'getBookByCode').mockResolvedValueOnce({
        id: 1,
        code: 'JK-45',
        title: 'Some Book',
        author: 'Some Author',
        stock: 1,
      } as BookEntity);
      jest
        .spyOn(borrowService, 'findBorrowByMemberId')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(borrowService, 'findBorrowByBookId')
        .mockResolvedValueOnce(null);

      await expect(controller.requestBorrowBook(payload)).rejects.toThrow(
        new BadRequestException('Members are currently being sanctioned.'),
      );
    });

    it('should call responseService.success if borrow request is successful', async () => {
      const payload: BorrowBookDto = {
        code_member: 'M001',
        code_book: 'JK-45',
      };
      const member = {
        id: 1,
        code: 'M001',
        name: 'John Doe',
        is_penalized: false,
      } as MemberEntity;
      const book = {
        id: 1,
        code: 'JK-45',
        title: 'Some Book',
        author: 'Some Author',
        stock: 1,
      } as BookEntity;
      const borrow = new BorrowEntity();
      borrow.book = book;
      borrow.member = member;

      jest
        .spyOn(memberService, 'getMemberByCode')
        .mockResolvedValueOnce(member);
      jest.spyOn(bookService, 'getBookByCode').mockResolvedValueOnce(book);
      jest
        .spyOn(borrowService, 'findBorrowByMemberId')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(borrowService, 'findBorrowByBookId')
        .mockResolvedValueOnce(null);
      jest
        .spyOn(borrowService, 'requestBorrowBook')
        .mockResolvedValueOnce(borrow);
      jest
        .spyOn(responseService, 'success')
        .mockReturnValue('Success Borrow Book' as any);

      const result = await controller.requestBorrowBook(payload);

      expect(responseService.success).toHaveBeenCalledWith(
        'Success Borrow Book',
        borrow,
      );
      expect(result).toBe('Success Borrow Book');
    });
  });
});
