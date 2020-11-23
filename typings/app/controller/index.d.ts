// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportComment from '../../../app/controller/comment';
import ExportCommons from '../../../app/controller/commons';
import ExportError from '../../../app/controller/error';
import ExportHouse from '../../../app/controller/house';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    comment: ExportComment;
    commons: ExportCommons;
    error: ExportError;
    house: ExportHouse;
    user: ExportUser;
  }
}
