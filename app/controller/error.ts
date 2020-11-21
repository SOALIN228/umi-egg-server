/**
 * User: soalin
 * Date: 2020/11/21
 * Time: 08:21
 * Desc:
 */
import { Controller } from 'egg';

export default class ErrorController extends Controller {
  success (data: string | object = {}, status = 200) {
    const { ctx } = this;
    ctx.body = {
      status,
      data
    };
  }

  error (errMsg = '', status = 500) {
    const { ctx } = this;
    ctx.body = {
      status,
      errMsg
    };
  }
}
