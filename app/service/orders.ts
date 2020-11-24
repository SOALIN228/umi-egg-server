/**
 * User: soalin
 * Date: 2020/11/24
 * Time: 21:41
 * Desc:
 */
import BaseService from './base';

export default class OrdersService extends BaseService {
  public async hasOrder (params: OrdersProps) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Orders.findOne({
        where: {
          userId: params.userId,
          houseId: params.houseId
        }
      });
    });
  }

  public async addOrder (params: OrdersProps) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Orders.create(params);
    });
  }

  public async delOrder (params: OrdersProps) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Orders.update({
        isPayed: -1
      }, {
        where: {
          userId: params.userId,
          houseId: params.houseId
        }
      });
    });
  }
}

export interface OrdersProps {
  userId: string;
  houseId: string;
  orderNumber?: string;
  isPayed?: number;
  createTime?: string;
  updateTime?: string
}
