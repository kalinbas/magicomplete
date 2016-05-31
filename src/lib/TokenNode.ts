import TokenBase from './tokens/TokenBase';

export default class TokenNode {
  public isEnd:boolean = false;
  public token:TokenBase = null;
  public key:string = null;
  public children:TokenNode[] = [];
}
