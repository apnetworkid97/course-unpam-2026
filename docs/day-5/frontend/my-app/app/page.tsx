'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useMounted } from '@/src/hooks/userMounted';
import { useBackendValue } from '@/src/hooks/useBackendValue';
import { useTransaction } from '@/src/hooks/useTransaction';
import { useAutoClearMessage } from '@/src/hooks/useAutoClearMessage';

import { WalletStatus } from '@/src/components/WalletStatus';
import { ReadValueCard } from '@/src/components/ReadValueCard';
import { WriteValueForm } from '@/src/components/WriteValueForm';
import { LayoutContainer } from '@/src/components/LayoutContainer';
import { PageHeader } from '@/src/components/PageHeader';

import { useEffect, useState } from 'react';
import { AlertMessage } from '@/src/components/AlertMessage';

export default function Page() {
  const mounted = useMounted();
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const [inputValue, setInputValue] = useState('');

  const {
    value,
    isReading,
    error: readError,
    fetchValue,
  } = useBackendValue(isConnected);

  const {
    setValue,
    isWriting,
    error: txError,
    success,
    clearMessage,
  } = useTransaction(chain?.id);

  useAutoClearMessage(txError || success, clearMessage);

  useEffect(() => {
    fetchValue();
  }, [fetchValue]);

  if (!mounted) return <p>Loading...</p>;

  return (
    <LayoutContainer>
      <PageHeader />

      <WalletStatus
        isConnected={isConnected}
        isConnecting={isConnecting}
        address={address}
        chain={chain}
        connect={connect}
        disconnect={disconnect}
      />

      <ReadValueCard
        value={value}
        isReading={isReading}
        onRefresh={fetchValue}
      />

      <WriteValueForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        isWriting={isWriting}
        disabled={!isConnected || !inputValue || isWriting}
        onSubmit={async () => {
          const ok = await setValue(inputValue);
          if (ok) {
            setInputValue('');
            await new Promise((r) => setTimeout(r, 5000));
            await fetchValue();
          }
        }}
      />

      {readError && (
        <AlertMessage type="error" message={readError} />
      )}

      {txError && (
        <AlertMessage type="error" message={txError} />
      )}

      {success && (
        <AlertMessage type="success" message={success} />
      )}
    </LayoutContainer>
  );
}
