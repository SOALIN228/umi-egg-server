/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 23:04
 * Desc:
 */
import BaseService from './base';

export default class CommonsService extends BaseService {
  public async cities () {
    return this.run(async (ctx, app) => {
      return await ctx.model.Cities.findAll({
        attributes: {
          exclude: ['id']
        }
      });
    });
  }
}
