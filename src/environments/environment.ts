// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api-pickji.herokuapp.com/api',
  firebase: {
    apiKey: 'AIzaSyAEzc-3VXf6HCrQsmboflP4x6cJwUciMlddsdsQ',
    authDomain: 'pickji-developer-v2.firebaseapp.com',
    databaseURL: 'https://pickji-developer-v2.firebaseio.com',
    projectId: 'pickji-developer-v2',
    storageBucket: 'pickji-developer-v2.appspot.com',
    messagingSenderId: '67511985411222'
  },
  adminNavItems: [{
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'home'
  },
  {
    displayName: 'Map View',
    iconName: 'map',
    route: 'map'
  }, {
    displayName: 'Manage Drivers',
    iconName: 'traffic',
    children: [
      {
        displayName: 'Driver',
        iconName: 'group',
        route: 'drivers'
      },
      {
        displayName: 'Invoice',
        iconName: 'group',
        route: 'drivers/invoice'
      },
      {
        displayName: 'Order',
        iconName: 'group',
        route: 'drivers/order'
      },
      {
        displayName: 'Status',
        iconName: 'group',
        route: 'drivers/status'
      },
      {
        displayName: 'Fare Calculator',
        iconName: 'group',
        route: 'drivers/fares'
      },

    ]
  }, {
    displayName: 'Manage Customer',
    iconName: 'group',
    children: [
      {
        displayName: 'Customer',
        iconName: 'person',
        route: 'users/list'
      }
    ]
  },

  {
    displayName: 'Manage Vendor',
    disabled: true,
    iconName: 'local_grocery_store',
    children: [
      {
        displayName: 'Vendor List',
        iconName: 'group',
        route: 'vendors',
      }
    ]
  },
  {
    displayName: 'Settings',
    iconName: 'settings',
    children: [
      {
        displayName: 'Fares',
        iconName: 'attach_money',
        route: 'settings/fares/list'
      },
      {
        displayName: 'Website Settings',
        iconName: 'pan_tool',
        route: 'settings/configurations'
      }
    ]
  },
  {
    displayName: 'Orders',
    iconName: 'assignment',
  }, {
    displayName: 'Payment',
    iconName: 'credit_card',
  }],

  vendorNavItems: [{
    displayName: 'Dashboard',
    iconName: 'home',
    route: 'home'
  }]
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
