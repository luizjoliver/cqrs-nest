import { IsInt, IsOptional } from 'class-validator';

export class AssignManagerDTO {
  @IsInt()
  @IsOptional()
  managerId?: number;
}
