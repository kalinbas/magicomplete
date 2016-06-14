import {expect} from 'chai';

import StringToken from '../../lib/tokens/StringToken';
import CheckAndRemoveResult from '../../lib/tokens/CheckAndRemoveResult';

/**
 * Unit tests
 */
describe('StringToken', () => {
  it('should do autocomplete + ignore case', (done) => {
    let token = new StringToken({ values: ["Foo"] });
    let res = token.checkAndRemove("f").then(res => {
      expect(res.autocomplete[0]).to.eq("Foo");
      done();
    });
    
  });
  it('should do autocomplete + fix', (done) => {
    let token = new StringToken({ values: ["Foo"] });
    let res = token.checkAndRemove("fa").then(res => {
      expect(res.autocomplete[0]).to.eq("Foo");
      done();
    });
  });
  it('should take longest match', (done) => {
    let token = new StringToken({ values: ["Foo", "FooBar"] });
    let res = token.checkAndRemove("foobar").then(res => {
      expect(res.capture).to.eq("FooBar");
      done();
    });
  });

});
