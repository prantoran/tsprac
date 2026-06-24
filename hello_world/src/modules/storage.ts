
// default exports
export default class Store {
    compressor: Compressor;
    encryptor: Encryptor;

    constructor() {
        this.compressor = new Compressor();
        this.encryptor = new Encryptor();
        console.log("Store constructor called");
    }
}

export enum Format { Raw, Compressed }

class Compressor { }
class Encryptor { }

