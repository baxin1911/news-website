import crypto from 'node:crypto';

const algorithm = 'aes-256-cbc';

export const encryptId = (id, key) => {
    const iv = crypto.randomBytes(16);
    const hashedKey = crypto.createHash('sha256').update(key).digest();
    const cipher = crypto.createCipheriv(algorithm, hashedKey, iv);
    let encrypted = cipher.update(id, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export const decryptId = (encryptedId, key) => {
    const parts = encryptedId.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const hashedKey = crypto.createHash('sha256').update(key).digest();
    const decipher = crypto.createDecipheriv(algorithm, hashedKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}