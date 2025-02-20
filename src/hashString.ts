export async function hashString(password: string, providedSalt?: number): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(providedSalt || 16));

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
