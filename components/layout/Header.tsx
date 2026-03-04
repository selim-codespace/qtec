import Link from "next/link";
import { Menu } from "lucide-react";

function LogoMark() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary">
      <span className="h-4 w-4 rounded-full border-2 border-white" />
      <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}

export default function Header() {
  return (
    <header className="bg-[#f8f8fd] max-w-405 mx-auto w-full">
      <div className="flex h-[72px]  items-center justify-between border-b border-[#d6ddeb] px-4 md:h-[78px] md:px-6 xl:px-0">
        <div className="flex items-end gap-8">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-brand text-[24px] font-bold leading-none text-[#25324b] md:text-[34px]">
              QuickHire
            </span>
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ddeb] text-[#25324b] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="flex items-center gap-8">
            <Link
              href="/jobs"
              className="text-base font-medium text-[#515b6f] transition-colors hover:text-primary"
            >
              Find Jobs
            </Link>
            <Link
              href="/jobs"
              className="text-base font-medium text-[#515b6f] transition-colors hover:text-primary"
            >
              Browse Companies
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/admin"
              className="px-3 py-2 text-sm font-bold text-primary md:text-base"
            >
              Login
            </Link>
            <span className="h-12 w-px bg-border" />
            <Link
              href="/admin"
              className="inline-flex items-center justify-center bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover md:px-6 md:text-base"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
