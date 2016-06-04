import {expect} from 'chai';
import * as http from 'http';

import AutocompleteToken from '../../lib/tokens/AutocompleteToken';
import CheckAndRemoveResult from '../../lib/tokens/CheckAndRemoveResult';

/**
 * Unit tests
 */
describe('AutocompleteToken', () => {

  let token: AutocompleteToken = null;

  beforeEach(function () {
    token = new AutocompleteToken({
      minQueryLength: 2,
      // test result from http://www.omdbapi.com/?s=the%20hobbit
      testSourceResult: {"Search":[{"Title":"The Hobbit: An Unexpected Journey","Year":"2012","imdbID":"tt0903624","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_SX300.jpg"},{"Title":"The Hobbit: The Desolation of Smaug","Year":"2013","imdbID":"tt1170358","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_SX300.jpg"},{"Title":"The Hobbit: The Battle of the Five Armies","Year":"2014","imdbID":"tt2310332","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BODAzMDgxMDc1MF5BMl5BanBnXkFtZTgwMTI0OTAzMjE@._V1_SX300.jpg"},{"Title":"The Hobbit","Year":"1977","imdbID":"tt0077687","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMjA0ODY3NTkwOF5BMl5BanBnXkFtZTcwODU3NzIyMQ@@._V1_SX300.jpg"},{"Title":"LEGO the Hobbit: The Video Game","Year":"2014","imdbID":"tt3584562","Type":"game","Poster":"N/A"},{"Title":"The Hobbit","Year":"2003","imdbID":"tt0395578","Type":"game","Poster":"http://ia.media-imdb.com/images/M/MV5BMTQzNjEzMTQxNl5BMl5BanBnXkFtZTgwMDMyODI4MDE@._V1_SX300.jpg"},{"Title":"The Hobbit","Year":"1966","imdbID":"tt1686804","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BYTU4OTUwYmQtYjVhZS00ZGRkLWExY2EtYzY5NzkzZGY4YmU1XkEyXkFqcGdeQXVyMjMyNTkxNzY@._V1_SX300.jpg"},{"Title":"A Day in the Life of a Hobbit","Year":"2002","imdbID":"tt0473467","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTk3ODI5Nzk4Nl5BMl5BanBnXkFtZTcwMDE5MTcyMQ@@._V1_SX300.jpg"},{"Title":"The Hobbit: An Unexpected Journey - The Company of Thorin","Year":"2013","imdbID":"tt3345514","Type":"movie","Poster":"N/A"},{"Title":"Secrets of Middle-Earth: Inside Tolkien's 'The Hobbit'","Year":"2003","imdbID":"tt0401776","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTc4MzUxMDU3Nl5BMl5BanBnXkFtZTcwNjYxMzQyMQ@@._V1_SX300.jpg"}],"totalResults":"37","Response":"True"},
      sourceResultTransform: (obj) => {
        return obj.Search.map(o => { return o.Title; });
      }
    });
  });

  it('should respect minlength', done => {
    token.checkAndRemove("t").then(res => {
      expect(res.autocomplete).to.have.length(0);
      expect(res.isAnything).to.be.true;
      done();
    });
  });
  
  

  it('should get autocomplete values', done => {
    token.checkAndRemove("the hobbit").then(res => {     
      expect(res.autocomplete).to.have.length.gt(0);
      expect(res.isValid).to.be.true;
      expect(res.isAnything).to.be.false;
      done();
    });
  });

  it('should accept complete values as valid', done => {
    token.checkAndRemove("the hobbit: an unexpected journey").then(res => {
      expect(res.isValid).to.be.true;
      expect(res.isAnything).to.be.false;
      done();
    });
  });
});
