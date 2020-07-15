import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SignIn extends Vue {
    public closeButtonClickEvent() {
        this.$emit('close');
    }
}