/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 08:46
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  return app.model.define('imgs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: STRING(500),
    houseId: {
      type: INTEGER,
      field: 'house_id'
    },
    createTime: {
      type: DATE,
      field: 'create_time',
      get () {
        return new Date(this.getDataValue('createTime')).getTime();
      }
    },
  });
};
