/**
 * User: soalin
 * Date: 2020/11/26
 * Time: 21:28
 * Desc:
 */
import { Context } from 'egg';

export default function limitMiddleware (options) {
  let count = 0;
  let firstTime = new Date().getTime();
  return async (ctx: Context, next: () => Promise<any>) => {
    // 请求间隔大于设置时间，或请求数据大于设置，进入下一步
    if (new Date().getTime() - firstTime >= options.time || count >= options.maxCount) {
      // 请求大于最大请求数,进行重制
      if (count >= options.maxCount) {
        count = 0;
        firstTime = new Date().getTime();
        ctx.body = {
          status: 500,
          errMsg: '请求太频繁'
        };
        return;
      }
      // 满足limit条件，重制发送条件
      count = 0;
      firstTime = new Date().getTime();
    }
    count++;
    await next();
  };
}
