import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
export default function Home() {
  return (
    <>
      <h1 className="text-sky-600  ">Protected Route</h1>
      <ModeToggle />
    </>
  );
}
