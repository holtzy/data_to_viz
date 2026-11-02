import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/heatmap.html",
  title: "Heatmap – from Data to Viz",
  description:
    "A heatmap is a graphical representation of data where the individual values contained in a matrix are represented as colors. It is a bit like looking a…",
  image: "/img/section/HeatmapSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Heatmap" images={["/img/section/HeatmapSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>heatmap</code> is a graphical representation of data where the individual values
          contained in a <strong>matrix</strong> are represented as colors. It is a bit like looking
          a data table from above.
        </p>

        <p>
          Here is an example showing 8 general features like population or life expectancy for about
          30 countries in 2015. Data come from the French National Institute of{" "}
          <a href="https://www.ined.fr/en/everything_about_population/data/all-countries/?lst_continent=908&lst_pays=926">
            Demographic Studies
          </a>
          .
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(viridis)
library(plotly)
# d3heatmap is not on CRAN yet, but can be found here: https://github.com/talgalili/d3heatmap
library(d3heatmap)

# Load data
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/multivariate.csv", header = T, sep = ";")
colnames(data) <- gsub("\\\\.", " ", colnames(data))

# Select a few country
data <- data %>%
  filter(Country %in% c("France", "Sweden", "Italy", "Spain", "England", "Portugal", "Greece", "Peru", "Chile", "Brazil", "Argentina", "Bolivia", "Venezuela", "Australia", "New Zealand", "Fiji", "China", "India", "Thailand", "Afghanistan", "Bangladesh", "United States of America", "Canada", "Burundi", "Angola", "Kenya", "Togo")) %>%
  arrange(Country) %>%
  mutate(Country = factor(Country, Country))

# Matrix format
mat <- data
rownames(mat) <- mat[,1]
mat <- mat %>% dplyr::select(-Country, -Group, -Continent)
mat <- as.matrix(mat)

# Heatmap
#d3heatmap(mat, scale="column", dendrogram = "none", width="800px", height="80Opx", colors = "Blues")

library(heatmaply)
p <- heatmaply(mat,
        dendrogram = "none",
        xlab = "", ylab = "",
        main = "",
        scale = "column",
        margins = c(60,100,40,20),
        grid_color = "white",
        grid_width = 0.00001,
        titleX = FALSE,
        hide_colorbar = TRUE,
        branches_lwd = 0.1,
        label_names = c("Country", "Feature:", "Value"),
        fontsize_row = 5, fontsize_col = 5,
        labCol = colnames(mat),
        labRow = rownames(mat),
        heatmap_layers = theme(axis.line = element_blank())
        )`}</Code>

        <div className="text-center">
          <Widget src="/widgets/graph/heatmap-1.html" height={576} width={576} />
        </div>

        <p>
          <em>Note</em>: You can learn more about this dataset and how to visualize it in the
          dedicated page
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          A heatmap is really useful to display a <code>general view</code> of numerical data,{" "}
          <strong>not</strong> to extract specific data point. In the graphic above, the huge
          population size of China and India pops out for example.
        </p>

        <p>
          A heatmap is also useful to display the result of <code>hierarchical clustering</code>.
          Basically, clustering checks which countries tend to have the same features on their
          numeric variables, and therefore which countries are <strong>similar</strong>. The usual
          way to represent the result is to use <a href="/graph/dendrogram.html">dendrograms</a>.
          This type of chart can be drawn around the heatmap:
        </p>

        <Code lang="r">{`p <- heatmaply(mat,
        #dendrogram = "row",
        xlab = "", ylab = "",
        main = "",
        scale = "column",
        margins = c(60,100,40,20),
        grid_color = "white",
        grid_width = 0.00001,
        titleX = FALSE,
        hide_colorbar = TRUE,
        branches_lwd = 0.1,
        label_names = c("Country", "Feature:", "Value"),
        fontsize_row = 5, fontsize_col = 5,
        labCol = colnames(mat),
        labRow = rownames(mat),
        heatmap_layers = theme(axis.line=element_blank())
        )

# save the widget
# library(htmlwidgets)
# saveWidget(p, file= "~/Desktop/R-graph-gallery/HtmlWidget/heatmapInter.html")`}</Code>

        <div className="text-center">
          <Widget src="/widgets/graph/heatmap-2.html" height={576} width={576} />
        </div>

        <p>
          Here, Burundi and Angola are grouped together. Indeed they are two countries in strong
          expansion, with a lot of children per woman but still a strong mortality rate.
        </p>

        <p>
          <em>Note</em>: in this heatmap, features are also clusterised. For instance, birth rate
          and children per woman are grouped together since they are highly correlated.
        </p>

        <p>
          <em>Note</em>: hierarchical clustering is a complex statistical method. You can learn more
          about it <a href="https://en.wikipedia.org/wiki/Hierarchical_clustering">here</a>.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <ul>
          {" "}
          <li>
            <p>
              We’ve seen in the previous section that a heatmap is often used to display the result
              of a clustering algorithm. A common task is to compare the result with expectations.
              For instance, we can check if the countries are clustering according to their
              continent using a <code>color bar</code>.
            </p>
          </li>{" "}
          <li>
            <p>
              For a static heatmap, a common practice is to display the <strong>exact value</strong>{" "}
              of each cell in numbers. Indeed, it is hard to translate a color into a precise
              number.
            </p>
          </li>{" "}
          <li>
            <p>
              Heatmaps can also be used for time series where there is a{" "}
              <strong>regular pattern</strong> in time.
            </p>
          </li>{" "}
          <li>
            <p>
              Heatmaps can be applied to <strong>adjacency matrices</strong>.
            </p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>Often need to normalize your data</li>{" "}
          <li>
            Use <strong>cluster analysis</strong> and thus permute the rows and the columns of the
            matrix to place similar values near each other according to the clustering
          </li>{" "}
          <li>Color palette is important</li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/scatter.html"
            image="/img/section/ScatterPlotSmall.png"
            title="Scatter plot"
          >
            Display the relationship between 2 numeric variables
          </RelatedCard>
          <RelatedCard
            href="/graph/correlogram.html"
            image="/img/section/CorrelogramSmall.png"
            title="Correlogram"
          >
            Shows the relationship between each pair of numeric variables
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
          The <a href="https://r-graph-gallery.com/heatmap.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/heatmap/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/heatmap">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/heatmap">D3</a> graph galleries are 4 websites
          providing hundreds of chart example, always providing the reproducible code. Click the
          button below to see how to build the chart you need with your favorite programing
          language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/heatmap.html">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/heatmap/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/heatmap">React gallery</ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/heatmap">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
