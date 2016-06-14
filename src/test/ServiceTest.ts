import {expect} from 'chai';

import Service from '../lib/Service';
import StringToken from '../lib/tokens/StringToken';

/**
 * Unit tests
 */
describe('Service', () => {
  it('should do simple search', (done) => {
    let service = new Service({
      phrases: [
        "I want to",
        "I would like to"
      ]
    });
    service.search("i").then(result => {
      expect(result.isReady).to.be.false;
      expect(result.isInvalid).to.be.false;
      expect(result.isAnything).to.be.false;
      expect(result.autocomplete).to.have.length(2);
      expect(result.autocomplete[0]).to.eq("I want to");
      expect(result.autocomplete[1]).to.eq("I would like to");
      expect(result.captures).to.be.empty;
      done();
    });
  });

  it('should do simple search with optionals', (done) => {

    let service = new Service({
      phrases: [
        "I want to see [token:token1] [token:token2]"
      ], tokens: [{
        key: "token",
        type: "string",
        options: { values: ["a movie"] }
      }]
    });

    service.search("i want to see a movie a movie").then(result => {
      expect(result.isReady).to.be.true;
      expect(result.isInvalid).to.be.false;
      expect(result.isAnything).to.be.false;
      expect(result.autocomplete).to.have.length(0);
      expect(result.captures.token1).to.eq("a movie");
      expect(result.captures.token2).to.eq("a movie");
      done();
    });
  });
});
