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
}
