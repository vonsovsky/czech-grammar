const regex = /\([a-zA-Zíýě]+\)/g;
const regex_fl = /\(([a-zA-Zíýě])[a-zA-Zíýě]+\)/g;

export default class GrammarParser {

  constructor(datasource) {
    this.datasource = datasource;
    this.groups = this.parseGroups();
  }
  
  showFirstLetter() {
    return this.datasource['settings']['show_first_letter'];
  }

  parseGroups() {
	  groups = {}
      this.datasource['settings']['groups'].forEach(function(group) {
          words = group.split("|").map(function(item) {
            return item.trim();
          });
		  
		  groups[words[0]] = words[1];
		  groups[words[1]] = words[0];
      });

	  return groups;
  }
  
  /**
   * Phrase is in format {'line': String, 'legend': String, 'groups': list, 'required': list}.
   * Example: phrase = {'line': 'zapo(mně)l (Mě)síc', 'legend': 2, 'groups': ['mně', 'mě'], 'required': ['mně']}
   */
  parsePhrases() {
	  phrases = [];
	  group_id = -1

      _this = this;
	  this.datasource['data'].forEach(function(line) {
		  if (line[0] == '[') {
			group_id = parseInt(line.substring(7, line.length - 1));
			return;
          }
		
          words = line.split("|").map(function(item) {
            return item.trim();
          });

          phrase = _this._extractRequiredAndAvailableLetters(words[0]);
		  phrase['legend'] = _this._extractLegend(words);
		  phrase['line'] = words[0];

          if (_this.showFirstLetter()) {
              w = words[0].replace(regex_fl, '$1_');
          } else {
              w = words[0].replace(regex, '_');
          }
          phrase['featured'] = w;
          
          phrases.push(phrase);
	  });
      
      return phrases;
  }
  
  _extractLegend(linePhrases) {
    legend = '';
    if (linePhrases.length > 1) {
        if (linePhrases[1] in this.datasource['legend'])
            legend = this.datasource['legend'][linePhrases[1]]
        else
            legend = linePhrases[1];
    }
    
    return legend;
  }
  
  _extractRequiredAndAvailableLetters(line) {
      phrase = {'groups': [], 'required': []}
      
      if (line.match(regex) === null) {
        console.log("Error on the following line: " + line);
      }
      
      _this = this;
      line.match(regex).forEach(function(match) {
        match = match.substring(1, match.length - 1).toLowerCase();
        phrase['required'].push(match)

        if (group_id >= 0) {
            igroups = _this.datasource['settings']['groups']
            p = igroups[group_id].split("|").map(function(item) {
                return item.trim();
            });
        } else {
            p = [match, _this.groups[match]];
        }

        p.sort();
        phrase['groups'].push(p[0], p[1]);
      });
      
      return phrase;
  }

}