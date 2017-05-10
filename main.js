import http from 'http';
import fs from 'fs';
import Trie from './trie';

function getWord() {
  return new Promise((resolve, reject) => {
    http.get('http://setgetgo.com/randomword/get.php', (response) => {
      let body = '';
      response.on('data', d => body += d);
      response.on('end', () => resolve(body));
      response.on('error', e => reject(e));
    })
  });
}

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  })
}

const main = async () => {
  const trie = new Trie();
  for (let i = 0; i < 5; i++) {
    try {
      const response = await getWord();
      console.log(response);
      trie.add(response);
    } catch (error) {
      throw error;
    }
    await timeout(1100);
  }
  return trie;
}

(async () => {
  const completeTrie = await main();
  const str = JSON.stringify(completeTrie, null, 4);
  fs.writeFile('trie.json', str);
})();