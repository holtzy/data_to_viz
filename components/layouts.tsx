import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterSection } from "@/components/newsletter";
import { buttonClass } from "@/lib/button";

/** Navigation + footer around any page. */
export function PageShell({ children, narrowHeader = false }: { children: ReactNode; narrowHeader?: boolean }) {
  return (
    <>
      <SiteHeader narrow={narrowHeader} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

/**
 * Page title block, laid out like the React Graph Gallery: title with the
 * chart icon(s) beside it, a kicker, and quick links to the main sections.
 */
function PageHeader({
  title,
  images,
  kicker,
  anchors,
}: {
  title: string;
  images: string[];
  kicker: string;
  anchors?: { href: string; label: string }[];
}) {
  return (
    <header className="pt-24 sm:pt-32">
      <p className="text-sm font-medium tracking-wider text-brand uppercase">{kicker}</p>
      <div className="mt-2 flex items-center justify-between gap-4">
        <h1 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">
          {title}
        </h1>
        {images.length > 0 && (
          <div className="flex shrink-0 gap-1">
            {images.slice(0, 3).map((src) => (
              <img key={src} src={src} alt="" className="size-20 object-contain sm:size-28" />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-4 w-24 border-t-2 border-brand/60" />
      {anchors && (
        <nav aria-label="On this page" className="mt-5 flex flex-wrap gap-2">
          {anchors.map((a) => (
            <a key={a.href} href={a.href} className={buttonClass("secondary", "sm")}>
              {a.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Article({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <article className="wrapper article pb-10">
      {header}
      {children}
    </article>
  );
}

type ContentLayoutProps = { title: string; images: string[]; children: ReactNode };

export function GraphLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell narrowHeader>
      <Article
        header={
          <PageHeader
            title={title}
            images={images}
            kicker="Chart type"
            anchors={[
              { href: "#definition", label: "Definition" },
              { href: "#mistake", label: "Mistakes" },
              { href: "#related", label: "Related" },
              { href: "#code", label: "Code" },
            ]}
          />
        }
      >
        {children}
      </Article>
      <NewsletterSection />
    </PageShell>
  );
}

export function StoryLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell narrowHeader>
      <Article header={<PageHeader title={title} images={images} kicker="Data story" />}>{children}</Article>
      <NewsletterSection />
    </PageShell>
  );
}

export function CaveatLayout({ title, images, children }: ContentLayoutProps) {
  return (
    <PageShell narrowHeader>
      <Article header={<PageHeader title={title} images={images} kicker="Dataviz caveat" />}>{children}</Article>
      <NewsletterSection />
    </PageShell>
  );
}
