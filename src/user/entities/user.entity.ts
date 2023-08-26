import { BaseEntity } from '../../shared/utils/base-entity';

export class UserEntity extends BaseEntity<UserEntity> {
  id?: string;
  email: string | null;
  name: string | null;
  phone_number?: string | null;
  password: string | null;
  created_at?: Date;
  updated_at?: Date;
}
