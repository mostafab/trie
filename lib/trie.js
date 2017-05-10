'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('babel-polyfill');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Trie = function () {
  function Trie() {
    var _this = this;

    var words = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    (0, _classCallCheck3.default)(this, Trie);

    this.head = new TrieNode(null, false);
    words.forEach(function (word) {
      return _this.add(word);
    });
  }

  (0, _createClass3.default)(Trie, [{
    key: 'add',
    value: function add(word) {
      var copy = word.toLowerCase().trim();

      var _findEndOfMatch = this.findEndOfMatch(copy),
          current = _findEndOfMatch.current,
          index = _findEndOfMatch.index;

      if (index < copy.length) {
        // Did not find the complete word, so add the remaining letters.
        current.children.push(this.createNodeChain(copy, index));
      } else {
        // Otherwise, we update the last letter as the end of a word.
        current.isWord = true;
      }
    }
  }, {
    key: 'createNodeChain',
    value: function createNodeChain(word, index) {
      var node = new TrieNode(word[index], index === word.length - 1);
      if (index < word.length - 1) {
        node.children.push(this.createNodeChain(word, index + 1));
      }
      return node;
    }
  }, {
    key: 'findEndOfMatch',
    value: function findEndOfMatch(word) {
      var current = this.head;
      var index = 0;
      while (index < word.length && current.hasLetterAsChild(word[index])) {
        current = current.findChildLetter(word[index]);
        index++;
      }
      return { current: current, index: index };
    }
  }, {
    key: 'getPrefixMatches',
    value: function getPrefixMatches() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var arr = [];
      var normalized = prefix.toLowerCase().trim();

      var _findEndOfMatch2 = this.findEndOfMatch(normalized),
          index = _findEndOfMatch2.index,
          current = _findEndOfMatch2.current;

      if (index < normalized.length) {
        // Terminated because no match was found
        return arr;
      }
      this.getAllWordsRecursive(current, normalized, arr);
      return arr;
    }
  }, {
    key: 'getAllWordsRecursive',
    value: function getAllWordsRecursive(node, word, arr) {
      if (node.isWord) {
        arr.push(word);
      }
      for (var i = 0; i < node.children.length; i++) {
        this.getAllWordsRecursive(node.children[i], word + node.children[i].value, arr);
      }
    }
  }]);
  return Trie;
}();

exports.default = Trie;

var TrieNode = function () {
  function TrieNode(letter) {
    var isWord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck3.default)(this, TrieNode);

    this.value = letter;
    this.children = [];
    this.isWord = isWord;
  }

  (0, _createClass3.default)(TrieNode, [{
    key: 'findChildLetter',
    value: function findChildLetter(letter) {
      return this.children.find(function (l) {
        return l.value === letter;
      });
    }
  }, {
    key: 'hasLetterAsChild',
    value: function hasLetterAsChild(letter) {
      return typeof this.children.find(function (l) {
        return l.value === letter;
      }) !== 'undefined';
    }
  }]);
  return TrieNode;
}();