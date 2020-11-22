/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 23:01
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, } = app.Sequelize;

  return app.model.define('cities', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    label: STRING(10),
    value: STRING(10)
  });
};
