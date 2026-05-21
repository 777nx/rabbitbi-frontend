export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/', redirect: '/add_chart' },
  { path: '/add_chart', icon: 'barChart', component: './AddChart', name: '智能分析' },
  { path: '/add_chart_async', icon: 'barChart', component: './AddChartAsync', name: '智能分析（异步）' },
  { path: '/my_chart', icon: 'pieChart', component: './MyChart', name: '我的图表' },
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'table', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      { icon: 'barChart', path: '/admin/chart', component: './Admin/Chart', name: '图表管理' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
