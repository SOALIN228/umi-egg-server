// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHttpLog from '../../../app/middleware/httpLog';
import ExportUserExist from '../../../app/middleware/userExist';

declare module 'egg' {
  interface IMiddleware {
    httpLog: typeof ExportHttpLog;
    userExist: typeof ExportUserExist;
  }
}
