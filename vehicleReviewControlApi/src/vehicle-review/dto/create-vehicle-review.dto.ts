import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleReviewDto {
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  board: string;
  @ApiProperty()
  year: number;
  @ApiProperty()
  model: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  problem: string;
  @ApiProperty()
  note: string;
}
