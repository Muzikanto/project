const passwordGenerator = require("password-generator");
const crypto = require('crypto');

const key = crypto.createHash("sha256").update(process.env.CRYPTO_SECRET, "ascii").digest();

function hashedPassword(password?: string) {
    const salt = passwordGenerator(16, false);

    return {
        hashed_password: encriptString(password || passwordGenerator(10, false), salt),
        salt,
    }
}

function generatePassword() {
    return passwordGenerator(10, false);
}

function encriptString(str: string, salt: string) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, salt);
    cipher.update(str, "ascii");
    return cipher.final("base64");
}

function decriptString(str: string, salt: string) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, salt);
    decipher.update(str, "base64");
    return decipher.final("ascii");
}

export {encriptString, decriptString, hashedPassword, generatePassword};
