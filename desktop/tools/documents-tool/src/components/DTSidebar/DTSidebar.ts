import { Component, Vue } from 'vue-property-decorator';
import { DTSidebarShowType } from '@/store/types';
import StoreKeys from '@/store/keys';

@Component
export default class DTSidebar extends Vue {
    public get ShowType() {
        return this.$store.state.Sidebar.showType;
    }

    public get sidebarClass() {
        switch (this.ShowType) {
            case DTSidebarShowType.Hidden:
                return 'dtsidebar-hidden';
            case DTSidebarShowType.Minimize:
                return 'dtsidebar-minimize';
            case DTSidebarShowType.Small:
                return 'dtsidebar-small';
            case DTSidebarShowType.Normal:
                return 'dtsidebar-normal';
            default:
                return '';
        }
    }

    public showTypeButtonClickEvent(index: number) {
        if (this.ShowType !== index) {
            this.$store.commit(StoreKeys.SidebarShowTypeChange, index);
        }
    }
}