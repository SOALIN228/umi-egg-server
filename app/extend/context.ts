/**
 * User: soalin
 * Date: 2020/11/20
 * Time: 07:28
 * Desc:
 */
import { Context } from 'egg';

export default {
  get username () {
    const token = (this as Context).request.header.token;
    const tokenCache: any = token ? (this as Context).app.jwt.verify(token, (this as Context).app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.username : undefined;
  }
};
