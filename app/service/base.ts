/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 01:34
 * Desc:
 */
import { Service, Context, Application } from 'egg';

export default class BaseService extends Service {
  /**
   * 运行时异常处理
   * @param callback
   */
  public run (callback?: (ctx: Context, app: Application) => void) {
    const { app, ctx } = this;
    try {
      if (callback) {
        return callback(ctx, app);
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
