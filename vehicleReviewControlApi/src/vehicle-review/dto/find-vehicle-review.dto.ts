import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindVehicleReviewDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  index?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  step?: number;

  @ApiPropertyOptional()
  @IsOptional()
  query?: string;

  @ApiPropertyOptional()
  @IsOptional()
  filterName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    if (value) {
      if (String(value).toLowerCase() === 'true') {
        return true;
      } else if (String(value).toLowerCase() === 'false') {
        return false;
      } else if (!value) {
        return undefined;
      }
    }
    return value;
  })
  filterValue?: boolean;
}
