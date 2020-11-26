/**
 * User: soalin
 * Date: 2020/11/26
 * Time: 23:21
 * Desc:
 */
import { Context } from 'egg';

export default function cacheMiddleware (options) {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { url } = ctx.request;
    const cacheUrl = await ctx.app.redis.get(url);

    if (options.include.includes(url)) {
      if (cacheUrl) {
        ctx.body = JSON.parse(cacheUrl);
        return;
      }
      await next();
      await ctx.app.redis.set(url, JSON.stringify(ctx.response.body), 'EX', 8);
    } else {
      await next();
    }
  };
}
