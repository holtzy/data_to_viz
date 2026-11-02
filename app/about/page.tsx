import type { ReactNode } from "react";
import { PageShell } from "@/components/layouts";
import { buttonClass } from "@/lib/button";
import { KitForm } from "@/components/newsletter";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/about.html",
  title: "About the Data to Viz Project",
  description:
    "How and why From Data to Viz was built: a classification of chart types based on input data format, the tools behind it, a history of chart classifications and acknowledgments.",
  image: "/img/poster/poster_screenshot.png",
});

const anchors = [
  { href: "#presentation", label: "Presentation" },
  { href: "#tools", label: "Tools" },
  { href: "#history", label: "History" },
  { href: "#acknowledgment", label: "Acknowledgment" },
];

const history: { year: number; image: string; alt: string; text: ReactNode }[] = [
  {
    year: 2006,
    image: "/img/history/infography1.png",
    alt: "The Chart Chooser by Dr. Abela",
    text: (
      <>
        <a href="http://extremepresentation.typepad.com/blog/2006/09/choosing_a_good.html">The Chart Chooser</a> by{" "}
        <i>Dr. Abela</i>. A simple representation that is part of the{" "}
        <a href="https://extremepresentation.com/">extreme presentation method</a>. This representation has been
        criticized by <a href="https://www.perceptualedge.com/blog/?p=2080">Stephen Few</a>, and discussed by many
        people in the comment section.
      </>
    ),
  },
  {
    year: 2013,
    image: "/img/history/classification-chart-types.png",
    alt: "A classification of chart types by Jorge Camoes",
    text: (
      <>
        <a href="http://excelcharts.com/classification-chart-types/">A classification of chart types</a> by{" "}
        <i>Jorge Camoes</i>. This classification includes only charts that can be made using excel.
      </>
    ),
  },
  {
    year: 2014,
    image: "/img/history/the-graphic-continuum.jpg",
    alt: "The graphic continuum poster by John Swabish and Severinno Ribecca",
    text: (
      <>
        <a href="https://policyviz.com/2014/09/09/graphic-continuum/">The graphic continuum</a> by <i>John Swabish</i>{" "}
        and <i>Severinno Ribecca</i>. Described as a view of the many different types of visualizations available to
        us when we encode and present data. This poster got a{" "}
        <a href="https://www.informationisbeautifulawards.com/">Information Is Beautiful</a> award.
      </>
    ),
  },
  {
    year: 2015,
    image: "/img/history/Visual-vocabulary.png",
    alt: "The visual vocabulary by the Financial Times",
    text: (
      <>
        <a href="https://github.com/ft-interactive/chart-doctor/tree/master/visual-vocabulary">
          The visual vocabulary
        </a>{" "}
        by the <i>Financial Times Visual Journalism Team</i>. Aims to assist designers and journalists to select the
        optimal symbology for data visualisations. A interactive version is also{" "}
        <a href="http://ft-interactive.github.io/visual-vocabulary/">available</a>.
      </>
    ),
  },
  {
    year: 2016,
    image: "/img/history/chartguide.jpg",
    alt: "The chart guide by Michiel Dullaert",
    text: (
      <>
        <a href="http://chart.guide/news/">The chart guide</a> by <i>Michiel Dullaert</i>. Initially created to help
        students choose the right chart.
      </>
    ),
  },
  {
    year: 2017,
    image: "/img/history/Anne_K-Ermy_guide.png",
    alt: "Your guide to great graphs by Ann K. Emery",
    text: (
      <>
        <a href="http://annkemery.com/portfolio/your-guide-to-great-graphs/">Your guide to great graphs</a> by{" "}
        <i>Ann K. Emery</i> is a two pages poster that outlines 42 great graphs that showcase trends over time, by
        geography, and more. Note that an <a href="http://annkemery.com/essentials/">interactive version</a> is
        available.
      </>
    ),
  },
  {
    year: 2018,
    image: "/img/poster/poster_screenshot.png",
    alt: "The From Data to Viz poster",
    text: (
      <>
        <a href="/">From data to viz</a> by <i>Yan Holtz</i> and <i>Conor Healy</i> is a new approach aiming to
        classify chart types according to their input format.
      </>
    ),
  },
];

