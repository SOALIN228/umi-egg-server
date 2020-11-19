/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 07:06
 * Desc:
 */
import { Controller } from 'egg';
import * as md5 from 'md5';

export default class UserController extends Controller {
  public async register () {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已经存在'
      };
      return;
    }
    const result: any = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
      updateTime: ctx.helper.time()
    });
    if (result) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, ['password']),
          createTime: ctx.helper.timestamp(result.createTime),
          updateTime: ctx.helper.timestamp(result.updateTime)
        }
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '用户注册失败'
      };
    }
  }

  public async login () {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user: any = await ctx.service.user.getUser(username, password);
    if (user) {
      ctx.session.userId = user.id;
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['password']),
          createTime: ctx.helper.timestamp(user.createTime),
          updateTime: ctx.helper.timestamp(user.updateTime)
        }
      };
    } else {
      ctx.body = {
        status: 500,
        errMsg: '该用户不存在'
      };
    }
  }
}
