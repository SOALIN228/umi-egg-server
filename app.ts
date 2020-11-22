/**
 * User: soalin
 * Date: 2020/11/20
 * Time: 22:50
 * Desc:
 */
import { Application } from 'egg';

export default function app (app: Application) {
  const store = {};

  (app as any).sessionStore = {
    async get (key) {
      console.log('--store--', store);
      return store[key];
    },
    async set (key, value, maxAge) {
      store[key] = value;
      console.log(key, value, maxAge);
    },
    async destroy (key) {
      store[key] = null;
    }
  };
  // 配置自定义middlewaer，加入到洋葱模型中，每次路由前执行
  app.config.coreMiddleware.push('notFound');
  app.config.coreMiddleware.push('auth');
}
