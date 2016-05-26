import TokenNode from './TokenNode';
export default class Service {
    private options;
    root: TokenNode;
    constructor(options: IServiceOptions);
    addTree(node: TokenNode, attachToNode: TokenNode): void;
}
export interface IServiceOptions {
    phrases: string[];
    tokens: any;
}
