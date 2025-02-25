import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex align-center justify-center h-screen">
      <main className="flex flex-col justify-center h-full text-center gap-6 item-center  max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold">
          Invoicingpedia
        </h1>
        <p>
          <Button asChild>
            <Link href="/dashboard ">SignIn</Link>
          </Button>
        </p>
      </main>
    </div>
  );
}
