export class Trie {

    #isEnd = false;
    #children: Record<string, Trie> = {};
   
    constructor() {}
   
    public get isEnd() {
      return this.#isEnd;
    }
   
    public get children() {
      return this.#children;
    }
   
    hasChar(char: string): Trie | null {
      const searchChar = this.children[char];
      if (typeof searchChar !== "undefined") {
        return searchChar;
      }
   
      return null;
    }
   
    addChar(char: string): Trie {
      const newSubTrie = new Trie();
      this.children[char] = newSubTrie;
      return newSubTrie;
    }
   
    makeEnd(): void {
      this.#isEnd = true;
    }
   
    searchTrie(word: string): boolean {
      if (word.length === 0) {
        return this.#isEnd;
      }
   
      const subTrie = this.hasChar(word[0]);
      if (subTrie === null) {
        return false;
      }
   
      return subTrie.searchTrie(word.slice(1));
    }
   
    addWord(word: string): void {
      if (word.length === 0) {
        this.makeEnd();
        return;
      }
   
      const subTrie = this.hasChar(word[0]);
      if (subTrie !== null) {
        return subTrie.addWord(word.slice(1));
      } else {
        const newSubTrie = this.addChar(word[0]);
        return newSubTrie.addWord(word.slice(1));
      }
    }
   
    static buildTrie = (wordList: string[]): Trie => {
      const trie = new Trie();
      for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i];
        trie.addWord(word);
      }
   
      return trie;
    };
  }