import crypto from 'crypto';
import { encryption } from '../keys/keys.js';

class Encryption {
    #algorithm; // setting algorithm for encryption or decryption
    #key = encryption.key; // system default key
    #iv = encryption.iv; // system default iv
    #myKey; // stores randomly genrated key
    #myIv; // stores randomly generated iv

    constructor() {
        this.#algorithm = 'aes-256-cbc'; //Using AES encryption algorithm with 256 bit key and CBC mode of operation.
    }

    // use to set key and iv passed by user for encryption and decryption
    setKey(key) {
        this.#myKey = key;
    }
    setIv(iv) {
        this.#myIv = iv;
    }

    // Generating random key and iv for encryption and decryption
    generateKey() {
        this.#myKey = crypto.randomBytes(32).toString('hex');
        return this.#myKey;
    }
    generateIv() {
        this.#myIv = crypto.randomBytes(16).toString('hex');
        return this.#myIv;
    }

    // Encrypt string using system default key and iv  
    hideString(text) {
        if (!text) return ""; // Return empty string if text is empty, undefined, or null

        try {
            let cipher = crypto.createCipheriv(this.#algorithm, this.#key, this.#iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');

        } catch (error) {
            return '';
        }
    }

    // decrypt string using system default key and iv
    showString(text) {
        if (!text) return ""; // Return empty string if text is empty, undefined, or null

        try {
            let encryptedText = Buffer.from(text, 'hex');

            let decipher = crypto.createDecipheriv(this.#algorithm, this.#key, this.#iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();

        } catch (error) {

            return '';
        }
    }

    // encrypt string using randomly generated key and iv
    encrypt(text) {
        if (!text) return ""; // Return empty string if text is empty, undefined, or null

        if (!this.#myKey || !this.#myIv)
            return; // Return undefined if the key or IV is not available

        var lockey = Buffer.from(this.#myKey, 'hex');
        var lociv = Buffer.from(this.#myIv, 'hex');

        try {
            let cipher = crypto.createCipheriv(this.#algorithm, lockey, lociv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return encrypted.toString('hex');

        } catch (error) {

            return undefined;
        }
    }

    // decrypt string using randomly generated key and iv
    decrypt(text) {
        if (!text) return ""; // Return empty string if text is empty, undefined, or null

        if (!this.#myKey || !this.#myIv)
            return; // Return undefined if the key or IV is not available

        try {
            let iv = Buffer.from(this.#myIv, 'hex');
            let key = Buffer.from(this.#myKey, 'hex');
            let encryptedText = Buffer.from(text, 'hex');

            let decipher = crypto.createDecipheriv(this.#algorithm, key, iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();

        } catch (error) {

            return undefined;
        }
    }
}

export default Encryption;


