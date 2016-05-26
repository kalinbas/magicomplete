import TokenNode from './TokenNode';

export default class StateNode {

  public previousState:StateNode = null;
  public node:TokenNode = null;
  public baseText:string = null;
  public searchText:string = null;
  public capture:string = null;
}
