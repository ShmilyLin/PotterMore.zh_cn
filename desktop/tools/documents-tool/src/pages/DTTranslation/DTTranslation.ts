import { Component, Vue } from 'vue-property-decorator';

import {
    DTTranslationInlineType,
    DTTranslationParagraphType,
    DTTranslationTextInline,
    DTTranslationParagraph,
    DTTranslationParagraphText,
    GetInlineHTML,
} from './types';

import DTTranslationTool from './components/DTTranslationTool/DTTranslationTool.vue';
// import Random from '@/utils/Random';


@Component({
    components: {
        DTTranslationTool,
    },
})
export default class DTTranslation extends Vue {
    public translationList: DTTranslationParagraph[] = [new DTTranslationParagraphText()];

    public mounted() {
        console.log(this.$children);
    }

    /**
     * 文字翻译段落，原文粘贴事件
     * 
     * @param e 剪贴板事件
     * @param index 文字翻译段落的索引
     */
    public sourceInputPasteEvent(e: ClipboardEvent, index: number) {
        console.log('[source paste]', e.clipboardData);
        const CurrentSelection = document.getSelection();
        if (e.clipboardData && CurrentSelection) {
            const CurrentSelectionRange = CurrentSelection.getRangeAt(0);
            console.log('[source paste] range', CurrentSelectionRange.startContainer, CurrentSelectionRange.startOffset);
            const PItem = this.translationList[index];
            switch (PItem.type) {
                case DTTranslationParagraphType.text:{
                    const ContainerNode = document.getElementsByName('paper-p-source-' + index)[0];
                    const {
                        startNodeIndex,
                        startIndex,
                        endNodeIndex,
                        endIndex,
                    } = this.getTranslationRangeBySelection(
                        CurrentSelectionRange,
                        ContainerNode,
                        PItem as DTTranslationParagraphText,
                        false
                    );

                    console.log('[source paste] child range',startNodeIndex, startIndex, endNodeIndex, endIndex);

                    const tempClipboardDataTypes = e.clipboardData.types;
                    if (tempClipboardDataTypes.indexOf('text/html') >= 0) {
                        // HTML结构
                        console.log('HTML');
                        const htmlContent = e.clipboardData.getData('text/html');
                        const TempHTML = document.createElement('html');
                        TempHTML.innerHTML = htmlContent;
                        const TempBody = TempHTML.getElementsByTagName('body')[0];
                        console.log('TempHTML', TempBody);
                        
                        const TempParagraphList: DTTranslationParagraph[] = [];
                        for (let i = 0, len = TempBody.children.length; i < len; i++) {
                            const TempChildNode = TempBody.children.item(i)!;
                            console.log('TempChildNode', TempChildNode.nodeName);
                            this.dealHTMLChildren(TempChildNode, {});
                        }
        
                    } else if (tempClipboardDataTypes.indexOf('text/plain') >= 0) {
                        // 纯文字
                        console.log('TEXT');
                        const plainContent = e.clipboardData.getData('text/plain');
                        console.log('PlainContent', plainContent);
                        // if (plainContent.length) {
                        //     const tempStringList = plainContent.split('\n');
                        //     console.log('tempStringList', tempStringList);
        
                        //     const tempTranslationList = this.translationList;
                        //     const tempNewTranslationLisr: DTTranslationParagraph[] = [];
                        //     // const tempObjectList: DTTranslationParagraph[] = [];
                        //     let tempDividedSourceList: DTTranslationTextInline[];
        
                        //     if (tempStringList.length === 1) {
                        //         const tempItem = tempTranslationList[index];
        
                        //         if (CurrentSelectionRange.collapsed) {
                        //             if (startIndex === 0 && startNodeIndex === 0) {
                        //                 tempItem.source[0].content = tempStringList[0] + tempItem.source[0].content;
                        //                 tempItem.source[0].html = GetInlineHTML(tempItem.source[0], 0);
                        //                 tempItem.sourceHTML = tempItem.source.reduce((total, reduceItem) => {
                        //                     return total + reduceItem.content;
                        //                 }, '');
                        //                 this.$set(this.translationList, index, tempItem);
                        //             } else if (startIndex === 0) {
                        //                 tempItem.source[startNodeIndex - 1].content += tempStringList[0];
                        //                 tempItem.source[startNodeIndex - 1].html = GetInlineHTML(tempItem.source[startNodeIndex - 1], startNodeIndex - 1);
                        //                 tempItem.sourceHTML = tempItem.source.reduce((total, reduceItem) => {
                        //                     return total + reduceItem.content;
                        //                 }, '');
                        //                 this.$set(this.translationList, index, tempItem);
                        //             } else {
                        //                 const tempContentString = tempItem.source[startNodeIndex].content;
                        //                 tempItem.source[startNodeIndex].content = tempContentString.substring(0, startIndex) + tempStringList[0] + tempContentString.substring(startIndex);
                        //                 tempItem.source[startNodeIndex].html = GetInlineHTML(tempItem.source[startNodeIndex], startNodeIndex);
                        //                 tempItem.sourceHTML = tempItem.source.reduce((total, reduceItem) => {
                        //                     return total + reduceItem.content;
                        //                 }, '');
                        //                 this.$set(this.translationList, index, tempItem);
                        //             }
                        //         } else {
                        //             // TODO:
                        //         }
                        //     } else {
                        //         for (let i = 0, len = tempStringList.length; i < len; i++) {
                        //             if (i === 0) {
                        //                 if (tempRange.collapsed) {
                        //                     if (startIndex === 0 && startNodeIndex === 0) {                                        
                        //                         tempNewTranslationLisr.push(CreateTranslationParagraph(tempStringList[i]));
                        //                     } else if (startIndex === 0) {
                        //                         // TODO:
                        //                     } else {
                        //                         // TODO:
                        //                     }
                        //                 } else {
                        //                     // TODO:
                        //                 }
                        //             } else {
                        //                 if (tempRange.collapsed) {
                        //                     // TODO:
                        //                 } else {
                        //                     // TODO:
                        //                 }
                        //             }
                        //         }
                        //     }
                        // }
                    }
                    break;
                }
                default:
                    break;
            }
        }
        
    }

