import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/SeveralNum.html",
  title: "Eleven features for 32 cars – from Data to Viz",
  description:
    "This page provides a few hints to visualize a dataset composed of several numeric variables. As an example the famous mtcars dataset will be considered.…",
  image: "/img/section/DensitySmall.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Eleven features for 32 cars"
      images={[
        "/img/section/DensitySmall.png",
        "/img/section/Box1Small.png",
        "/img/section/ViolinSmall.png",
        "/img/section/JoyplotSmall.png",
        "/img/section/HeatmapSmall.png",
        "/img/section/DendrogramSmall.png",
      ]}
    >
      <p>
        This page provides a few hints to visualize a dataset composed of several numeric variables.
        As an example the famous{" "}
        <a href="https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/mtcars.html">mtcars</a>{" "}
        dataset will be considered. It provides several features like the number of cylinders, the
        gross horsepower, the weight etc. for 32 car models.
      </p>
      <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(DT)
library(plotly)
library(dendextend)
library(car)
library(FactoMineR)
library(kableExtra)
options(knitr.table.format = "html")

# This dataset is available in R by default, and on the datatoviz github repo
data <- read.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/6_SeveralNum.csv", header=T)
rownames(data) <- data[,1]
data <- data[,-1]

# Save it at .csv for the github repo
#write.csv(mtcars, file="../Example_dataset/6_SeveralNum.csv", quote=F)

