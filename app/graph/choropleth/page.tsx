import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/choropleth.html",
  title: "Choropleth map – from Data to Viz",
  description:
    "A choropleth map displays divided geographical areas or regions that are coloured in relation to a numeric variable. It allows to study how a variable…",
  image: "/img/section/ChoroplethSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Choropleth map" images={["/img/section/ChoroplethSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>choropleth map</code> displays divided geographical areas or regions that are
          coloured in relation to a numeric variable. It allows to study how a variable evolutes
          along a territory. It is a powerful and widely used data visualization technique. However,
          its downside is that regions with bigger sizes tend to have a bigger weight in the map
          interpretation, which includes a bias.
        </p>

        <p>Here is an example describing the distribution of restaurants in the south of france.</p>

        <Code lang="r">{`# Libraries
library(sf)
library(cartogram)
library(tidyverse)
library(broom)
library(viridis)
library(patchwork)
library(geojsonio)

# Import region boundaries
spdf <- geojson_read("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/communes.geojson",  what = "sp")

# Select a subset of the data
spdf <- spdf[substr(spdf@data$code, 1, 2) %in% c("06", "83", "13", "30", "34", "11", "66"), ]

# Convert the spatial data to an sf object
spdf_sf <- st_as_sf(spdf)

# Read the additional data
data <- read.table("https://raw.githubusercontent.com/holtzy/R-graph-gallery/master/DATA/data_on_french_states.csv", header = TRUE, sep = ";")

# Make sure the column names match for the join
names(spdf_sf)[names(spdf_sf) == "code"] <- "id"

# Merge the fortified data with the additional data
spdf_fortified <- spdf_sf %>%
  left_join(data, by = c("id" = "depcom"))
# Note that if the number of restaurant is NA, it is in fact 0
spdf_fortified$nb_equip[ is.na(spdf_fortified$nb_equip)] = NA

# Plot
p <- ggplot(spdf_fortified) +
  geom_sf(aes(fill = nb_equip), linewidth=0, alpha=0.9) +
  theme_void() +
  scale_fill_viridis(direction=-1, trans = "log", breaks=c(1,5,10,20,50,100), name="Number of restaurant", guide = guide_legend( keyheight = unit(3, units = "mm"), keywidth=unit(12, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1) ) +
  labs(
    title = "South of France Restaurant concentration",
    subtitle = "Number of restaurant per city district", 
    caption = "Data: INSEE | Creation: Yan Holtz | r-graph-gallery.com"
  ) +
  theme(
    text = element_text(color = "#22211d"), 
    plot.background = element_rect(fill = "#f5f5f2", color = NA), 
    panel.background = element_rect(fill = "#f5f5f2", color = NA), 
    legend.background = element_rect(fill = "#f5f5f2", color = NA),
    
    plot.title = element_text(size= 15, hjust=0.01, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    plot.subtitle = element_text(size= 12, hjust=0.01, color = "#4e4d47", margin = margin(b = -0.1, t = 0.43, l = 2, unit = "cm")),
    plot.caption = element_text( size=8, color = "#4e4d47", margin = margin(b = 0.3, r=-99, unit = "cm") ),
    
    legend.position = c(0.7, 0.09)
  ) +
  coord_sf(datum = NA)
p`}</Code>

        <figure>
          <img
            src="/figures/graph/choropleth/1.webp"
            alt="Choropleth map – chart example"
            width={960}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: Boundaries of city districts come from{" "}
          <a href="https://github.com/gregoiredavid/france-geojson">here</a>. Number of restaurant
          per district comes from <a href="https://www.insee.fr/fr/statistiques">here</a>.
        </p>

        <p>
          <em>Important Note</em>: Here, the absolute number of restaurant per district is shown.
          Keep in mind that an important bias is present: districts with large area and / or high
          number of inhabitants are more prone to have a lot of restaurants.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Choropleth maps are used to represent a variable on a map. It is a great way to show the
          distribution of a variable across a territory. It is often used in the field of
          demography, sociology, economy, etc. Here is a more concise version of the “What for”
          section:
        </p>

        <p>They offer several key benefits:</p>
        <ul>
          {" "}
          <li>
            <strong>Highlight Spatial Patterns</strong>: Easily identify trends and outliers across
            regions.
          </li>{" "}
          <li>
            <strong>Facilitate Comparison</strong>: Use color gradients to compare data values
            between areas.
          </li>{" "}
          <li>
            <strong>Integrate Data</strong>: Combine various data sources for a comprehensive
            geographical analysis.
          </li>{" "}
          <li>
            <strong>Scalability</strong>: Adapt to different geographical levels, from global to
            local.
          </li>{" "}
          <li>
            <strong>Customization</strong>: Adjust colors, classification methods, and add
            interactivity.
          </li>{" "}
          <li>
            <strong>Bias Mitigation</strong>: Normalize data and consider alternatives like
            cartograms to reduce biases from region size or population density.
          </li>{" "}
        </ul>
      </Section>

      <Section id="variation" title="Variation">
        <ul>
          {" "}
          <li>
            <a href="/graph/hexbinmap.html">Hexbin map</a>: A hexbin map is a variation of the
            choropleth map where the regions are replaced by hexagons. It is useful when the regions
            have a broad range of sizes.
          </li>{" "}
          <li>
            <a href="/graph/cartogram.html">Cartogram</a>: A cartogram is a variation of the
            choropleth map where the regions are resized according to the variable of interest. It
            is useful to avoid the biais introduced by the size of the regions, or to illustrate
            this biais.
          </li>{" "}
        </ul>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            Normalize your variable: you cannot compare raw numbers between regions of distinct size
            or population.
          </li>{" "}
          <li>Take a huge care when choosing the continuous color palette.</li>{" "}
          <li>Don’t forget the legend.</li>{" "}
          <li>
            If your regions have a broad range of sizes it introduces a biais. You could consider
            using hexbin maps instead.
          </li>{" "}
          <li>
            Don’t call it ch<u>L</u>oropleth map.
          </li>{" "}
        </ul>
      </Section>

      <Section id="related" title="Related">
        <RelatedGrid>
          <RelatedCard
            href="/graph/choropleth.html"
            image="/img/section/ChoroplethSmall.png"
            title="Choropleth"
          >
            Display a aggregated value for each region of the map using color gradients.
          </RelatedCard>
          <RelatedCard
            href="/graph/cartogram.html"
            image="/img/section/CartogramSmall.png"
            title="Cartogram"
          >
            A circular version of a Treemap to visualize a hierarchical organization
          </RelatedCard>
          <RelatedCard
            href="/graph/bubblemap.html"
            image="/img/section/BubbleMapSmall.png"
            title="Bubble map"
          >
            Display bubble on a map background to represent the value of a numeric variable.
          </RelatedCard>
          <RelatedCard
            href="/graph/map.html"
            image="/img/section/MapSmall.png"
            title="Background Map"
          >
            The basis for any geographic data visualization is to build a good background map.
          </RelatedCard>
        </RelatedGrid>
      </Section>

      <Section id="code" title="Build your own">
        <p>
          The <a href="https://r-graph-gallery.com/choropleth-map.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/choropleth-map/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/choropleth-map">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/choropleth.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/choropleth-map.html">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/choropleth-map/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/choropleth-map">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/choropleth.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
