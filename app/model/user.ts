/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 06:29
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, TEXT, DATE, } = app.Sequelize;

  return app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(20),
    password: STRING(64),
    avatar: TEXT('long' as any),
    phone: STRING(20),
    sign: STRING(300),
    createTime: {
      type: DATE,
      field: 'create_time',
      get () {
        return new Date(this.getDataValue('createTime')).getTime();
      }
    },
    updateTime: {
      type: DATE,
      field: 'update_time',
      get () {
        return new Date(this.getDataValue('updateTime')).getTime();
      }
    },
  });
};
