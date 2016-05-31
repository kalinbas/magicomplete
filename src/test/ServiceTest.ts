import {expect} from 'chai';

import Service from '../lib/Service';
import StringToken from '../lib/tokens/StringToken';

/**
 * Unit tests
 */
describe('Service', () => {
  it('should do simple search', () => {
      let service = new Service({ phrases: [
        "i want to",
        "i would like to"
      ]});
      let result = service.search("i");
      expect(result.isReady).to.be.false;
      expect(result.isInvalid).to.be.false;
      expect(result.isAnything).to.be.false;
      expect(result.autocomplete).to.have.length(2);
      expect(result.autocomplete[0]).to.eq("i want to");
      expect(result.autocomplete[1]).to.eq("i would like to");
      expect(result.captures).to.be.empty;
  });

  it('should do simple search with optionals', () => {

    let token = new StringToken({ values : ["a movie"]});

    let service = new Service({ phrases: [
      "i want to see {token:token1} {token:token2}"
    ], tokens : { token : token }});

    let result = service.search("i want to see a movie a movie");

    expect(result.isReady).to.be.true;
    expect(result.isInvalid).to.be.false;
    expect(result.isAnything).to.be.false;
    expect(result.autocomplete).to.have.length(0);
    expect(result.captures.token1).to.eq("a movie");
    expect(result.captures.token2).to.eq("a movie");
  });
});
