import { Context } from 'egg';

export default function loginMiddleware (options): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    // 获取session 中的token
    // const user = ctx.session[ctx.username];
    // 用户传递的token
    const token = ctx.request.token;
    // 获取redis 中的token
    const userToken = await ctx.app.redis.get(ctx.username);
    // 比较token，判断是否登录
    const user = userToken ? userToken === token : false;

    if (!user && !options.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录'
      };
    } else {
      await next();
    }
  };
}
