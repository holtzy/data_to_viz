import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/correlogram.html",
  title: "Correlogram – from Data to Viz",
  description:
    "A correlogram or correlation matrix allows to analyse the relationship between each pair of numeric variables of a dataset. The relationship between each…",
  image: "/img/section/CorrelogramSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Correlogram" images={["/img/section/CorrelogramSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>correlogram</code> or correlation matrix allows to analyse the relationship
          between each pair of numeric variables of a dataset. The relationship between each pair of
          variable is visualised through a <a href="/graph/scatter.html">scatterplot</a>, or a
          symbol that represents the correlation (bubble, line, number..).
        </p>

        <p>
          The diagonal often represents the <code>distribution</code> of each variable, using an{" "}
          <a href="/graph/histogram.html">histogram</a> or a{" "}
          <a href="/graph/density.html">density plot</a>.
        </p>

        <Code lang="python">{`# library & dataset
import seaborn as sns
df = sns.load_dataset('iris')
import matplotlib.pyplot as plt
 
# Basic correlogram
sns_plot = sns.pairplot(df)
sns_plot.savefig("IMG/correlogram1.png")`}</Code>

        <figure>
          <img
            src="/figures/graph/correlogram/1.webp"
            alt="Correlogram – chart example"
            width={960}
            height={960}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: exceptionally, graphic provided in this page are made with{" "}
          <a href="https://python-graph-gallery.com/correlogram/">Python</a>, since I really like
          the <code>pairplot</code> function of the{" "}
          <a href="https://python-graph-gallery.com/correlogram/">seaborn library</a>.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Correlogram are really handy for <code>exploratory analysis</code>. It allows to visualize
          the relationships of the whole dataset in a glimpse. For instance, the linear relationship
          between petal length and petal width is obvious here, as the one concerning sepal.
        </p>

        <p>
          When you get a multivariate dataset, building a correlogram is one of the first step you
          should follow.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          All the variations described in the <a href="/graph/scatter.html">scatterplot</a> section
          are also available for correlogram. For example, why not applying a linear regression to
          each pair of variable:
        </p>

        <Code lang="python">{`# with regression
sns_plot = sns.pairplot(df, kind="reg")
sns_plot.savefig("IMG/correlogram2.png")`}</Code>

        <figure>
          <img
            src="/figures/graph/correlogram/2.webp"
            alt="Correlogram – chart example"
            width={960}
            height={960}
            loading="lazy"
          />
        </figure>

        <p>
          As described in the scatterplot section, it is a good practice to display subgroups if a
          categoric variable is available as well:
        </p>

        <Code lang="python">{`# with regression
sns_plot = sns.pairplot(df, kind="scatter", hue="species", markers=["o", "s", "D"], palette="Set2")
sns_plot.savefig("IMG/correlogram3.png")`}</Code>

        <figure>
          <img
            src="/figures/graph/correlogram/3.webp"
            alt="Correlogram – chart example"
            width={1073}
            height={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Displaying the relationship between more than ~10 variables makes the plot very hard to
            read
          </li>{" "}
          <li>
            All the common caveats of <a href="/graph/scatter.html">scatterplot</a> and{" "}
            <a href="/graph/histogram.html">histogram</a> apply
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/bubble.html"
            image="/img/section/BubblePlotSmall.png"
            title="Bubble plot"
          >
            Add a third dimension to your scatter: the circle size
          </RelatedCard>
          <RelatedCard
            href="/graph/scatter.html"
            image="/img/section/ScatterPlotSmall.png"
            title="Scatter plot"
          >
            Display the relationship between 2 numeric variables
          </RelatedCard>
          <RelatedCard
            href="/graph/connectedscatter.html"
            image="/img/section/ScatterConnectedSmall.png"
            title="Connected Scatterplot"
          >
            Very close from a scatterplot, but link data points with segments
          </RelatedCard>
          <RelatedCard
            href="/graph/density2d.html"
            image="/img/section/2dDensitySmall.png"
            title="Density 2d"
          >
            One of the best way to avoid overplotting for big sample size
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/correlogram.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/correlogram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/correlogram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/correlogram.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/correlogram.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/correlogram/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/correlogram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/correlogram.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
