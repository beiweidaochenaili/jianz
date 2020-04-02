import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    path: '/login',
    component: require('../login/login').default,
    exact: true,
  },
  {
    path: '/',
    component: require('../../layout').default,
    routes: [
      {
        path: '/home',
        component: require('../home').default,
        exact: true,
      },
      {
        path: '/home/userview',
        component: require('../home/report/userview').default,
        exact: true,
      },
      {
        path: '/home/pageview',
        component: require('../home/report/pageview').default,
        exact: true,
      },
      {
        path: '/home/settinglanguage',
        component: require('../home/setting/settinglanguage').default,
        exact: true,
      },
      {
        path: '/home/setpage',
        component: require('../home/setting/setpage').default,
        exact: true,
      },
      {
        path: '/goods',
        component: require('../goods/goods').default,
        exact: true,
      },
      {
        path: '/goods/advertising',
        component: require('../goods/advertising').default,
        exact: true,
      },
      {
        path: '/about/educationtype',
        component: require('../about/abouteducate/educationtype').default,
        exact: true,
      },
      {
        path: '/about/seleducation',
        component: require('../about/abouteducate/seleducation').default,
        exact: true,
      },
      {
        path: '/about/web',
        component: require('../about/aboutclass/web').default,
        exact: true,
      },
      {
        path: '/about/backend',
        component: require('../about/aboutclass/backend').default,
        exact: true,
      },
      {
        path: '/about',
        component: require('../about/about').default,
        Routes: [require('../../../routes/PrivateRoute.js').default],
        exact: true,
      },
      {
        path: '/users',
        component: require('../users/_layout').default,
        routes: [
          {
            path: '/users/',
            component: require('../users/index').default,
            exact: true,
          },
          {
            path: '/users/:name',
            component: require('../users/$name').default,
            exact: true,
          },
          {
            component: require('../notfound').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('C:/Users/Administrator/AppData/Roaming/npm/node_modules/umi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
