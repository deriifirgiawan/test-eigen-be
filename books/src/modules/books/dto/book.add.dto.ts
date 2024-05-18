import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookAddDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
