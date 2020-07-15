<template>
    <div class="dttranslationtool">
        <div class="dttranslationtool-left">
            <div class="dttranslationtool-left-back" v-if="SidebarShowType < 2"></div>
        </div>
    </div>
</template>

<script lang="ts">
import DTTranslationTool from './DTTranslationTool';
export default DTTranslationTool;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './DTTranslationTool';
</style>
