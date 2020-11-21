/**
 * User: soalin
 * Date: 2020/11/20
 * Time: 07:28
 * Desc:
 */
import { Context } from 'egg';

export default {
  params (key?: string) {
    const _this = this as Context;
    const method = _this.request.method;
    if (method === 'GET') {
      return key ? _this.query[key] : _this.query;
    }

    return key ? _this.request.body[key] : _this.request.body;
  },
  get username () {
    const _this = this as Context;
    const token = _this.request.header.token;
    const tokenCache: any = token ? _this.app.jwt.verify(token, _this.app.config.jwt.secret) : undefined;

    return tokenCache ? tokenCache.username : undefined;
  }
};
