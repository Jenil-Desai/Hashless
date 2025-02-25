export async function hashString(password: string, providedSalt: Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(providedSalt);

  try {
    const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), { name: "PBKDF2" }, false, ["deriveBits", "deriveKey"]);

    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const hashBuffer = new Uint8Array(exportedKey);
    const hashHex = Array.from(hashBuffer)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const saltHex = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return `${saltHex}:${hashHex}`;
  } catch (error) {
    console.error("Error hashing string:", error);
    throw new Error("Hashing failed");
  }
}

export async function verifyString(plainText: string, hash: string): Promise<boolean> {
  try {
    // Split the stored hash into salt and original hash
    const [saltHex, originalHash] = hash.split(":");
    if (!saltHex || !originalHash) {
      throw new Error("Invalid stored hash format");
    }

    // Convert the salt from hex to Uint8Array
    const matches = saltHex.match(/.{1,2}/g);
    if (!matches) throw new Error("Invalid salt format");
    const salt = new Uint8Array(matches.map((byte) => parseInt(byte, 16)));

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
