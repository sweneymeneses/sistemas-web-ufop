import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  async findAll(index = 0, step = 100, query: string | undefined) {
    const customers = await this.prisma.customer.findMany({
      where: {
        name: { contains: query },
      },
      skip: index,
      take: step,
    });

    const count = await this.prisma.customer.count({
      where: {
        name: { contains: query },
      },
    });

    return { count: count, items: customers };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return await this.prisma.customer.update({
      data: updateCustomerDto,
      where: { id },
    });
  }
}
