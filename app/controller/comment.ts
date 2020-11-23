/**
 * User: soalin
 * Date: 2020/11/23
 * Time: 20:34
 * Desc:
 */
import ErrorController from './error';

export default class CommentController extends ErrorController {
  public async add () {
    const { ctx } = this;
    const user: any = await ctx.service.user.getUser(ctx.username);
    const result: any = await ctx.service.comment.add({
      userId: user.id,
      houseId: ctx.params('houseId'),
      msg: ctx.params('comment'),
      createTime: ctx.helper.time()
    });

    this.success(result);
  }

  public async lists () {
    const { ctx } = this;
    const result: any = await ctx.service.comment.lists(ctx.params());

    this.success(result);
  }
}
