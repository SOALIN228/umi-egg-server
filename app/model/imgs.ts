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
    houseID: INTEGER,
    createTime: DATE,
  });
};
