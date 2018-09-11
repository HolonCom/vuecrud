import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCrud from '../lib/index'
import { default as Utils } from "../lib/utils/utils";

export default {
    create(id, layout) {
        Vue.use(VueRouter);
        Vue.use(VueCrud);

        const crudGrid = Vue.component('oa-crud-grid-with-router');
        const crudForm = Vue.component('oa-crud-form');
        // const crudGrid = Vue.component('OaCrudGrid');
        // const crudForm = Vue.component('OaCrudForm');

        const router = new VueRouter({
            //scrollBehavior: () => ({ y: 0 }),
            routes: [
                { path: '/:module/:resource', component: crudGrid, name: 'grid' },
                { path: '/:module/:resource/edit/:id', component: crudForm, name: 'edit' },
                { path: '/:module/:resource/add', component: crudForm, name: 'add' }
            ]
        });

        new Vue({
            router: router,
            connector: VueCrud.OaConnector,
            //render: h => h('router-view')
            //render: h => h(layout, [h('router-view')]),
            render(h) {
                return h(layout, {
                    scopedSlots: {
                        default: () => {

                            return h('router-view')
                        }
                    },
                    props: {
                        title: this.pageTitle
                    }
                })
            },
            computed: {
                messages() {
                    return VueCrud.OaConnector.messages(this.$route.params.module);
                },
                pageTitle: function () {
                    if (this.$route.params.resource) {
                        let key = Utils.capitalize(this.$route.params.resource) + 's';
                        let title = this.messages[[key]]
                        return title ? title : key;
                    }
                    else {
                        return 'Crud app';
                    }
                }
            }
        }).$mount(id)
    }
}