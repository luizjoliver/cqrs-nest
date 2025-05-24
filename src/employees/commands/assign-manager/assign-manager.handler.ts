import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { AssignManagerCommand } from './assign-manager.command';

@CommandHandler(AssignManagerCommand)
export class AssignManagerHandler
  implements ICommandHandler<AssignManagerCommand, number>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: AssignManagerCommand): Promise<number> {
    return await this.dataSource.transaction(async (db) => {
      const employeeToUpdate = await db.findOne(Employee, {
        where: {
          id: command.id,
        },
      });

      if (!employeeToUpdate) return 0;

      db.merge(Employee, employeeToUpdate, command);
      await db.save(Employee, employeeToUpdate);

      return 1;
    });
  }
}
