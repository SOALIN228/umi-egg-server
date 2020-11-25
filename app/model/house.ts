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
    publishTime: {
      type: DATE,
      field: 'publish_time',
      get () {
        return new Date(this.getDataValue('publishTime')).getTime();
      }
    },
    cityCode: {
      type: STRING(10),
      field: 'city_code'
    },
    showCount: {
      type: INTEGER,
      field: 'show_count'
    },
    startTime: {
      type: DATE,
      field: 'start_time',
      get () {
        return new Date(this.getDataValue('startTime')).getTime();
      }
    },
    endTime: {
      type: DATE,
      field: 'end_time',
      get () {
        return new Date(this.getDataValue('endTime')).getTime();
      }
    }
  });

  // 一个房子对应多个图片，使用 hasMany 做关联
  House.associate = () => {
    app.model.House.hasMany(app.model.Imgs, { foreignKey: 'houseId' });
  };
  return House;
};
