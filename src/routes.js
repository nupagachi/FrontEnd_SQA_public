import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

import MainLayout from 'src/layouts/MainLayout';

import HomePageView from 'src/views/HomePage';

import { ROUTER_NAME } from 'src/constants';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    guard: GuestGuard,
    path: ROUTER_NAME.LOGIN,
    component: lazy(() => import('src/views/Login'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: ROUTER_NAME.REGISTER,
    component: lazy(() => import('src/views/Register'))
  },
  {
    path: ROUTER_NAME.ALL,
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: ROUTER_NAME.DEFAULT,
        component: HomePageView
      },
      {
        exact: true,
        path: ROUTER_NAME.DANGKITHUE,
        component: lazy(() => import('src/views/DangKiThue'))
      },
      {
        exact: true,
        path: ROUTER_NAME.KHAIBAOTHUE,
        component: lazy(() => import('src/views/KhaiBaoThue'))
      },
      {
        exact: true,
        path: ROUTER_NAME.TINHTHUE,
        component: lazy(() => import('src/views/TinhThue'))
      },
      {
        exact: true,
        path: ROUTER_NAME.NOPTHUE,
        component: lazy(() => import('src/views/NopThue'))
      },
      {
        component: () => <Redirect to={ROUTER_NAME.NOT_FOUND} />
      }
    ]
  }
];

export default routes;
