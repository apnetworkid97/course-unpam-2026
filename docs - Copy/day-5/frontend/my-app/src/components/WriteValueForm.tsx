export function WriteValueForm({
  inputValue,
  setInputValue,
  onSubmit,
  isWriting,
  disabled,
}: any) {
  return (
    <div className="space-y-3">
      <input
        type="number"
        value={inputValue}
        disabled={isWriting}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full p-2 rounded-lg bg-black border border-gray-700 disabled:opacity-50"
        placeholder="Enter new value"
      />
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="w-full bg-blue-600 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isWriting ? 'Transaction pending...' : 'Set Value'}
      </button>
    </div>
  );
}
