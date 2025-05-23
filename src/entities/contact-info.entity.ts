import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class ContactInfo {
  @PrimaryColumn()
  @JoinColumn()
  employeeId: number;
  @OneToOne(() => Employee)
  employee: Employee;
  @Column()
  phone: string;
  @Column()
  email: string;
}
