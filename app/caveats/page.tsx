import { PageShell } from "@/components/layouts";
import { buttonClass } from "@/lib/button";
import { KitForm } from "@/components/newsletter";
import { pageMetadata } from "@/lib/metadata";
import { RelatedCard } from "@/components/content";
import { TitleUnderline } from "@/components/title-underline";
import { DownloadFlashcards } from "./download-flashcards";
import { FlashcardGallery } from "./flashcard-gallery";

type CaveatItem = { href: string; image: string; title: string; text: string; tags: string[]; external?: boolean };

export const metadata = pageMetadata({
  path: "/caveats.html",
  title: "Data to Viz | A collection of graphic pitfalls",
  description:
    "A collection of dataviz caveats: pie charts, cut Y axis, spaghetti plots, error bars, overplotting, 3D, dual axes and more common graphic pitfalls to avoid.",
  image: "/img/parallax/caveat_gallery_overview.png",
});

/**
 * Flashcard (github.com/holtzy/dataviz-caveat-flashcards) → the article that
 * covers the same caveat. Cards without an entry only open in the lightbox.
 */
const FLASHCARD_ARTICLES: Record<string, string> = {
  "01-rank-your-barplot": "/caveat/order_data.html",
  "02-prefer-horizontal-labels": "/caveat/hard_label.html",
  "03-do-not-cut-y-axis": "/caveat/cut_y_axis.html",
  "04-histogram-mind-the-bin": "/caveat/bin_size.html",
  "05-boxplots-hide-info": "/caveat/boxplot.html",
  "06-use-color-intentionally": "/caveat/color_com_nothing.html",
  "07-map-bubble-size-to-area": "/caveat/radius_or_area.html",
  "08-avoid-moire-effect":
    "https://web.archive.org/web/20181226161528/http://gravyanecdote.com/uncategorized/wrappedbarsthoughts/",
  "09-the-spaghetti-chart": "/caveat/spaghetti.html",
  "10-keep-colors-consistent": "/caveat/consistency.html",
  "12-avoid-counterintuitive": "/caveat/counter_intuitive.html",
  "13-whats-wrong-with-pie": "/caveat/pie.html",
  "14-error-bars-on-barplot": "/caveat/error_bar.html",
  "15-dual-y-axis": "/caveat/dual_axis.html",
  "16-radial-bar-chart": "/caveat/circular_barplot_accordeon.html",
  "17-connect-the-dots": "/caveat/connect_your_dot.html",
  "19-avoid-3d": "/caveat/3d.html",
  "24-stacked-charts-are-hard": "/caveat/stacking.html",
  "28-scatter-plot-aspect-ratio": "/caveat/aspect_ratio.html",
  "41-normalize-your-maps": "https://xkcd.com/1138/",
  "44-avoid-the-rainbow-palette": "https://blog.datawrapper.de/colors/",
  "47-reorder-your-heatmap": "/graph/heatmap.html",
  "48-beware-of-overplotting": "/caveat/overplotting.html",
  "55-annotate-your-chart": "/caveat/annotation.html",
  "56-simpsons-paradox": "/caveat/simpson.html",
  "57-circular-barplot-distortion": "/caveat/circular_bar_yaxis.html",
};

