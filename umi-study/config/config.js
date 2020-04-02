export default {
  //路由配置
  routes: [
    {
      path: '/login',
      component: './login/login',
    },
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          redirect: './home',
        },
        {
          path: '/home',
          component: './home',
        }, //路径是相对于pages
        {
          path: '/home/userview',
          component: './home/report/userview',
        },
        {
          path: '/home/pageview',
          component: './home/report/pageview',
        },
        {
          path: '/home/settinglanguage',
          component: './home/setting/settinglanguage',
        },
        {
          path: '/home/setpage',
          component: './home/setting/setpage',
        },
        {
          path: '/goods',
          component: './goods/goods',
        },
        {
          path: '/goods/advertising',
          component: './goods/advertising',
        },
        {
          path: '/about/educationtype',
          component: './about/abouteducate/educationtype',
        },
        {
          path: '/about/seleducation',
          component: './about/abouteducate/seleducation',
        },
        {
          path: '/about/web',
          component: './about/aboutclass/web',
        },
        {
          path: '/about/backend',
          component: './about/aboutclass/backend',
        },
        {
          path: '/about',
          component: './about/about',
          Routes: ['./routes/PrivateRoute.js'], //路由守卫配置编写 路径相对于根目录， 后缀名不能省略
        },
        {
          path: '/users',
          component: './users/_layout',
          routes: [
            {
              path: '/users/',
              component: './users/index',
            },
            {
              path: '/users/:name',
              component: './users/$name',
            },
            {
              component: './notfound',
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
      },
    ],
  ],
};
