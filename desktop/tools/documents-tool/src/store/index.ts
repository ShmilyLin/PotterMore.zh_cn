import Vue from 'vue';
import Vuex from 'vuex';
import { DTRootState, DTPageType, DTSidebarShowType } from './types';
import StoreKeys from './keys';

Vue.use(Vuex)

export default new Vuex.Store<DTRootState>({
    state: {
        Page: DTPageType.Translation,
        Sidebar: {
            showType: DTSidebarShowType.Minimize,
        },
    },
    mutations: {
        [StoreKeys.SidebarShowTypeChange](state, params) {
            state.Sidebar.showType = params;
        },
    },
    actions: {
    },
    modules: {
    },
});
