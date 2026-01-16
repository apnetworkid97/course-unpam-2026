import { injected } from 'wagmi/connectors';
import { avalancheFuji } from 'wagmi/chains';

export function WalletStatus({
  isConnected,
  isConnecting,
  address,
  chain,
  connect,
  disconnect,
}: any) {
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (!isConnected) {
    return (
      <button
        onClick={() => connect({ connector: injected() })}
        disabled={isConnecting}
        className="w-full bg-white text-black py-2 rounded-lg font-semibold"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-3 text-sm space-y-1">
      <div className="flex justify-between">
        <span className="text-gray-400">Wallet</span>
        <span className="font-mono">{shortAddress}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Network</span>
        <span
          className={
            chain?.id === avalancheFuji.id
              ? 'text-green-400'
              : 'text-red-400'
          }
        >
          {chain?.name}
        </span>
      </div>
      <button
        onClick={disconnect}
        className="text-red-400 text-xs underline"
      >
        Disconnect
      </button>
    </div>
  );
}
