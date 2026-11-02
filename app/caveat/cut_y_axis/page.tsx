import { CaveatLayout } from "@/components/layouts";
import { ButtonLink, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/cut_y_axis.html",
  title: "To cut or not to cut (the Y axis) | Dataviz pitfall gallery",
  description:
    "Cutting or not cutting the Y-axis is probably one of the most disputed topics in data visualization, as here, here and here. Basically, the issue is…",
  image: "/img/mistake/cut_y_axis.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="To cut or not to cut (the Y axis)"
      images={["/img/mistake/cut_y_axis.png"]}
    >
      <p>
        Cutting or not cutting the Y-axis is probably one of the most disputed topics in data
        visualization, as{" "}
        <a href="http://callingbullshit.org/tools/tools_misleading_axes.html">here</a>,{" "}
        <a href="https://qz.com/418083/its-ok-not-to-start-your-y-axis-at-zero/">here</a> and{" "}
        <a href="http://stephanieevergreen.com/y-axis/">here</a>. Basically, the issue is whether or
        not the Y-axis should always start at zero. Let’s try to find out why it is a struggle to
        gain consensus on this topic.
      </p>

      <Section id="when-it-is-bad" title="When it is bad">
        <p>Let’s start with a barplot showing the issue:</p>

        <div className="text-center">
          {" "}
          <img src="/figures/caveat/cut_y_axis/1.webp" alt="img" width={600} loading="lazy" />{" "}
        </div>

        <div className="text-center">
          {" "}
          Source: Fox News, via{" "}
          <a href="https://www.mediamatters.org/blog/2013/04/05/fox-news-newest-dishonest-chart-immigration-enf/193507">
            Media Matters for America
          </a>{" "}
        </div>
      </Section>

      <Section id="when-it-is-good" title="When it is good">
        <blockquote>
          <p>
            <em>
              “In general, in a time-series, use a baseline that shows the data not the zero point”
            </em>{" "}
            -{" "}
            <a href="https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=00003q">
              Edward Tufte
            </a>
          </p>
        </blockquote>
      </Section>

      <Section id="so-how-to-choose" title="So how to choose">
        <p>
          By its design, a bar graph emphasizes the absolute magnitude of values associated with
          each category, whereas a line graph emphasizes the change in the dependent variable
          (usually the y value) as the independent variable (usually the x value) changes.
        </p>
        <ul>
          {" "}
          <li>
            Barplot: With this kind of chart there is consensus: your Y-axis should starts at 0
          </li>{" "}
          <li>
            Line plot: Here however there is no consensus, even if in general you don’t have to
            start at 0.
          </li>{" "}
        </ul>
        <p>
          <em>Read more</em>:
        </p>
        <ul>
          {" "}
          <li>
            Have a look to this{" "}
            <a href="http://www.storytellingwithdata.com/blog/2018/3/9/bring-on-the-bar-charts">
              #SWD challenge
            </a>{" "}
            by storytelling with data: you will see that most of the entry ordered their barplot.
          </li>{" "}
          <li>Read more about barplot and lollipop plot</li>{" "}
          <li>Have a look to the collection of dataviz pitfalls:</li>{" "}
        </ul>
      </Section>
      <br />
      <div className="text-center">
        {" "}
        <ButtonLink href="/caveats.html">See the collection</ButtonLink>{" "}
      </div>
    </CaveatLayout>
  );
}