    public dealHTMLChildren(ParentNode: Element, style: any) {
        switch (ParentNode.nodeName) {
            case 'DIV': {
                const TempDIVNode = ParentNode as HTMLDivElement;
                const tempStyle = {
                    ...style,
                    family: TempDIVNode.style.fontFamily,
                    size: TempDIVNode.style.fontSize,
                    color: TempDIVNode.style.color,
                    backgroundColor: TempDIVNode.style.backgroundColor,
                    style: TempDIVNode.style.fontStyle,
                    decoration: TempDIVNode.style.textDecoration,
                };
                console.log(TempDIVNode.children.length, TempDIVNode.childNodes.length);
                if (TempDIVNode.children.length) {
                    for (const ChildNode of TempDIVNode.children) {
                        console.log('ChildNode', ChildNode.nodeName);
                        this.dealHTMLChildren(ChildNode, tempStyle);
                    }
                }
                break;
            }
            case 'SPAN': {
                const TempSPANNode = ParentNode as HTMLSpanElement;
                const tempStyle = {
                    ...style,
                    family: TempSPANNode.style.fontFamily,
                    size: TempSPANNode.style.fontSize,
                    color: TempSPANNode.style.color,
                    backgroundColor: TempSPANNode.style.backgroundColor,
                    style: TempSPANNode.style.fontStyle,
                    decoration: TempSPANNode.style.textDecoration,
                };
                console.log(TempSPANNode.children.length, TempSPANNode.childNodes.length);
                if (TempSPANNode.children.length) {
                    for (const ChildNode of TempSPANNode.children) {
                        console.log('ChildNode', ChildNode.nodeName);
                        this.dealHTMLChildren(ChildNode, tempStyle);
                    }
                }
                break;
            }
            default:
                break;
        }
    }

    // public keydown_Event(e: KeyboardEvent, index: number, translation = false) {
    //     console.log('[keydown]', e);
    //     switch (e.keyCode) {
    //         case 13: // Enter
    //         case 16: // Shift
    //         case 17: // Control
    //         case 18: // Option / Alt
    //         case 20: // Caps Lock
    //         case 27: // ESC
    //         case 37: // 左
    //         case 38: // 上
    //         case 39: // 又
    //         case 40: // 下
    //         case 91: // 左Command
    //         case 93: // 右Command
    //             break;
    //         case 9: // Tab
    //             break;
    //         case 8: { // Delete
    //             e.preventDefault();
    //             const tempSelection = document.getSelection();
    //             if (tempSelection) {
    //                 const tempRange = tempSelection.getRangeAt(0);
    //                 const tempItem = this.translationList[index];
    //                 const tempOuterNode = ((translation ?  this.$refs.PaperTranslation : this.$refs.PaperSource) as Element[])[index];
    //                 const {
    //                     startNodeIndex,
    //                     startIndex,
    //                     endNodeIndex,
    //                     endIndex,
    //                 } = this.getTranslationRangeBySelection(
    //                     tempRange,
    //                     tempOuterNode,
    //                     tempItem,
    //                     translation
    //                 );

    //                 if (tempRange.collapsed && startIndex === 0) {
    //                     break;
    //                 }

    //                 if (tempRange.collapsed && startIndex === 0 && startNodeIndex === 0) {
    //                     break;
    //                 }

