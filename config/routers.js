const routes = [
  {
    path: "/user",
    component: '../layouts/user.js',
    routes: [
      {
        path: "/user/login",
        component: './Pages/PagesWrap.js',
      },
      {
        path: "/user/my-profile",
        component: './MyProfile/MyProfileWrap.js',
      },
      {
        path: "/user/change-password",
        component: './ChangePassword/ChangePasswordWrap.js',
      },
      {
        path: "/user/forget-password",
        component: './ForgetPassword/ForgetPasswordWrap.js',
      }
    ],
  },
  {
    path: "/",
    component: '../layouts/index.js',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: "/home",
        component: './index.js',
      },
      {
        path: "/content",
        icon: 'team',
        name: 'Function & Content Management',
        routes: [
          {
            path: '/content/pages',
            name: 'Pages',
            authority: ['localAdmin'],
            component: './Pages/PagesWrap.js',
          },
          {
            path: "/content/functions",
            name: 'Functions',
            component: './Functions/FunctionsWrap.js',
            authority: ['localAdmin'],
          },
          {
            path: "/content/banners",
            name: 'Banners',
            component: './Banners/BannersWrap.js',
            authority: ['user'],
          }
        ],
      },
      {
        path: "/settings",
        icon: 'setting',
        name: 'Settings',
        authority: ['superAdmin', 'localAdmin'],
        routes: [
          {
            path: '/settings/management',
            name: 'Admin Management',
            component: './AdminManagement/AdminManagementWrap.js',
          },
        ],
      },
    ]
  }
];

export default routes;
