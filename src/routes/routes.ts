import { RouteObject } from 'react-router-dom';
import React from 'react';
import Home from '../pages/Home';
import SignUp from '../pages/Signup';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Home)
  },
  {
    path: '/signup',
    element: React.createElement(SignUp)
  }
];