    //                 let tempIndex = 0;
    //                 let tempHTML = '';
    //                 let tempNewStartNodeIndex = -1;
    //                 let tempNewStartOffset = 0;
    //                 let tempNeedReHTML = false;
    //                 let tempPrevItemContentLength = 0;
    //                 const tempList = (translation ? tempItem.translation : tempItem.source).filter((item, itemIndex, list) => {
    //                     if (tempRange.collapsed) { // 单一的光标
    //                         if (startIndex === 0) {
    //                             if (itemIndex < startNodeIndex - 1 || itemIndex >= startNodeIndex) {
    //                                 if (tempNeedReHTML) {
    //                                     item.html = GetInlineHTML(item, tempIndex);
    //                                 }
    //                                 tempHTML += item.html;
    //                                 tempIndex++;
    //                                 tempPrevItemContentLength = item.content.length;
    //                                 return true;
    //                             } else {
    //                                 item.content = item.content.substring(0, item.content.length - 1);
    //                                 if (item.content.length > 0) {
    //                                     item.html = GetInlineHTML(item, tempIndex);
    //                                     tempHTML += item.html;
    //                                     tempIndex++;
    //                                     tempNewStartNodeIndex = tempIndex;
    //                                     tempPrevItemContentLength = item.content.length;
    //                                     return true;
    //                                 } else {
    //                                     tempNeedReHTML = true;
    //                                     tempNewStartNodeIndex = tempIndex;
    //                                     return false;
    //                                 }
    //                             }
    //                         } else {
    //                             if (itemIndex < startNodeIndex || itemIndex > startNodeIndex) {
    //                                 if (tempNeedReHTML) {
    //                                     item.html = GetInlineHTML(item, tempIndex);
    //                                 }
    //                                 tempHTML += item.html;
    //                                 tempIndex++;
    //                                 tempPrevItemContentLength = item.content.length;
    //                                 return true;
    //                             } else {
    //                                 item.content = item.content.substring(0, startIndex - 1) + item.content.substring(startIndex);
    //                                 if (item.content.length > 0) {
    //                                     item.html = GetInlineHTML(item, tempIndex);
    //                                     tempHTML += item.html;
    //                                     tempNewStartNodeIndex = tempIndex;
    //                                     tempIndex++;
    //                                     tempNewStartOffset = startIndex - 1;
    //                                     tempPrevItemContentLength = item.content.length;
    //                                     return true;
    //                                 } else {
    //                                     tempNeedReHTML = true;
    //                                     if (itemIndex === list.length - 1) {
    //                                         tempNewStartNodeIndex = tempIndex - 1;
    //                                         tempNewStartOffset = tempPrevItemContentLength;
    //                                     } else {
    //                                         tempNewStartNodeIndex = tempIndex;
    //                                     }
                                        
