import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const ALGORITHM = "aes-256-gcm";

function getKeyBuffer(): Buffer {
  // ENCRYPTION_KEY should be 64 hex chars = 32 bytes
  return Buffer.from(ENCRYPTION_KEY, "hex");
}

export function encrypt(text: string): string {
  const iv = randomBytes(12); // 96-bit IV for GCM
  const key = getKeyBuffer();
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // Format: iv:authTag:encryptedData (all hex)
  return [iv.toString("hex"), authTag.toString("hex"), encrypted.toString("hex")].join(":");
}

export function decrypt(encryptedData: string): string {
  const [ivHex, authTagHex, dataHex] = encryptedData.split(":");
  const key = getKeyBuffer();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(dataHex, "hex");

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}
