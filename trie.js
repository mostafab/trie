export default class Trie {

  constructor(words = []) {
    this.head = new TrieNode(null, false);
    words.forEach(word => this.add(word));
  }

  add(word) {
    const copy = word.toLowerCase().trim();
    const { current, index } = this.findEndOfMatch(copy);
    if (index < copy.length) { // Did not find the complete word, so add the remaining letters.
      current.children.push(this.createNodeChain(copy, index));
    } else { // Otherwise, we update the last letter as the end of a word.
      current.isWord = true;
    }
  }

  createNodeChain(word, index) {
    const node = new TrieNode(word[index], index === word.length - 1);
    if (index < word.length - 1) {
      node.children.push(this.createNodeChain(word, index + 1));
    }
    return node;
  }

  findEndOfMatch(word) {
    let current = this.head;
    let index = 0;
    while (index < word.length && current.hasLetterAsChild(word[index])) {
      current = current.findChildLetter(word[index]);
      index++;
    }
    return { current, index };
  }

  getPrefixMatches(prefix = '') {
    const arr = [];
    const normalized = prefix.toLowerCase().trim();
    const { index, current } = this.findEndOfMatch(normalized);
    if (index < normalized.length) { // Terminated because no match was found
      return arr;
    }
    this.getAllWordsRecursive(current, normalized, arr);
    return arr;
  }

  getAllWordsRecursive(node, word, arr) {
    if (node.isWord) {
      arr.push(word);
    }
    for (let i = 0; i < node.children.length; i++) {
      this.getAllWordsRecursive(node.children[i], word + node.children[i].value, arr);
    }
  }
}

class TrieNode {

  constructor(letter, isWord = false) {
      this.value = letter;
      this.children = [];
      this.isWord = isWord;
  }

  findChildLetter(letter) {
    return this.children.find(l => l.value === letter);
  }

  hasLetterAsChild(letter) {
    return typeof this.children.find(l => l.value === letter) !== 'undefined';
  }

}

const trie = new Trie();

trie.add('dog');
trie.add('dirty');
trie.add('do');
trie.add('dirt');
trie.add('empty');

console.log(trie.getPrefixMatches('dir'));