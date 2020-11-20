/**
 * User: soalin
 * Date: 2020/11/19
 * Time: 22:24
 * Desc:
 */
import * as dayjs from 'dayjs';

export default {
  time () {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  timestamp (data: number | string | Date) {
    return new Date(data).getTime();
  },
  unPick (source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  }
};
