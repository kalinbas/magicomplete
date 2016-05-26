import CheckAndRemoveResult from './CheckAndRemoveResult';

abstract class TokenBase {
  abstract checkAndRemove(text:string):CheckAndRemoveResult;
}

export default TokenBase;
