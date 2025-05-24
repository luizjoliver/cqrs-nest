import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './commands/create-employee/create-employee.dto';
import { UpdateEmployeeDto } from './commands/update-employee/update-employee.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetEmployeeQuery } from './queries/get-employee/GetEmployeeQuery';
import { plainToClass } from 'class-transformer';
import { EmployeeDTO } from './queries/get-employee/employee.dto';
import { CreateEmployeeCommand } from './commands/create-employee/create-employee.command';
import { UpdateEmployeeCommand } from './commands/update-employee/update-employee.command';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const command = plainToClass(CreateEmployeeCommand, dto);

    const id: number = await this.commandBus.execute(command);

    const query = plainToClass(GetEmployeeQuery, { id });
    const employee: EmployeeDTO = await this.queryBus.execute(query);

    return employee;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });
    const employee: EmployeeDTO = await this.queryBus.execute(query);

    if (!employee) throw new NotFoundException();

    return employee;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const command = plainToClass(UpdateEmployeeCommand, {
      ...dto,
      id: Number(id),
    });

    const affectedRows: number = await this.commandBus.execute(command);

    if (!affectedRows) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });
    const employeeId: number = await this.queryBus.execute(query);

    return employeeId;
  }
}
