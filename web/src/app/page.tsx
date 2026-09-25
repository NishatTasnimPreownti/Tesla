import { ApiStatus } from "@/components/ApiStatus";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Dhaka Tesla Pool</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Share a seat. Split the fare. Survive Dhaka traffic.
      </p>
      <ApiStatus />
    </main>
  );
}
