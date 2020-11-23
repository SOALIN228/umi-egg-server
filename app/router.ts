import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const userExist = app.middleware.userExist();

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/detail', userExist, controller.user.detail);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/edit', controller.user.edit);
  router.post('/api/commons/cities', controller.commons.cities);
  router.post('/api/house/hot', controller.house.hot);
  router.post('/api/house/search', controller.house.search);
  router.post('/api/house/detail', controller.house.detail);
  router.post('/api/comment/add', controller.comment.add);
  router.post('/api/comment/lists', controller.comment.lists);
};
