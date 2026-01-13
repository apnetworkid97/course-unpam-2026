# 📘 Day 2 – Smart Contract Fundamentals & Solidity (Avalanche)

> Avalanche Indonesia Short Course – **Day 2**

Hari kedua difokuskan pada **Smart Contract Layer**: bagaimana logic dan state dApp hidup di blockchain, bukan di backend server.

---

## 🎯 Tujuan Pembelajaran

Pada akhir sesi Day 2, peserta mampu:

- Memahami peran smart contract dalam arsitektur dApp
- Memahami **mental model smart contract** (Web2 → Web3)
- Menulis smart contract sederhana dengan Solidity
- Menggunakan **Hardhat** sebagai development environment
- Compile & deploy smart contract
- Deploy smart contract ke **Avalanche Fuji Testnet**
- Memverifikasi contract melalui block explorer
- Memahami hubungan **Frontend ↔ Wallet ↔ Smart Contract**

---

## 🧩 Studi Kasus

### Avalanche Simple Full Stack dApp – Smart Contract Layer

Smart contract pada Day 2 berfungsi sebagai:

- Penyimpan data di blockchain
- **Single source of truth**
- Logic inti aplikasi

📌 Contract ini akan digunakan kembali pada:

- **Day 3 – Frontend Integration**
- **Day 5 – Full Integration**

---

## ⏱️ Struktur Sesi (± 3 Jam)

| Sesi    | Durasi | Aktivitas                        |
| ------- | ------ | -------------------------------- |
| Theory  | 1 Jam  | Konsep smart contract & Solidity |
| Demo    | 1 Jam  | Setup Hardhat & deploy contract  |
| Praktik | 1 Jam  | Modifikasi & deploy mandiri      |

---

# 1️⃣ Theory

## 1.1 Apa itu Smart Contract?

Smart contract adalah **program yang berjalan di blockchain** dan memiliki karakteristik:

- Menyimpan state
- Mengeksekusi logic
- **Immutable** (tidak bisa diubah setelah deploy)

📌 Smart contract **bukan backend server**.

---

## 1.2 Mental Model Smart Contract (Wajib Dipahami)

```text
User (wallet + gas)
  ↓ sign
Frontend (UI only)
  ↓ request
Wallet (Core)
  ↓ transaction
Smart Contract (logic & state)
  ↓
Blockchain (Avalanche C-Chain)
```

🔑 Catatan penting:

- Frontend **tidak menyimpan state penting**
- Frontend **tidak menjalankan logic bisnis**
- Wallet bertugas:

  - Menandatangani transaksi
  - Mengirim transaksi ke blockchain

---

## 1.2.a Smart Contract ≠ Backend API

Smart contract **bukan REST API**.

| Backend Web2         | Smart Contract Web3           |
| -------------------- | ----------------------------- |
| Bisa dipanggil bebas | Write perlu wallet signature  |
| Response instan      | Tergantung block confirmation |
| Retry otomatis       | Tx gagal → gas tetap terpakai |
| Server bayar cost    | User bayar gas                |

📌 UX Web3 **berbeda secara fundamental** dengan Web2.

---

## 1.3 Smart Contract vs Backend Tradisional

| Backend Tradisional | Smart Contract      |
| ------------------- | ------------------- |
| Mutable             | Immutable           |
| Terpusat            | Terdesentralisasi   |
| Trust ke operator   | Trust ke code       |
| Bisa rollback       | Tidak bisa rollback |

---

## 1.4 Solidity Basics

Konsep dasar Solidity:

- `contract` → blueprint program
- `state variable` → data di blockchain
- `function` → logic
- `view / pure` → read-only
- `event` → log transaksi

Contoh:

```solidity
contract Storage {
    uint256 value;
}
```

📌 `value` disimpan di **blockchain**, bukan di browser.

---

## 1.4.a `msg.sender` & Ownership

```solidity
address public owner;

constructor() {
    owner = msg.sender;
}
```

📌 Penjelasan:

- `msg.sender` = wallet yang menandatangani transaksi
- Saat deploy, deployer otomatis menjadi `owner`
- Wallet = **identity** (tanpa login/password)

