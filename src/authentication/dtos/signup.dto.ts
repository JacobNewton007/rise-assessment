import { BaseEntity } from '../../shared/utils/base-entity';

export class SignupDto extends BaseEntity<SignupDto> {
  name: string;
  email: string;
  phone_number: string;
  password: string;
}
