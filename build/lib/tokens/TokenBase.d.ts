import CheckAndRemoveResult from './CheckAndRemoveResult';
declare abstract class TokenBase {
    abstract checkAndRemove(text: string): Promise<CheckAndRemoveResult>;
}
export default TokenBase;
