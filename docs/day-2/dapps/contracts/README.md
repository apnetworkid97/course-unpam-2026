## 1.1 Setup Project

```bash
cd apps/contracts
npm install
```

Struktur:

```text
dapps/contracts/
├── contracts/
├── scripts/
├── test/
├── hardhat.config.ts
```

---

## 1.2 Smart Contract Pertama

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

## 1.3 Compile Contract

```bash
npx hardhat compile
```

Output:

- ABI
- Bytecode

📌 **ABI adalah jembatan antara frontend dan smart contract.**

---

## 1.4 Konfigurasi Avalanche Fuji

```ts
avalancheFuji: {
  url: "https://api.avax-test.network/ext/bc/C/rpc",
  accounts: [process.env.PRIVATE_KEY]
}
```

📌 Gunakan **private key Core Wallet (testnet)**.

---

## 1.5 Deploy Contract

```bash
npx hardhat run scripts/deployments.ts --network avalancheFuji
```

Catat:

- Contract address
- Transaction hash

---

## 1.6 Verifikasi di Explorer

- Buka Snowtrace / Avalanche Explorer
- Cari contract address
- Cek:

  - Transaction
  - Contract creation
  - Event log

> 📌 Sekarang smart contract **hidup di blockchain**.

---