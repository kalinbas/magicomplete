import TokenBase from './tokens/TokenBase';
export default class TokenNode {
    isEnd: boolean;
    token: TokenBase;
    key: string;
    children: TokenNode[];
}
