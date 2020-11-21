// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUserExist from '../../../app/middleware/userExist';

declare module 'egg' {
  interface IMiddleware {
    userExist: typeof ExportUserExist;
  }
}
