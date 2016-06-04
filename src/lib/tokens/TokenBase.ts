import CheckAndRemoveResult from './CheckAndRemoveResult';

abstract class TokenBase {
  abstract checkAndRemove(text: string): Promise<CheckAndRemoveResult>;
}

export default TokenBase;

