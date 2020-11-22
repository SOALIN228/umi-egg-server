/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 08:35
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  const House: any = app.model.define('house', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(50),
    info: STRING(150),
    address: STRING(200),
    price: INTEGER,
    publishTime: DATE,
    cityCode: STRING(10),
    showCount: INTEGER,
    startTime: DATE,
    endTime: DATE
  });

  // 一个房子对应多个图片，使用 hasMany 做关联
  House.associate = () => {
    app.model.House.hasMany(app.model.Imgs, { foreignKey: 'houseId' });
  };
  return House;
};
