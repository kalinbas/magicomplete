import TokenBase from './TokenBase';

import AutocompleteToken from './AutocompleteToken';
import StringToken from './StringToken';
import NumberToken from './NumberToken';

export default class TokenFactory {

    static createToken(definition: ITokenDefinition): TokenBase {
        switch (definition.type) {
            case 'autocomplete':
                return new AutocompleteToken(definition.options);
            case 'string':
                return new StringToken(definition.options);
            case 'number':
                return new NumberToken(definition.options);
            default:
                throw new Error("Unknown token type: " + definition.type);
        }
    }
}

export interface ITokenDefinition {
    type: string;
    options: any;
    key?: string;
}