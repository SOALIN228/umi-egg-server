/**
 * User: soalin
 * Date: 2020/11/26
 * Time: 21:10
 * Desc:
 */
import { Context } from 'egg';

// 预防csrf 攻击，只允许白名单域名访问
export default function hostsMiddleware (options) {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { referer } = ctx.request.header;
    if (referer) {
      const url = new URL(referer);
      if (options.includes(url.host)) {
        await next();
      } else {
        ctx.body = {
          status: 403,
          errMsg: `host ${url.host} 被禁止`
        };
      }
    } else {
      await next();
    }
  };
}
