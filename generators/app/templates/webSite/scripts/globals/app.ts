interface IUuid {
    v4(): string;
    parse(id: string): number[];
    unparse(buffer: number[]): string;
}

declare var uuid: IUuid;

module home {
    var appModule = angular.module("app", ["ng"]);
}