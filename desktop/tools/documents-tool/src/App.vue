<template>
    <div id="app">
        <DTHome v-if="Page === 0" />
        <div class="app-edit" v-else>
            <DTSidebar />
            <DTTranslation v-if="Page === 3" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DTHome from './pages/DTHome/DTHome.vue';
import DTSidebar from '@/components/DTSidebar/DTSidebar.vue';
import DTTranslation from './pages/DTTranslation/DTTranslation.vue';

@Component({
    components: {
        DTHome,
        DTSidebar,
        DTTranslation,
    },
})
export default class App extends Vue {
    public get Page() {
        return this.$store.state.Page;
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
}

input {
    outline: none;
    border: none;
}

#app {
    width: 100%;
    height: 100%;

    .app-edit {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
}
</style>
