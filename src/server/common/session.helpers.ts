import { v4 } from 'uuid';
import { cookies } from 'next/headers';
import { TipiCache } from '../core/TipiCache/TipiCache';
import { db } from '../db';
import { AuthQueries } from '../queries/auth/auth.queries';

const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day
const COOKIE_NAME = 'tipi.sid';

export const generateSessionId = (prefix: string) => {
  return `${prefix}-${v4()}`;
};

export const setSession = async (sessionId: string, userId: string) => {
  const cache = new TipiCache('setSession');

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, sessionId, { maxAge: COOKIE_MAX_AGE, httpOnly: true, secure: false, sameSite: false });

  const sessionKey = `session:${sessionId}`;

  await cache.set(sessionKey, userId, COOKIE_MAX_AGE * 7);
  await cache.set(`session:${userId}:${sessionId}`, sessionKey, COOKIE_MAX_AGE * 7);

  await cache.close();
};

export const getUserFromCookie = async () => {
  const authQueries = new AuthQueries(db);

  const cookieStore = cookies();
  const sessionId = cookieStore.get('tipi.sid');

  if (!sessionId) {
    return null;
  }

  const cache = new TipiCache('getUserFromCookie');
  const sessionKey = `session:${sessionId.value}`;
  const userId = await cache.get(sessionKey);
  await cache.close();

  if (!userId) {
    return null;
  }

  const user = await authQueries.getUserDtoById(Number(userId));

  return user;
};
