import development from './development';
import test from './test';
import production from './production';
import { JwtSignature } from 'src/shared/interfaces';

export const JwtSignOptions: JwtSignature = {
  issuer: 'Clearline',
  subject: 'Authentication Token',
  audience: 'https://clearline.com',
};

export default {
  production,
  development,
  test,
}[process.env.NODE_ENV || 'development'];
