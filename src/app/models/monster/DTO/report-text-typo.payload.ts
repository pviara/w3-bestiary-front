export class ReportTextTypoPayload {
    constructor(
        readonly lang: string,
        readonly monsterCode: string,
        readonly typo: string
    ) {}
}
