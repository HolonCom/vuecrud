import Vue from 'vue'

import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueCrud from './index'
Vue.use(VueCrud);

Vue.use(VueRouter);
function route(path, component, name, children) {
  return {
      exact: true,
      path,
      name,
      children,
      component: component
  };
}
const crudGrid = Vue.component('oa-crud-grid');
const crudForm = Vue.component('oa-crud-form');
// const crudGrid = Vue.component('OaCrudGrid');
// const crudForm = Vue.component('OaCrudForm');



const router = new VueRouter({
  //scrollBehavior: () => ({ y: 0 }),
  routes: [
      route('/:module/:resource', crudGrid, 'grid'),
      route('/:module/:resource/edit/:id', crudForm, 'edit'),
      route('/:module/:resource/add', crudForm, 'add'),
      //
  ]
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
