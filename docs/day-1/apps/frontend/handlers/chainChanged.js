export function initChainChanged(networkEl, balanceEl, AVALANCHE_FUJI_CHAIN_ID, ethereum) {
  if (!ethereum) return;
  ethereum.on("chainChanged", async (chainId) => {
    console.log("Chain changed to:", chainId);
    if (chainId !== AVALANCHE_FUJI_CHAIN_ID) {
      networkEl.textContent = "Wrong Network ❌";
      statusEl.textContent = "Please switch to Avalanche Fuji";
      statusEl.style.color = "#fbc531";
      balanceEl.textContent = "-";
      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    } else {
      networkEl.textContent = "Avalanche Fuji Testnet";
      statusEl.textContent = "Network OK ✅";
      statusEl.style.color = "#4cd137";
    }
  });
}
