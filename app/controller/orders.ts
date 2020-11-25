/**
 * User: soalin
 * Date: 2020/11/24
 * Time: 21:41
 * Desc:
 */
import ErrorController from './error';

export default class OrdersController extends ErrorController {
  public async hasOrder () {
    const { ctx, } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);
    const result: any = await ctx.service.orders.hasOrder({
      userId: user.id,
      houseId: ctx.params('id')
    });

    this.success(result);
  }

  public async addOrder () {
    const { ctx } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);
    const result: any = await ctx.service.orders.addOrder({
      userId: user.id,
      orderNumber: `${new Date().getTime() + Math.floor(Math.random() * 100)}`,
      houseId: ctx.params('id'),
      isPayed: 0,
      createTime: ctx.helper.time(),
      updateTime: ctx.helper.time(),
    });

    this.success(result);
  }

  public async delOrder () {
    const { ctx } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);
    const result: any = await ctx.service.orders.delOrder({
      userId: user.id,
      houseId: ctx.params('id')
    });

    this.success(result);
  }

  public async lists () {
    const { ctx } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);
    const result: any = await ctx.service.orders.lists({
      ...ctx.params(),
      userId: user.id
    });

    this.success(result);
  }
}
