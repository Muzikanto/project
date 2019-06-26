const crypto = require('crypto');

const key = crypto.createHash("sha256").update(process.env.CRYPTO_SECRET, "ascii").digest();

const salt = 'fhrqkr6h90g3mo4f';

function encriptString(str: string) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, salt);
    cipher.update(str, "ascii");
    return cipher.final("base64");
}

function decriptString(str: string) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, salt);
    decipher.update(str, "base64");
    return decipher.final("ascii");
}

export {encriptString, decriptString};
