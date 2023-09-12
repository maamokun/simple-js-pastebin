const { QuickDB, JSONDriver } = require("quick.db");
const jsonDriver = new JSONDriver();
const db = new QuickDB({ driver: jsonDriver });
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
module.exports = {
    getAndDecrypt: function (key, id) {
        const realKey = Buffer.from(key, 'base64').toString('ascii');
        const iv = crypto.randomBytes(16);
        const encrypted = db.get(id);
        const decipher = crypto.createDecipheriv(algorithm, realKey, iv);
        const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    },
    encrypt: function (data) {
        const iv = crypto.randomBytes(16);
        const key = crypto.randomBytes(32);
        const id = crypto.randomUUID();
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
        db.set(id, encrypted);
        const readableKey = Buffer.from(key).toString('base64');
        return { id, readableKey };
    }
}




