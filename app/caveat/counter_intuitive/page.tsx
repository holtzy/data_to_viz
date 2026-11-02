import { CaveatLayout } from "@/components/layouts";
import { Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/counter_intuitive.html",
  title: "Don't be counter intuitive | Dataviz pitfall gallery",
  description:
    "People are used to seeing data displayed in a usual and logical way. Not respecting the standards of data visualization can make your chart hard to…",
  image: "/img/mistake/counter_intuitive.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Don't be counter intuitive"
      images={["/img/mistake/counter_intuitive.png"]}
    >
      <p>
        People are used to seeing data displayed in a usual and logical way. Not respecting the
        standards of data visualization can make your chart hard to understand, or even lead your
        audience to an incorrect conclusion.
      </p>

      <Section id="reversing-axis" title="Reversing axis">
        <p>
          The Y-axis almost always rises from the bottom to the top of the graphic. Here is an
          example with a reverse Y-axis. It comes from an article in{" "}
          <a href="https://www.businessinsider.in/This-Chart-Shows-What-Happened-To-Gun-Deaths-In-Florida-After-Stand-Your-Ground-Was-Enacted/articleshow/30635752.cms">
            business insider
          </a>{" "}
          and describes the evolution of gun deaths in Florida.
        </p>

        <p>
          <em>Disclaimer</em>: I found this image on{" "}
          <a href="https://www.kdnuggets.com/2016/02/common-data-visualization-mistakes.html">
            KD Nuggets
          </a>
        </p>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/counter_intuitive/1.webp"
            alt="img"
            width={600}
            height={751}
            loading="lazy"
          />{" "}
        </div>

        <p>
          Since we are not used to seeing that kind of axis, it is quite hard to understand that the
          number of murders committed using firearms in Florida increased between the end of the 90’
          and 2010. Even worse, a quick look at this graphic without paying attention to the Y-axis
          could lead to the wrong conclusion that the number of murders decreased in this period.
        </p>
      </Section>

      <Section id="cheating-with-colors" title="Cheating with colors">
        <p>
          Here is a marketing email from Google. It describes the behavior of 41% of the customers,
          but the green part of the donut chart represents 59% of the chart, which is very
          misleading. Source:{" "}
          <a href="http://viz.wtf/post/170949426657/new-marketing-email-from-google-email-design">
            WTF Visualizations
          </a>
          .
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/counter_intuitive/2.webp"
            alt="img"
            width={600}
            height={313}
            loading="lazy"
          />{" "}
        </div>
      </Section>

      <Section id="to-bear-in-mind" title="To bear in mind">
        <p>
          A good graphic includes pieces of data that teach something new to the reader. If these
          new pieces of information are displayed in a counter-intuitive manner, it may make the
          visualization more fascinating, but very well may confuse or mislead the audience. In some
          cases being creative is necessary for an impactful visualization, but in general it is
          important to respect visual display standards in order not to mislead the audience.
        </p>
      </Section>
    </CaveatLayout>
  );
}
