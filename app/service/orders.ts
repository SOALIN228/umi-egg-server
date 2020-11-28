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
      const { Op } = app.Sequelize;

      return await ctx.model.Orders.findOne({
        order: [
          ['createTime', 'DESC']
        ],
        where: {
          userId: params.userId,
          houseId: params.houseId,
          isPayed: {
            [Op.in]: [0, 1]
          }
        },
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

  public async lists (params: OrdersList) {
    return this.run(async (ctx, app) => {
      return ctx.model.Orders.findAll({
        where: {
          isPayed: params.type,
          userId: params.userId
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.House,
            as: 'house',
            include: [
              {
                model: app.model.Imgs,
                attributes: ['url'],
                limit: 1
              }
            ]
          }
        ]
      });
    });
  }

  public async pay (params: PayProps) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Orders.update({
        isPayed: 1,
        orderNumber: params.orderNumber,
        updateTime: params.updateTime
      }, {
        where: {
          id: params.id
        }
      });
    });
  }

  public async achieve (params: AchieveProps) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Orders.update({
        isPayed: 2,
        updateTime: params.updateTime
      }, {
        where: {
          id: params.id
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

export interface OrdersList {
  type: number;
  userId: string;
  pageSize: number;
  pageNum: number;
}

export interface PayProps {
  id: string;
  orderNumber: string;
  updateTime: string;
}

export interface AchieveProps {
  id: string;
  updateTime: string;
}
