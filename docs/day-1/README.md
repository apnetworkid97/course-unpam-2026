# 📘 Day 1 – Blockchain & Avalanche

## 📁 Repository Structure

```bash
day-1/                         # materi hari ke-1
│   └── apps/
│       └── frontend/
│           ├── index.html
│           ├── script.js
│           ├── style.css
│           ├── services/      # walletServices.js
│           ├── handlers/      # accountsChanged.js, chainChanged.js
│           ├── utils/         # format.js
│           ├── README.md      # penjelasan modul day-1
```

### 1.1 Install Core Wallet

1. Buka [https://core.app/](https://core.app/)
2. Install Core Wallet Extension
3. Buat wallet baru
4. Simpan seed phrase dengan aman

---

### 1.2 Aktifkan Avalanche Fuji Testnet

- Buka Core Wallet → Settings
- Aktifkan **Fuji Testnet**

Alternatif:

- Chainlist
- Manual configuration:

```bash
Network Name: Avalanche Fuji C-Chain
Chain ID: 43113 (0xA869)
Currency: AVAX
RPC URL: https://api.avax-test.network/ext/bc/C/rpc
Explorer: https://subnets-test.avax.network/c-chain
```

---

### 1.3 Mendapatkan AVAX Testnet

1. Sign in ke [Avalanche Builder Hub](https://build.avax.network/login)
2. Buka menu [Testnet Faucet](https://build.avax.network/console/primary-network/faucet)
3. Ikuti instruksi
4. Claim AVAX testnet

---

### 1.4 Clone & Jalankan Template Frontend

```bash
git clone https://github.com/avalanche-indonesia/pamulang-university-short-course.git
cd pamulang-university-short-course/apps/frontend
npx serve .
```

Akses:

```bash
http://localhost:3000
```

---

### 1.5 Demo Connect Wallet

Yang didemokan:

- Button **Connect Wallet**
- Request wallet access
- Ambil wallet address
- Deteksi `chainId`
- Validasi Avalanche Fuji network

📌 **Catatan teknis ringan:**

- `window.ethereum` → provider dari wallet
- Hari ini kita **belum pakai RPC langsung**

---

### 1.6 Common Errors (Demo Cepat)

- Wallet belum unlock
- User reject request
- Wrong network
- Wallet belum terinstall

---
