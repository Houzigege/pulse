
const routes = [
  {
    path: "/user",
    component: '../layouts/user.js',
    routes: [
      {
        path: "/user",
        component: './index.js',
      }
    ],
  },
  {
    path: "/",
    component: '../layouts/index.js',
    routes: [
      { path: '/', redirect: '/home/index' },
      {
        path: "/home",
        icon: 'home',
        name: '首页',
        routes: [
          {
            path: '/home/a',
            name: '大脑壳',
            component: './index.js',
          },
          {
            path: "/home/b",
            name: '小脑壳',
            component: './ageing/AgeingPage.js',
          }
        ],
      },
      {
        path: "/phone",
        icon: 'phone',
        name: '电话',
        routes: [
          {
            path: '/phone/a',
            name: '我的电话',
            component: './index.js',
          },
          {
            path: "/phone/b",
            name: '我的手机',
            component: './ageing/AgeingPage.js',
          }
        ],
      },
    ]
  }
];

export default routes;
