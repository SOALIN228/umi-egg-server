import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605737004796_750';

  // add your egg config in here
  config.middleware = ['httpLog'];

  config.httpLog = {
    type: 'all'
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    salt: 'soalin',
    redisExpire: 60 * 60 * 24
  };

  // 关闭egg 自带csrf
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // csrf 访问白名单
  config.allowHosts = ['localhost:8000', '127.0.0.1:8000'];

  // 配置session
  config.session = {
    key: 'SOA_salt',
    httpOnly: true,
    maxAge: 24 * 3600 * 1000,
    renew: true
  };

  // 配置jwt
  config.jwt = {
    secret: 'SOA_salt'
  };

  // 配置登录拦截
  config.auth = {
    exclude: ['/api/user/login', '/api/user/register']
  };

  // 配置sequelize 连接mysql
  config.sequelize = {
    dialect: 'mysql', // 表示是mysql数据库
    host: '127.0.0.1',
    port: 3306,
    database: 'umi-egg-house',
    username: 'root',
    password: '717900',
    timezone: '+08:00', // 表示为东八区的时间
    define: {
      timestamps: false,
      freezeTableName: true
    }
  };

  // 配置redis
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '717900',
      db: 0
    }
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
