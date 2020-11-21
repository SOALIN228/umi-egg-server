/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 07:18
 * Desc:
 */
import BaseService from './base';
import * as md5 from 'md5';

export default class UserService extends BaseService {
  public async getUser (username: string, password?: string) {
    return this.run(async (ctx, app) => {
      if (!username) {
        return null;
      }
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      return await ctx.model.User.findOne({
        where: _where
      });
    });
  }

  public async add (params: UserItem) {
    return this.run(async (ctx, app) => {
      return await ctx.model.User.create(params);
    });
  }

  public async edit (params: Partial<UserItem>) {
    return this.run(async (ctx, app) => {
      return await ctx.model.User.update(params, {
        where: {
          username: ctx.username
        }
      });
    });
  }
}

export interface UserItem {
  username: string;
  password: string;
  avatar: string;
  phone: string;
  sign: string;
  updateTime: string;
}
