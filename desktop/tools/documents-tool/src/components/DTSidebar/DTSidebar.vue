<template>
    <div class="dtsidebar" :class="sidebarClass">
        <template v-if="ShowType === 2">
            <div class="dtsidebar-small-top">
                <div class="dtsidebar-small-top-back"></div>
                <div class="dtsidebar-small-top-item"></div>
            </div>
            <div class="dtsidebar-small-bottom">
                <div class="dtsidebar-small-bottom-showtype">
                    简
                    <div class="dtsidebar-bottom-showtype">
                        <div
                            class="dtsidebar-bottom-showtype-item"
                            :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===0 }"
                            title="隐藏"
                            @click="showTypeButtonClickEvent(0)">隐</div>
                        <div class="dtsidebar-bottom-showtype-line"></div>
                        <div
                            class="dtsidebar-bottom-showtype-item"
                            :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===1 }"
                            title="最小化"
                            @click="showTypeButtonClickEvent(1)">小</div>
                        <div class="dtsidebar-bottom-showtype-line"></div>
                        <div
                            class="dtsidebar-bottom-showtype-item"
                            :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===2 }"
                            title="简化"
                            @click="showTypeButtonClickEvent(2)">简</div>
                        <div class="dtsidebar-bottom-showtype-line"></div>
                        <div
                            class="dtsidebar-bottom-showtype-item"
                            :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===3 }"
                            title="正常"
                            @click="showTypeButtonClickEvent(3)">正</div>
                    </div>
                </div>
            </div>
        </template>
        <div class="dtsidebar-normal-view" v-if="ShowType === 1 || ShowType === 3">
            <div class="dtsidebar-normal-view-top">
                <div class="dtsidebar-normal-view-header">
                    <div class="dtsidebar-normal-view-header-back"></div>
                </div>
            </div>
            <div class="dtsidebar-normal-view-bottom">
                <div class="dtsidebar-bottom-showtype">
                    <div
                        class="dtsidebar-bottom-showtype-item"
                        :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===0 }"
                        title="隐藏"
                        @click="showTypeButtonClickEvent(0)">隐</div>
                    <div class="dtsidebar-bottom-showtype-line"></div>
                    <div
                        class="dtsidebar-bottom-showtype-item"
                        :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===1 }"
                        title="最小化"
                        @click="showTypeButtonClickEvent(1)">小</div>
                    <div class="dtsidebar-bottom-showtype-line"></div>
                    <div
                        class="dtsidebar-bottom-showtype-item"
                        :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===2 }"
                        title="简化"
                        @click="showTypeButtonClickEvent(2)">简</div>
                    <div class="dtsidebar-bottom-showtype-line"></div>
                    <div
                        class="dtsidebar-bottom-showtype-item"
                        :class="{ 'dtsidebar-bottom-showtype-item-selected': ShowType===3 }"
                        title="正常"
                        @click="showTypeButtonClickEvent(3)">正</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import DTSidebar from './DTSidebar';
export default DTSidebar;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './DTSidebar';
</style>
