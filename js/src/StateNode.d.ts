import TokenNode from './TokenNode';
export default class StateNode {
    previousState: StateNode;
    node: TokenNode;
    baseText: string;
    searchText: string;
    capture: string;
}
