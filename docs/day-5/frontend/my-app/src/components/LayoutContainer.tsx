export function LayoutContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-6 shadow-lg">
        {children}
      </div>
    </main>
  );
}
