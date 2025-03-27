import { RouteObject } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Home)
  },
  {
    path: '/signup',
    element: React.createElement(SignUp)
  },
  {
    path: '/signin',
    element: React.createElement(SignIn)
  },
  {
    path: '/profile',
    element: React.createElement(React.lazy(() => import('../pages/Profile')))
  }
];