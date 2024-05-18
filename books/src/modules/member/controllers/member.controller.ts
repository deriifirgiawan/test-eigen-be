import {
  Controller,
  Get,
  Response,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/modules/response/response.service';
import { ResponseStatusCode } from 'src/decorators';
import { MemberService } from '../services/member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(
    @Response() private responseService: ResponseService,
    private memberService: MemberService,
  ) {}

  @ResponseStatusCode()
  @Get('/all')
  @ApiOperation({
    summary: 'List Of Members',
    description: 'This end point will show list of members',
  })
  async getAllMembers() {
    try {
      const response = await this.memberService.getAllMember();
      return this.responseService.success('Success Get All Members', response);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  @ResponseStatusCode()
  @Get('/borrowed-books-count')
  @ApiOperation({
    summary: 'List Of Members',
    description:
      'This end point will show Number of books borrowed by each member',
  })
  async getAllBooks() {
    try {
      const response = await this.memberService.getAllMemberBorrowedCount();
      return this.responseService.success('Success Get All Members', response);
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }
}
