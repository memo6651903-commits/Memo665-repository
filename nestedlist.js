class NestedListExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.lists = {}; // tüm listeleri saklamak için
  }

  getInfo() {
    return {
      id: 'nestedlist',
      name: 'Liste içinde Liste',
      blocks: [
        {
          opcode: 'createList',
          blockType: Scratch.BlockType.REPORTER,
          text: 'yeni liste oluştur [NAME]',
          arguments: {
            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'anaListe' }
          }
        },
        {
          opcode: 'addListToList',
          blockType: Scratch.BlockType.COMMAND,
          text: 'liste [CHILD] öğesini [PARENT] içine ekle',
          arguments: {
            CHILD: { type: Scratch.ArgumentType.STRING, defaultValue: 'altListe' },
            PARENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'anaListe' }
          }
        },
        {
          opcode: 'getSubList',
          blockType: Scratch.BlockType.REPORTER,
          text: '[PARENT] listesindeki [INDEX] alt listeyi al',
          arguments: {
            PARENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'anaListe' },
            INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
          }
        }
      ]
    };
  }

  createList(args) {
    const name = args.NAME;
    this.lists[name] = [];
    return name;
  }

  addListToList(args) {
    const parent = args.PARENT;
    const child = args.CHILD;
    if (!this.lists[parent]) this.lists[parent] = [];
    if (!this.lists[child]) this.lists[child] = [];
    this.lists[parent].push(this.lists[child]);
  }

  getSubList(args) {
    const parent = args.PARENT;
    const index = args.INDEX - 1;
    if (this.lists[parent] && this.lists[parent][index]) {
      return JSON.stringify(this.lists[parent][index]);
    }
    return 'bulunamadı';
  }
}

Scratch.extensions.register(new NestedListExtension());

