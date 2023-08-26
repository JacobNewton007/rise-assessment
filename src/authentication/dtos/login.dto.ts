import { BaseEntity } from '../../shared/utils/base-entity';

export class LoginDto extends BaseEntity<LoginDto> {
  email: string;
  password: string;
}
