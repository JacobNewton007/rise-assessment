import { describe, it } from 'mocha';
import { expect } from 'chai';
import { PostRepositoryImpl } from '../../src/posts/repositories/post.repositories';
import { CreateNullClass } from '../../src/shared/utils/null-class';
import { PostEntity, CommentEntity } from '../../src/posts/entities/post.entity';
import { BadException } from '../../src/shared/errors';
import sinon from 'sinon';
import { SqlQuestWrapper } from './repo.user';



describe('PostRepositoryImpl', () => {
  let sqlQuestStub: { callsFake?: any; oneOrNone: any; one: any; manyOrNone: any };
  let postRepository: PostRepositoryImpl;

  beforeEach(() => {
    sqlQuestStub = {
      oneOrNone: sinon.stub(),
      one: sinon.stub(),
      manyOrNone: sinon.stub(),
    };
    const sqlQuestWrapper = new SqlQuestWrapper(sqlQuestStub);
    postRepository = new PostRepositoryImpl(sqlQuestWrapper as any);
  });

  describe('getUsersPosts', () => {
    it('should return user\'s posts', async () => {

      // Mock data and stub the database response
      const userId = 'user-id';
      const userPosts: PostEntity[] = [
        {
          id: 'post-id',
          title: 'Test Post',
          content: 'Test Content',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'post-id-2',
          title: 'Test Post 2',
          content: 'Test Content 2',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ];

      sqlQuestStub.manyOrNone.resolves(userPosts);

      const result = await postRepository.getUsersPosts(userId);

      expect(result).to.deep.equal(userPosts);
      sinon.assert.calledOnceWithExactly(
        sqlQuestStub.manyOrNone,
        `SELECT users.id as user_id, users.name as user_name, 
          posts.id as post_id, posts.title, posts.content
        FROM posts 
        LEFT JOIN users ON users.id = posts.user_id 
        LEFT JOIN comments ON comments.post_id = posts.id
        WHERE users.id = $1`, [userId]
      );
    });

  });

  describe('getPostByTitle', () => {
    it('should return a post entity by title', async () => {
      const postTitle = 'Test Post';
      const postEntityData = {
        id: 'post-id',
        title: postTitle,
        content: 'Test Content',
        created_at: new Date(),
      };
      const postEntity = new PostEntity(postEntityData);

      sqlQuestStub.oneOrNone.resolves(postEntityData);

      const resultRes = await postRepository.getPostByTitle(postTitle);
      const [result, _] = resultRes;
      expect(result).to.deep.equal(postEntity);
      sinon.assert.calledOnceWithExactly(
        sqlQuestStub.oneOrNone,
        'SELECT * FROM posts WHERE title = $1', [postTitle]
      );
    });

    // Add more test cases for different scenarios
    it('should handle database error', async () => {
      const databaseError = new Error('Database error');
      sqlQuestStub.oneOrNone.rejects(databaseError);
      try {
      
        await postRepository.getPostByTitle('Test Post');
        expect.fail('Expected an error to be thrown');

      } catch (error) {
        expect(error).to.deep.equal(databaseError);
        sinon.assert.calledOnceWithExactly(
          sqlQuestStub.oneOrNone,
          'SELECT * FROM posts WHERE title = $1', ['Test Post']
        )
      }
    })
  });

  describe('getTopUserPosts', () => {
    it('should return top user posts with comments', async () => {
      // Mock data and stub the database response
      const topUserPosts = [
        // An array of top user post objects with comments
        {
          id: 'post-id',
          title: 'Test Post',
          content: 'Test Content',
          created_at: new Date(),
          updated_at: new Date(),
          comments: [
            {
              id: 'comment-id',
              content: 'Test Comment',
              created_at: new Date(),
              updated_at: new Date(),
            }
          ]
        },
        {
          id: 'post-id-2',
          title: 'Test Post 2',
          content: 'Test Content 2',
          created_at: new Date(),
          updated_at: new Date(),
          comments: [
            {
              id: 'comment-id-2',
              content: 'Test Comment 2',
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: 'comment-id-3',
              content: 'Test Comment 3',
              created_at: new Date(),
              updated_at: new Date(),
            }
          ]
        },
        {
          id: 'post-id-3',
          title: 'Test Post 3',
          content: 'Test Content 3',
          created_at: new Date(),
          updated_at: new Date(),
          comments: [
            {
              id: 'comment-id-4',
              content: 'Test Comment 4',
              created_at: new Date(),
              updated_at: new Date(),
            },
            {
              id: 'comment-id-5',
              content: 'Test Comment 5',
              created_at: new Date(),
              updated_at: new Date(),
            }
          ]
        }
      ];
  
      sqlQuestStub.manyOrNone.resolves(topUserPosts);
  
      const result = await postRepository.getTopUserPosts();
  
      expect(result).to.deep.equal(topUserPosts);
    });

  });
  
  describe('createPost', () => {
    it('should create a post and return the post entity', async () => {
      const postData = {
        title: 'Test Post',
        content: 'This is a test post content.',
        user_id: 'user-id',
        created_at: new Date(),
      };
  
      const createdPost = {
        id: 'post-id',
        ...postData,
      };
  
      // Stub the getPostByTitle method to simulate post not existing
      sqlQuestStub.oneOrNone.resolves(null);
  
      // Stub the SQL query response for creating a post
      sqlQuestStub.one.resolves(createdPost);
  
      const result = await postRepository.createPost(postData);
      expect(result[0]).to.deep.equal(new PostEntity(createdPost));
    });
  
    it('should return null post entity and BadException when post already exists', async () => {
      const existingPostTitle = 'Existing Post';
      const nullPostEntity = CreateNullClass<PostEntity>();
      const badException = new BadException('Post already exist');
  
      // Stub the getPostByTitle method to simulate post already existing
      sqlQuestStub.oneOrNone.resolves({ title: existingPostTitle });
  
      const result = await postRepository.createPost({
        title: existingPostTitle,
        content: 'This is some content.',
        user_id: 'user-id',
      });
  
      expect(result[0]).to.deep.equal(nullPostEntity);
      expect(result[1]).to.deep.equal(badException);
      sinon.assert.notCalled(sqlQuestStub.one); // Ensure no insert query is called
    });
  });
    
  describe('createComment', () => {
    it('should create a comment and return the comment entity', async () => {
      const commentData = {
        post_id: 'post-id',
        content: 'This is a test comment.',
        user_id: 'user-id',
        created_at: new Date(),
      };
  
      const createdComment = {
        id: 'comment-id',
        ...commentData,
      };
  
      // Stub the SQL query response for creating a comment
      sqlQuestStub.one.resolves(createdComment);
  
      const result = await postRepository.createComment(commentData);
      expect(result).to.deep.equal(new CommentEntity(createdComment));
    });
  });  
});
