import crypto from 'crypto';

const algorithm = 'aes-256-gcm';

export const encrypt = (text) => {
  const key = Buffer.from(process.env.MONGODB_ENCRYPTION_KEY, 'base64');
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

export const decrypt = (encrypted, iv, authTag) => {
  const key = Buffer.from(process.env.MONGODB_ENCRYPTION_KEY, 'base64');
  const decipher = crypto.createDecipheriv(
    algorithm, 
    key, 
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};