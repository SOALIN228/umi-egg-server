/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 09:01
 * Desc:
 */
import { Context } from 'egg';

// 判断访问接口是否存在
export default function notFoundMiddleware (options): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const flag = ctx.app.router.stack.filter(item => {
      return item.regexp.test(ctx.request.url);
    });

    if (flag.length) {
      await next();
    } else {
      ctx.body = {
        status: 404,
        errMsg: '接口 ' + ctx.request.url + ' 不存在'
      };
    }
  };
}
