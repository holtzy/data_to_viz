import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layouts";
import { RelatedCard } from "@/components/content";
import { KitForm } from "@/components/newsletter";
import { ChartDialogProvider } from "@/components/home/chart-dialog";
import { DecisionTree } from "@/components/home/decision-tree";
import { Portfolio } from "@/components/home/portfolio";
import { CAVEAT_CARDS, STORY_GROUPS } from "@/components/home/data/home";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "From Data to Viz leads you to the most appropriate graph for your data. It links to the code to build it and lists common caveats you should avoid.";

export const metadata: Metadata = {
  title: { absolute: "From data to Viz | Find the graphic you need" },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "From data to Viz | Find the graphic you need",
    description: DESCRIPTION,
    images: [{ url: "/img/poster/poster_screenshot.png" }],
  },
  twitter: { card: "summary_large_image", images: ["/img/poster/poster_screenshot.png"] },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "From Data to Viz",
  url: `${SITE_URL}/`,
  description: DESCRIPTION,
  author: { "@type": "Person", name: "Yan Holtz", url: "https://www.yan-holtz.com" },
};

function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-heading text-3xl font-semibold tracking-[0.12em] uppercase sm:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-lg text-balance text-muted-foreground">{children}</div>}
    </div>
  );
}

const btn =
  "inline-flex items-center rounded-md border-2 border-brand px-6 py-3 font-heading text-sm font-semibold tracking-[0.15em] text-brand uppercase transition hover:bg-brand hover:text-white";

