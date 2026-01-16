type AlertType = 'error' | 'success';

interface AlertMessageProps {
  type: AlertType;
  message: string;
}

export function AlertMessage({ type, message }: AlertMessageProps) {
  const base =
    'rounded p-2 text-sm border transition-all';

  const styles =
    type === 'error'
      ? 'bg-red-900/40 border-red-700 text-red-300'
      : 'bg-green-900/40 border-green-700 text-green-300';

  return <div className={`${base} ${styles}`}>{message}</div>;
}