/** The original gallery. Items without a flashcard are listed under "More caveats". */
const caveats: CaveatItem[] = [
  {
    href: "/caveat/order_data.html",
    image: "/img/mistake/order_data.png",
    title: "Order your data",
    text: "When displaying the value of several entities, ordering them makes the graph much more insightful.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/cut_y_axis.html",
    image: "/img/mistake/cut_y_axis.png",
    title: "To cut or not to cut?",
    text: "Cutting the Y-axis is one of the most controversial practice in data viz. See why.",
    tags: ["misleading", "top10", "bar"],
  },
  {
    href: "/caveat/spaghetti.html",
    image: "/img/mistake/spaghetti.png",
    title: "The spaghetti chart",
    text: "A line graph with too many lines becomes unreadable: it is called a spaghetti graph.",
    tags: ["improvement"],
  },
  {
    href: "/caveat/pie.html",
    image: "/img/mistake/pie.png",
    title: "Pie chart",
    text: "The human eye is bad at reading angles. See how to replace the most criticized chart ever.",
    tags: ["improvement", "top10"],
  },
  {
    href: "/caveat/bin_size.html",
    image: "/img/mistake/bin_size.png",
    title: "Play with histogram bin size",
    text: "Always try different bin sizes when you build a histogram, it can lead to different insights.",
    tags: ["misleading"],
  },
  {
    href: "/caveat/boxplot.html",
    image: "/img/mistake/boxplot.png",
    title: "Do boxplots hide information?",
    text: "Boxplots are a great way to summarize a distribution but hide the sample size and their distribution.",
    tags: ["misleading", "improvement", "top10"],
  },
  {
    href: "/caveat/error_bar.html",
    image: "/img/mistake/error_bar.png",
    title: "The problem with error bars",
    text: "Barplots with error bars must be used with great care. See why and how to replace them.",
    tags: ["misleading", "improvement", "top10", "bar"],
  },
  {
    href: "/caveat/multi_distribution.html",
    image: "/img/mistake/multi_distribution.png",
    title: "Too many distributions.",
    text: "If you need to compare the distributions of many variables, don't clutter your graphic.",
    tags: ["improvement"],
  },
  {
    href: "/caveat/overplotting.html",
    image: "/img/mistake/overplotting.png",
    title: "Overplotting",
    text: "Too many points on your scatter plot makes it unreadable? Techniques exist to avoid overplotting.",
    tags: ["improvement"],
  },
  {
    href: "https://blog.datawrapper.de/colors/",
    image: "/img/mistake/rainbow.png",
    title: "The rainbow color palette",
    text: "Avoid the rainbow color palette when you map a numeric variable. So many better palettes exist.",
    tags: ["improvement"],
    external: true,
  },
  {
    href: "/caveat/small_multiple.html",
    image: "/img/mistake/small_multiple.png",
    title: "Faceting: horizontal or vertical?",
    text: "Placing the individual plot horizontally or vertically is an important choice to make.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/counter_intuitive.html",
    image: "/img/mistake/counter_intuitive.png",
    title: "Don't be counter intuitive",
    text: "Your audience is used to a few dataviz standards. Not respecting standards can be misleading.",
    tags: ["misleading"],
  },
  {
    href: "/caveat/dual_axis.html",
    image: "/img/mistake/dual_axis.png",
    title: "The problem with dual axes",
    text: "Using dual axes is a good way to manipulate the history behind your data. Avoid it.",
    tags: ["misleading", "top10"],
  },
  {
    href: "/caveat/calculation_error.html",
    image: "/img/mistake/calculation_error.png",
    title: "Calculation errors",
    text: "Always double-check the values written on the chart. Does your sum make sense?",
    tags: ["misleading"],
  },
  {
    href: "/caveat/circular_barplot_accordeon.html",
    image: "/img/mistake/circular_barplot_accordeon.png",
    title: "Barplots with radial coordinates",
    text: "This kind of barplot distorts reality: outer bars tend to look bigger than inner ones.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/connect_your_dot.html",
    image: "/img/mistake/connect_your_dot.png",
    title: "Connect your dots",
    text: "If your X-axis is ordered, connecting the dots will make the message much clearer.",
    tags: ["improvement"],
  },
  {
    href: "/caveat/color_com_nothing.html",
    image: "/img/mistake/color_com_nothing.png",
    title: "Color that communicates nothing",
    text: "A bad use of colors can be misleading. If your color does not represent anything, don't use it.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/radius_or_area.html",
    image: "/img/mistake/radius_or_area.png",
    title: "Bubble size: radius or area?",
    text: "When using bubbles on a chart, their area must be proportional to the underlying variable. Not their radius.",
    tags: ["misleading"],
  },
  {
    href: "/caveat/hard_label.html",
    image: "/img/mistake/hard_label.png",
    title: "When axis labels break your neck",
    text: "Having long and vertical axis labels can be annoying. If you can, flip your chart.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/circular_bar_yaxis.html",
    image: "/img/mistake/circular_bar_yaxis.png",
    title: "Circular barplots and distortion",
    text: "Set a sufficient inner circle size to avoid bar shape distortion.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/3d.html",
    image: "/img/mistake/3d.png",
    title: "The issue with 3D",
    text: "Except in a few rare situations, 3D must be avoided. It distorts reality.",
    tags: ["misleading", "bar"],
  },
  {
    href: "/caveat/aspect_ratio.html",
    image: "/img/mistake/aspect_ratio.png",
    title: "Mind the aspect ratio",
    text: "Avoid extreme aspect ratios. They can make a plot unreadable.",
    tags: ["improvement", "misleading"],
  },
  {
    href: "/caveat/stacking.html",
    image: "/img/mistake/stacking.png",
    title: "The issue with stacking",
    text: "Stacking makes it difficult to analyze each represented group. See when to use it.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/mental_calculation.html",
    image: "/img/mistake/mental_workout.png",
    title: "Mental arithmetic",
    text: "Don't ask the reader to do mental arithmetic, it is hard to compare shapes.",
    tags: ["improvement"],
  },
  {
    href: "/caveat/area_hard.html",
    image: "/img/mistake/bubble_hard.png",
    title: "Area is a poor metaphor",
    text: "Human brains struggle to translate areas to precise values. Prefer other shapes.",
    tags: ["misleading"],
  },
  {
    href: "/caveat/grouped_bar.html",
    image: "/img/mistake/ungrouped_grouped_barplot.png",
    title: "Grouped barplots must be grouped",
    text: "In a grouped barplot, bars in the same group must be close one to each other. It makes grouping obvious.",
    tags: ["improvement", "bar"],
  },
  {
    href: "/caveat/declutter.html",
    image: "/img/mistake/declutter_your_graphic.png",
    title: "De-clutter your graphic",
    text: "Keep only what's necessary on your graphic: 3d, color effect, redundant info, etc. hide the story.",
    tags: ["improvement"],
  },
  {
    href: "https://www.r-graph-gallery.com/239-custom-layout-legend-ggplot2.html",
    image: "/img/mistake/mind_your_legend.png",
    title: "Mind your legend",
    text: "A few tips for a useful legend. Hint: you should worry if you have 14 groups.",
    tags: ["improvement"],
    external: true,
  },
  {
    href: "/caveat/consistency.html",
    image: "/img/mistake/consistency_sev_graph.png",
    title: "Consistency between charts",
    text: "If you present several graphics, be consistent. Does each color always represent the same group?",
    tags: ["improvement", "misleading"],
  },
  {
    href: "/caveat/spider.html",
    image: "/img/mistake/spider.png",
    title: "Spider chart and its caveats",
    text: "Spider or radar charts are often criticized in dataviz, here is an overview of the topic.",
    tags: ["improvement", "misleading"],
  },
  {
    href: "/graph/heatmap.html",
    image: "/img/mistake/heatmap.png",
    title: "What you should consider when doing a heatmap",
    text: "Heatmaps are a powerful way of visualizing information. A few features must be considered.",
    tags: ["improvement"],
  },
  {
    href: "/caveat/simpson.html",
    image: "/img/mistake/simpson.png",
    title: "The Simpson paradox",
    text: "When a trend appears in several different groups of data but reverses when these groups are combined",
    tags: ["misleading", "top10"],
  },
  {
    href: "/caveat/annotation.html",
    image: "/img/mistake/annotate.png",
    title: "Annotate your chart",
    text: "Help the reader understand your point: highlight the important part",
    tags: ["improvement"],
  },
  {
    href: "https://web.archive.org/web/20181226161528/http://gravyanecdote.com/uncategorized/wrappedbarsthoughts/",
    image: "/img/mistake/moire.png",
    title: "The Moire effect",
    text: "If you have a barplot with many bars of similar length, consider a lollipop chart instead.",
    tags: ["improvement", "bar"],
    external: true,
  },
  {
    href: "https://xkcd.com/1138/",
    image: "/img/mistake/choropleth_normalization.png",
    title: "Choropleth and normalization",
    text: "If you don't scale your data, your choropleth will basically look like a population map.",
    tags: ["misleading", "map", "top10"],
    external: true,
  },
  {
    href: "https://blog.datawrapper.de/weeklychart-logscale3/",
    image: "/img/mistake/map_scale.png",
    title: "How to read a log scale",
    text: "Comparing percentage change on a linear scale can be misleading, use a log scale instead. By datawrapper.",
    tags: ["misleading", "map"],
    external: true,
  },
  {
    href: "https://twitter.com/hashtag/chloropleth",
    image: "/img/mistake/choropleth_vocab.png",
    title: "There is no 'L' in choropleth",
    text: "And people won't miss an opportunity to make you notice..",
    tags: ["map"],
    external: true,
  },
];

