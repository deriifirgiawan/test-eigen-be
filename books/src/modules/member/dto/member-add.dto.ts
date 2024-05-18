import { IsNotEmpty, IsString } from 'class-validator';

export class MemberAddDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
