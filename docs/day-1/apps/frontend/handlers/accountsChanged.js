import {connectedStatus} from "../utils/format.js";
export function initAccountsChanged(connectBtn, disconnectBtn, addressEl, balanceEl, networkEl, statusEl, identity, shortenAddress, formatAvaxBalance, AVALANCHE_FUJI_CHAIN_ID, ethereum, messageEl) {
  // if (!window.ethereum) return;

  ethereum.on("accountsChanged", async (accounts) => {
    // console.log("Accounts changed:", accounts);
    if (accounts.length === 0) {
      statusEl.textContent = "Wallet disconnected";
      addressEl.textContent = "-";
      balanceEl.textContent = "-";
      networkEl.textContent = "-";

      connectBtn.disabled = false;
      connectBtn.textContent = "Connect Wallet";
      connectBtn.style.opacity = "1";
      return;
    }

    const address = accounts[0];
    addressEl.textContent = shortenAddress(address);

    const chainId = await ethereum.request({
      method: "eth_chainId",
    });

    if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
      const balanceWei = await ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      balanceEl.textContent = formatAvaxBalance(balanceWei);
      // networkEl.textContent = "Avalanche Fuji Testnet";
      // statusEl.textContent = "Connected ✅";
      connectedStatus(connectBtn, disconnectBtn, statusEl, networkEl, identity, messageEl);
    } else {
      networkEl.textContent = "Wrong Network ❌";
      balanceEl.textContent = "-";
    }
  });
}
