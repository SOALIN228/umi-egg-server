// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCities from '../../../app/model/cities';
import ExportComment from '../../../app/model/comment';
import ExportHouse from '../../../app/model/house';
import ExportImgs from '../../../app/model/imgs';
import ExportOrders from '../../../app/model/orders';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Cities: ReturnType<typeof ExportCities>;
    Comment: ReturnType<typeof ExportComment>;
    House: ReturnType<typeof ExportHouse>;
    Imgs: ReturnType<typeof ExportImgs>;
    Orders: ReturnType<typeof ExportOrders>;
    User: ReturnType<typeof ExportUser>;
  }
}
