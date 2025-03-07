import { Header } from "./ui/header/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex justify-center p-10">
        <Link 
          href={'/examples'}
          className="flex items-stretch rounded-lg bg-green-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-green-500 md:text-base"
        >
          Examples
        </Link>
      </main>
    </>
  );
}