/** Articles of the original gallery that no flashcard covers yet. */
const covered = new Set(Object.values(FLASHCARD_ARTICLES));
const moreCaveats = caveats.filter((c) => !covered.has(c.href));

export default function Page() {
  return (
    <PageShell>
      <section id="caveats">
        {/* Hero, laid out like the top of the React Graph Gallery. */}
        <header className="flex flex-col items-center px-4 pt-36 pb-10 text-center sm:pt-44">
          <h1 className="font-heading text-[36px] leading-[46px] font-bold tracking-[0.03em] sm:text-5xl sm:leading-[60px]">
            Dataviz Caveats
          </h1>
          <TitleUnderline className="mt-3" />
          <p className="mt-4 max-w-md text-slate-600">
            There are many ways to break a graph. Here is a list of the most common dataviz caveats and how to fix them,
            each illustrated as a little flashcard.
          </p>
          <div className="pt-8">
            <DownloadFlashcards />
          </div>
        </header>

        <div className="mx-auto max-w-[880px] px-6 pt-4 pb-12 sm:px-10">
          <FlashcardGallery articles={FLASHCARD_ARTICLES} />

          <section aria-labelledby="more-caveats" className="mt-16">
            <h2
              id="more-caveats"
              className="scroll-mt-24 border-b border-slate-100 pb-2 font-heading text-[28px] leading-9 font-bold tracking-[0.03em]"
            >
              More caveats
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {moreCaveats.map((c) => (
                <li key={c.href} className="flex">
                  <RelatedCard href={c.href} image={c.image} title={c.title}>
                    {c.text}
                  </RelatedCard>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 text-center">
            <a href="/" className={buttonClass("secondary", "lg")}>
              Back to Data-to-viz.com
            </a>
          </div>
        </div>
      </section>
      <section id="form" className="scroll-mt-20 border-t bg-muted/50 py-16 sm:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
          <h2 className="font-heading text-[28px] leading-9 font-bold tracking-[0.03em]">
            ❤️ Enjoying the project? ❤️
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dive deeper into the world of data visualization with <i>Dataviz Universe</i>, my newsletter packed with{" "}
            <b>actionable tips and tricks</b> to enhance your data storytelling skills.
          </p>
          <div className="mt-6 w-full">
            <KitForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
