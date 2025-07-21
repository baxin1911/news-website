import { config } from 'dotenv';

config();

export const encryptionKey = process.env.ENCRYPTION_KEY;