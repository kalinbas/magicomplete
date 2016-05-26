import TokenBase from './tokens/TokenBase';

export default class TokenNode {
  public isEnd:boolean;
  public token:TokenBase;
  public key:string;
  public children:TokenNode[] = [];
}
