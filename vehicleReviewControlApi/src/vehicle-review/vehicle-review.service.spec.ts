import { Test, TestingModule } from '@nestjs/testing';
import { VehicleReviewService } from './vehicle-review.service';

describe('VehicleReviewService', () => {
  let service: VehicleReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleReviewService],
    }).compile();

    service = module.get<VehicleReviewService>(VehicleReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
