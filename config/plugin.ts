import { EggPlugin } from 'egg';
import * as path from 'path';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  auth: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-auth')
  }
};


export default plugin;
