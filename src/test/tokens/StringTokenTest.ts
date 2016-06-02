import {expect} from 'chai';

import StringToken from '../../lib/tokens/StringToken';
import CheckAndRemoveResult from '../../lib/tokens/CheckAndRemoveResult';

/**
 * Unit tests
 */
describe('StringToken', () => {
  it('should do autocomplete', (done) => {
    let token = new StringToken({ values: ["foo"] });
    let res = token.checkAndRemove("f").then(res => {
      expect(res.autocomplete[0]).to.eq("foo");
      done();
    });
    
  });
  it('should do autocomplete + fix', (done) => {
    let token = new StringToken({ values: ["foo"] });
    let res = token.checkAndRemove("fa").then(res => {
      expect(res.autocomplete[0]).to.eq("foo");
      done();
    });
  });


});
