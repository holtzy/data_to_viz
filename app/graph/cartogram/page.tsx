import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/cartogram.html",
  title: "Cartogram – from Data to Viz",
  description:
    "A cartogram is a map in which the geometry of regions is distorted in order to convey the information of an alternate variable. The region area will be…",
  image: "/img/section/CartogramSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Cartogram" images={["/img/section/CartogramSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>cartogram</code> is a map in which the geometry of regions is{" "}
          <code>distorted</code> in order to convey the information of an alternate variable. The
          region area will be inflated or deflated according to its numeric value.
        </p>

        <p>
          Most of the time, a cartogram is also a{" "}
          <a href="/graph/choropleth.html">choropleth map</a> where regions are colored according to
          a numeric variable (not necessarily the one use to build the cartogram).
        </p>

        <Code lang="r">{`# Libraries
library(maptools)
library(cartogram)
library(tidyverse)
library(broom)
library(viridis)
library(patchwork)

# Get the shape file of Africa
data(wrld_simpl)
afr=wrld_simpl[wrld_simpl$REGION==2,]

# Usual choropleth map:
spdf_fortified <- tidy(afr)
spdf_fortified = spdf_fortified %>% left_join(. , afr@data, by=c("id"="ISO3")) 
p1 <- ggplot() +
  geom_polygon(data = spdf_fortified, aes(fill = POP2005/1000000, x = long, y = lat, group = group) , size=0, alpha=0.9) +
  theme_void() +
  scale_fill_viridis(name="Population (M)", breaks=c(1,50,100, 140), guide = guide_legend( keyheight = unit(3, units = "mm"), keywidth=unit(12, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1)) +
  labs( title = "Real boundaries" ) +
  ylim(-35,35) +
  theme(
    text = element_text(color = "#22211d"), 
    plot.title = element_text(size= 22, hjust=0.5, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    legend.position = c(0.2, 0.26)
  ) +
  coord_map()

# construct a cartogram using the population in 2005
afr_cartogram <- cartogram(afr, "POP2005", itermax=5)
 
# It is a new geospatial object: we can use all the usual techniques on it! Let's start with a basic ggplot2 chloropleth map:
spdf_fortified <- tidy(afr_cartogram)
spdf_fortified = spdf_fortified %>% left_join(. , afr_cartogram@data, by=c("id"="ISO3")) 
ggplot() +
  geom_polygon(data = spdf_fortified, aes(fill = POP2005, x = long, y = lat, group = group) , size=0, alpha=0.9) +
  coord_map() +
  theme_void()
 
# As seen before, we can do better with a bit of customization
p2 <- ggplot() +
  geom_polygon(data = spdf_fortified, aes(fill = POP2005/1000000, x = long, y = lat, group = group) , size=0, alpha=0.9) +
  theme_void() +
  scale_fill_viridis(name="Population (M)", breaks=c(1,50,100, 140), guide = guide_legend( keyheight = unit(3, units = "mm"), keywidth=unit(12, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1)) +
  labs( title = "Cartogram" ) +
  ylim(-35,35) +
  theme(
    text = element_text(color = "#22211d"), 
    plot.title = element_text(size= 22, hjust=0.5, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    legend.position = c(0.2, 0.26)
  ) +
  coord_map()

# Save them
ggsave(p1, filename="IMG/cartogram1.png", dpi=100, width=7, height=7)
ggsave(p2, filename="IMG/cartogram2.png", dpi=100, width=7, height=7)`}</Code>

        <div className="grid gap-6 md:grid-cols-12">
          {" "}
          <div className="md:col-span-6">
            <div className="text-center">
              {" "}
              <img
                src="/figures/graph/cartogram/1.webp"
                alt="img"
                width={600}
                height={600}
                loading="lazy"
              />{" "}
            </div>
          </div>{" "}
          <div className="md:col-span-6">
            <div className="text-center">
              {" "}
              <img
                src="/figures/graph/cartogram/2.webp"
                alt="img"
                width={600}
                height={600}
                loading="lazy"
              />{" "}
            </div>
          </div>{" "}
        </div>

        <p>
          The above maps illustrate the difference between real african country boundaries (left),
          and a cartogram (right). Each country area is inflated or deflated according to their
          population in 2005. (
          <a href="https://cran.r-project.org/web/packages/maptools/maptools.pdf">data</a>). For
          instance, Nigeria (in yellow) appears much bigger in the cartogram than in the classic
          map, according to its huge population.
        </p>
      </Section>

      <Section id="what-for" title="What for">
        <p>
          Cartogram aims to correct the bias that can be observed in a{" "}
          <a href="/graph/choropleth.html">choropleth map</a>: when a variable is aggregated per
          region, a region with very few data points will look as important as a region with many
          data points.
        </p>

        <p>
          For instance, imagine you display the average salary per region on your choropleth map. A
          region with 3 inhabitants with a huge area will have more importance on your map than a
          small one with 3,000 inhabitants, what induces a strong bias. The cartogram aims to reduce
          this bias.
        </p>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          <a href="/graph/hexbinmap.html">Hexbin map</a> represents every region of the map as
          hexagons. It is possible to build a cartogram to hexbin map following the same strategy.
          Here is an example with the population in the US states:
        </p>

        <Code lang="r">{`# library
library(tidyverse)
library(geojsonio)
library(RColorBrewer)
 
# Hexbin available in the geojson format here: https://team.carto.com/u/andrew/tables/andrew.us_states_hexgrid/public/map. Download it and load it in R:
spdf <- geojson_read("us_states_hexgrid.geojson.json",  what = "sp")
spdf@data = spdf@data %>% mutate(google_name = gsub(" \\\\(United States\\\\)", "", google_name))
 
# Load the population per states (source: https://www.census.gov/data/tables/2017/demo/popest/nation-total.html)
pop=read.table("https://www.r-graph-gallery.com/wp-content/uploads/2018/01/pop_US.csv", sep=",", header=T)
pop$pop = pop$pop / 1000000
 
# merge both
spdf@data = spdf@data %>% left_join(., pop, by=c("google_name"="state"))
 
# Compute the cartogram, using this population information
cartogram <- cartogram(spdf, 'pop')
 
# First look!
plot(cartogram)
 
# tidy data to be drawn by ggplot2 (broom library of the tidyverse)
carto_fortified <- tidy(cartogram, region = "google_name")
carto_fortified = carto_fortified %>% left_join(. , cartogram@data, by=c("id"="google_name")) 
 
# Calculate the position of state labels
centers <- cbind.data.frame(data.frame(gCentroid(cartogram, byid=TRUE), id=cartogram@data$iso3166_2))
 
# plot
ggplot() +
  geom_polygon(data = carto_fortified, aes(fill = pop, x = long, y = lat, group = group) , size=0.05, alpha=0.9, color="black") +
  scale_fill_gradientn(colours=brewer.pal(7,"BuPu"), name="population (in M)", guide=guide_legend( keyheight = unit(3, units = "mm"), keywidth=unit(12, units = "mm"), title.position = 'top', label.position = "bottom") ) +
  geom_text(data=centers, aes(x=x, y=y, label=id), color="white", size=3, alpha=0.6) +
  theme_void() +
  ggtitle( "Another look on the US population" ) +
  theme(
    legend.position = c(0.5, 0.9),
    legend.direction = "horizontal",
    text = element_text(color = "#22211d"),
    plot.background = element_rect(fill = "#f5f5f9", color = NA), 
    panel.background = element_rect(fill = "#f5f5f9", color = NA), 
    legend.background = element_rect(fill = "#f5f5f9", color = NA),
    plot.title = element_text(size= 22, hjust=0.5, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
  ) +
  coord_map()`}</Code>

        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/cartogram/3.webp"
            alt="img"
            width={600}
            height={400}
            loading="lazy"
          />{" "}
        </div>
      </Section>

      <Section id="mistake" title="Common mistakes">
        <p>
          Since a cartogram is often used as a <a href="/graph/choropleth.html">choropleth map</a>,
          all the related pitfalls apply:
        </p>
        <ul>
          {" "}
          <li>
            Normalize your variable: you cannot compare raw numbers between regions of distinct size
            or population.
          </li>{" "}
          <li>Take a huge care when choosing the continuous color palette.</li>{" "}
          <li>Don’t forget the legend.</li>{" "}
        </ul>
        <p>
          Moreover, note that a cartogram distorts real boundaries and thus make the map harder to
          identify. Be carefull not to confuse your audience: you need to introduce it with good
          explanations and showing the initial map is probably a good practice.
        </p>
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
          The <a href="https://r-graph-gallery.com/cartogram.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/cartogram/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/cartogram">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/cartogram.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/cartogram.html">R graph gallery</ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/cartogram/">Python gallery</ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/cartogram">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/cartogram.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
