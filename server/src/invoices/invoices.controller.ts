import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @Get()
  async findAll(): Promise<any[]> {
    return this.invoicesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.invoicesService.findOne(id);
  }
}
