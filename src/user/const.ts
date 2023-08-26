export const BASE_AUTH_ROUTE = '/users';
const authRoute = (path = '') => `${BASE_AUTH_ROUTE}${path}`;

const ROUTES = {
  // GET_USER_BY_ID: authRoute('/users/:id'),
  GET_USERS: authRoute(),
  REGISTER: authRoute(),
};

export default ROUTES;
