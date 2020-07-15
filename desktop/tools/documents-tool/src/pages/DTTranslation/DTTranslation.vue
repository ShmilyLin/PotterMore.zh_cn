<template>
    <div class="dttranslation">
        <DTTranslationTool />
        <div class="dttranslation-view">
            <div class="dttranslation-view-actions">
                
            </div>
            <div class="dttranslation-view-bottom">
                <div class="dttranslation-view-bottom-rulers"></div>
                <div class="dttranslation-view-bottom-right">
                    <div class="paper">
                        <div
                            class="paper-p"
                            :class="{
                                'paper-p-focus': translationItem.focus,
                            }"
                            v-for="(translationItem, translationIndex) in translationList"
                            :key="translationItem.id">
                            <div class="paper-p-actions"></div>
                            <div class="paper-p-content">
                                <template v-if="translationItem.type === 0">
                                    <div class="paper-p-content-source">
                                        <div class="paper-p-content-source-name">原：</div>
                                        <div
                                            class="paper-p-content-source-text"
                                            :name="'paper-p-source-' + translationIndex"
                                            contenteditable="true"
                                            ref="PaperSource"
                                            @focus="paragraphFocusEvent(translationIndex)"
                                            @blur="paragraphBlurEvent(translationIndex)"
                                            @paste.prevent="sourceInputPasteEvent($event, translationIndex)"

                                            @keydown="keydownEvent($event, translationIndex)"

                                            @keypress="keypressEvent($event, translationIndex)"

                                            @beforeinput="beforeinputEvent($event, translationIndex)"

                                            @input="inputEvent($event, translationIndex)"

                                            @change="changeEvent($event, translationIndex)"

                                            @compositionstart="compositionstartEvent($event, translationIndex)"

                                            @compositionupdate="compositionupdateEvent($event, translationIndex)"

                                            @compositionend="compositionendEvent($event, translationIndex)"

                                            @propertychange="propertychangeEvent($event, translationIndex)"

                                            v-html="translationItem.sourceHTML">
                                            <!-- @keydown.enter.stop.prevent="sourceInputEnterKeydownEvent($event, translationIndex)" -->

                                            

                                        </div>
                                    </div>
                                    <div class="paper-p-content-translate">
                                        <div class="paper-p-content-translate-name">译：</div>
                                        <div
                                            class="paper-p-content-translate-text"
                                            contenteditable="true"
                                            ref="PaperTranslation"
                                            @focus="paragraphFocusEvent(translationIndex)"
                                            @blur="paragraphBlurEvent(translationIndex)"
                                            @paste.prevent="translationInputPasteEvent($event, translationIndex)"
                                            @keydown.enter.prevent="translationInputEnterKeydownEvent($event, translationIndex)"
                                            @keydown="inputEvent($event, translationIndex, true)"
                                            v-html="translationItem.translationHTML"></div>
                                    </div>
                                </template>
                            </div>
                            <div class="paper-p-comment"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import DTTranslation from './DTTranslation';
export default DTTranslation;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './DTTranslation';
</style>
