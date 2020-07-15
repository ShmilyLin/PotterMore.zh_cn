import Random from '@/utils/Random';

/**
 * 行内文字类型
 */
export enum DTTranslationInlineType {
    normal = 0, // 正常
    code = 1, // 代码
    sup = 2, // 上标
    sub = 3, // 下标
    link = 4, // 链接
    LaTeX = 5, // 公式
    image = 6, // 图片
}

/**
 * 字体粗细类型
 */
export enum DTTranslationTextInlineWeight {
    normal = 'normal',
    bold = 'bold',
    lighter = 'lighter',
}

export function GetInlineHTML(item: DTTranslationTextInline, index: number) {
    switch (item.type) {
        case DTTranslationInlineType.normal:
            return `<span class="paper-p-content-source-text-normal" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.code:
            return `<span class="paper-p-content-source-text-code" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.sub:
            return `<span class="paper-p-content-source-text-sub" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.sup:
            return `<span class="paper-p-content-source-text-sup" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.link:
            return `<span class="paper-p-content-source-text-link" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.LaTeX:
            return `<span class="paper-p-content-source-text-latex" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
        case DTTranslationInlineType.image:
            return `<img class="paper-p-content-source-text-image" style="${item.styleString}" src="${item.src}" data-id="${item.id}" data-index="${index}">`;
        default:
            return `<span class="paper-p-content-source-text-normal" style="${item.styleString}" data-id="${item.id}" data-index="${index}">${item.content.length ? item.content : '<br>'}</span>`;
    }
}


export interface DTTranslationTextInlineOptions {
    content?: string;
    index?: number;
}

/**
 * 行内文字
 */
export class DTTranslationTextInline {
    public id: string = Random.get(32);

    public content = ''; // 内容

    public type: DTTranslationInlineType = DTTranslationInlineType.normal; // 类型

    public color = '#000000'; // 颜色
    public backgroundColor = ''; // 背景色

    public isE = false; // 倾斜
    public isS = false; // 删除线
    public isU = false; // 下划线

    public size = 17; // 字号
    public weight: DTTranslationTextInlineWeight = DTTranslationTextInlineWeight.normal;
    public family = 'system-ui'; // 字体，暂不支持

    public html = '';

    public src?: string; // type === image 时，专属
    public href?: string; // type === link 时，专属

    constructor(options: DTTranslationTextInlineOptions) {
        const tempOptions = {
            content: '',
            index: 0,
            ...(options ? options : {}),
        };

        this.content = tempOptions.content;
        this.html = GetInlineHTML(this, tempOptions.index);
    }

    public get styleID(): string {
        return '' + 
            this.type + '_' +
            this.color + '_' +
            this.size + '_' +
            this.weight + '_' +
            this.backgroundColor + '_' +
            this.family + '_' +
            (this.isE ? 'e' : 'ne')+ '_' +
            (this.isS ? 's' : 'ns')+ '_' +
            (this.isU ? 'u' : 'nu');
    }

    public get styleString(): string {
        let tempString = '';
        switch (this.type) {
            case DTTranslationInlineType.normal:
                tempString += `font-size: ${this.size}px;`;
                tempString += `font-family: ${this.family}`;
                tempString += `color: ${this.color};`;
                tempString += `background-color: ${this.backgroundColor};`;
                if (this.isE)
                    tempString += 'font-style: italic;';
                if (this.isS && this.isU)
                    tempString += 'text-decoration: underline line-through;';
                else if (this.isS)
                    tempString += 'text-decoration: line-through;';
                else if (this.isU)
                    tempString += 'text-decoration: underline;';
                break;
            case DTTranslationInlineType.code:
                break;
            case DTTranslationInlineType.sub:
                tempString += 'vertical-align: sub;';
                tempString += `font-size: ${this.size/2}px;`;
                tempString += `font-family: ${this.family}`;
                tempString += `color: ${this.color};`;
                tempString += `background-color: ${this.backgroundColor};`;
                break;
            case DTTranslationInlineType.sup:
                tempString += 'vertical-align: super;';
                tempString += `font-size: ${this.size/2}px;`;
                tempString += `font-family: ${this.family}`;
                tempString += `color: ${this.color};`;
                tempString += `background-color: ${this.backgroundColor};`;
                break;
            case DTTranslationInlineType.link:
                break;
            case DTTranslationInlineType.LaTeX:
                break;
            case DTTranslationInlineType.image:
                break;
            default:
                break;
        }

        return tempString;
    }

    public copyItem(options: DTTranslationTextInlineOptions): DTTranslationTextInline {
        const newItem = new DTTranslationTextInline(options);
        newItem.type = this.type;
        newItem.color = this.color;
        newItem.backgroundColor = this.backgroundColor;
        newItem.isE = this.isE;
        newItem.isS = this.isS;
        newItem.isU = this.isU;
        newItem.size = this.size;
        newItem.weight = this.weight;
        newItem.family = this.family;
        newItem.html = this.html;
        newItem.href = this.href;
        return newItem;
    }
}




/**
 * 段落类型
 */
export enum DTTranslationParagraphType {
    text, // 文字翻译
    image, // 单图片翻译
    table, // 图表翻译
    line, // 分割线
    code, // 代码块翻译
    list, // 列表翻译
}

export enum DTTranslationParagraphTextType {
    text, // 正文
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
}

/**
 * 段落
 */
export class DTTranslationParagraph {
    public id: string = Random.ID();
    public type: DTTranslationParagraphType = DTTranslationParagraphType.text;

    public focus = false; // 是否聚焦
}

export interface DTTranslationParagraphTextOptions {
    source?: string;
    translation?: string;
}

export class DTTranslationParagraphText extends DTTranslationParagraph {
    public textType: DTTranslationParagraphTextType = DTTranslationParagraphTextType.text;

    public source: DTTranslationTextInline[] = []; // 原文
    public sourceHTML = ''; // 原文对应的Nodes

    public translation: DTTranslationTextInline[] = []; // 译文
    public translationHTML = '';

    constructor(options?: DTTranslationParagraphTextOptions) {
        super();

        const tempOptions = {
            source: '',
            translation: '',
            ...(options ? options : {}),
        };

        const tempSourceItem = new DTTranslationTextInline({
            content: tempOptions.source,
        });

        this.source.push(tempSourceItem);
        this.sourceHTML = tempSourceItem.html;

        const tempTranslationItem = new DTTranslationTextInline({
            content: tempOptions.translation,
        });

        this.translation.push(tempTranslationItem);
        this.translationHTML = tempTranslationItem.html;
    }
}

