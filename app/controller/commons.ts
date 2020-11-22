import ErrorController from './error';

export default class CommonsController extends ErrorController {
  public async cities () {
    const { ctx } = this;
    try {
      const result = await ctx.service.commons.cities();
      if (result) {
        this.success([result]);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (err) {
      this.error('获取城市数据失败');
    }
  }
}
