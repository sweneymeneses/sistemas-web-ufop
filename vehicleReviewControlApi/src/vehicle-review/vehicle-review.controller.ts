import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VehicleReviewService } from './vehicle-review.service';
import { CreateVehicleReviewDto } from './dto/create-vehicle-review.dto';
import { UpdateVehicleReviewDto } from './dto/update-vehicle-review.dto';
import { FindVehicleReviewDto } from './dto/find-vehicle-review.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Revisão do veiculo')
@Controller('vehicle-review')
export class VehicleReviewController {
  constructor(private readonly vehicleReviewService: VehicleReviewService) {}

  @Post()
  create(@Body() createVehicleReviewDto: CreateVehicleReviewDto) {
    return this.vehicleReviewService.create(createVehicleReviewDto);
  }

  @Get()
  findAll(@Query() params: FindVehicleReviewDto) {
    return this.vehicleReviewService.findAll(
      params.index,
      params.step,
      params.query,
      params.filterName,
      params.filterValue,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleReviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleReviewDto: UpdateVehicleReviewDto,
  ) {
    return this.vehicleReviewService.update(id, updateVehicleReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleReviewService.remove(id);
  }
}
