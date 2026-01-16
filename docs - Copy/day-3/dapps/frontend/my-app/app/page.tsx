'use client';

import { SIMPLE_STORAGE_ABI } from '@/src/contracts/abi/simpleStorage';
import { USER_CONTRACT_ADDRESS } from '@/src/contracts/address';
import { useState,useEffect } from 'react';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { injected } from 'wagmi/connectors';
import { avalancheFuji } from 'wagmi/chains';

const CONTRACT_ADDRESS = USER_CONTRACT_ADDRESS;
const SS_ABI = SIMPLE_STORAGE_ABI;

export default function Page() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting,error: connectError, } = useConnect();
  const { disconnect } = useDisconnect();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
  if (!error && !success) return;

  const timer = setTimeout(() => {
    setError(null);
    setSuccess(null);
  }, 5000);

  return () => clearTimeout(timer);
  }, [error, success]);
  useEffect(() => {
  if (!connectError) return;

  console.log('CONNECT ERROR:', connectError);

  if (
    connectError?.name === 'UserRejectedRequestError'
  ) {
    setError('Wallet connection rejected');
  } else {
    setError('Failed to connect wallet');
  }
}, [connectError]);

  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: SS_ABI,
    functionName: 'getValue',
    chainId: avalancheFuji.id,
  });

  const {
    writeContractAsync,
    isPending: isWriting,
  } = useWriteContract();

  const handleSetValue = async () => {
  setError(null);
  setSuccess(null);

  if (!inputValue.trim()) {
    setError('Value tidak boleh kosong');
    return;
  }

  const numericValue = Number(inputValue);

  if (isNaN(numericValue)) {
    setError('Value harus berupa angka');
    return;
  }

  if (numericValue < 0) {
    setError('Value tidak boleh negatif');
    return;
  }

  if (chain?.id !== avalancheFuji.id) {
    setError('Wrong network. Please switch to Avalanche Fuji.');
    return;
  }

  try {
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: SS_ABI,
      functionName: 'setValue',
      args: [BigInt(numericValue)],
    });

    setSuccess('Transaction success!');
    setInputValue('');
    refetch();
  } catch (err: any) {
    if (err?.code === 4001) {
      setError('Transaction rejected by user');
    } else {
      setError('Transaction failed');
    }
  }
};

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6 shadow-lg">

        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Frontend dApp dengan Next.js</h1>
          <p className="text-sm text-gray-400">Day 3 – Avalanche</p>
        </div>
        {/* WALLET STATUS */}
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-gray-300">
            {isConnected ? 'Wallet Connected' : 'Wallet Not Connected'}
          </span>
        </div>
        {/* WALLET */}
        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
            className="w-full bg-white text-black py-2 rounded-lg font-semibold"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        ) : (
          <div className="bg-black border border-gray-700 rounded-lg p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Wallet</span>
              <span className="font-mono">{shortAddress}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Network</span>
              <span
                className={`font-semibold ${
                  chain?.id === avalancheFuji.id
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {chain?.name ?? 'Unknown'}
              </span>
            </div>

            <button
              onClick={() => disconnect()}
              className="text-red-400 text-xs underline pt-1"
            >
              Disconnect
            </button>
          </div>
        )}

        {/* READ */}
        <div className="bg-black border border-gray-700 rounded-lg p-4 text-center space-y-2">
          <p className="text-gray-400 text-sm">Stored Value</p>

          {isReading ? (
            <p className="text-lg">Loading...</p>
          ) : (
            <p className="text-4xl font-bold text-blue-400">
              {value?.toString()}
            </p>
          )}

          <button
            onClick={() => refetch()}
            className="text-xs underline text-gray-400"
          >
            Refresh
          </button>
        </div>

        {/* WRITE */}
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Enter new value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSetValue}
            disabled={isWriting || !isConnected || !inputValue.trim()}
            className="w-full bg-blue-600 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {isWriting ? 'Transaction pending...' : 'Set Value'}
          </button>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded p-2 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/40 border border-green-700 rounded p-2 text-sm text-green-300">
              {success}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500 pt-2">
          Aditya Agus Prakoso - 241011450333
        </p>
      </div>
    </main>
  );
}
