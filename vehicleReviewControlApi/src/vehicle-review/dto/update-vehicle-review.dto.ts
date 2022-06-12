import { PartialType } from '@nestjs/swagger';
import { CreateVehicleReviewDto } from './create-vehicle-review.dto';

export class UpdateVehicleReviewDto extends PartialType(CreateVehicleReviewDto) {}
