"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_CTA, NAV_LINKS } from "@/lib/site";
import { buttonClass } from "@/lib/button";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex h-9 items-center rounded-[4px] px-3 text-sm font-light tracking-wider text-slate-900 uppercase transition-colors hover:bg-slate-100";

/** Top navigation, styled like the React Graph Gallery's: fixed, translucent, blurred. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 border-b backdrop-blur-md transition-colors",
        scrolled ? "border-slate-200/80 bg-white/85" : "border-transparent bg-white/60",
      )}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4">
        <a href="/" aria-label="from Data to Viz – home" className="shrink-0">
          <img src="/img/logo/typo.png" alt="from Data to Viz" className="h-7 w-auto" />
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
          <a href={NAV_CTA.href} className={buttonClass("primary", "sm", "ml-3 px-4 tracking-wider uppercase")}>
            {NAV_CTA.label}
          </a>
        </div>
        <Sheet>
          <SheetTrigger className="rounded-md p-2 hover:bg-slate-100 md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetTitle className="px-4 pt-4 font-heading text-lg">Menu</SheetTitle>
            <ul className="flex flex-col gap-1 p-4">
              {[...NAV_LINKS, NAV_CTA].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={cn(linkClass, "w-full")}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
