import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ContactInfoDTO {
  @Expose() phone?: string;
  @Expose() email?: string;
}
