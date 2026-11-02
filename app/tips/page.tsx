import { PageShell } from "@/components/layouts";
import { pageMetadata } from "@/lib/metadata";
import { KitForm } from "@/components/newsletter";

/** The "best tips" Kit form, a different form than the site-wide poster one. */
const TIPS_FORM_UID = "00710104fc";

export const metadata = pageMetadata({
  path: "/tips.html",
  title: "From data to Viz | Best tips",
  description: "A classification of all possible chart types classified following the input data format.",
  image: "/img/patchwork/datatoviz_overview7.png",
});

export default function Page() {
  return (
    <PageShell>
      <section className="flex min-h-[80vh] items-center justify-center bg-muted/40 px-4 pt-16">
        <div className="mx-auto w-full max-w-2xl py-12 text-center">
          <h1 className="font-heading text-3xl font-medium tracking-[0.12em] uppercase sm:text-4xl">Best tips</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The best dataviz tips from <a href="/" className="text-brand hover:underline">From Data to Viz</a>, a
            classification of chart types based on their input data format, delivered straight to your inbox.
          </p>
          <div className="mt-8">
            <KitForm uid={TIPS_FORM_UID} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
