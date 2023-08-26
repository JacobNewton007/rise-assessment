import { CommentEntity, PostEntity } from '../entities/post.entity';
import {
  CreateCommentArgs,
  CreatePostArgs,
  PostRepository,
  PostResultResponse,
} from '../repositories/post.interface';
import postRepository from '../repositories/post.repositories';

export interface PostService {
  createPost(post: CreatePostArgs): Promise<PostResultResponse>;
  getUsersPosts(user_id: string): Promise<PostEntity[]>;
  getTopUserPosts(): Promise<PostEntity[]>;
  createComment(comment: CreateCommentArgs): Promise<CommentEntity>;
}

export class PostServiceImpl implements PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getUsersPosts(id: string): Promise<PostEntity[]> {
    return await this.postRepository.getUsersPosts(id);
  }

  public async createPost(post: CreatePostArgs): Promise<PostResultResponse> {
    return await this.postRepository.createPost(post);
  }

  public async getTopUserPosts(): Promise<PostEntity[]> {
    return await this.postRepository.getTopUserPosts();
  }

  public async createComment(
    comment: CreateCommentArgs,
  ): Promise<CommentEntity> {
    return await this.postRepository.createComment(comment);
  }
}

const postService: PostService = new PostServiceImpl(postRepository);

export default postService;
