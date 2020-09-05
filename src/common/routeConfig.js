import { Home } from '../features/home';
// import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
// import commonRoute from '../features/common/route';
import _ from 'lodash';

const childRoutes = [homeRoute];
// const childRoutes = [homeRoute, commonRoute];

const routes = [
  {
    path: '/',
    component: Home,
    childRoutes: [
      ...childRoutes,
      // { path: '*', name: 'Page not found', component: PageNotFound },
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
];

function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true;
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
