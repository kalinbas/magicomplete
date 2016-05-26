import {expect} from 'chai';

import StringToken from '../../src/tokens/StringToken';
import CheckAndRemoveResult from '../../src/tokens/CheckAndRemoveResult';

/**
 * Unit tests
 */
describe('StringToken', () => {
  it('should do autocomplete', () => {
    let token = new StringToken({ value : "foo"});
    let res = token.checkAndRemove("f");
    expect(res.autocomplete[0]).to.eq("foo");
  });
  it('should do autocomplete + fix', () => {
    let token = new StringToken({ value : "foo"});
    let res = token.checkAndRemove("fa");
    expect(res.autocomplete[0]).to.eq("foo");
  });


});
