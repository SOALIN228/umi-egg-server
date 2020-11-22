// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportBase from '../../../app/service/base';
import ExportCommons from '../../../app/service/commons';
import ExportHouse from '../../../app/service/house';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    base: AutoInstanceType<typeof ExportBase>;
    commons: AutoInstanceType<typeof ExportCommons>;
    house: AutoInstanceType<typeof ExportHouse>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
