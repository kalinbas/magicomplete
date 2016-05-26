import TokenNode from './TokenNode';
export default class Service {
    private options;
    root: TokenNode;
    constructor(options: IServiceOptions);
    search(text: string): ServiceResult;
    private addTree(node, attachToNode);
}
export interface IServiceOptions {
    phrases: string[];
    tokens?: any;
}
export declare class ServiceResult {
    isReady: boolean;
    isInvalid: boolean;
    isAnything: boolean;
    autocomplete: string[];
    captures: any;
}
