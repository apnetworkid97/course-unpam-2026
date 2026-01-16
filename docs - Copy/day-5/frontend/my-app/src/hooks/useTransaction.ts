import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { avalancheFuji } from 'wagmi/chains';
import { USER_ABI } from '@/src/contracts/abi/simpleStorage';
import { USER_CONTRACT_ADDRESS } from '@/src/contracts/address';

export function useTransaction(chainId?: number) {
  const { writeContractAsync, isPending } = useWriteContract();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const setValue = async (value: string): Promise<boolean> => {
    if (isPending) return false;

    setError(null);
    setSuccess(null);

    const numericValue = Number(value);

    if (!value.trim()) return setError('Value tidak boleh kosong'), false;
    if (isNaN(numericValue)) return setError('Value harus berupa angka'), false;
    if (numericValue <= 0)
      return setError('Value harus lebih dari 0'), false;
    if (chainId !== avalancheFuji.id)
      return setError('Wrong network. Please switch to Avalanche Fuji.'), false;

    try {
      await writeContractAsync({
        address: USER_CONTRACT_ADDRESS,
        abi: USER_ABI,
        functionName: 'setValue',
        args: [BigInt(numericValue)],
      });

      setSuccess('Transaction success!');
      return true;
    } catch (err: any) {
      setError(
        err?.code === 4001
          ? 'Transaction rejected by user'
          : 'Transaction failed'
      );
      return false;
    }
  };

  return {
    setValue,
    isWriting: isPending,
    error,
    success,
    clearMessage: () => {
      setError(null);
      setSuccess(null);
    },
  };
}
