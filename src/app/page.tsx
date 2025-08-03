import { HomeClientWrapper } from "@/components/pages/home/HomeClientWrapper";

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* All the dynamic logic is handled inside this component */}
      <HomeClientWrapper />
    </main>
  );
}
