/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 21:58
 * Desc:
 */
import { Application } from 'egg';
import BaseService from './base';

export default class HouseService extends BaseService {
  private commonAttr (app: Application) {
    return {
      order: [
        ['showCount', 'DESC']
      ],
      attributes: {
        exclude: ['startTime', 'endTime', 'publishTime']
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: ['url']
        }
      ]
    };
  }

  public async hot () {
    return this.run(async (ctx, app) => {
      return await ctx.model.House.findAll({
        limit: 4,
        ...this.commonAttr(app)
      });
    });
  }

  async search (params: HouseSearch) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [lte]: params.startTime
        },
        endTime: {
          [gte]: params.endTime
        },
        name: {
          [like]: '%' + params.houseName + '%'
        }
      };
      // 没有houseName参数则删除houseName
      if (!params.houseName) {
        delete where.name;
      }
      return await ctx.model.House.findAll({
        limit: 8,
        ...this.commonAttr(app),
        offset: (params.pageNum - 1) * params.pageSize,
        where
      });
    });
  }
}

export interface HouseSearch {
  pageSize: number;
  pageNum: number;
  houseName?: string;
  code: string;
  startTime: string;
  endTime: string;
}
