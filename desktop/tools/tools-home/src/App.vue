<template>
    <div id="app">
        <div class="app-view" :class="{ 'app-blur': showSignInView }">
            <Navigation>
                <template v-slot:right>
                    <div class="app-navigation-right-button" @click="signInButtonClickEvent">登录</div>
                    <div class="app-navigation-right-line"></div>
                    <div class="app-navigation-right-button">注册</div>
                </template>
            </Navigation>
            <Home />
        </div>
        <transition
            name="fade-from-bottom"
            @after-enter="signInViewAfterEnter=true">
            <SignIn 
                v-if="showSignInView"
                :style="{
                    height: signInViewAfterEnter ? '100%' : 'calc(100% - 1px)',
                    borderTop: signInViewAfterEnter ? 'none' : '1px solid rgb(200, 200, 200)',
                }"
                @close="signInViewCloseEvent" />
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "./components/Navigation/Navigation.vue";
import SignIn from './pages/SignIn/SignIn.vue';
import Home from './pages/Home/Home.vue';

@Component({
    components: {
        Navigation,
        SignIn,
        Home,
    }
})
export default class App extends Vue {
    public showSignInView = false;
    public signInViewAfterEnter = false;

    public signInButtonClickEvent() {
        this.signInViewAfterEnter = false;
        this.showSignInView = true;
    } 

    public signInViewCloseEvent() {
        this.signInViewAfterEnter = false;
        setTimeout(() => {
            this.showSignInView = false;
        });
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    line-height: 0;
    position: relative;
}

html, body {
    width: 100%;
    height: 100%;
    min-width: 1000px;
}

input {
    outline: none;
    border: none;
}

input:-internal-autofill-selected {
    box-shadow: inset 0 0 0 1000px #ffffff !important;
}

#app {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .app-view {
        width: 100%;
        height: 100%;
        transition: filter 0.3s;

        .app-navigation-right-button {
            color: rgb(60, 60, 60);
            font-size: 16px;
            line-height: 1.5;
            padding: 0 15px;
            cursor: pointer;
        }

        .app-navigation-right-line {
            width: 1px;
            background-color: rgb(200, 200, 200);
            height: 26px;
        }
    }

    .app-blur {
        filter: blur(5px);
    }

    .fade-from-bottom-enter, .fade-from-bottom-leave-to {
        top: 100%;
    }

    .fade-from-bottom-enter-active, .fade-from-bottom-leave-active {
        transition: top 0.3s linear;
    }
}


</style>
