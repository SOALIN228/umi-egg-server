/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 02:10
 * Desc:
 */
import { Context } from 'egg';

// 用户心跳，检查用户是否在库中存在
export default function userExistMiddleware (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const user = await ctx.service.user.getUser(ctx.username);
    if (!user) {
      ctx.body = {
        status: 2002,
        errMsg: '用户不存在'
      };
      // 删除redis 中存储用户信息
      ctx.app.redis.del(ctx.username);
      return;
    }
    await next();
  };
}
