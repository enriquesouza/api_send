require('dotenv').config();
const crypto = require('crypto');
module.exports = function decrypt(textToDecrypt) {
    let decipher = crypto.createDecipher('aes-128-ecb', process.env.ENCRYPTION_KEY);
    return decipher.update(textToDecrypt, 'base64', 'utf8') + decipher.final('utf8');
}