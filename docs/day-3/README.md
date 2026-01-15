# 📘 Day 3 – Frontend dApp dengan Next.js (Avalanche)

## 📁 Repository Structure

```bash
day-3/                         # materi hari ke-3
│   └── dapps/
│       └── frontend/
│           └── my-app/
│           ├── app/            # layout.tsx, page.tsx, providers.tsx
│           ├── public/
│           ├── src/
│               └── contracts/  # address.ts
│                   └── abi/    # simpleStorage.ts
│           ├── next.config.ts
│           ├── README.md       # penjelasan modul day-3
```

## ENV EXAMPLE

```text
SIMPLE_STORAGE_ADDRESS="0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 1.1 Setup Frontend Project

```bash
cd dapps/frontend
npm install
npx create-next-app@latest
npm run dev
```

Akses:

```text
http://localhost:3000
```

---

## 1.2 Setup Reown Provider

Langkah umum:

- Buat WalletConnect Project ID
- Setup Reown provider
- Aktifkan Avalanche Fuji
- Bungkus Next.js app dengan provider

📌 Detail teknis dijelaskan saat demo live.

```bash

npm install wagmi viem @tanstack/react-query
npm install @walletconnect/ethereum-provider
```

create file provider.tsx

```bash
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const config = createConfig({
  chains: [avalancheFuji],
  transports: {
    [avalancheFuji.id]: http(),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

edit layout.tsx

```bash
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

edit @src/contracts/address.ts

```bash
export const SIMPLE_STORAGE_ADDRESS = "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
```

ubah 0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ke Address Anda

---

## 1.3 Connect Wallet (Core Wallet)

Demo mencakup:

- Tombol **Connect Wallet**
- Connect via Core Wallet
- Ambil wallet address
- Deteksi network (Fuji)

edit page.tsx on app folder

```bash
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded space-y-4">
        <h1 className="text-xl font-bold">Step 1: Connect Wallet</h1>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isPending}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {isPending ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm">Connected address:</p>
            <p className="font-mono text-xs break-all">{address}</p>

            <button
              onClick={() => disconnect()}
              className="text-sm underline text-red-600"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

```

---

## 1.4 Load Smart Contract

Data dari Day 2:

- Contract address
- ABI JSON

Frontend akan:

- Load ABI
- Membuat contract instance
- Siap melakukan read & write

📌 Library EVM: **ethers.js / viem**

---

## 1.5 Read Contract (Call)

Demo:

- Panggil `getValue()`
- Tampilkan value ke UI
- Tidak memicu wallet popup

---

## 1.6 Write Contract (Transaction)

Demo:

- Input value
- Panggil `setValue(uint256)`
- Wallet popup muncul
- Handle:

  - Loading
  - Success
  - Error / revert

---

## 1.7 Transaction UX Feedback

Ditampilkan:

- Transaction hash
- Status pending
- Status confirmed
- Error message jika gagal

---

## 🧪 Checklist

- [✅] Next.js app berjalan
- [✅] Wallet bisa connect
- [✅] Network Fuji terdeteksi
- [✅] Read contract berhasil
- [✅] Write contract berhasil
- [✅] Tx muncul di explorer

---
