/**
 * User: soalin
 * Date: 2020/11/22
 * Time: 08:47
 * Desc:
 */
import { Application } from 'egg';

export default (app: Application) => {
  const { STRING, INTEGER, DATE, } = app.Sequelize;

  const Comment: any = app.model.define('comment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: INTEGER,
      field: 'user_id'
    },
    houseId: {
      type: INTEGER,
      field: 'house_id'
    },
    msg: STRING(500),
    createTime: {
      type: DATE,
      field: 'create_time',
      get () {
        return new Date(this.getDataValue('createTime')).getTime();
      }
    },
  });

  Comment.associate = () => {
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'userId' });
  };
  return Comment;
};
