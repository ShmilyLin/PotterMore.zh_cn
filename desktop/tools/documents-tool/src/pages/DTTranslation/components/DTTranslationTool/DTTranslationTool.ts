import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DTTranslationTool extends Vue {
    public get SidebarShowType() {
        return this.$store.state.Sidebar.showType;
    }
}