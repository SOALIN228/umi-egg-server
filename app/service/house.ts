/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 21:58
 * Desc:
 */
import BaseService from './base';

export default class HouseService extends BaseService {
  public async hot () {
    return this.run(async (ctx, app) => {
      return await ctx.model.House.findAll({
        limit: 4,
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
      });
    });
  }
}