const link = "link";

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-5 border-b pb-2 font-heading text-xl font-bold tracking-[0.03em]">{children}</h3>
  );
}

export default function Page() {
  return (
    <PageShell>
      {/* Header */}
      <section id="head" className="border-b bg-muted/40 pt-16">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h1 className="font-heading text-[32px] leading-[44px] font-bold tracking-[0.03em] sm:text-[42px] sm:leading-[54px]">
            About data to viz
          </h1>
          <p className="mt-4 text-lg text-slate-600">How and why we built the project</p>
          <nav aria-label="On this page" className="mt-8 flex flex-wrap justify-center gap-2">
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className={buttonClass("secondary")}
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Presentation */}
      <section id="presentation" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 leading-relaxed text-foreground/85 md:grid-cols-3">
          <div className="space-y-4">
            <p>
              <a href="/" className={link}>
                From Data to Viz
              </a>{" "}
              is a classification of chart types based on input data format. It comes in the form of a decision tree
              leading to a set of potentially appropriate visualizations to represent the dataset.
            </p>
            <p>
              The project is built on two underlying philosophies. <i>First</i>, that most data analysis can be
              summarized in about twenty different dataset formats. <i>Second</i>, that both data and context
              determine the appropriate chart.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Thus, our suggested method consists in identifying and trying all feasible chart types to find out which
              suits your data and idea best.
            </p>
            <p>
              Once this set of graphics is identified,{" "}
              <a href="/" className={link}>
                data-to-viz.com
              </a>{" "}
              aims to guide you toward the best decision. It also provides a list of common caveats to avoid and always
              provides a reproducible code snippet in the{" "}
              <a href="https://www.r-graph-gallery.com" className={link}>
                R programming language
              </a>
              .
            </p>
          </div>
          <div className="space-y-6">
            <p>
              Dataviz is a world with endless possibilities and this project does not claim to be exhaustive. However,
              it should provide you with a good starting point.
            </p>
            <img
              src="/img/logo/tree-s.png"
              alt="From Data to Viz decision tree logo"
              loading="lazy"
              className="mx-auto w-1/2"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="form" className="scroll-mt-20 border-y bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
          <h2 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">❤️ Enjoying the project? ❤️</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dive deeper into the world of data visualization with <i>Dataviz Universe</i>, my newsletter packed with{" "}
            <b>actionable tips and tricks</b> to enhance your data storytelling skills.
          </p>
          <div className="mt-6 w-full">
            <KitForm />
          </div>
        </div>
      </section>

      {/* Tools */}
      <span id="toolsanchor" />
      <section id="tools" className="relative scroll-mt-20 overflow-hidden bg-brand/10">
        <div
          aria-hidden
          className="absolute inset-0 bg-[url('/img/parallax/story_fading.png')] bg-cover bg-fixed bg-center opacity-40"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h2 className="text-center font-heading text-sm font-semibold tracking-[0.25em] text-brand uppercase">
            How is built this website?
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-background/90 p-6 text-center shadow-sm">
              <ColumnTitle>Website</ColumnTitle>
              <p className="text-muted-foreground">
                Data to viz is based on a{" "}
                <a href="https://startbootstrap.com/template-overviews/agency/" className={link}>
                  bootstrap template
                </a>{" "}
                and hosted on{" "}
                <a href="https://github.com/holtzy/data_to_viz" className={link}>
                  github
                </a>
                . Logos, trees and poster have been made by{" "}
                <a href="http://www.conor.fr" className={link}>
                  Conor Healy
                </a>{" "}
                and animated using CSS and{" "}
                <a href="https://d3js.org" className={link}>
                  D3.js
                </a>
                .
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-6 text-center shadow-sm">
              <ColumnTitle>Content</ColumnTitle>
              <p className="text-muted-foreground">
                The vast majority of the pages of this website are built using{" "}
                <a href="https://rmarkdown.rstudio.com" className={link}>
                  R Markdown
                </a>{" "}
                with the{" "}
                <a href="https://www.rstudio.com" className={link}>
                  R studio
                </a>{" "}
                IDE. Dataset used in example are all listed in this{" "}
                <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset" className={link}>
                  github repository
                </a>
                .
              </p>
            </div>
            <div className="rounded-xl bg-background/90 p-6 text-center shadow-sm">
              <ColumnTitle>Graphics</ColumnTitle>
              <p className="text-muted-foreground">
                All analysis are made using the{" "}
                <a href="https://www.tidyverse.org" className={link}>
                  tidyverse
                </a>
                , notably{" "}
                <a href="https://dplyr.tidyverse.org" className={link}>
                  dplyr
                </a>{" "}
                and{" "}
                <a href="https://www.r-graph-gallery.com/portfolio/ggplot2-package/" className={link}>
                  ggplot2
                </a>
                . Interactive graphics are made using{" "}
                <a href="https://www.htmlwidgets.org/" className={link}>
                  html widgets
                </a>
                , notably{" "}
                <a href="https://plot.ly/" className={link}>
                  plotly
                </a>{" "}
                and its{" "}
                <a href="https://www.r-graph-gallery.com/interactive-charts/" className={link}>
                  ggplotly
                </a>{" "}
                function.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <span id="historyanchor" />
      <section id="history" className="scroll-mt-20 bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em] sm:text-[32px] sm:leading-[44px]">
              Graphic classification history
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              From data to viz is not the first project aiming to classify the different form of data visualization.
              Here is a quick overview of this history:
            </p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {history.map((h) => (
              <li key={h.year} className="flex flex-col overflow-hidden border bg-card shadow-sm">
                <a href={h.image} className="block bg-white p-3">
                  <img src={h.image} alt={h.alt} loading="lazy" className="mx-auto h-56 w-full object-contain" />
                </a>
                <div className="flex-1 border-t p-5 text-sm leading-relaxed text-foreground/85 [&_a]:text-brand [&_a:hover]:underline">
                  <p className="mb-2 font-heading text-xl font-semibold text-brand">{h.year}</p>
                  <p>{h.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Acknowledgment */}
      <section id="acknowledgment" className="scroll-mt-20 py-16 sm:py-24">
        <span id="acknowledgmentanchor" />
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em] sm:text-[32px] sm:leading-[44px]">Acknowledgment</h2>
            <p className="mt-4 text-lg text-slate-600">
              This project would not exist without several blogs and website I consult on a daily basis. Even if they
              are not necessarily cited as sources, they are an essential source of inspiration.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3 [&_a]:text-brand [&_a:hover]:underline [&_li]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-5 [&_ul]:text-foreground/85">
            <div>
              <ColumnTitle>Websites</ColumnTitle>
              <ul>
                <li>
                  <a href="http://r4ds.had.co.nz">R for Data Science</a> by <i>Garrett Grolemund</i> and{" "}
                  <i>Hadley Wickham</i>.
                </li>
                <li>
                  <a href="https://www.visualcinnamon.com">Visual Cinnamon.com</a> by <i>Nadieh Bremer</i>
                </li>
                <li>
                  <a href="http://www.storytellingwithdata.com">Story telling with data</a> by{" "}
                  <i>Cole Nussbaumer Knaflic</i>
                </li>
                <li>
                  <a href="https://www.r-bloggers.com">R Bloggers</a> by <i>Tal Galili</i>
                </li>
                <li>
                  <a href="http://truth-and-beauty.net">Truth and Beauty</a> by <i>Moritz Stefaner</i>
                </li>
                <li>
                  <a href="https://blog.datawrapper.de">Chartable</a> by <i>Datawrapper</i>, especially the{" "}
                  <a href="https://blog.datawrapper.de/category/thoughts-how-to-s/">what to consider when</a> section
                  by <i>Lisa Charlotte Rost</i>
                </li>
                <li>
                  <a href="https://www.informationisbeautifulawards.com">Information is beautiful</a> by so many
                  talented people
                </li>
                <li>
                  <a href="http://viz.wtf">WTF visualizations</a> for inspiration
                </li>
                <li>
                  <a href="http://www.visualisingdata.com">Visualising data</a> by <i>Andy Kirk</i>
                </li>
                <li>
                  <a href="http://flowingdata.com">Flowing data</a> by <i>Nathan Yau</i>
                </li>
              </ul>
            </div>
            <div>
              <ColumnTitle>R packages</ColumnTitle>
              <ul>
                <li>
                  dplyr, tidyr and others from the <a href="https://www.tidyverse.org">tidyverse</a> for data
                  preparation
                </li>
                <li>
                  <a href="https://ggplot2.tidyverse.org/">ggplot2</a> for the vast majority of the graphics, together
                  with the <a href="https://github.com/hrbrmstr/hrbrthemes">hrbrtheme</a> for styling
                </li>
                <li>
                  <a href="https://github.com/thomasp85/patchwork">patchwork</a> to put graphics together
                </li>
                <li>
                  <a href="https://github.com/thomasp85/ggraph">ggraph</a> and igraph for most of the network related
                  graphics
                </li>
                <li>
                  <a href="https://www.r-graph-gallery.com/interactive-charts/">plotly</a> and other{" "}
                  <a href="https://www.htmlwidgets.org">html widgets</a> for interactive graphics
                </li>
                <li>
                  <a href="https://rmarkdown.rstudio.com">R Markdown</a> to build 95% of the website, together with
                  this <a href="https://holtzy.github.io/Pimp-my-rmd/">list of tips</a>.
                </li>
                <li>
                  <a href="https://github.com/cran/RColorBrewer">RColorBrewer</a> and{" "}
                  <a href="https://github.com/sjmgarnier/viridis">viridis</a> and colormap to control color in charts.
                </li>
                <li>
                  <a href="https://github.com/slowkow/ggrepel">Ggrepel</a> and other{" "}
                  <a href="http://www.ggplot2-exts.org/gallery/">ggplot2 extension</a> that make your life simpler.
                </li>
                <li>
                  <a href="https://github.com/talgalili/heatmaply">Heatmaply</a> for most of the heatmaps
                </li>
              </ul>
            </div>
            <div>
              <ColumnTitle>People</ColumnTitle>
              <ul>
                <li>
                  Feedbacks and encouragements:{" "}
                  <i>
                    M. <a href="https://www.linkedin.com/in/mélanie-doffagne-6404b775/">Doffagne</a>, G.{" "}
                    <a href="https://www.linkedin.com/in/guilhem-marre-42132b28/">Marre</a>, T.{" "}
                    <a href="https://www.linkedin.com/in/thibaut-deplanche/?locale=en_US">Déplanche</a>, A. Courtiol,
                    V. <a href="https://sites.google.com/site/ranwez/">Ranwez</a>, M.{" "}
                    <a href="http://masalmon.eu">Salmon</a>
                  </i>
                </li>
                <li>
                  Web knowledge:{" "}
                  <i>
                    G. <a href="https://www.linkedin.com/in/guillaume-debreu-7b360b125/">Debreu</a>
                  </i>
                </li>
                <li>
                  Website building:{" "}
                  <i>
                    T. <a href="https://github.com/hipyhop">Luff</a>
                  </i>
                </li>
                <li>
                  Text and general advices:{" "}
                  <i>
                    C. <a href="https://researchers.uq.edu.au/researcher/15031">Bradley</a>.
                  </i>
                </li>
                <li>
                  Multiple pull requests for english correction:{" "}
                  <i>
                    M. <a href="https://www.linkedin.com/in/mcsamuel/">Samuel</a>.
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
