import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layouts";
import { KitForm } from "@/components/newsletter";
import { ChartDialogProvider } from "@/components/home/chart-dialog";
import { DecisionTree } from "@/components/home/decision-tree";
import { HashScroll } from "@/components/home/hash-scroll";
import { Portfolio } from "@/components/home/portfolio";
import { PosterCarousel } from "@/components/home/poster-carousel";
import { StoryMenus } from "@/components/home/story-menus";
import { CAVEAT_CARDS } from "@/components/home/data/home";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/lib/button";

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

/** Big bold uppercase title + italic serif subtitle, as on the original site. */
function SectionHeading({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">
        {title}
      </h2>
      {children && <div className="mt-4 text-lg text-slate-600">{children}</div>}
    </div>
  );
}

function HomeSection({
  id,
  muted = false,
  className,
  children,
}: {
  id: string;
  muted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("px-4 py-24", muted && "bg-[#f8f9fa]", className)}>
      {children}
    </section>
  );
}

const link = "link";

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
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <HashScroll />
      <ChartDialogProvider>
        <div className="text-[19px] leading-7 text-slate-900">
          {/* Hero */}
          <header className="relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 bg-[url('/img/overview_RGG_faded.png')] bg-cover bg-fixed bg-center"
            />
            <img
              src="/img/IIB-awards-winner.png"
              alt="Information is Beautiful Awards winner"
              className="absolute top-20 left-4 hidden w-28 opacity-70 sm:block lg:w-36"
            />
            <div className="relative mx-auto flex min-h-[92vh] max-w-3xl flex-col items-center justify-center px-4 pt-20 pb-16 text-center">
              <h1>
                <img src="/img/logo/tree-s.png" alt="From Data to Viz" className="mx-auto w-64 sm:w-80" />
                <span className="sr-only">From Data to Viz – find the graphic you need</span>
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-8 font-light text-slate-700">{DESCRIPTION}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a href="#explore" className={buttonClass("primary", "lg")}>
                  Explore
                </a>
                <a href="/poster.html" className={buttonClass("secondary", "lg")}>
                  See poster
                </a>
              </div>
            </div>
          </header>

          {/* Decision tree */}
          <HomeSection id="explore" className="pb-20">
            <p className="mx-auto max-w-2xl text-center text-slate-600">
              What kind of data do you have? Pick the main type using the buttons below. Then let the decision tree
              guide you toward your graphic possibilities. Alternatively, check the{" "}
              <a href="/poster.html" className={link}>
                complete decision tree
              </a>
              .
            </p>
            <div className="mt-10">
              <DecisionTree />
            </div>
          </HomeSection>

          {/* Data stories */}
          <HomeSection id="story" className="relative border-t">
            <div
              aria-hidden
              className="absolute inset-0 bg-[url('/img/parallax/story_fading.png')] bg-cover bg-fixed bg-center opacity-60"
            />
            <div className="relative mx-auto max-w-5xl">
              <SectionHeading title="Data Story">
                From Data to Viz provides a decision tree based on input data format. This tree leads to twenty formats
                representing the most common dataset types. For each, an example of analysis based on real-life data is
                provided using the{" "}
                <a href="https://www.r-graph-gallery.com" className={link}>
                  R programming language
                </a>
                .
              </SectionHeading>
              <div className="mt-10">
                <StoryMenus />
              </div>
            </div>
          </HomeSection>

          {/* All charts */}
          <HomeSection id="portfolio" muted>
            <div className="mx-auto max-w-6xl">
              <SectionHeading title="A world of possibilities">
                Here is an overview of all the graph types presented in this website.
              </SectionHeading>
              <div className="mt-10">
                <Portfolio />
              </div>
            </div>
          </HomeSection>

          {/* Newsletter */}
          <HomeSection id="form">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">
                ❤️ Enjoying the project? ❤️
              </h2>
              <p className="mt-4 text-slate-600">
                Dive deeper into the world of data visualization with <em>Dataviz Universe</em>, my newsletter packed
                with <strong className="text-foreground">actionable tips and tricks</strong> to enhance your data
                storytelling skills.
              </p>
              <KitForm className="mt-6" />
            </div>
          </HomeSection>

          {/* Caveats */}
          <HomeSection id="caveats" muted>
            <div className="mx-auto max-w-6xl">
              <SectionHeading title="Caveats">
                The best way to visualize data efficiently is probably to avoid the most common mistakes.
                <br />
                From Data to Viz offers you a{" "}
                <a href="/caveats.html" className={link}>
                  gallery of common caveats
                </a>
                .
              </SectionHeading>
              {/* Teaser: the cards fade out into the background; all of them stay in the HTML. */}
              <div className="relative mt-12">
                <ul className="grid max-h-[760px] grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
                  {CAVEAT_CARDS.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        className="group flex h-full flex-col items-center rounded-xl border bg-white p-5 text-center transition hover:border-brand hover:shadow-lg"
                      >
                        <img src={c.image} alt="" loading="lazy" className="size-28 object-contain" />
                        <h3 className="mt-4 font-heading text-[17px] leading-snug font-bold text-slate-900 group-hover:text-brand">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-snug text-slate-600">{c.text}</p>
                      </a>
                    </li>
                  ))}
                </ul>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-[#f8f9fa]/0 via-[#f8f9fa]/85 to-[#f8f9fa]"
                />
                <div className="absolute inset-x-0 bottom-12 flex justify-center">
                  <a href="/caveats.html" className={buttonClass("primary", "lg")}>
                    See all caveats
                  </a>
                </div>
              </div>
            </div>
          </HomeSection>

          {/* Poster */}
          <HomeSection id="poster">
            <div className="mx-auto max-w-4xl">
              <SectionHeading title="Poster">
                The &lsquo;Data to Viz&rsquo; project is available in a high quality printed poster. See our{" "}
                <a href="/poster.html" className={link}>
                  online shop
                </a>{" "}
                to support the project.
              </SectionHeading>
              <div className="mt-12">
                <PosterCarousel />
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="/poster.html" className={buttonClass("primary", "lg")}>
                  Buy a poster
                </a>
                <a href="/img/poster/poster_big.png" className={buttonClass("secondary", "lg")}>
                  See it full screen
                </a>
              </div>
            </div>
          </HomeSection>

          {/* About */}
          <HomeSection id="about" muted>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">
                About the project
              </h2>
              <p className="mt-6 text-slate-600">
                &lsquo;From Data to Viz&rsquo; is a classification of chart types based on input data format. It comes
                in the form of a decision tree leading to a set of potentially appropriate visualizations to represent
                your dataset.{" "}
                <a href="/about.html" className={link}>
                  Read more
                </a>
                .
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <a href="/about.html#toolsanchor" className={buttonClass("secondary", "sm")}>
                  Tools
                </a>
                <a href="/about.html#acknowledgmentanchor" className={buttonClass("secondary", "sm")}>
                  Acknowledgment
                </a>
                <a href="/about.html#historyanchor" className={buttonClass("secondary", "sm")}>
                  History
                </a>
                <a href="#contact" className={buttonClass("secondary", "sm")}>
                  Feedback
                </a>
              </div>
              <p className="mt-8 text-slate-600">
                This website has been developed by two friends from the south of France in their spare time. Feel free
                to{" "}
                <a href="#contact" className={link}>
                  drop us a word
                </a>{" "}
                if the project helped you or for any feedback. Or even better, hire us!
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-12 sm:grid-cols-2">
              {TEAM.map((m) => (
                <div key={m.name} className="text-center">
                  <a href={m.href}>
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="mx-auto size-56 rounded-full border-[7px] border-white object-cover shadow-sm"
                    />
                  </a>
                  <h3 className="mt-5 font-heading text-2xl font-bold tracking-[0.03em]">
                    <a href={m.href} className="link">
                      {m.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-slate-600">{m.role}</p>
                  <ul className="mt-3 flex justify-center gap-4 text-sm">
                    {m.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className={link}>
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </HomeSection>

          {/* Contact */}
          <HomeSection id="contact">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">
                Contact
              </h2>
              <p className="mt-6 text-slate-600">
                We welcome any feedback you may have! You can open an issue on{" "}
                <a href="https://github.com/holtzy/data_to_viz" className={link}>
                  Github
                </a>
                , drop us a message on{" "}
                <a href="https://twitter.com/R_Graph_Gallery" className={link}>
                  Twitter
                </a>
                , or send us an email at{" "}
                <a href="mailto:yan.holtz.data@gmail.com" className={link}>
                  yan.holtz.data@gmail.com
                </a>
                . Subscribe below for even more <strong className="text-foreground">insightful dataviz tips</strong>!
              </p>
              <KitForm className="mt-6" />
            </div>
          </HomeSection>
        </div>
      </ChartDialogProvider>
    </PageShell>
  );
}
