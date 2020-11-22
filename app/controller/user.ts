/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 07:06
 * Desc:
 */
import { Context } from 'egg';
import ErrorController from './error';
import * as md5 from 'md5';

export default class UserController extends ErrorController {
  private async jwtSign () {
    const { ctx, app } = this;
    const username = ctx.params('username');
    const token = (app as any).jwt.sign({
      username,
    }, app.config.jwt.secret);

    // 保存token到session
    // ctx.session[username] = 1;

    // 保存token到redis
    await (app as any).redis.set(username, token, 'EX', app.config.redisExpire);
    return token;
  }

  private parseResult (ctx: Context, result: any) {
    return {
      ...ctx.helper.unPick(result.dataValues, ['password']),
      createTime: ctx.helper.timestamp(result.createTime),
      updateTime: ctx.helper.timestamp(result.updateTime)
    };
  }

  public async register () {
    const { ctx, app } = this;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error('用户已经存在');
      return;
    }
    const result: any = await ctx.service.user.add({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
      updateTime: ctx.helper.time()
    });
    if (result) {
      const token = await this.jwtSign();
      this.success({
        ...this.parseResult(ctx, result),
        token
      });
    } else {
      this.error('用户注册失败');
    }
  }

  public async login () {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user: any = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign();
      this.success({
        ...this.parseResult(ctx, user),
        token
      });
    } else {
      this.error('账号或密码错误');
    }
  }

  public async detail () {
    const { ctx } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);

    if (user) {
      this.success({
        ...this.parseResult(ctx, user),
      });
    } else {
      this.error('该用户不存在', 2002);
    }
  }

  public async logout () {
    const { ctx } = this;
    try {
      // ctx.session[ctx.username] = null;
      // 删除redis 中存储用户信息
      ctx.app.redis.del(ctx.username);
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }

  public async edit () {
    const { ctx } = this;
    try {
      const result = ctx.service.user.edit({
        ...ctx.params(),
        updateTime: ctx.helper.time()
      });
      this.success({ msg: '修改成功' });
    } catch (error) {
      this.error('修改信息失败');
    }
  }
}
