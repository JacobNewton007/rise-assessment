export const BASE_AUTH_ROUTE = '/auth';
const authRoute = (path: string) => `${BASE_AUTH_ROUTE}${path}`;

const ROUTES = {
  LOGIN: authRoute('/login'),
};

export default ROUTES;
