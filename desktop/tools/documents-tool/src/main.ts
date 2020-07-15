import Vue from 'vue';
import { Store } from 'vuex';

import { DTRootState } from './store/types';

import store from './store';

import App from './App.vue';

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

declare module 'vue/types/vue' {
    interface Vue {
        // $global: Global;
        $store: Store<DTRootState>;
    }
}
