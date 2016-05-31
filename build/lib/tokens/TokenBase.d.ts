import CheckAndRemoveResult from './CheckAndRemoveResult';
declare abstract class TokenBase {
    abstract checkAndRemove(text: string): CheckAndRemoveResult;
}
export default TokenBase;
