export const BASE_AUTH_ROUTE = '/users/:id';
export const BASE_POST_ROUTE = '/posts';
const userRoute = (path = '') => `${BASE_AUTH_ROUTE}${path}`;
const postRoute = (path = '') => `${BASE_POST_ROUTE}${path}`;

const ROUTES = {
  CREATE_POST: userRoute('/posts'),
  GET_USERS_POSTS: userRoute('/posts'),
  GET_TOP_USER_POSTS: postRoute('/top'),
  CREATE_COMMENT: postRoute('/:postId/comments'),
};

export default ROUTES;
