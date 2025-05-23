import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async seed() {
    await this.dataSource.transaction(async (db) => {
      const ceo = db.create(Employee, {
        name: 'Mr.Rogério',
      });

      await db.save(ceo);

      const contactInfo = db.create(ContactInfo, {
        email: 'ceo@acme.com',
        employee: ceo,
      });

      await db.save(contactInfo);

      const manager = db.create(Employee, {
        name: 'Manager',
        manager: ceo,
      });

      await db.save(manager);

      const firstTask = db.create(Task, {
        name: 'Hire People',
        assignee: manager,
      });

      const secondTask = db.create(Task, {
        name: 'Present to CEO',
        assignee: manager,
      });

      await db.save([firstTask, secondTask]);

      const meeting = db.create(Meeting, {
        attendees: [ceo, manager],
        zoomUrl: 'https://zoom.us/123',
      });

      await db.save(meeting);
    });
  }
}
