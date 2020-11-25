/**
 * User: soalin
 * Date: 2020/11/24
 * Time: 08:40
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  const Orders: any = app.model.define('orders', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    orderNumber: {
      type: STRING(20),
      field: 'order_number',
    },
    userId: {
      type: INTEGER,
      field: 'user_id',
    },
    houseId: {
      type: INTEGER,
      field: 'house_id',
    },
    isPayed: {
      type: INTEGER,
      field: 'is_payed',
    },
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

  Orders.associate = () => {
    app.model.Orders.belongsTo(app.model.House, { foreignKey: 'houseId', as: 'house' });
  };

  return Orders;
};
