import TokenBase from './TokenBase';
import CheckAndRemoveResult from './CheckAndRemoveResult';

import * as http from 'http';

import StringUtil from '../util/StringUtil';

export default class AutocompleteToken extends TokenBase {

  searchCache: Set<string>;
  valueCache: Set<string>;

  constructor(private options: IAutocompleteTokenOptions) {
    super();
    
    this.searchCache = new Set<string>();
    this.valueCache = new Set<string>();
  }

  checkAndRemove(text: string) {
    let p = new Promise<CheckAndRemoveResult>((resolve, reject) => {

      // query autocomplete if not yet done
      if (!this.searchCache.has(text.toLowerCase()) && text.length >= this.options.minQueryLength) {
        
        this.queryGetJsonService(text).then(json => {
          let values = this.options.sourceResultTransform(json);
          if (values) {
            values.forEach(v => { this.valueCache.add(v); });
          }
          this.searchCache.add(text.toLowerCase());
          resolve(this.getResultFromCache(text));
        });
      } else {
        resolve(this.getResultFromCache(text));
      }

    });
    return p;
  }

  private queryGetJsonService(q:string): Promise<any> {  
    
    // if there is a test source result - return it
    if (this.options.testSourceResult) {
      return Promise.resolve(this.options.testSourceResult);
    }
    
    // standard handling - call service
    let p = new Promise<string[]>((resolve, reject) => {
      http.get(this.options.sourceUrlTemplate.replace("{q}", q), res => {
        let json = "";
        res.on('data', chunk => { json += chunk; });
        res.on('error', () => { reject(); })
        res.on('end', () => {
          let obj = JSON.parse(json);
          resolve(obj);
        });
      });
    });
    return p;
  }

  private getResultFromCache(text: string): CheckAndRemoveResult {

    let result = new CheckAndRemoveResult();
    let foundLength = 0;

    if (!text || text.length < this.options.minQueryLength) {
      result.isAnything = true; 
      return result;
    }

    this.valueCache.forEach(val => {
      // if text starts with value
      if (text.toLowerCase().indexOf(val.toLowerCase()) === 0) {
        // find longest possible match
        if (val.length > foundLength) {
          result.isValid = true;
          result.capture = val;
          result.continuation = text.substr(val.length);
          foundLength = val.length;
        }
      }
      // if value starts with text
      if (text.length < val.length) {
        if (val.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
          result.autocomplete.push(val);
        } else {
          // if text is similar to text
          let dist = StringUtil.levenshteinDistance(text.toLowerCase(), val.substr(0, text.length).toLowerCase());
          if (dist <= 2) {
            result.autocomplete.push(val);
          }
        }
      }
    });

    return result;
  }
}

export interface IAutocompleteTokenOptions {
  sourceUrlTemplate?: string;
  testSourceResult?: any;
  sourceResultTransform: (any) => string[];
  minQueryLength: number;
}
