import Home from "./view/Home";
import Test from "../src/view/test";
import NotFound from "../src/view/404";
import { Myview, Myview1 } from "../src/view/children";

const config = {
  router: [
    { title: '首页', name: 'home', key: 'home', path: '/app/home', show: true, closable: false, icon: 'pie-chart', affix: true, component: Home },
    { title: 'NotFound', name: 'NotFound', key: 'NotFound', path: '/app/404', show: false, icon: '', component: NotFound },
    { title: '表格', name: 'table', key: 'table', path: '/app/table', show: true, icon: 'pie-chart', component: Test },
    {
      title: '图表',
      key: 'charts',
      path: '/app/charts',
      show: true,
      icon: 'pie-chart',
      name: 'charts',
      children: [
        {
          title: '图表1',
          name: 'mycharts',
          key: 'mycharts',
          path: '/mycharts',
          show: true,
          component: Myview
        }, {
          title: '图表2',
          name: 'mycharts1',
          key: 'mycharts1',
          path: '/mycharts1',
          show: true,
          component: Myview1
        }
      ]
    }
  ]
}

export default config;