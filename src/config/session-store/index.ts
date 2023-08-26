import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import Deasyncify from 'deasyncify';
import Logger from '../logger';
import Hold from '../../shared/utils/hold';
import process from 'process';
import Env from '../../shared/utils/env';

export let sessionStore: RedisStore;
let retry = 3;

export default async function configureSessionStore(): Promise<RedisStore> {
  const logger = new Logger(configureSessionStore.name);

  // Initialize client.
  const redisClient = createClient({
    url: Env.get<string>('REDIS_SESSION_STORE_URL'),
  });

  const [, err] = await Deasyncify.watch(redisClient.connect());

  if (err != null) {
    logger.error(err);
    if (retry > 0) {
      // recursively retry
      logger.log(
        `Error connecting to redis session store, retrying... (${retry} left)`,
      );
      retry -= 1;
      await Hold(3);
      await configureSessionStore();
    }

    process.exit(1);
  }

  logger.log('Connected to redis session store');

  // Initialize session store
  sessionStore = new RedisStore({
    client: redisClient,
    prefix: 'account_session:',
  });

  return sessionStore;
}
