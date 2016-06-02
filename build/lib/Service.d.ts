import TokenNode from './TokenNode';
import StateNode from './StateNode';
export default class Service {
    private options;
    root: TokenNode;
    constructor(options: IServiceOptions);
    search(text: string): Promise<ServiceResult>;
    private searchChildren(stateNode, searchState);
    private addTree(node, attachToNode);
}
export interface IServiceOptions {
    phrases: string[];
    tokens?: any;
}
export declare class SearchState {
    text: string;
    finalState: StateNode;
    isAnything: boolean;
    autocomplete: string[];
}
export declare class ServiceResult {
    isReady: boolean;
    isInvalid: boolean;
    isAnything: boolean;
    autocomplete: string[];
    captures: any;
}