---

## 1.5 Read vs Write

| Read (Call)           | Write (Transaction) |
| --------------------- | ------------------- |
| Tidak pakai gas       | Pakai gas           |
| Tidak ubah state      | Mengubah state      |
| Tidak perlu signature | Perlu wallet        |

---

## 1.5.a Gas & Failure Model

Transaksi blockchain:

| Status  | State         | Gas               |
| ------- | ------------- | ----------------- |
| Success | Berubah       | Terpakai          |
| Revert  | Tidak berubah | ❌ Tetap terpakai |

Contoh:

```solidity
require(_value > 0, "Value must be > 0");
```

📌 Validasi penting untuk UX.

---

## 1.6 Hardhat Overview

Hardhat adalah:

- Development environment Solidity
- Compiler
- Tool deployment & testing

Kenapa Hardhat?

- Populer di industri
- Cocok untuk Avalanche (EVM)

---

## 2️⃣ Demo (1 Jam)

## 2.1 Setup Project

```bash
cd apps/contracts
npm install
```

Struktur:

```text
apps/contracts/
├── contracts/
├── scripts/
├── test/
├── hardhat.config.ts
```

---

## 2.2 Smart Contract Pertama

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

## 2.3 Compile Contract

```bash
npx hardhat compile
```

Output:

- ABI
- Bytecode

📌 **ABI adalah jembatan antara frontend dan smart contract.**

---

## 2.4 Konfigurasi Avalanche Fuji

```ts
fuji: {
  url: "https://api.avax-test.network/ext/bc/C/rpc",
  accounts: [process.env.PRIVATE_KEY]
}
```

📌 Gunakan **private key Core Wallet (testnet)**.

---

## 2.5 Deploy Contract

```bash
npx hardhat run scripts/deploy.ts --network fuji
```

Catat:

- Contract address
- Transaction hash

---

## 2.6 Verifikasi di Explorer

- Buka Snowtrace / Avalanche Explorer
- Cari contract address
- Cek:

  - Transaction
  - Contract creation
  - Event log

> 📌 Sekarang smart contract **hidup di blockchain**.

---

## 3️⃣ Praktik / Homework (1 Jam)

### 🎯 Objective Praktik

Peserta mampu **memodifikasi dan deploy smart contract secara mandiri**.

---

## 3.1 Task 1 – Ownership

Pastikan contract memiliki:

- `owner`
- Event `OwnerSet`

---

## 3.2 Task 2 – Event Validation

Pastikan:

- `OwnerSet` muncul saat deploy
- `ValueUpdated` muncul saat set value

---

## 3.3 Task 3 – Deploy Ulang

- Compile ulang
- Deploy ulang ke Fuji 
- Simpan:

  - Contract address
  - ABI JSON

📌 Data ini WAJIB untuk Day 3.

---

## 🌟 Task 4 – (Optional / Advanced) Access Control

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

Gunakan pada `setValue`.

---

## 🧪 Checklist

- [ ] Contract berhasil compile
- [ ] Contract berhasil deploy
- [ ] Address tersimpan
- [ ] ABI tersedia
- [ ] Event terlihat di explorer

---

## ✅ Output Day 2

- Smart contract aktif di Fuji Testnet
- Peserta memahami:

  - Smart contract ≠ backend
  - Wallet = identity
  - Gas & failure model

- Contract siap diintegrasikan ke frontend

---

## 🚀 Preview Day 3

Day 3 fokus pada **Frontend Integration**:

- Next.js sebagai frontend
- Load ABI & contract address
- Read data (`call`)
- Write data (`transaction` via Core Wallet)
- Handle tx success & failure

---

## 📚 Referensi

- Solidity Docs: [https://docs.soliditylang.org](https://docs.soliditylang.org)
- Hardhat Docs: [https://hardhat.org](https://hardhat.org)
- Avalanche Academy: [https://build.avax.network/academy](https://build.avax.network/academy)

---

🔥 **Smart contract deployed!**
Besok kita mulai menghubungkan **frontend ↔ wallet ↔ blockchain** 🚀
