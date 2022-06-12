import { Test, TestingModule } from '@nestjs/testing';
import { VehicleReviewController } from './vehicle-review.controller';
import { VehicleReviewService } from './vehicle-review.service';

describe('VehicleReviewController', () => {
  let controller: VehicleReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleReviewController],
      providers: [VehicleReviewService],
    }).compile();

    controller = module.get<VehicleReviewController>(VehicleReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
