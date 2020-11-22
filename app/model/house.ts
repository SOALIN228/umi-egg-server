/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 08:35
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  return app.model.define('house', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    address: STRING(200),
    price: INTEGER,
    publishTime: DATE,
    cityCode: STRING(10),
    showCount: INTEGER,
    startTime: DATE,
    endTime: DATE
  });
};