    //                                     return false;
    //                                 }
    //                             }
    //                         }
    //                     } else {
    //                         if (itemIndex < startNodeIndex) {
    //                             tempHTML += item.html;
    //                             tempIndex++;
    //                             tempPrevItemContentLength = item.content.length;
    //                             return true;
    //                         } else if (itemIndex > endNodeIndex) {
    //                             if (tempNeedReHTML) {
    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                             }

    //                             tempHTML += item.html;
    //                             tempIndex++;
    //                             tempPrevItemContentLength = item.content.length;
    //                             return true;
    //                         } else {
    //                             if (itemIndex === startNodeIndex) {
    //                                 if (itemIndex === endNodeIndex) {
    //                                     item.content = item.content.substring(0, startIndex) + item.content.substring(endIndex);
    //                                 } else {
    //                                     item.content = item.content.substring(0, startIndex);
    //                                 }

    //                                 if (item.content.length > 0) {
    //                                     item.html = GetInlineHTML(item, tempIndex);
    //                                     tempHTML += item.html;
    //                                     tempNewStartNodeIndex = tempIndex;
    //                                     tempNewStartOffset = startIndex;
    //                                     tempIndex++;
    //                                     tempPrevItemContentLength = item.content.length;
    //                                     return true;
    //                                 } else {
    //                                     tempNeedReHTML = true;
    //                                     if (itemIndex === list.length - 1) {
    //                                         tempNewStartNodeIndex = tempIndex - 1;
    //                                         tempNewStartOffset = tempPrevItemContentLength;
    //                                     } else {
    //                                         tempNewStartNodeIndex = tempIndex;
    //                                     }
                                        
    //                                     return false;
    //                                 }
    //                             } else if (itemIndex === endNodeIndex) {
    //                                 if (endIndex === 0) {
    //                                     tempHTML += item.html;
    //                                     tempIndex++;
    //                                     tempPrevItemContentLength = item.content.length;
    //                                     return true;
    //                                 } else {
    //                                     item.content = item.content.substring(endIndex);

    //                                     if (item.content.length > 0) {
    //                                         item.html = GetInlineHTML(item, tempIndex);
    //                                         tempHTML += item.html;
    //                                         tempIndex++;
    //                                         tempPrevItemContentLength = item.content.length;
    //                                         return true;
    //                                     } else {
    //                                         tempNeedReHTML = true;
    //                                         return false;
    //                                     }
    //                                 }
    //                             } else {
    //                                 tempNeedReHTML = true;
    //                                 return false;
    //                             }
    //                         }
    //                     }
    //                 });
                    
    //                 if (translation) {
    //                     tempItem.translation = tempList;
    //                     tempItem.translationHTML = tempHTML;
    //                 } else {
    //                     tempItem.source = tempList;
    //                     tempItem.sourceHTML = tempHTML;
    //                 }
                    
    //                 this.$set(this.translationList, index, tempItem);

    //                 this.$nextTick(() => {
    //                     // console.log('new', tempNewStartNodeIndex, tempNewStartOffset);
    //                     if ((translation ? tempItem.translation : tempItem.source).length) {
    //                         tempRange.setStart(tempOuterNode.childNodes[tempNewStartNodeIndex].childNodes[0], tempNewStartOffset);
    //                     } else {
    //                         tempRange.setStart(tempOuterNode, 0);
    //                     }
                        
    //                     tempRange.collapse(true);
    //                 });

    //                 this.$forceUpdate();

    //                 // const tempRange = tempSelection.getRangeAt(0);

    //                 // let tempStart = tempRange.startOffset; // 起点偏移量
    //                 // let tempEnd = tempRange.endOffset;

    //                 // // console.log('start', tempStart);
    //                 // // console.log('end', tempEnd);

    //                 // const tempStartNode = tempRange.startContainer;
    //                 // const tempEndNode = tempRange.endContainer;

    //                 // // console.log('startNode', tempStartNode);
    //                 // // console.log('endNode', tempEndNode);

    //                 // let tempStartNodeIndex: number;
    //                 // let tempEndNodeIndex: number;

    //                 // const tempItem = this.translationList[index];

    //                 // // 判断内外层Node
    //                 // const tempOuterNode = ((translation ?  this.$refs.PaperTranslation : this.$refs.PaperSource) as Element[])[index];
    //                 // if (tempStartNode === tempOuterNode) {
    //                 //     // console.log('start 外层');
    //                 //     if (tempRange.collapsed && tempStart === 0) {
    //                 //         break;
    //                 //     }

    //                 //     if (tempStart >= (translation ? tempItem.translation : tempItem.source).length) {
    //                 //         tempStartNodeIndex = (translation ? tempItem.translation : tempItem.source).length - 1;
    //                 //         tempStart = (translation ? tempItem.translation : tempItem.source)[tempStartNodeIndex].content.length;
    //                 //     } else {
    //                 //         tempStartNodeIndex = tempStart;
    //                 //         tempStart = 0;
    //                 //     }
    //                 // } else {
    //                 //     // console.log('start 内层');
    //                 //     tempStartNodeIndex = parseInt((tempStartNode.parentNode as HTMLSpanElement).dataset.index!);

    //                 //     if (tempRange.collapsed && tempStart === 0 && tempStartNodeIndex === 0) {
    //                 //         break;
    //                 //     }
    //                 // }

    //                 // if (tempEndNode === tempOuterNode) {
    //                 //     // console.log('end 外层');
    //                 //     if (tempEnd >= (translation ? tempItem.translation : tempItem.source).length) {
    //                 //         tempEndNodeIndex = (translation ? tempItem.translation : tempItem.source).length - 1;
    //                 //         tempEnd = (translation ? tempItem.translation : tempItem.source)[tempStartNodeIndex].content.length;
    //                 //     } else {
    //                 //         tempEndNodeIndex = tempEnd;
    //                 //         tempEnd = 0;
    //                 //     }
    //                 // } else {
    //                 //     // console.log('end 内层');
    //                 //     tempEndNodeIndex = parseInt((tempEndNode.parentNode as HTMLSpanElement).dataset.index!);
    //                 // }
                    
    //                 // console.log('start', tempStartNodeIndex, tempStart);
    //                 // console.log('end', tempEndNodeIndex, tempEnd);

    //                 // let tempCount = 0;
    //                 // let tempIndex = 0;
    //                 // let tempHTML = '';
    //                 // let tempNewStartNodeIndex = -1;
    //                 // let tempNewStartOffset = 0;
    //                 // let tempNeedReHTML = false;
    //                 // let tempPrevItemContentLength = 0;
    //                 // const tempList = (translation ? tempItem.translation : tempItem.source).filter((item, itemIndex, list) => {
    //                 //     if (tempRange.collapsed) { // 单一的光标
    //                 //         if (tempStart === 0) {
    //                 //             if (itemIndex < tempStartNodeIndex - 1 || itemIndex >= tempStartNodeIndex) {
    //                 //                 if (tempNeedReHTML) {
    //                 //                     item.html = GetInlineHTML(item, tempIndex);
    //                 //                 }
    //                 //                 tempHTML += item.html;
    //                 //                 tempIndex++;
    //                 //                 tempPrevItemContentLength = item.content.length;
    //                 //                 return true;
    //                 //             } else {
    //                 //                 item.content = item.content.substring(0, item.content.length - 1);
    //                 //                 if (item.content.length > 0) {
    //                 //                     item.html = GetInlineHTML(item, tempIndex);
    //                 //                     tempHTML += item.html;
    //                 //                     tempIndex++;
    //                 //                     tempNewStartNodeIndex = tempIndex;
    //                 //                     tempPrevItemContentLength = item.content.length;
    //                 //                     return true;
    //                 //                 } else {
    //                 //                     tempNeedReHTML = true;
    //                 //                     tempNewStartNodeIndex = tempIndex;
    //                 //                     return false;
    //                 //                 }
    //                 //             }
    //                 //         } else {
    //                 //             if (itemIndex < tempStartNodeIndex || itemIndex > tempStartNodeIndex) {
    //                 //                 if (tempNeedReHTML) {
    //                 //                     item.html = GetInlineHTML(item, tempIndex);
    //                 //                 }
    //                 //                 tempHTML += item.html;
    //                 //                 tempIndex++;
    //                 //                 tempPrevItemContentLength = item.content.length;
    //                 //                 return true;
    //                 //             } else {
    //                 //                 item.content = item.content.substring(0, tempStart - 1) + item.content.substring(tempStart);
    //                 //                 if (item.content.length > 0) {
    //                 //                     item.html = GetInlineHTML(item, tempIndex);
    //                 //                     tempHTML += item.html;
    //                 //                     tempNewStartNodeIndex = tempIndex;
    //                 //                     tempIndex++;
    //                 //                     tempNewStartOffset = tempStart - 1;
    //                 //                     tempPrevItemContentLength = item.content.length;
    //                 //                     return true;
    //                 //                 } else {
    //                 //                     tempNeedReHTML = true;
    //                 //                     if (itemIndex === list.length - 1) {
    //                 //                         tempNewStartNodeIndex = tempIndex - 1;
    //                 //                         tempNewStartOffset = tempPrevItemContentLength;
    //                 //                     } else {
    //                 //                         tempNewStartNodeIndex = tempIndex;
    //                 //                     }
                                        
    //                 //                     return false;
    //                 //                 }
    //                 //             }
    //                 //         }
    //                 //     } else {
    //                 //         if (itemIndex < tempStartNodeIndex) {
    //                 //             tempHTML += item.html;
    //                 //             tempIndex++;
    //                 //             tempPrevItemContentLength = item.content.length;
    //                 //             return true;
    //                 //         } else if (itemIndex > tempEndNodeIndex) {
    //                 //             if (tempNeedReHTML) {
    //                 //                 item.html = GetInlineHTML(item, tempIndex);
    //                 //             }

    //                 //             tempHTML += item.html;
    //                 //             tempIndex++;
    //                 //             tempPrevItemContentLength = item.content.length;
    //                 //             return true;
    //                 //         } else {
    //                 //             if (itemIndex === tempStartNodeIndex) {
    //                 //                 if (itemIndex === tempEndNodeIndex) {
    //                 //                     item.content = item.content.substring(0, tempStart) + item.content.substring(tempEnd);
    //                 //                 } else {
    //                 //                     item.content = item.content.substring(0, tempStart);
    //                 //                 }

    //                 //                 if (item.content.length > 0) {
    //                 //                     item.html = GetInlineHTML(item, tempIndex);
    //                 //                     tempHTML += item.html;
    //                 //                     tempNewStartNodeIndex = tempIndex;
    //                 //                     tempNewStartOffset = tempStart;
    //                 //                     tempIndex++;
    //                 //                     tempPrevItemContentLength = item.content.length;
    //                 //                     return true;
    //                 //                 } else {
    //                 //                     tempNeedReHTML = true;
    //                 //                     if (itemIndex === list.length - 1) {
    //                 //                         tempNewStartNodeIndex = tempIndex - 1;
    //                 //                         tempNewStartOffset = tempPrevItemContentLength;
    //                 //                     } else {
    //                 //                         tempNewStartNodeIndex = tempIndex;
    //                 //                     }
                                        
    //                 //                     return false;
    //                 //                 }
    //                 //             } else if (itemIndex === tempEndNodeIndex) {
    //                 //                 if (tempEnd === 0) {
    //                 //                     tempHTML += item.html;
    //                 //                     tempIndex++;
    //                 //                     tempPrevItemContentLength = item.content.length;
    //                 //                     return true;
    //                 //                 } else {
    //                 //                     item.content = item.content.substring(tempEnd);

    //                 //                     if (item.content.length > 0) {
    //                 //                         item.html = GetInlineHTML(item, tempIndex);
    //                 //                         tempHTML += item.html;
    //                 //                         tempIndex++;
    //                 //                         tempPrevItemContentLength = item.content.length;
    //                 //                         return true;
    //                 //                     } else {
    //                 //                         tempNeedReHTML = true;
    //                 //                         return false;
    //                 //                     }
    //                 //                 }
    //                 //             } else {
    //                 //                 tempNeedReHTML = true;
    //                 //                 return false;
    //                 //             }
    //                 //         }
    //                 //     }
    //                 // });
                    
    //                 // if (translation) {
    //                 //     tempItem.translation = tempList;
    //                 //     tempItem.translationHTML = tempHTML;
    //                 // } else {
    //                 //     tempItem.source = tempList;
    //                 //     tempItem.sourceHTML = tempHTML;
    //                 // }
                    
    //                 // this.$set(this.translationList, index, tempItem);

    //                 // this.$nextTick(() => {
    //                 //     // console.log('new', tempNewStartNodeIndex, tempNewStartOffset);
    //                 //     if ((translation ? tempItem.translation : tempItem.source).length) {
    //                 //         tempRange.setStart(tempOuterNode.childNodes[tempNewStartNodeIndex].childNodes[0], tempNewStartOffset);
    //                 //     } else {
    //                 //         tempRange.setStart(tempOuterNode, 0);
    //                 //     }
                        
    //                 //     tempRange.collapse(true);
    //                 // });

    //                 // this.$forceUpdate();
    //             }
    //             break;
    //         }
    //         default: 
    //             break;
    //     }
    // }

    public keydownEvent(e: KeyboardEvent, index: number, translation = false) {
        console.log('[keydown]', e);
    }

    public keydownCaptureEvent(e: KeyboardEvent, index: number, translation = false) {
        console.log('[keydown capture]', e);
    }

    public keypressEvent(e: KeyboardEvent, index: number, translation = false) {
        console.log('[keypress]', e);
    }

    public keypressCaptureEvent(e: KeyboardEvent, index: number, translation = false) {
        console.log('[keypress capture]', e);
    }

    public beforeinputEvent(e: InputEvent, index: number, translation = false) {
        console.log('[before input]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public beforeinputCaptureEvent(e: InputEvent, index: number, translation = false) {
        console.log('[before input capture]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public inputEvent(e: InputEvent, index: number, translation = false) {
        console.log('[input]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public inputCaptureEvent(e: InputEvent, index: number, translation = false) {
        console.log('[input capture]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public changeEvent(e: any, index: number, translation = false) {
        console.log('[change]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public changeCaptureEvent(e: any, index: number, translation = false) {
        console.log('[change capture]', e);
    }

    public compositionstartEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition start]', e);
    }

    public compositionstartCaptureEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition start capture]', e);
    }

    public compositionupdateEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition update]', e);
    }

    public compositionupdateCaptureEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition update capture]', e);
    }


    public compositionendEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition end]', e);
    }

    public compositionendCaptureEvent(e: CompositionEvent, index: number, translation = false) {
        console.log('[composition end capture]', e);
    }

    public propertychangeEvent(e: any, index: number, translation = false) {
        console.log('[property change]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    public propertychangeCaptureEvent(e: any, index: number, translation = false) {
        console.log('[property change capture]', e);
        // e.preventDefault();
        // e.stopPropagation();
        // return;
    }

    // public keypress_Event(e: KeyboardEvent, index: number, translation = false) {
    //     console.log('[keypress]', e);
    //     if (!e.isComposing) {
    //         e.preventDefault();
    //         // TODO: 处理英文
    //         const tempSelection = document.getSelection();
    //         if (tempSelection) {
    //             const tempRange = tempSelection.getRangeAt(0);
    //             const tempItem = this.translationList[index];
    //             const tempOuterNode = ((translation ?  this.$refs.PaperTranslation : this.$refs.PaperSource) as Element[])[index];
    //             const {
    //                 startNodeIndex,
    //                 startIndex,
    //                 endNodeIndex,
    //                 endIndex,
    //             } = this.getTranslationRangeBySelection(
    //                 tempRange,
    //                 tempOuterNode,
    //                 tempItem,
    //                 translation
    //             );

    //             let tempIndex = 0;
    //             let tempHTML = '';
    //             let tempNewStartNodeIndex = -1;
    //             let tempNewStartOffset = 0;
    //             let tempNeedReHTML = false;

    //             if ((translation ? tempItem.translation : tempItem.source).length) {
    //                 const tempList = (translation ? tempItem.translation : tempItem.source).filter((item, itemIndex, list) => {
    //                     if (tempRange.collapsed) { // 单一的光标
    //                         if (startIndex === 0) { // 首个
    //                             if (startNodeIndex === 0 && itemIndex === 0) {
    //                                 item.content = e.key + item.content;
    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                                 tempHTML += item.html;
    //                                 tempNewStartNodeIndex = 0;
    //                                 tempNewStartOffset = e.key.length;
    //                                 tempIndex++;
    //                                 return true;
    //                             } else if (itemIndex < startNodeIndex - 1 || itemIndex >= startNodeIndex) {
    //                                 tempHTML += item.html;
    //                                 tempIndex++;
    //                                 return true;
    //                             } else {
    //                                 item.content += e.key;
    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                                 tempHTML += item.html;
    //                                 tempIndex++;
    //                                 tempNewStartNodeIndex = tempIndex;
    //                                 return true;
    //                             }
    //                         } else {
    //                             if (itemIndex < startNodeIndex || itemIndex > startNodeIndex) {
    //                                 tempHTML += item.html;
    //                                 tempIndex++;
    //                                 return true;
    //                             } else {
    //                                 item.content = item.content.substring(0, startIndex) + e.key + item.content.substring(startIndex);
    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                                 tempHTML += item.html;
    //                                 tempNewStartNodeIndex = tempIndex;
    //                                 tempNewStartOffset = startIndex + + e.key.length;
    //                                 tempIndex++;
    //                                 return true;
    //                             }
    //                         }
    //                     } else {
    //                         if (itemIndex < startNodeIndex) {
    //                             tempHTML += item.html;
    //                             tempIndex++;
    //                             return true;
    //                         } else if (itemIndex > endNodeIndex) {
    //                             if (tempNeedReHTML) {
    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                             }

    //                             tempHTML += item.html;
    //                             tempIndex++;
    //                             return true;
    //                         } else {
    //                             if (itemIndex === startNodeIndex) {
    //                                 if (itemIndex === endNodeIndex) {
    //                                     item.content = item.content.substring(0, startIndex) + e.key + item.content.substring(endIndex);
    //                                 } else {
    //                                     item.content = item.content.substring(0, startIndex) + e.key;
    //                                 }

    //                                 item.html = GetInlineHTML(item, tempIndex);
    //                                 tempHTML += item.html;
    //                                 tempNewStartNodeIndex = tempIndex;
    //                                 tempNewStartOffset = startIndex + e.key.length;
    //                                 tempIndex++;
    //                                 return true;
    //                             } else if (itemIndex === endNodeIndex) {
    //                                 if (endIndex === 0) {
    //                                     tempHTML += item.html;
    //                                     tempIndex++;
    //                                     return true;
    //                                 } else {
    //                                     item.content = item.content.substring(endIndex);

    //                                     if (item.content.length > 0) {
    //                                         item.html = GetInlineHTML(item, tempIndex);
    //                                         tempHTML += item.html;
    //                                         tempIndex++;
    //                                         return true;
    //                                     } else {
    //                                         tempNeedReHTML = true;
    //                                         return false;
    //                                     }
    //                                 }
    //                             } else {
    //                                 tempNeedReHTML = true;
    //                                 return false;
    //                             }
    //                         }
    //                     }
    //                 });

    //                 if (translation) {
    //                     tempItem.translation = tempList;
    //                 } else {
    //                     tempItem.source = tempList;
    //                 }
                    
    //             } else {
    //                 const tempNewItem = CreateTranslationInline('' + e.key, 0);
    //                 tempHTML += tempNewItem.html;
    //                 (translation ? tempItem.translation : tempItem.source).push(tempNewItem);

    //                 tempNewStartNodeIndex = 0;
    //                 tempNewStartOffset = e.key.length;
    //             }

    //             if (translation) {
    //                 tempItem.translationHTML = tempHTML;
    //             } else {
    //                 tempItem.sourceHTML = tempHTML;
    //             }
                
    //             this.$set(this.translationList, index, tempItem);

    //             this.$nextTick(() => {
    //                 if ((translation ? tempItem.translation : tempItem.source).length) {
    //                     tempRange.setStart(tempOuterNode.childNodes[tempNewStartNodeIndex].childNodes[0], tempNewStartOffset);
    //                 } else {
    //                     tempRange.setStart(tempOuterNode, 0);
    //                 }
                    
    //                 tempRange.collapse(true);
    //             });

    //             this.$forceUpdate();
    //         }
    //     }
    // }

    // // 输入法输入完毕
    // public compositionend_Event(e: CompositionEvent, index: number, translation = false) {
    //     console.log('[composition end]', e);
    //     const tempSelection = document.getSelection();
    //     if (tempSelection) {
    //         const tempRange = tempSelection.getRangeAt(0);

    //         console.log('[composition end] selection', tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);

    //         // const tempItem = this.translationList[index];
    //         // const tempOuterNode = ((translation ?  this.$refs.PaperTranslation : this.$refs.PaperSource) as Element[])[index];

    //         // let tempStart = tempRange.startOffset; // 起点偏移量
    //         // let tempEnd = tempRange.endOffset;

    //         // const tempStartNode = tempRange.startContainer;
    //         // const tempEndNode = tempRange.endContainer;

    //         // let tempStartNodeIndex: number;
    //         // let tempEndNodeIndex: number;

    //         // 判断内外层Node
    //         // if (tempStartNode === tempOuterNode) {
    //         //     // console.log('start 外层');
    //         //     if (tempStart === 0) {
    //         //         tempStartNodeIndex = 0;
    //         //         tempStart = 0;
    //         //     } else if (tempStart >= (translation ? item.translation : item.source).length) {
    //         //         tempStartNodeIndex = (translation ? item.translation : item.source).length - 1;
    //         //         tempStart = (translation ? item.translation : item.source)[tempStartNodeIndex].content.length;
    //         //     } else {
    //         //         tempStartNodeIndex = tempStart;
    //         //         tempStart = 0;
    //         //     }
    //         // } else {
    //         //     // console.log('start 内层');
    //         //     tempStartNodeIndex = parseInt((tempStartNode.parentNode as HTMLSpanElement).dataset.index!);
    //         // }

    //         // if (tempEndNode === outerNode) {
    //         //     // console.log('end 外层');
    //         //     if (tempEnd === 0) {
    //         //         tempEndNodeIndex = 0;
    //         //         tempEnd = 0;
    //         //     } else if (tempEnd >= (translation ? item.translation : item.source).length) {
    //         //         tempEndNodeIndex = (translation ? item.translation : item.source).length - 1;
    //         //         tempEnd = (translation ? item.translation : item.source)[tempStartNodeIndex].content.length;
    //         //     } else {
    //         //         tempEndNodeIndex = tempEnd;
    //         //         tempEnd = 0;
    //         //     }
    //         // } else {
    //         //     // console.log('end 内层');
    //         //     tempEndNodeIndex = parseInt((tempEndNode.parentNode as HTMLSpanElement).dataset.index!);
    //         // }

            
    //     }

    // }





    public sourceInputEnterKeydownEvent(e: KeyboardEvent, index: number) {
        console.log('source enter', e);
        (this.$refs.PaperTranslation as HTMLDivElement[])[index].focus();
    }

    public paragraphFocusEvent(index: number) {
        const tempItem = this.translationList[index];
        tempItem.focus = true;
        this.$set(this.translationList, index, tempItem);
    }

    public paragraphBlurEvent(index: number) {
        const tempItem = this.translationList[index];
        tempItem.focus = false;
        this.$set(this.translationList, index, tempItem);
    }

    public translationInputPasteEvent(e: ClipboardEvent, index: number) {
        // TODO:
    }

    public translationInputEnterKeydownEvent(e: KeyboardEvent, index: number) {
        // if (index === this.translationList.length - 1) {
        //     this.translationList.push(CreateTranslationParagraph());

        //     this.$nextTick(() => {
        //         (this.$refs.PaperSource as HTMLDivElement[])[index + 1].focus();
        //     });

        //     this.$forceUpdate();
        // } else {
        //     (this.$refs.PaperSource as HTMLDivElement[])[index + 1].focus();
        // }
    }

    public getTranslationRangeBySelection(
        range: Range,
        outerNode: Element,
        item: DTTranslationParagraphText,
        translation: boolean,
    ) {
        let tempStart = range.startOffset; // 起点偏移量
        let tempEnd = range.endOffset;

        // console.log('start', tempStart);
        // console.log('end', tempEnd);

        const tempStartNode = range.startContainer;
        const tempEndNode = range.endContainer;

        // console.log('startNode', tempStartNode);
        // console.log('endNode', tempEndNode);

        let tempStartNodeIndex: number;
        let tempEndNodeIndex: number;

        // 判断内外层Node
        if (tempStartNode === outerNode) {
            // console.log('start 外层');
            if (tempStart === 0) {
                tempStartNodeIndex = 0;
                tempStart = 0;
            } else if (tempStart >= (translation ? item.translation : item.source).length) {
                tempStartNodeIndex = (translation ? item.translation : item.source).length - 1;
                tempStart = (translation ? item.translation : item.source)[tempStartNodeIndex].content.length;
            } else {
                tempStartNodeIndex = tempStart;
                tempStart = 0;
            }
        } else {
            // console.log('start 内层');
            tempStartNodeIndex = parseInt((tempStartNode.parentNode as HTMLSpanElement).dataset.index!);
        }

        if (tempEndNode === outerNode) {
            // console.log('end 外层');
            if (tempEnd === 0) {
                tempEndNodeIndex = 0;
                tempEnd = 0;
            } else if (tempEnd >= (translation ? item.translation : item.source).length) {
                tempEndNodeIndex = (translation ? item.translation : item.source).length - 1;
                tempEnd = (translation ? item.translation : item.source)[tempStartNodeIndex].content.length;
            } else {
                tempEndNodeIndex = tempEnd;
                tempEnd = 0;
            }
        } else {
            // console.log('end 内层');
            tempEndNodeIndex = parseInt((tempEndNode.parentNode as HTMLSpanElement).dataset.index!);
        }

        return {
            startNodeIndex: tempStartNodeIndex,
            startIndex: tempStart,
            endNodeIndex: tempEndNodeIndex,
            endIndex: tempEnd,
        };
    }
}