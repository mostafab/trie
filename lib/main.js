'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _trie = require('./trie');

var _trie2 = _interopRequireDefault(_trie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getWord() {
  return new _promise2.default(function (resolve, reject) {
    _http2.default.get('http://setgetgo.com/randomword/get.php', function (response) {
      var body = '';
      response.on('data', function (d) {
        return body += d;
      });
      response.on('end', function () {
        return resolve(body);
      });
      response.on('error', function (e) {
        return reject(e);
      });
    });
  });
}

function timeout(ms) {
  return new _promise2.default(function (resolve, reject) {
    setTimeout(function () {
      return resolve();
    }, ms);
  });
}

var main = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var trie, i, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            trie = new _trie2.default();
            i = 0;

          case 2:
            if (!(i < 5)) {
              _context.next = 19;
              break;
            }

            _context.prev = 3;
            _context.next = 6;
            return getWord();

          case 6:
            response = _context.sent;

            console.log(response);
            trie.add(response);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);
            throw _context.t0;

          case 14:
            _context.next = 16;
            return timeout(1100);

          case 16:
            i++;
            _context.next = 2;
            break;

          case 19:
            return _context.abrupt('return', trie);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 11]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

(0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
  var completeTrie, str;
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return main();

        case 2:
          completeTrie = _context2.sent;
          str = (0, _stringify2.default)(completeTrie, null, 4);

          _fs2.default.writeFile('trie.json', str);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
}))();