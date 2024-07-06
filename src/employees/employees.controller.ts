import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler' // rate limiting
// rate limit - mainly I setuped at app.module.ts
// if u need to limit entire resoruse 
@SkipThrottle() // that would skip everything inside this controller
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) { // Prisma.EmployeeCreateInput --> this type create by prisma using we created model in prisma file.
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // this will rate limit this perticular req
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // if u want to custom rate limit use "Throttle"
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) { // this type create by prisma using we created model in prisma file.
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