const TEAM = [
  {
    name: "Yan Holtz",
    role: "Data analyst",
    image: "/img/team/YH_pic_square.png",
    href: "https://www.linkedin.com/in/yan-holtz-2477534a/",
    links: [
      { label: "Twitter", href: "https://twitter.com/R_Graph_Gallery" },
      { label: "GitHub", href: "https://github.com/holtzy" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/yan-holtz-2477534a/" },
    ],
  },
  {
    name: "Conor Healy",
    role: "Designer",
    image: "/img/team/ConorHealy.jpg",
    href: "http://www.conor.fr",
    links: [
      { label: "Website", href: "http://www.conor.fr/indexEN.html" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/conor-healy-b0299810a/" },
    ],
  },
];

export default function Home() {
  return (
    <PageShell overlayHeader>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <ChartDialogProvider>
        {/* Hero */}
        <header className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/img/overview_RGG_faded.png')] bg-cover bg-fixed bg-center"
          />
          <img
            src="/img/IIB-awards-winner.png"
            alt="Information is Beautiful Awards winner"
            className="absolute top-0 left-0 hidden w-36 opacity-70 sm:block lg:w-48"
          />
          <div className="relative mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
            <h1>
              <img src="/img/logo/tree-s.png" alt="From Data to Viz" className="mx-auto w-64 sm:w-80" />
              <span className="sr-only">From Data to Viz – find the graphic you need</span>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-lg text-foreground/80 italic sm:text-xl">{DESCRIPTION}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#explore" className={btn}>
                Explore
              </a>
              <a href="/poster.html" className={btn}>
                See poster
              </a>
            </div>
          </div>
        </header>

        {/* Decision tree */}
        <section id="explore" className="scroll-mt-16 px-4 py-20">
          <p className="mx-auto max-w-2xl text-center text-lg text-muted-foreground">
            What kind of data do you have? Pick the main type using the buttons below. Then let the decision tree
            guide you toward your graphic possibilities. Alternatively, check the{" "}
            <a href="/poster.html" className="text-brand hover:underline">
              complete decision tree
            </a>
            .
          </p>
          <div className="mt-10">
            <DecisionTree />
          </div>
        </section>

        {/* Data stories */}
        <section id="story" className="relative scroll-mt-16 overflow-hidden bg-brand py-24 text-white">
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/img/parallax/story_fading.png')] bg-cover bg-fixed bg-center opacity-25"
          />
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-semibold tracking-[0.12em] uppercase sm:text-4xl">Data Story</h2>
              <p className="mt-4 text-lg text-white/90">
                From Data to Viz provides a decision tree based on input data format. This tree leads to twenty
                formats representing the most common dataset types. For each, an example of analysis based on
                real-life data is provided using the{" "}
                <a href="https://www.r-graph-gallery.com" className="underline underline-offset-4">
                  R programming language
                </a>
                .
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {STORY_GROUPS.map((g) => (
                <div key={g.label} className="rounded-xl bg-white/10 p-5 backdrop-blur-sm">
                  <h3 className="font-heading text-sm font-semibold tracking-[0.2em] uppercase">{g.label}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {g.items.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} className="text-white/90 underline-offset-4 hover:text-white hover:underline">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All charts */}
        <section id="portfolio" className="scroll-mt-16 bg-muted/50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="A world of possibilities">
              Here is an overview of all the graph types presented in this website.
            </SectionHeading>
            <div className="mt-10">
              <Portfolio />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section id="form" className="scroll-mt-16 px-4 py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading title="Dataviz decision tree">
              Data To Viz is a comprehensive <strong>classification of chart types</strong> organized by data input
              format. Get a high-resolution version of our decision tree delivered to your inbox now!
            </SectionHeading>
            <div className="mt-6 w-full">
              <KitForm />
            </div>
          </div>
        </section>

        {/* Caveats */}
        <section id="caveats" className="scroll-mt-16 bg-muted/50 px-4 py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="Caveats">
              The best way to visualize data efficiently is probably to avoid the most common mistakes. From Data to
              Viz offers you a{" "}
              <a href="/caveats.html" className="text-brand hover:underline">
                gallery of common caveats
              </a>
              .
            </SectionHeading>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CAVEAT_CARDS.map((c) => (
                <RelatedCard key={c.href} href={c.href} image={c.image} title={c.title}>
                  {c.text}
                </RelatedCard>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href="/caveats.html" className={btn}>
                See all caveats
              </a>
            </div>
          </div>
        </section>

        {/* Poster */}
        <section id="poster" className="scroll-mt-16 px-4 py-24">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title="Poster">
              The &lsquo;Data to Viz&rsquo; project is available in a high quality printed poster. See our{" "}
              <a href="/poster.html" className="text-brand hover:underline">
                online shop
              </a>{" "}
              to support the project.
            </SectionHeading>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["/img/poster/poster_mockup_croped.jpg", "The Data to Viz poster on a wall"],
                ["/img/poster/poster_800_400.png", "The complete Data to Viz decision tree poster"],
                ["/img/poster/poster_zoom_800_400.png", "Close-up view of the Data to Viz poster"],
              ].map(([src, alt]) => (
                <a key={src} href="/poster.html" className="overflow-hidden rounded-xl border shadow-sm">
                  <img src={src} alt={alt} loading="lazy" className="h-56 w-full object-cover transition hover:scale-105" />
                </a>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/poster.html" className={btn}>
                Buy a poster
              </a>
              <a href="/img/poster/poster_big.png" className={btn}>
                See it full screen
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-16 bg-muted/50 px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title="About the project">
              &lsquo;From Data to Viz&rsquo; is a classification of chart types based on input data format. It comes
              in the form of a decision tree leading to a set of potentially appropriate visualizations to represent
              your dataset.{" "}
              <a href="/about.html" className="text-brand hover:underline">
                Read more
              </a>
              .
            </SectionHeading>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/about.html#toolsanchor" className={btn}>
                Tools
              </a>
              <a href="/about.html#acknowledgmentanchor" className={btn}>
                Acknowledgment
              </a>
              <a href="/about.html#historyanchor" className={btn}>
                History
              </a>
              <a href="#contact" className={btn}>
                Feedback
              </a>
            </div>
            <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-muted-foreground">
              This website has been developed by two friends from the south of France in their spare time. Feel free
              to{" "}
              <a href="#contact" className="text-brand hover:underline">
                drop us a word
              </a>{" "}
              if the project helped you or for any feedback. Or even better, hire us!
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="text-center">
                  <a href={m.href}>
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="mx-auto size-40 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </a>
                  <h3 className="mt-4 font-heading text-lg font-semibold tracking-wide">
                    <a href={m.href} className="hover:text-brand">
                      {m.name}
                    </a>
                  </h3>
                  <p className="text-muted-foreground italic">{m.role}</p>
                  <ul className="mt-2 flex justify-center gap-4 text-sm">
                    {m.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="text-brand hover:underline">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16 px-4 py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <SectionHeading title="Contact">
              We welcome any feedback you may have! You can open an issue on{" "}
              <a href="https://github.com/holtzy/data_to_viz" className="text-brand hover:underline">
                Github
              </a>
              , drop us a message on{" "}
              <a href="https://twitter.com/R_Graph_Gallery" className="text-brand hover:underline">
                Twitter
              </a>
              , or send us an email at{" "}
              <a href="mailto:yan.holtz.data@gmail.com" className="text-brand hover:underline">
                yan.holtz.data@gmail.com
              </a>
              . Subscribe below for even more <strong>insightful dataviz tips</strong>!
            </SectionHeading>
          </div>
        </section>
      </ChartDialogProvider>
    </PageShell>
  );
}
