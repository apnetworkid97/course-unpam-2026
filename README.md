# 🚀 Avalanche Full Stack dApp – Short Course at Pamulang University

Saya ucapkan terima kasih kepada Allah Swt dan juga kepada:

- Bpk Septian Maulana - [https://www.linkedin.com/in/septian-maulana/](https://www.linkedin.com/in/septian-maulana/)
- Kak Adel Aulia - [https://www.linkedin.com/in/adelauliaw/](https://www.linkedin.com/in/adelauliaw/)

selaku mentor saya dalam membangun aplikasi ini.

Project ini dibuat untuk memenuhi tugas Short Course Online sebagai salah satu syarat dalam lulus Short Course yang diadakan oleh UNIVERSITAS PAMULANG.

## 📁 All Repository Structure

```bash
docs/
├── day-1/                               # materi hari ke-1
│   └── apps/
│       └── frontend/
│           ├── index.html
│           ├── script.js
│           ├── style.css
│           ├── services/                # walletServices.js
│           ├── handlers/                # accountsChanged.js, chainChanged.js
│           ├── utils/                   # format.js
│           ├── README.md                # penjelasan modul day-1
│
├── day-2/                               # materi hari ke-2
│   └── dapps/
│       └── contracts/
│           ├── contracts/               # simple-storage.sol
│           ├── scripts/                 # deployments.ts
│           ├── test/
│           ├── hardhat.config.ts
│           ├── README.md                # penjelasan modul day-2
│
├── day-3/                               # materi hari ke-3
│   └── dapps/
│       └── frontend/
│           └── my-app/
│           ├── app/                     # layout.tsx, page.tsx, providers.tsx
│           ├── public/
│           ├── src/
│               └── contracts/           # address.ts
│                   └── abi/             # simpleStorage.ts
│           ├── next.config.ts
│           ├── README.md                # penjelasan modul day-3
│
├── day-4/                               # materi hari ke-4
│   └── dapps/
│       └── backend/
│           └── helpers/                 # deployments.ts
│           ├── public/
│           ├── src/                     # main.ts
│               └── blockchain/          # blockchain.service.ts, blockchain.controller.ts
│                   ├── clients/         # viem.client.ts
│                   ├── constants/       # blockchain.constants.ts
│                   ├── dto/             # get-events.dto.ts
│                   ├── errors/          # rpc-error.handler.ts
│                   └── simple-storage/  # simple-storage.abi.ts
│           ├── README.md                # penjelasan modul day-4
│
├── day-5/                               # materi hari ke-5
│   └── backend/
│       └── src/                         # main.ts
│           └── blockchain/              # blockchain.controller.ts, blockchain.service.ts
│               ├── clients/             # viem.client.ts
│               ├── constants/           # blockchain.constants.ts
│               ├── dto/                 # get-events.dto.ts
│               ├── errors/              # rpc-error.handler.ts
│               └── simple-storage/      # simple-storage.abi.ts
│       └── .env
│
│   ├── frontend/
│       ├── my-app/
│           ├── app/                     # globals.css, layout.tsx, page.tsx, providers.tsx
│           ├── node_modules/
│           └── src/
│               ├── components/          # AlertMessage.tsx, LayoutContainer.tsx, PageHeader.tsx, ReadValueCard.tsx, WalletStatus.tsx, WriteValueForm.tsx
│               ├── contracts/           # address.ts
│               └── abi/                 # simpleStorage.ts
│               └── hooks/               # useAutoClearMessage.ts, useBackendValue.ts, userMounted.ts, useTransaction.ts
│       └── .env
│   └── README.md                        # penjelasan modul day-5
│
└── README.md                            # penjelasan modul
```

---

### Clone Repository

```bash
git clone https://github.com/apnetworkid97/course-unpam-2026.git
```

---

## 📚 Referensi

- NextJS: [https://nextjs.org/](https://nextjs.org/)
- viem: [https://viem.sh/](https://viem.sh/)
- NestJS Docs: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- Avalanche Academy: [https://build.avax.network/academy](https://build.avax.network/academy)
- Github Short Course: [https://github.com/apnetworkid97/pamulang-university-short-course.git](https://github.com/apnetworkid97/pamulang-university-short-course.git)

---

## 📄 License

MIT License

---

Happy building on Avalanche 🚀
