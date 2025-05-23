import { Exclude, Expose, Type } from 'class-transformer';
import { ContactInfoDTO } from './contact-info.dto';

@Exclude()
export class EmployeeDTO {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() manegerId?: number;

  @Type(() => ContactInfoDTO)
  @Expose()
  contactInfo?: ContactInfoDTO;
}
