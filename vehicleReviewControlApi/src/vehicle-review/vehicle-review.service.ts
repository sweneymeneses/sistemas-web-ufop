import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleReviewDto } from './dto/create-vehicle-review.dto';
import { UpdateVehicleReviewDto } from './dto/update-vehicle-review.dto';

@Injectable()
export class VehicleReviewService {
  constructor(private prisma: PrismaService) {}

  create(createVehicleReviewDto: CreateVehicleReviewDto) {
    return this.prisma.vehicle_review.create({ data: createVehicleReviewDto });
  }

  async findAll(
    index = 0,
    step = 100,
    query: string | undefined,
    filterName: string,
    filterValue: boolean | undefined,
  ) {
    const vehicleReviews = await this.prisma.vehicle_review.findMany({
      where: {
        board: { contains: query, mode: 'insensitive' },
        [filterName]: filterValue,
      },
      include: {
        customer: true,
      },
      skip: index,
      take: step,
    });

    const count = await this.prisma.vehicle_review.count({
      where: {
        board: { contains: query },
        [filterName]: filterValue,
      },
    });

    return { count: count, items: vehicleReviews };
  }

  async findOne(id: string) {
    const vehicleReview = await this.prisma.vehicle_review.findUnique({
      where: { id },
      include: {
        customer: true,
      },
      rejectOnNotFound: true,
    });

    return vehicleReview;
  }

  async update(id: string, updateVehicleReviewDto: UpdateVehicleReviewDto) {
    return await this.prisma.vehicle_review.update({
      data: updateVehicleReviewDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.vehicle_review.delete({ where: { id } });
  }
}
