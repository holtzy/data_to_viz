import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterSection } from "@/components/newsletter";

/** Navigation + footer around any page. */
export function PageShell({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  return (
    <>
      <SiteHeader overlay={overlayHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

/** Faded chart-collage banner with the page icon(s) and title, shared by graph, story and caveat pages. */
function PageHero({
  title,
  images,
  kicker,
  anchors,
}: {
  title: string;
  images: string[];
  kicker?: string;
  anchors?: { href: string; label: string }[];
}) {
  return (
    <div className="relative overflow-hidden border-b pt-16">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/img/overview_RGG_faded.png')] bg-cover bg-fixed bg-center opacity-70"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center">
        {images.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {images.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="size-24 rounded-full bg-white/80 object-contain p-1 shadow-sm sm:size-28"
              />
            ))}
          </div>
        )}
        {kicker && (
          <p className="mt-6 font-heading text-xs font-semibold tracking-[0.25em] text-brand uppercase">{kicker}</p>
        )}
        <h1 className="mt-3 font-heading text-3xl font-medium tracking-[0.12em] text-balance uppercase sm:text-4xl">
          {title}
        </h1>
        {anchors && (
          <nav aria-label="On this page" className="mt-4 text-sm text-muted-foreground">
            {anchors.map((a, i) => (
              <span key={a.href}>
                {i > 0 && <span className="mx-2">·</span>}
                <a href={a.href} className="hover:text-brand">
                  {a.label}
                </a>
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

function Article({ children }: { children: ReactNode }) {
  return (
    <article className="prose prose-neutral mx-auto max-w-4xl px-4 pt-10 prose-headings:font-heading prose-headings:font-medium prose-h2:mt-14 prose-h2:border-b prose-h2:pb-3 prose-h2:text-3xl prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-img:mx-auto prose-img:rounded-md prose-table:mx-auto prose-table:w-auto prose-table:text-sm lg:prose-lg">
      {children}
    </article>
  );
}

type ContentLayoutProps = { title: string; images: string[]; children: ReactNode };

export function GraphLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell>
      <PageHero
        title={title}
        images={images}
        anchors={[
          { href: "#definition", label: "definition" },
          { href: "#mistake", label: "mistake" },
          { href: "#related", label: "related" },
          { href: "#code", label: "code" },
        ]}
      />
      <Article>{children}</Article>
      <NewsletterSection />
    </PageShell>
  );
}

export function StoryLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell>
      <PageHero title={title} images={images} kicker="Data story" />
      <Article>{children}</Article>
      <NewsletterSection />
    </PageShell>
  );
}

export function CaveatLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell>
      <PageHero title={title} images={images} kicker="Dataviz caveat" />
      <Article>{children}</Article>
      <NewsletterSection />
    </PageShell>
  );
}
