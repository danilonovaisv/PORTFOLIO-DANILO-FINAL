export default function Loading() {
  return (
    <main className="min-h-dvh bg-[#040013] text-white">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center px-6">
        <div className="space-y-4">
          <div className="h-3 w-48 animate-pulse rounded-full bg-white/20" />
          <div className="h-12 w-[70vw] max-w-2xl animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>
    </main>
  );
}
