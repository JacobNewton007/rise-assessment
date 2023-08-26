import { BadException } from '../../shared/errors';
import { CommentEntity, PostEntity } from '../entities/post.entity';

export type CreatePostArgs = Partial<
  Omit<PostEntity, 'id' | 'created_at' | 'updated_at'>
>;

export type CreateCommentArgs = Partial<
  Omit<CommentEntity, 'id' | 'created_at' | 'updated_at'>
>;

export type PostResultResponse = [PostEntity, BadException];

export interface PostRepository {
  createPost(post: CreatePostArgs): Promise<PostResultResponse>;
  getUsersPosts(user_id: string): Promise<PostEntity[]>;
  getPostByTitle(title: string): Promise<PostResultResponse>;
  getTopUserPosts(): Promise<PostEntity[]>;
  createComment(comment: CreateCommentArgs): Promise<CommentEntity>;
}
