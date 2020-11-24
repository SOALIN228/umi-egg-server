// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportBase from '../../../app/service/base';
import ExportComment from '../../../app/service/comment';
import ExportCommons from '../../../app/service/commons';
import ExportHouse from '../../../app/service/house';
import ExportOrders from '../../../app/service/orders';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    base: AutoInstanceType<typeof ExportBase>;
    comment: AutoInstanceType<typeof ExportComment>;
    commons: AutoInstanceType<typeof ExportCommons>;
    house: AutoInstanceType<typeof ExportHouse>;
    orders: AutoInstanceType<typeof ExportOrders>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
