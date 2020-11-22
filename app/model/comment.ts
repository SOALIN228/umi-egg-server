/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 08:47
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  return app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    urlId: INTEGER,
    houseID: INTEGER,
    msg: STRING(500),
    createTime: DATE,
  });
};
