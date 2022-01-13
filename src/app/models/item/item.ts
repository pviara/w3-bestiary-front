export class Item {
    constructor(
        readonly code: string,
        readonly name: string
    ) {}
}

export type ItemsByLang = {
    lang: string;
    items: Item[];
};
