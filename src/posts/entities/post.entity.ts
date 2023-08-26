import { UserEntity } from 'src/user/entities/user.entity';
import { BaseEntity } from '../../shared/utils/base-entity';

export class PostEntity extends BaseEntity<PostEntity> {
  id?: string;
  user_id?: string;
  title: string | null;
  content: string | null;
  created_at?: Date;
  updated_at?: Date;
  user?: Omit<
    UserEntity,
    'created_at' | 'updated_at' | 'phone_number' | 'password' | 'email'
  >;
  comment?: CommentEntity;
}

export class CommentEntity extends BaseEntity<CommentEntity> {
  id?: string;
  post_id: string;
  user_id: string;
  content: string | null;
  created_at?: Date;
  updated_at?: Date;
}
