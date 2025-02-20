import { hashString } from "./hashString";

export async function verifyString(storedHash: string, passwordAttempt: string): Promise<boolean> {
  try {
    // Split the stored hash into salt and original hash
    const [saltHex, originalHash] = storedHash.split(":");
    if (!saltHex || !originalHash) {
      throw new Error("Invalid stored hash format");
    }

    // Convert the salt from hex to Uint8Array
    const matchResult = saltHex.match(/.{1,2}/g);
    if (!matchResult) {
      throw new Error("Invalid salt format");
    }
    const salt = new Uint8Array(matchResult.map((byte) => parseInt(byte, 16)));

    // Hash the password attempt with the provided salt
    const attemptHashWithSalt = await hashString(passwordAttempt, salt);
    const [, attemptHash] = attemptHashWithSalt.split(":");

    // Compare the hashes
    return attemptHash === originalHash;
  } catch (error) {
    console.error("Error verifying string:", error);
    throw new Error("Verification failed");
  }
}
