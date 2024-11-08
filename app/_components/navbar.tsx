import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { NavLink } from "./nav-link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-solid p-6">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />

        <NavLink
          href="/"
          className="font-bold text-muted-foreground hover:text-primary data-[current=true]:text-primary"
        >
          Dashboard
        </NavLink>
        <NavLink
          href="/transactions"
          className="font-bold text-muted-foreground hover:text-primary data-[current=true]:text-primary"
        >
          Transações
        </NavLink>
        <NavLink
          href="/subscription"
          className="font-bold text-muted-foreground hover:text-primary data-[current=true]:text-primary"
        >
          Assinaturas
        </NavLink>
      </div>

      <UserButton showName />
    </nav>
  );
}
