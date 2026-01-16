function formatAvaxBalance(balanceWei) {
  if (!balanceWei) return "0.0000";
  const balance = parseInt(balanceWei, 16);
  // console.log({ balance });
  return (balance / 1e18).toFixed(4) + " AVAX";
}
function shortenAddress(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}
function connectedStatus(connectBtn, disconnectBtn, statusEl, networkEl, identity, messageEl) {
  connectBtn.disabled = true;
  connectBtn.style.opacity = "0.6";
  connectBtn.style.cursor = "not-allowed";
  statusEl.textContent = "Connected ✅";
  statusEl.style.color = "#4cd137";
  identity.textContent = "Aditya Agus Prakoso (241011450333)";
  networkEl.textContent = "Avalanche Fuji Testnet";
  disconnectBtn.disabled = false;
  disconnectBtn.style.opacity = "1";
  disconnectBtn.style.cursor = "pointer";
  messageEl.textContent = "-";
}
function disconnectedStatus(addressEl, balanceEl, networkEl, identity, statusEl, connectBtn, disconnectBtn) {
  addressEl.textContent = "-";
  balanceEl.textContent = "-";
  networkEl.textContent = "-";
  identity.textContent = "-";
  statusEl.textContent = "Disconnected ❌";
  statusEl.style.color = "#e84118";

  connectBtn.textContent = "Connect Wallet";
  connectBtn.disabled = false;
  connectBtn.style.opacity = "1";
  connectBtn.style.cursor = "pointer";

  disconnectBtn.disabled = true;
  disconnectBtn.style.opacity = "0.6";
  disconnectBtn.style.cursor = "not-allowed";
}
export {formatAvaxBalance, shortenAddress, connectedStatus, disconnectedStatus};
