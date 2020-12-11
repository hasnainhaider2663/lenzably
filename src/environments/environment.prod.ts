// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {UserRole} from '../app/shared/auth.roles';

export let environment: {
  defaultMenuType: string;
  subHiddenBreakpoint: number; defaultRole: UserRole;
  production: boolean; buyUrl: string; defaultDirection: string;
  themeColorStorageKey: string;
  firebase: any;
  // firebase: {
  //   storageBucket: string; apiKey: string; messagingSenderId: string; appId: string; projectId: string;
  //   measurementId: string; databaseURL: string; authDomain: string
  // };
  menuHiddenBreakpoint: number;
  isDarkSwitchActive: boolean;
  themeRadiusStorageKey: string; defaultColor: string; apiUrl: string;
  isAuthGuardActive: boolean; adminRoot: string; isMultiColorActive: boolean;
  SCARF_ANALYTICS: boolean
};
environment = {
  production: true,
  buyUrl: 'https://1.envato.market/6NV1b',
  SCARF_ANALYTICS: false,
  adminRoot: '/app',
  apiUrl: 'https://api.coloredstrategies.com',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',
  isAuthGuardActive: false,
  defaultRole: UserRole.Admin,
  firebase: {
    apiKey: 'AIzaSyB1ZmSJpV6avrTtRwOd2zYQ1XIaL-jL09U',
    authDomain: 'freedom-collective.firebaseapp.com',
    projectId: 'freedom-collective',
    storageBucket: 'freedom-collective.appspot.com',
    messagingSenderId: '277969243612',
    appId: '1:277969243612:web:0013a3bdfc45283db55319',
    measurementId: 'G-Z9MXSV8KF7'
  }
};
