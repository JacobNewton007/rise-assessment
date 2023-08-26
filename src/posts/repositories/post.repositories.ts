import {
  CreateCommentArgs,
  CreatePostArgs,
  PostRepository,
  PostResultResponse,
} from './post.interface';
import { CommentEntity, PostEntity } from '../entities/post.entity';
import { sqlQuest } from '../../config/database';
import { SqlQuest } from '@bitreel/sql-quest';
import { BadException } from '../../shared/errors';
import { CreateNullClass } from '../../shared/utils/null-class';

export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly sqlQuest: SqlQuest) {}

  public async getUsersPosts(user_id: string): Promise<PostEntity[]> {
    const res = await this.sqlQuest.manyOrNone(
      `SELECT users.id as user_id, users.name as user_name, 
          posts.id as post_id, posts.title, posts.content
        FROM posts 
        LEFT JOIN users ON users.id = posts.user_id 
        LEFT JOIN comments ON comments.post_id = posts.id
        WHERE users.id = $1`,
      [user_id],
    );

    return res;
  }

  public async getPostByTitle(title: string): Promise<PostResultResponse> {
    const errRes: BadException = new BadException('Post Not Found');
    let result: PostEntity = new PostEntity();

    const res = await this.sqlQuest.oneOrNone(
      'SELECT * FROM posts WHERE title = $1',
      [title],
    );
    if (!res) {
      result = CreateNullClass<PostEntity>();
      return [result, errRes];
    }

    result = new PostEntity({
      id: res.id,
      title: res.title,
      content: res.content,
      created_at: res.created_at,
    });

    return [result, null as unknown as BadException];
  }

  public async createPost({
    title,
    content,
    user_id,
  }: CreatePostArgs): Promise<PostResultResponse> {
    const errRes: BadException = new BadException('Post already exist');
    let result: PostEntity = new PostEntity();

    const postExistResponse = await this.getPostByTitle(title as string);
    const [postExist, _] = postExistResponse;

    if (postExist) {
      result = CreateNullClass<PostEntity>();
      return [result, errRes];
    }

    const res = await this.sqlQuest.one(
      `INSERT INTO posts(title, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, content, user_id],
    );

    result = new PostEntity({
      id: res.id,
      user_id: res.user_id,
      title: res.title,
      content: res.content,
      created_at: res.created_at,
    });

    return [result, null as unknown as BadException];
  }

  public async getTopUserPosts(): Promise<PostEntity[]> {
    const res = await this.sqlQuest.manyOrNone(
      `WITH UserPostCounts AS (
        SELECT
            u.id AS user_id,
            p.title AS title,
            u.name AS user_name,
            COUNT(p.id) AS post_count,
            ROW_NUMBER() OVER (ORDER BY COUNT(p.id) DESC) AS row_num
        FROM users u
        LEFT JOIN posts p ON u.id = p.user_id
        GROUP BY u.id, u.name, p.title
    ),
    LatestUserComments AS (
        SELECT
            c.user_id,
            c.content AS comment,
            c.created_at AS latest_comment_timestamp,
            ROW_NUMBER() OVER (PARTITION BY c.user_id ORDER BY c.created_at DESC) AS comment_row_num
        FROM comments c
    )
    SELECT
        upc.user_name,
        upc.title,
        upc.post_count,
        luc.comment,
        luc.latest_comment_timestamp AS created_at
    FROM UserPostCounts upc
    JOIN LatestUserComments luc ON upc.user_id = luc.user_id AND luc.comment_row_num = 1
    WHERE upc.row_num <= 3
    ORDER BY upc.row_num;
    `,
    );
    return res;
  }

  public async createComment({
    post_id,
    content,
    user_id,
  }: CreateCommentArgs): Promise<CommentEntity> {
    const res = await this.sqlQuest.one(
      `INSERT INTO comments(post_id, content, user_id)
      VALUES ($(post_id), $(content), $(user_id))
      RETURNING *`,
      {
        post_id,
        content,
        user_id,
      },
    );

    return new CommentEntity({
      id: res.id,
      post_id: res.post_id,
      user_id: res.user_id,
      content: res.content,
      created_at: res.created_at,
    });
  }
}

const postRepository: PostRepository = new PostRepositoryImpl(sqlQuest);

export default postRepository;
