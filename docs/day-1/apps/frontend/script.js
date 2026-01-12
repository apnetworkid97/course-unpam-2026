import {initAccountsChanged} from "./handlers/accountsChanged.js";
import {initChainChanged} from "./handlers/chainChanged.js";
import {connectWallet, disconnectWallet} from "./services/walletServices.js";
import {formatAvaxBalance, shortenAddress} from "./utils/format.js";
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const identity = document.getElementById("identity");
const messageEl = document.getElementById("message");
// Avalanche Fuji Testnet chainId (hex)
const AVALANCHE_FUJI_CHAIN_ID = "0xa869";
// const permissions = await ethereum.request({
//   method: "wallet_requestPermissions",
//   params: [
//     {
//       eth_accounts: {},
//     },
//   ],
// });
// console.log(permissions);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    disconnectWallet(addressEl, balanceEl, networkEl, identity, statusEl, connectBtn, disconnectBtn);
  }
});
connectBtn.addEventListener("click", () => {
  connectWallet(statusEl, addressEl, balanceEl, networkEl, shortenAddress, formatAvaxBalance, AVALANCHE_FUJI_CHAIN_ID, connectBtn, disconnectBtn, identity, messageEl);
});
//HOMEWORK
disconnectBtn.addEventListener("click", () => {
  disconnectWallet(addressEl, balanceEl, networkEl, identity, statusEl, connectBtn, disconnectBtn);
});
if (window.ethereum) {
  initAccountsChanged(connectBtn, disconnectBtn, addressEl, balanceEl, networkEl, statusEl, identity, shortenAddress, formatAvaxBalance, AVALANCHE_FUJI_CHAIN_ID, window.ethereum,messageEl);
  initChainChanged(networkEl, balanceEl, AVALANCHE_FUJI_CHAIN_ID, window.ethereum);
}

// ================= GLOBAL ERROR =================
window.addEventListener("error", () => {
  statusEl.textContent = "Unexpected error ❌";
});
