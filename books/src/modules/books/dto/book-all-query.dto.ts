import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class BookAllQueryDto {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Availability of the item',
  })
  available?: boolean;
}
