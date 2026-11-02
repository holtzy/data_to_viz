import { CaveatLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/3d.html",
  title: "The issue with 3D in data visualization | Dataviz pitfall gallery",
  description:
    "Three dimensional objects are very popular but negatively affect the accuracy and speed at which one can interpret a graphic in most cases. Here is a…",
  image: "/img/mistake/3d.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The issue with 3D in data visualization" images={["/img/mistake/3d.png"]}>
      <p>
        <code>Three dimensional</code> objects are very popular but negatively affect the{" "}
        <code>accuracy</code> and <code>speed</code> at which one can interpret a graphic in most
        cases. Here is a review of the main graphic types involving 3d, with a discussion of whether
        or not they are considered bad practice.
      </p>

      <Section id="d-barplots-dont" title="3D Barplots: Don’t">
        <p>
          Here is a 3d barplot. You are probably familiar with this kind of figure since it is
          created with Excel, and thus widely used. Compared with a classic grouped barplot, this
          representation has several drawbacks:
        </p>
        <ul>
          {" "}
          <li>it is more difficult to find the exact percentages of a bar</li>{" "}
          <li>
            as contructed, for an equivalent value green bars in the back appear smaller than blue
            bars in the front
          </li>{" "}
          <li>green bars in the back are hidden</li>{" "}
        </ul>
        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/3d/1.webp"
            alt="img"
            width={500}
            height={277}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          <a href="https://www.quora.com/How-is-a-3D-column-chart-made-in-Excel">Source</a>{" "}
        </div>

        <p>
          <u>Workaround</u>: Just stick to the normal <a href="/graph/barplot.html">barplot</a>.
        </p>
      </Section>

      <Section id="d-pie-charts-dont" title="3D Pie charts: Don’t">
        <p>
          Nothing is worse than a <a href="/caveat/pie.html">pie chart</a> in dataviz, except a 3D
          pie chart. Data to viz offers a whole post on{" "}
          <a href="/caveat/pie.html">pie chart issues</a>.
        </p>

        <p>
          Adding 3D makes it even worse since it distorts reality. Indeed, the part at the back
          looks smaller than the one at the front, which is not the case.
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/3d/2.webp"
            alt="img"
            width={350}
            height={227}
            loading="lazy"
          />{" "}
        </div>

        <div className="text-center">
          {" "}
          <a href="http://www.e-tabs.com/data-viz-blog/3d-good-hd-bad-dv/">source</a>{" "}
        </div>

        <p>
          <u>Workaround</u>: Don’t make <a href="/caveat/pie.html">pie charts</a>.
        </p>
      </Section>

      <Section id="static-3d-scatterplots-dont" title="Static 3D scatterplots: Don’t">
        <p>
          The 3d scatterplot is another common use of 3d in data visualization. This kind of chart
          takes 3 numeric variables as inputs, and represents them on the X, Y and Z axes.
        </p>

        <p>
          The accuracy of 3D scatterplots is widely{" "}
          <a href="https://www.gabrielaplucinska.com/blog/2017/8/7/3d-graphs">discussed</a>. For
          instance, try to determine the X, Y and Z coordinates of a specific point. You will
          realize that it is quite impossible since the human eye reads 3d poorly. Thus, this
          graphic lacks accuracy.
        </p>

        <div className="text-center">
          {" "}
          <img
            src="/figures/caveat/3d/3.webp"
            alt="img"
            width={500}
            height={542}
            loading="lazy"
          />{" "}
        </div>

        <p>
          <u>Workaround</u>: Use a <a href="/graph/bubble.html">bubble chart</a> instead, or a{" "}
          <a href="/graph/scatter.html">scatterplot</a> with color gradients.
        </p>
      </Section>

      <Section
        id="interactive-3d-scatterplots-perhaps"
        title="Interactive 3D scatterplots: Perhaps"
      >
        <p>
          In my opinion, the 3d scatterplot can make sense only if you can interact with the chart.
          On the following, you can use your mouse to change the orientation of the plot and zoom on
          it. It gives a real feeling of 3D that does not exist otherwise. It is still hard to get
          the accurate coordinates of points, but allows one to efficiently explore the group
          structure.
        </p>

        <Code lang="r">{`# library
library(rgl)

# This is to output a rgl plot in a rmarkdown document. Note that you must add webgl=TRUE, results='hide' in the chunck header
library(knitr)
knit_hooks$set(webgl = hook_webgl)

# Data: the iris data is provided by R
data <- iris

# Add a new column with color
mycolors <- c('royalblue1', 'darkcyan', 'oldlace')
data$color <- mycolors[ as.numeric(data$Species) ]

# Plot
par(mar=c(0,0,0,0))
plot3d(
  x=data$\`Sepal.Length\`, y=data$\`Sepal.Width\`, z=data$\`Petal.Length\`,
  col = data$color,
  type = 's',
  radius = .1,
  xlab="Sepal Length", ylab="Sepal Width", zlab="Petal Length")`}</Code>

        <Widget src="/widgets/caveat/3d-1.html" height={864} width={864} />
      </Section>

      <Section id="surface-plot-why-not" title="Surface plot: Why not">
        <p>
          If you have grid coordinates with a numeric variable for each position, you can represent
          your data using a surface plot. This kind of representation makes sense especially if the
          numeric value represents an altitude. In this case, we are actually building a 3D element
          that is a real 3d object, which makes sense in my opinion.
        </p>

        <Code lang="r">{`# Library
library(plotly)

# Plot
plot_ly(z = volcano, type = "surface")`}</Code>

        <Widget src="/widgets/caveat/3d-2.html" height={480} width={672} />
      </Section>

      <Section id="going-further" title="Going further">
        <ul>
          {" "}
          <li>
            3D: good for HD, bad for DV by{" "}
            <a href="http://www.e-tabs.com/data-viz-blog/3d-good-hd-bad-dv/">E-tabs</a>
          </li>{" "}
          <li>
            When 3D works by Andy Kirk on{" "}
            <a href="http://www.visualisingdata.com/2015/03/when-3d-works/">Visualising data</a>.
          </li>{" "}
          <li>
            3D graphs by{" "}
            <a href="https://www.gabrielaplucinska.com/blog/2017/8/7/3d-graphs">
              data in the spotlight
            </a>
          </li>{" "}
          <li>
            Is the Avoidance of 3-D Bar Graphs a Knee-Jerk Reaction? by Stephen Few in{" "}
            <a href="https://www.perceptualedge.com/blog/?p=2362">Visual Business Intelligence</a>
          </li>{" "}
        </ul>
      </Section>
    </CaveatLayout>
  );
}
