# 📘 Day 5 – Integrasi & Deployment Full Stack dApp (Avalanche)

## 📁 Repository Structure

```bash
day-5/                                # materi hari ke-5
├── backend/
│   ├── helpers/                      # deployments.ts
│       └── src/
│           └── blockchain/           # main.ts
│               ├── clients/          # viem.client.ts
│               ├── constants/        # blockchain.constants.ts
│               ├── controller/       # blockchain.controller.spec.ts, blockchain.controller.ts
│               ├── dto/              # get-events.dto.ts
│               ├── errors/           # rpc-error.handler.ts
│               ├── modules/          # blockchain.module.ts
│               ├── services/         # blockchain.service.spec.ts, blockchain.service
│               └── simple-storage/   # simple-storage.abi.ts
│   └── .env
│
├── frontend/
│   ├── my-app/
│       ├── app/                      # globals.css, layout.tsx, page.tsx, providers.tsx
│       ├── node_modules/
│       └── src/
│           ├── components/           # AlertMessage.tsx, LayoutContainer.tsx, PageHeader.tsx, ReadValueCard.tsx, WalletStatus.tsx, WriteValueForm.tsx
│           ├── contracts/            # address.ts
│               └── abi/              # simpleStorage.ts
│           ├── hooks/                # useAutoClearMessage.ts, useBackendValue.ts, userMounted.ts, useTransaction.ts
│   └── .env
│
├── README.md                         # penjelasan modul day-5
```

---

### SETUP PROJECT

#### Backend

```bash
cd backend
npm i -g @nestjs/cli
nest new .
npm run start:dev
npm install viem
```

Akses API:

```bash
http://localhost:3001
```

#### Frontend

```bash
cd frontend
npx create-next-app@latest ./
npm run dev
```

Akses:

```bash
http://localhost:3000
```

---

### Contoh Environment Variable

#### Backend (`.env`)

```env
RPC_URL=https://api.avax-test.network/ext/bc/C/rpc
CONTRACT_ADDRESS=
PORT=3001
CHAIN_ID=43113
```

#### Frontend (`.env`)

```env
#FRONTEND
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_CONTRACT_ADDRESS=

```

---

### 🧪 Checklist Akhir

- [✅] Smart contract terdeploy
- [✅] Backend API live
- [✅] Frontend dapat diakses
- [✅] Wallet connect berhasil
- [✅] Read & write blockchain sukses
- [✅] Full flow berjalan end-to-end

---
