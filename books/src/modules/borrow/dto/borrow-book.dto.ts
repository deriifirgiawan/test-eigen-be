import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDto {
  @IsString()
  @IsNotEmpty()
  code_member: string;

  @IsString()
  @IsNotEmpty()
  code_book: string;
}
