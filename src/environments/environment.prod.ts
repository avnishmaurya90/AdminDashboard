export const environment = {
  production: true,
  baseUrl: 'https://api-pickji.herokuapp.com/api',
  firebase: {
    apiKey: 'AIzaSyAEzc-3VXf6HCrQsmboflP4x6cJwUciMlQ',
    authDomain: 'pickji-developer-v2.firebaseapp.com',
    databaseURL: 'https://pickji-developer-v2.firebaseio.com',
    projectId: 'pickji-developer-v2',
    storageBucket: 'pickji-developer-v2.appspot.com',
    messagingSenderId: '67511985422'
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
