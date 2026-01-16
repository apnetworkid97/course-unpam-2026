import {connectedStatus, disconnectedStatus} from "../utils/format.js";
async function connectWallet(statusEl, addressEl, balanceEl, networkEl, shortenAddress, formatAvaxBalance, AVALANCHE_FUJI_CHAIN_ID, connectBtn, disconnectBtn, identity, messageEl) {
  if (typeof window.ethereum === "undefined") {
    alert("Core Wallet tidak terdeteksi. Silakan install Core Wallet.");
    return;
  }
  // console.log("window.ethereum", window.ethereum);
  try {
    statusEl.textContent = "Connecting...";
    // Request wallet accounts
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    const accounts = await ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const address = accounts[0];
    addressEl.textContent = shortenAddress(address);
    // Get chainId
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    if (window.ethereum) {
      if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
        // Get AVAX balance
        const balanceWei = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        });
        balanceEl.textContent = formatAvaxBalance(balanceWei);
        connectedStatus(connectBtn, disconnectBtn, statusEl, networkEl, identity, messageEl);
        return;
      } else {
        networkEl.textContent = "Wrong Network ❌";
        statusEl.textContent = "Connection Failed ❌";
        messageEl.textContent = "Please switch to Avalanche Fuji";
        statusEl.style.color = "#fbc531";
        balanceEl.textContent = "-";
        const data = [(networkEl.textContent = "Wrong Network ❌")];
        setTimeout(() => {
          location.reload();
        }, 1000);
        return;
      }
    }
  } catch (error) {
    // console.error("Connected Wallet Error:", error);
    if (error.code === 4001) {
      statusEl.textContent = "Connection Failed ❌";
      messageEl.textContent = error.message;
      statusEl.style.color = "#e84118";
      return;
    }
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}
function disconnectWallet(addressEl, balanceEl, networkEl, identity, statusEl, connectBtn, disconnectBtn) {
  disconnectedStatus(addressEl, balanceEl, networkEl, identity, statusEl, connectBtn, disconnectBtn);
  return;
}
export {connectWallet, disconnectWallet};
