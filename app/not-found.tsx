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
        <h1 className="mt-8 font-heading text-3xl font-medium tracking-[0.12em] uppercase">Page not found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page doesn&rsquo;t exist (anymore). Find the chart you need with the{" "}
          <a href="/#explore" className="text-brand hover:underline">
            decision tree
          </a>{" "}
          or browse{" "}
          <a href="/#portfolio" className="text-brand hover:underline">
            all chart types
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
