# 🔐 Hashless

**Hashless** is a lightweight and efficient hashing & verification library optimized for serverless environments like **AWS Lambda** and **Cloudflare Workers**.

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Technologies](#-technologies)
3. [Packages & Libraries Used](#-packages--libraries-used)
4. [Getting Started](#-getting-started)
5. [Setup](#-setup)
6. [Features](#-features)
7. [Demo & Screenshots](#-demo--screenshots)
8. [Acknowledgments](#-acknowledgments)
9. [License](#-license)

---

## 🌟 Overview

**Hashless** provides a simple and fast hashing and verification solution, making it ideal for **serverless applications** where performance and efficiency are crucial.

---

## 💻 Technologies

This project is built with:

| Technology     | Description                                      |
| -------------- | ------------------------------------------------ |
| **TypeScript** | Ensures type safety and performance optimization |

---

## 📦 Packages / Libraries Used

| Package / Library | Purpose                    |
| ----------------- | -------------------------- |
| `Crypto`          | Provides hashing utilities |

---

## 🚀 Getting Started

1. Install any IDEs (For eg. Visual Studio Code)
2. Install Node.js or Bun.js

---

## ⚙️ Setup

1. Clone the repositry
   ```bash
   git clone https://GitHub.com/Jenil-Desai/Hashless.git
   ```
2. Go to project directory
   ```bash
   cd Hashless
   ```
3. Install Dependencies
   ```bash
   bun install
   ```
4. Build the package
   ```
   bun run build
   ```

---

## 🎯 Features

1. **Hash String** - Securely hash any string input.

2. **Verify String** - Validate hashed values against their original input.

---

## 🔗 Demo & Screenshots

- **Example** -

  ```typescript
  import { hashString, verifyString } from "hashless";

  async function main() {
    // Original string
    let originalString: string = "some important texts";
    console.log(`Original String: ${originalString}`);

    // Hash the original string
    let hashedString: string = await hashString(originalString);
    console.log(`Hashed String: ${hashedString}`);

    // Verify the hashed string against the original string
    let isVerified: boolean = await verifyString(originalString, hashedString);
    console.log(`Verification Result: ${isVerified}`);
  }

  main().catch(console.error);
  ```

- [Download Now From npm](https://www.npmjs.com/package/hashless)

---

## 🙏 Acknowledgments

Special thanks to the following resource:

1. [Function Agents - Blog by Groff.dev](https://www.groff.dev/blog/function-agents)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

---

### 🔐 **Hash smarter, verify faster with Hashless!**
