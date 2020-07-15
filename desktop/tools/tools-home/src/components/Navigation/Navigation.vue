<template>
    <div class="navigation">
        <div class="navigation-left">
            <slot name="left"></slot>
        </div>
        <div class="navigation-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script>
import Navigation from './Navigation';
export default Navigation;
</script>

<style lang="scss" scoped>
@import './Navigation';
</style>