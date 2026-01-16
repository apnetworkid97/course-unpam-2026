export function ReadValueCard({
  value,
  isReading,
  onRefresh,
}: {
  value: string;
  isReading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="bg-black border border-gray-700 rounded-lg p-4 text-center space-y-2">
      <p className="text-gray-400 text-sm">Stored Value</p>
      {isReading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <p className="text-4xl font-bold text-blue-400">{value}</p>
      )}
      <button
        onClick={onRefresh}
        className="text-xs underline text-gray-400"
      >
        Refresh
      </button>
    </div>
  );
}
