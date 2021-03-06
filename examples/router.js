import Vue from 'vue';
import Router from 'vue-router';
import navConf from './nav.config.json';

Vue.use(Router);

let routes = [];

Object.keys(navConf).forEach((header) => {
  routes = routes.concat(navConf[header]);
});

const addComponent = (router) => {
  router.forEach((route) => {
    if (route.items) {
      addComponent(route.items);
      routes = routes.concat(route.items);
    } else {
      if (route.type === 'pages') {
        route.component = require(`./pages/${route.name}.vue`).default;
        return;
      }
      route.component = require(`./docs/${route.name}.md`).default;
    }
  });
};
addComponent(routes);

export default new Router({
  routes,
});
