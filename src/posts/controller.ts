import { StatusCodes } from 'http-status-codes';
import postService, { PostService } from './services/post.service';
import { Response, Request } from 'express';
import RequestWithClaim from '../shared/types';

export class PostController {
  constructor(private readonly postService: PostService) {}

  public getUsersPosts = async (req: Request, res: Response) => {
    const usersPosts = await this.postService.getUsersPosts(req.params.id);
    console.log(usersPosts, req.params.id);
    return res.status(StatusCodes.OK).json({
      status: 'success',
      statusCode: StatusCodes.OK,
      message: 'Successfully retrieved users posts',
      data: usersPosts,
    });
  };

  public getTopUserPosts = async (_req: Request, res: Response) => {
    const topUserPosts = await this.postService.getTopUserPosts();
    return res.status(StatusCodes.OK).json({
      status: 'success',
      statusCode: StatusCodes.OK,
      message: 'Successfully retrieved top user posts',
      data: topUserPosts,
    });
  };

  public createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const postResponse = await this.postService.createPost({
      title,
      content,
      user_id: req.params.id,
    });

    const [post, err] = postResponse;
    if (err != null) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        statusCode: StatusCodes.BAD_REQUEST,
        message: err.message,
        data: post,
      });
    }
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      statusCode: StatusCodes.CREATED,
      message: 'Post created successfully',
      data: post,
    });
  };

  public createComment = async (req: RequestWithClaim, res: Response) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const { user_id } = req.claim;

    const resp = await this.postService.createComment({
      post_id: postId,
      content: comment,
      user_id: user_id,
    });
    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      statusCode: StatusCodes.CREATED,
      message: 'Successfully created comment',
      data: resp,
    });
  };
}

const postController = new PostController(postService);

export default postController;