# show data
data %>% head(6) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="text-right">mpg</th>
              <th className="text-right">cyl</th>
              <th className="text-right">disp</th>
              <th className="text-right">hp</th>
              <th className="text-right">drat</th>
              <th className="text-right">wt</th>
              <th className="text-right">qsec</th>
              <th className="text-right">vs</th>
              <th className="text-right">am</th>
              <th className="text-right">gear</th>
              <th className="text-right">carb</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mazda RX4</td>
              <td className="text-right">21.0</td>
              <td className="text-right">6</td>
              <td className="text-right">160</td>
              <td className="text-right">110</td>
              <td className="text-right">3.90</td>
              <td className="text-right">2.620</td>
              <td className="text-right">16.46</td>
              <td className="text-right">0</td>
              <td className="text-right">1</td>
              <td className="text-right">4</td>
              <td className="text-right">4</td>
            </tr>
            <tr>
              <td>Mazda RX4 Wag</td>
              <td className="text-right">21.0</td>
              <td className="text-right">6</td>
              <td className="text-right">160</td>
              <td className="text-right">110</td>
              <td className="text-right">3.90</td>
              <td className="text-right">2.875</td>
              <td className="text-right">17.02</td>
              <td className="text-right">0</td>
              <td className="text-right">1</td>
              <td className="text-right">4</td>
              <td className="text-right">4</td>
            </tr>
            <tr>
              <td>Datsun 710</td>
              <td className="text-right">22.8</td>
              <td className="text-right">4</td>
              <td className="text-right">108</td>
              <td className="text-right">93</td>
              <td className="text-right">3.85</td>
              <td className="text-right">2.320</td>
              <td className="text-right">18.61</td>
              <td className="text-right">1</td>
              <td className="text-right">1</td>
              <td className="text-right">4</td>
              <td className="text-right">1</td>
            </tr>
            <tr>
              <td>Hornet 4 Drive</td>
              <td className="text-right">21.4</td>
              <td className="text-right">6</td>
              <td className="text-right">258</td>
              <td className="text-right">110</td>
              <td className="text-right">3.08</td>
              <td className="text-right">3.215</td>
              <td className="text-right">19.44</td>
              <td className="text-right">1</td>
              <td className="text-right">0</td>
              <td className="text-right">3</td>
              <td className="text-right">1</td>
            </tr>
            <tr>
              <td>Hornet Sportabout</td>
              <td className="text-right">18.7</td>
              <td className="text-right">8</td>
              <td className="text-right">360</td>
              <td className="text-right">175</td>
              <td className="text-right">3.15</td>
              <td className="text-right">3.440</td>
              <td className="text-right">17.02</td>
              <td className="text-right">0</td>
              <td className="text-right">0</td>
              <td className="text-right">3</td>
              <td className="text-right">2</td>
            </tr>
            <tr>
              <td>Valiant</td>
              <td className="text-right">18.1</td>
              <td className="text-right">6</td>
              <td className="text-right">225</td>
              <td className="text-right">105</td>
              <td className="text-right">2.76</td>
              <td className="text-right">3.460</td>
              <td className="text-right">20.22</td>
              <td className="text-right">1</td>
              <td className="text-right">0</td>
              <td className="text-right">3</td>
              <td className="text-right">1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Section id="check-distribution" title="Check distribution">
        <p>
          In my opinion, the first thing to do when you have several numeric variables is to observe
          their distribution one by one. This can be done using a{" "}
          <a href="/graph/violin.html">violin plot</a>, a <a href="/caveat/boxplot.html">boxplot</a>{" "}
          or a <a href="/graph/ridgeline.html">ridgeline plot</a> if your variables are all on the
          same scale. In the case of the <code>mtcars</code> dataset the variables are completely
          different one to each other so it make more sense to make an{" "}
          <a href="/graph/histogram.html">histogram</a> for each of them:
        </p>

        <Code lang="r">{`# Keep the numeric variables of the mtcars dataset
data <- mtcars %>% select( disp, drat, hp, mpg, qsec, wt)

# Show the histogram of these variables
data %>%
  as.tibble() %>%
  gather(variable, value) %>%
  ggplot( aes(x=value) ) +
    geom_histogram( fill= "#69b3a2") +
    facet_wrap(~variable, scale="free") +
    theme_ipsum()`}</Code>

        <figure>
          <img
            src="/figures/story/SeveralNum/1.webp"
            alt="Eleven features for 32 cars – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>
      <Section id="correlogram" title="Correlogram">
        <p>
          A <a href="/graph/correlogram.html">correlogram</a> or correlation matrix allows to
          analyse the relationship between each pair of numeric variables of a dataset. The
          relationship between each pair of variable is visualised through a scatterplot, or a
          symbol that represents the correlation (bubble, line, number..). The diagonal often
          represents the distribution of each variable, using an{" "}
          <a href="/graph/histogram.html">histogram</a> or a{" "}
          <a href="/graph/density.html">density plot</a>.
        </p>

        <Code lang="r">{`scatterplotMatrix(~mpg+disp+drat+hp+qsec+wt, data=data , reg.line=FALSE, col="#69b3a2", id.col="#69b3a2", smooth=FALSE , cex=1.5 , pch=20 )`}</Code>

        <p>
          <img
            src="/figures/story/SeveralNum/2.webp"
            alt="Eleven features for 32 cars – chart example"
            width={672}
            loading="lazy"
          />{" "}
          It is a powerful method that give a good overview of the dataset in an unique graphic. For
          instance, it is obvious that displacement (<code>disp</code>) and gross horsepower (
          <code>hp</code>) have a strong correlation.
        </p>
      </Section>
      <Section id="dendrogram" title="Dendrogram">
        <p>
          A <a href="/graph/dendrogram.html">dendrogram</a> can be used to check the result of a
          clustering algorythm on the dataset. Basically, the steps are:
        </p>
        <ul>
          {" "}
          <li>
            compute the distance between each pair of sample using <code>correlation</code> or{" "}
            <code>euclidean distance</code>.
          </li>{" "}
          <li>
            perform clustering on this matrix: it builds a hierarchy of clusters: groups sample that
            are close one from another
          </li>{" "}
          <li>show the result as a dendrogram:</li>{" "}
        </ul>
        <Code lang="r">{`# Clusterisation using 3 variables
data %>% dist() %>% hclust() %>% as.dendrogram() -> dend

# Color in function of the cluster
par(mar=c(1,1,1,7))
dend %>%
  set("labels_col", value = c("#69b3a2", "#404080", "orange"), k=3) %>%
  set("branches_k_color", value = c("#69b3a2", "#404080", "orange"), k = 3) %>%
  plot(horiz=TRUE, axes=FALSE)
abline(v = 350, lty = 2)`}</Code>

        <figure>
          <img
            src="/figures/story/SeveralNum/3.webp"
            alt="Eleven features for 32 cars – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          Here, the dendrogram informs us that the Mercedes 280 and the Mercedes 280C have similar
          features, what makes sense. Basically, it gives an idea of group of cars that are similar
          one another.
        </p>

        <p>
          See more about it <a href="/graph/dendrogram.html">here</a>.
        </p>
      </Section>
      <Section id="heatmap" title="Heatmap">
        <p>
          The <a href="/graph/heatmap.html">heatmap</a> is often used in complement of a dendrogram.
          It is a graphical representation of data where the individual values contained in a matrix
          are represented as colors. It is a bit like looking a data table from above.
        </p>

        <p>
          In addition of a dendrogram, it allows to understand why samples ore features are grouped
          together.
        </p>

        <Code lang="r">{`library(d3heatmap)
d3heatmap(data, k_row = 4, k_col = 2, scale = "column")`}</Code>

        <Widget src="/widgets/story/SeveralNum-1.html" height={480} width={768} />

        <p>
          The heatmap above allows to understand why cars are split in 2 main clusters. For instance
          the weight (<code>wt</code>) is much higher for the group on top than for the other.
        </p>
      </Section>
      <Section id="pca" title="PCA">
        <p>
          The Principal Component Analysis is a statistical procedure that aims to summarize all the
          available numeric variables in a set of principal components.
        </p>

        <Code lang="r">{`myPCA <- PCA(data, scale.unit=TRUE, graph=F)

myPCA$ind %>%
  as.data.frame() %>%
  mutate(name=rownames(.)) %>%
  ggplot( aes(x=coord.Dim.1, y=coord.Dim.2, label=name)) +
    geom_point( color="#69b3a2") +
    theme_ipsum() +
    geom_label(color="#69b3a2")`}</Code>

        <figure>
          <img
            src="/figures/story/SeveralNum/4.webp"
            alt="Eleven features for 32 cars – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <Code lang="r">{`#plot.PCA(myPCA, axes=c(1, 2), choix="var")`}</Code>

        <p>
          <em>Note</em>: this section needs <code>improvement</code>
        </p>
      </Section>
      <Section id="getting-a-correlation-matrix" title="Getting a correlation matrix">
        <p>
          It is of importance to note that this kind of dataset can be converted to a correlation
          matrix that is an <a href="/story/AdjacencyMatrix.html">adjacency matrix</a>. Indeed, we
          can compute the correlation between each pair of variable or each pair of entities of the
          dataset and try to visualize this new dataset. But this is a new story:{" "}
          <a href="/story/AdjacencyMatrix.html">how to visualize an adjacency matrix</a>.
        </p>
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/density.html" title="Density">
          <img
            src="/img/section/DensitySmall.png"
            alt="Density"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/caveat/boxplot.html" title="Boxplot">
          <img src="/img/section/Box1Small.png" alt="Boxplot" loading="lazy" className="size-24" />
        </a>
        <a href="/graph/violin.html" title="Violin">
          <img src="/img/section/ViolinSmall.png" alt="Violin" loading="lazy" className="size-24" />
        </a>
        <a href="/graph/ridgeline.html" title="Ridgeline plot">
          <img
            src="/img/section/JoyplotSmall.png"
            alt="Ridgeline plot"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/heatmap.html" title="Heatmap">
          <img
            src="/img/section/HeatmapSmall.png"
            alt="Heatmap"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/dendrogram.html" title="Dendrogram">
          <img
            src="/img/section/DendrogramSmall.png"
            alt="Dendrogram"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
