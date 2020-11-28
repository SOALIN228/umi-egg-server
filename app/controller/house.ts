/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 22:02
 * Desc:
 */
import ErrorController from './error';

export default class HouseController extends ErrorController {
  public async hot () {
    const { ctx, app } = this;
    const result: any = await ctx.service.house.hot();
    this.success(result);
  }

  public async search () {
    const { ctx } = this;
    const result: any = await ctx.service.house.search(ctx.params());
    this.success(result);
  }

  public async detail () {
    const { ctx } = this;
    const result: any = await ctx.service.house.detail(ctx.params('id'));
    if (result) {
      this.success({
        info: result,
        banner: result.imgs
      });
    } else {
      this.error('该房间不存在');
    }
  }
}
