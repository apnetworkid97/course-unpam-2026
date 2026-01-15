# 📘 Day 4 – Backend API dengan NestJS (Avalanche)

---

# 📁 Repository Structure

```bash
day-4/                                                # materi hari ke-4
│   └── dapps/
│       └── backend/
│           └── helpers/                              # deployments.ts
│           ├── public/
│           ├── src/                                  # main.ts
│               └── blockchain/                       # blockchain.service.ts, blockchain.controller.ts
│                   ├── clients/                      # viem.client.ts
│                   ├── constants/                    # blockchain.constants.ts
│                   ├── dto/                          # get-events.dto.ts
│                   ├── errors/                       # rpc-error.handler.ts
│                   └── simple-storage/               # simple-storage.abi.ts
│           ├── README.md                             # penjelasan modul day-4
```

---

# ENV EXAMPLE

```text
CONTRACT_ADDRESS="0xxxxxxxxxxxxxxxxxxxxxxxx"
SWAGGER_PORT=3000
```

---

## 1.1 Setup Backend Project

```bash
cd dapps/backend
```

```bash
npm i -g @nestjs/cli
```

```bash
nest new backend
```

```bash
npm run start:dev
```

Akses API:

```text
http://localhost:3000
```

---

## 1.2 Setup viem Public Client

```bash
npm install viem
```

Backend akan:

- Terhubung ke Avalanche Fuji RPC
- Membuat `publicClient`
- Digunakan oleh service

📌 Tidak memerlukan wallet atau private key.

---

## 1.3 Load Smart Contract

Menggunakan data dari Day 2:

- Contract address
- ABI JSON

Backend akan:

- Load ABI
- Konfigurasi contract
- Siap melakukan read-only call

---

## 1.4 API: Read Contract State

Contoh endpoint:

```http
GET /blockchain/value
```

Contoh response:

```json
[
  {
    "blockNumber": "12345678",
    "value": "60",
    "txHash": "0xxxxxxxxxxxxxxxxxxxxxx"
  },
  {
    "blockNumber": "12345679",
    "value": "60",
    "txHash": "0xxxxxxxxxxxx"
  }
]
```

📌 Frontend tidak perlu call blockchain langsung.

---

## 1.5 API: Fetch Event History

Demo:

- Fetch event `ValueUpdated`
- Gunakan block range
- Return list event untuk activity log UI

📌 Best practice:

- Jangan fetch dari block 0 setiap request
- Gunakan pagination / block range

---

Buat `src/blockchain/blockchain.service.ts`

```ts
import {Injectable} from "@nestjs/common";
import {createPublicClient, http} from "viem";
import {avalancheFuji} from "viem/chains";
import {SIMPLE_STORAGE_ABI} from "./simple-storage.abi";

@Injectable()
export class BlockchainService {
  private client;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
    });

    // GANTI dengan address hasil deploy Day 2
    this.contractAddress = "0xYOUR_CONTRACT_ADDRESS";
  }

  // 🔹 Read latest value
  async getLatestValue() {
    const value = await this.client.readContract({
      address: this.contractAddress,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "getValue",
    });

    return {
      value: value.toString(),
    };
  }

  // 🔹 Read ValueUpdated events
  async getValueUpdatedEvents() {
    const events = await this.client.getLogs({
      address: this.contractAddress,
      event: {
        type: "event",
        name: "ValueUpdated",
        inputs: [
          {
            name: "newValue",
            type: "uint256",
            indexed: false,
          },
        ],
      },
      fromBlock: 50501464, // speaker demo (jelaskan ini anti-pattern)
      toBlock: "latest",
    });

    return events.map((event) => ({
      blockNumber: event.blockNumber?.toString(),
      value: event.args.newValue.toString(),
      txHash: event.transactionHash,
    }));
  }
}
```

Buat `src/blockchain/blockchain.controller.ts`

```ts
import {Controller, Get} from "@nestjs/common";
import {BlockchainService} from "./blockchain.service";

@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  // GET /blockchain/value
  @Get("value")
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  // GET /blockchain/events
  @Get("events")
  async getEvents() {
    return this.blockchainService.getValueUpdatedEvents();
  }
}
```

---

## 1.6 Error Handling & RPC Failure

Dibahas:

- RPC timeout
- Network error
- Graceful fallback & error response

---

Code with RPC error handling

```ts
import {Injectable, InternalServerErrorException, ServiceUnavailableException} from "@nestjs/common";
import {createPublicClient, http} from "viem";
import {avalancheFuji} from "viem/chains";
import {SIMPLE_STORAGE_ABI} from "./simple-storage.abi";

@Injectable()
export class BlockchainService {
  private client;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http("https://api.avax-test.network/ext/bc/C/rpc", {
        timeout: 10_000, // 10 detik timeout
      }),
    });

    this.contractAddress = "0xYOUR_CONTRACT_ADDRESS";
  }

  // 🔹 Read latest value
  async getLatestValue() {
    try {
      const value = await this.client.readContract({
        address: this.contractAddress,
        abi: SIMPLE_STORAGE_ABI,
        functionName: "getValue",
      });

      return {
        value: value.toString(),
      };
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  // 🔹 Read events
  async getValueUpdatedEvents() {
    try {
      const events = await this.client.getLogs({
        address: this.contractAddress,
        event: {
          type: "event",
          name: "ValueUpdated",
          inputs: [{name: "newValue", type: "uint256", indexed: false}],
        },
        fromBlock: 0n,
        toBlock: "latest",
      });

      return events.map((event) => ({
        blockNumber: event.blockNumber?.toString(),
        value: event.args.newValue.toString(),
        txHash: event.transactionHash,
      }));
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  // 🔹 Centralized RPC Error Handler
  private handleRpcError(error: any): never {
    const message = error?.message?.toLowerCase() || "";
    console.log({error: message});
    if (message.includes("timeout")) {
      throw new ServiceUnavailableException("RPC timeout. Silakan coba beberapa saat lagi.");
    }

    if (message.includes("network") || message.includes("fetch") || message.includes("failed")) {
      throw new ServiceUnavailableException("Tidak dapat terhubung ke blockchain RPC.");
    }

    throw new InternalServerErrorException("Terjadi kesalahan saat membaca data blockchain.");
  }
}
```

Contoh Response Error ke Frontend
RPC Timeout

```text
{
  "statusCode": 503,
  "message": "RPC timeout. Silakan coba beberapa saat lagi.",
  "error": "Service Unavailable"
}
```

Network Error

```text
{
  "statusCode": 503,
  "message": "Tidak dapat terhubung ke blockchain RPC.",
  "error": "Service Unavailable"
}
```

Unknown Error

```text
{
  "statusCode": 500,
  "message": "Terjadi kesalahan saat membaca data blockchain.",
  "error": "Internal Server Error"
}
```

---

## 🧪 Checklist

- [✅] Backend NestJS berjalan
- [✅] viem terhubung ke Fuji RPC
- [✅] API bisa read contract
- [✅] Event bisa di-fetch
- [✅] Frontend bisa consume API

---

## ✅ Output Day 4

Pada akhir Day 4, peserta:

- Memiliki backend API aktif
- Bisa membaca data blockchain via REST API
- Memahami:

  - Backend Web3 ≠ Backend Web2
  - On-chain vs off-chain responsibility
  - Peran backend dalam UX dApp
  - viem sebagai bridge ke blockchain

---
