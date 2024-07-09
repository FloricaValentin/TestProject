import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<any[]> {
    return await this.prismaService.invoice.findMany();
  }

  async findOne(id: number): Promise<any> {
    return await this.prismaService.invoice.findUnique({
      where: { id },
    });
  }
}
