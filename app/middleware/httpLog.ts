/**
 * User: soalin
 * Date: 2020/11/26
 * Time: 07:49
 * Desc:
 */
import * as dayjs from 'dayjs';
import * as fs from 'fs';

module.exports = options => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const req = ctx.request;
    await next();
    const log = {
      method: req.method,
      url: req.url,
      data: req.body,
      startTime,
      endTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeLength: Date.now() - sTime
    };
    const data = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' [httpLog] ' + JSON.stringify(log) + '\r\n';
    fs.appendFileSync(ctx.app.baseDir + '/httpLog.log', data);
  };
};
