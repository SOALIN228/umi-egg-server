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
      houseId: ctx.params('id'),
      updateTime: ctx.helper.time()
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

  async invokePay (params) {
    return {
      orderNumber: params.id + new Date().getTime().toString()
    };
  }

  public async pay () {
    const { ctx, app } = this;
    const { id } = ctx.params();
    const order = await ctx.model.Orders.findByPk(id);
    if (order) {
      try {
        const beforePay = await this.invokePay({ id });
        const result: any = await ctx.service.orders.pay({
          id,
          orderNumber: beforePay.orderNumber,
          updateTime: ctx.helper.time()
        });
        this.success(result);
      } catch (error) {
        this.error('订单支付失败');
      }
    } else {
      this.error('订单不存在');
    }
  }
}
