import { hashString } from "./hashString";

export async function verifyString(plainText: string, hash: string): Promise<boolean> {
  try {
    // Split the stored hash into salt and original hash
    const [saltHex, originalHash] = hash.split(":");
    if (!saltHex || !originalHash) {
      throw new Error("Invalid stored hash format");
    }

    // Convert the salt from hex to number
    const salt = parseInt(saltHex, 16);
    if (isNaN(salt)) {
      throw new Error("Invalid salt format");
    }

    // Hash the password attempt with the provided salt
    const attemptHashWithSalt = await hashString(plainText, salt);
    const [, attemptHash] = attemptHashWithSalt.split(":");

    // Compare the hashes
    return attemptHash === originalHash;
  } catch (error) {
    console.error("Error verifying string:", error);
    throw new Error("Verification failed");
  }
}
