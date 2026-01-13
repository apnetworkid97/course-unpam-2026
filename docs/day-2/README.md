# 📘 Day 2 – Smart Contract

## 📁 Repository Structure

```bash
day-2/                         # materi hari ke-2
│   └── dapps/
│       └── contracts/
│           ├── contracts/     # simple-storage.sol
│           ├── scripts/       # deployments.ts
│           ├── test/
│           ├── hardhat.config.ts
│           ├── README.md      # penjelasan modul day-2
```

---

### 1.1 Setup Project

```bash
cd dapps/contracts
npm install
```

---

### 1.2 Smart Contract Pertama

**`contracts/SimpleStorage.sol`**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    event ValueUpdated(uint256 newValue);

    function setValue(uint256 _value) public {
        storedValue = _value;
        emit ValueUpdated(_value);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
```

📌 Contract ini:

- Menyimpan 1 nilai integer
- Bisa di-update oleh siapa saja (sementara)

---

### 1.3 Compile Contract

```bash
npx hardhat compile
```

Output:

- ABI
- Bytecode

📌 **ABI adalah jembatan antara frontend dan smart contract.**

---

### 1.4 Konfigurasi Avalanche Fuji

```ts
avalancheFuji: {
  url: "https://api.avax-test.network/ext/bc/C/rpc",
  accounts: [process.env.PRIVATE_KEY]
}
```

📌 Gunakan **private key Core Wallet (testnet)**.

---

### 1.5 Deploy Contract

```bash
npx hardhat run scripts/deployments.ts --network avalancheFuji
```

Catat:

- Contract address
- Transaction hash

---

### 1.6 Verifikasi di Explorer

- Buka Snowtrace / Avalanche Explorer
- Cari contract address
- Cek:

  - Transaction
  - Contract creation
  - Event log

> 📌 Sekarang smart contract **hidup di blockchain**.

---

#### Testing via Terminal

```bash
npx hardhat console --network avalancheFuji
```

Akan muncul:
```text
Welcome to Node.js v24.12.0.
Type ".help" for more information.
>
```

```bash
const [walletClient] = await hre.viem.getWalletClients()
```

lalu enter

```bash
walletClient.account.address
```

lalu enter (maka akan muncul address Anda)

ubah 0xbxxxxxxxxxxxxxxxxxxx menjadi address Anda
```bash
const contract = await hre.viem.getContractAt(  "SimpleStorage",  "0xbxxxxxxxxxxxxxxxxxxx")
```
#### getValue
```bash
await contract.write.getValue()
```
#### setValue
```bash
await contract.write.setValue([123])
```
#### get contract owner
```bash
await contract.read.owner()
```

