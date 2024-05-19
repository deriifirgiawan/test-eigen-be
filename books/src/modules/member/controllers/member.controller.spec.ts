import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { ResponseService } from 'src/modules/response/response.service';
import { MemberService } from '../services/member.service';
import { ServiceUnavailableException } from '@nestjs/common';
import { MemberEntity } from 'src/entities/member/member.entity';
import { MemberResponseBorrowedDto } from '../dto/member-response-borrowed.dto';

describe('MemberController', () => {
  let controller: MemberController;
  let responseService: ResponseService;
  let memberService: MemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: ResponseService,
          useValue: {
            success: jest
              .fn()
              .mockImplementation((message: string, data: any) => ({
                message,
                data,
              })),
          },
        },
        {
          provide: MemberService,
          useValue: {
            getAllMember: jest.fn(),
            getAllMemberBorrowedCount: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    responseService = module.get<ResponseService>(ResponseService);
    memberService = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMembers', () => {
    it('should return success response with list of members', async () => {
      const members: MemberEntity[] = [
        {
          id: 1,
          name: 'Member 1',
          code: 'M001',
          is_penalized: false,
          penalty_end_date: null,
        },
        {
          id: 2,
          name: 'Member 2',
          code: 'M002',
          is_penalized: false,
          penalty_end_date: null,
        },
      ];
      jest.spyOn(memberService, 'getAllMember').mockResolvedValueOnce(members);
      jest
        .spyOn(responseService, 'success')
        .mockReturnValue({ message: 'Success Get All Members', data: members });

      const result = await controller.getAllMembers();

      expect(result).toEqual({
        message: 'Success Get All Members',
        data: members,
      });
      expect(memberService.getAllMember).toHaveBeenCalled();
      expect(responseService.success).toHaveBeenCalledWith(
        'Success Get All Members',
        members,
      );
    });

    it('should throw ServiceUnavailableException on error', async () => {
      jest
        .spyOn(memberService, 'getAllMember')
        .mockRejectedValueOnce(new Error('Service unavailable'));

      await expect(controller.getAllMembers()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('getAllBooks', () => {
    it('should return success response with list of members and their borrowed book count', async () => {
      const membersBorrowedCount: MemberResponseBorrowedDto[] = [
        {
          member_id: 1,
          code: 'M001',
          name: 'Member 1',
          borrowed_books_count: 3,
        },
        {
          member_id: 2,
          code: 'M002',
          name: 'Member 2',
          borrowed_books_count: 5,
        },
      ];
      jest
        .spyOn(memberService, 'getAllMemberBorrowedCount')
        .mockResolvedValueOnce(membersBorrowedCount);
      jest.spyOn(responseService, 'success').mockReturnValue({
        message: 'Success Get All Members',
        data: membersBorrowedCount,
      });

      const result = await controller.getAllBooks();

      expect(result).toEqual({
        message: 'Success Get All Members',
        data: membersBorrowedCount,
      });
      expect(memberService.getAllMemberBorrowedCount).toHaveBeenCalled();
      expect(responseService.success).toHaveBeenCalledWith(
        'Success Get All Members',
        membersBorrowedCount,
      );
    });

    it('should throw ServiceUnavailableException on error', async () => {
      jest
        .spyOn(memberService, 'getAllMemberBorrowedCount')
        .mockRejectedValueOnce(new Error('Service unavailable'));

      await expect(controller.getAllBooks()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });
});
