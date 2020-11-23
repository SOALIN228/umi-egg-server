/**
 * User: soalin
 * Date: 2020/11/23
 * Time: 20:35
 * Desc:
 */
import BaseService from './base';

export default class CommentService extends BaseService {
  public async add (params) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Comment.create(params);
    });
  }

  public async lists (params) {
    return this.run(async (ctx, app) => {
      return await ctx.model.Comment.findAll({
        where: {
          houseId: params.id
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        include: [
          {
            model: app.model.User,
            attributes: ['avatar', 'username']
          }
        ]
      });
    });
  }
}
