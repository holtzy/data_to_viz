import type { Metadata } from "next";
import { PageShell } from "@/components/layouts";

export const metadata: Metadata = {
  title: { absolute: "Page not found – from Data to Viz" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-40 pb-24 text-center">
        <img src="/img/logo/tree-s.png" alt="" className="w-40 opacity-80" />
        <h1 className="mt-8 font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">Page not found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page doesn&rsquo;t exist (anymore). Find the chart you need with the{" "}
          <a href="/#explore" className="link">
            decision tree
          </a>{" "}
          or browse{" "}
          <a href="/#portfolio" className="link">
            all chart types
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
