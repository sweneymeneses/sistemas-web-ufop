import { Module } from '@nestjs/common';
import { VehicleReviewService } from './vehicle-review.service';
import { VehicleReviewController } from './vehicle-review.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VehicleReviewController],
  providers: [VehicleReviewService],
})
export class VehicleReviewModule {}
