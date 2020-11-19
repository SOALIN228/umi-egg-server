/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 07:18
 * Desc:
 */
import { Service } from 'egg';
import * as md5 from 'md5';

export default class UserService extends Service {
  public async getUser (username: string, password?: string) {
    try {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async add (params: UserItem) {
    try {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export interface UserItem {
  username: string;
  password: string;
}
