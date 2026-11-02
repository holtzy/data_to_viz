import { GraphLayout } from "@/components/layouts";
import { ButtonLink, Code, RelatedCard, RelatedGrid, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/graph/bubblemap.html",
  title: "Bubble map – from Data to Viz",
  description:
    "A bubble map uses circles of different size to represent a numeric value on a territory. It displays one bubble per geographic coordinate, or one bubble…",
  image: "/img/section/BubbleMapSmall.png",
});

export default function Page() {
  return (
    <GraphLayout title="Bubble map" images={["/img/section/BubbleMapSmall.png"]}>
      <Section id="definition" title="Definition">
        <p>
          A <code>bubble map</code> uses circles of different size to represent a numeric value on a
          territory. It displays one bubble per geographic coordinate, or one bubble per region (in
          this case the bubble is usually displayed in the baricentre of the region).
        </p>

        <p>
          Here is an example showing the geographic position of about{" "}
          <a href="/story/GPSCoordWithoutValue.html">200k tweets</a> containing the hashtags #surf,
          #windsurf or #kitesurf. See more about this project{" "}
          <a href="/story/GPSCoordWithoutValue.html">here</a>.
        </p>

        <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(hrbrthemes)
library(mapdata)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/17_ListGPSCoordinates.csv", sep=",", header=T)

# Get the world polygon
world <- map_data("world")

# Reformat data: I count the occurence of each unique position
p <- data %>%
  mutate(homelat=round(homelat,1)) %>%
  mutate(homelon=round(homelon,1)) %>%
  #head(1000) %>%
  group_by(homelat, homelon, homecontinent) %>%
  summarise(n=n()) %>%
  ggplot() +
    geom_polygon(data = world, aes(x=long, y = lat, group = group), fill="grey", alpha=0.1) +
    geom_point(aes(x=homelon, y=homelat, color=homecontinent, size=n), alpha=0.5) +
    scale_color_viridis(discrete=TRUE, guide=FALSE) +
    scale_size_continuous(range=c(0.2,68)) +
    coord_equal() +
    theme_void() +
    theme(
        panel.spacing=unit(c(0,0,0,0), "null"),
        plot.margin=grid::unit(c(0,0,0,0), "cm"),
        legend.position=c(0.15,0.07),
        legend.direction="horizontal"
    ) +
    ggplot2::annotate("text", x = -165, y = -30, hjust = 0, size = 11, label = paste("Where surfers live."), color = "Black") +
    ggplot2::annotate("text", x = -165, y = -36, hjust = 0, size = 8, label = paste("data-to-viz.com | 200,000 #surf tweets recovered"), color = "black", alpha = 0.5) +
    xlim(-180,180) +
    ylim(-60,80) +
    scale_x_continuous(expand = c(0.006, 0.006)) +
    coord_equal() 

# Save at PNG
ggsave("IMG/Surfer_bubble.png", width = 36, height = 15.22, units = "in", dpi = 90)`}</Code>
        <br />
        <br />
        <div className="text-center">
          {" "}
          <img
            src="/figures/graph/bubblemap/1.webp"
            alt="img"
            width={1000}
            height={423}
            loading="lazy"
          />{" "}
        </div>
      </Section>

      <Section id="what-for" title="What for">
        <p>Bubble maps are used with two types of dataset:</p>
        <ul>
          {" "}
          <li>
            <p>
              a <em>list of geographic coordinates</em> (longitude and latitude) and a numeric
              variable controling the size of the bubble. In the previous example, the number of
              tweet at each unique pair of coordinate was used.
            </p>
          </li>{" "}
          <li>
            <p>
              a <em>list of regions</em> with attributed values and knwon boundary. In this case,
              the bubble map will replace the usual{" "}
              <a href="/graph/choropleth.html">choropleth map</a>. Note that it allows to avoid the
              bias caused by different regional area in choropleth maps. (big regions tend to have
              more weight during the observation).
            </p>
          </li>{" "}
        </ul>
      </Section>

      <Section id="variation" title="Variation">
        <p>
          Interactivity is appreciated for bubble maps. It allows to zoom on a specific part, or
          click bubbles for more information. Here is an example showing a feaw earthquacke that
          happend in the Fiji Region since 1964 (
          <a href="https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/quakes.html">data</a>
          )
        </p>

        <Code lang="r">{`# Library
library(leaflet)
 
# load example data (Fiji Earthquakes) + keep only 100 first lines
data(quakes)
quakes =  head(quakes, 100)
 
# Create a color palette with handmade bins.
mybins=seq(4, 6.5, by=0.5)
mypalette = colorBin( palette="YlOrBr", domain=quakes$mag, na.color="transparent", bins=mybins)
 
# Prepare the text for the tooltip:
mytext=paste("Depth: ", quakes$depth, "<br/>", "Stations: ", quakes$stations, "<br/>", "Magnitude: ", quakes$mag, sep="") %>%
  lapply(htmltools::HTML)
 
# Final Map
leaflet(quakes) %>% 
  addTiles()  %>% 
  setView( lat=-27, lng=170 , zoom=4) %>%
  addProviderTiles("Esri.WorldImagery") %>%
  addCircles(~long, ~lat, 
    fillColor = ~mypalette(mag), fillOpacity = 0.7, color="white", radius=~sqrt(depth)*3000, stroke=FALSE, weight = 1,
    label = mytext,
    labelOptions = labelOptions( style = list("font-weight" = "normal", padding = "3px 8px"), textsize = "13px", direction = "auto")
  ) %>%
  addLegend( pal=mypalette, values=~mag, opacity=0.9, title = "Magnitude", position = "bottomright" )`}</Code>

        <Widget src="/widgets/graph/bubblemap-1.html" height={384} width={864} />
      </Section>

      <Section id="mistake" title="Common mistakes">
        <ul>
          {" "}
          <li>
            <p>
              As for <a href="/graph/bubble.html">bubble charts</a>, the size of bubbles must be
              mapped to its area, <a href="/caveat/radius_or_area.html">not to its radius</a>. If
              not it exagerates differences. <a href="/caveat/radius_or_area.html">See more</a>.
            </p>
          </li>{" "}
          <li>
            <p>
              Mind <a href="/caveat/overplotting.html">overplotting</a>. In any case, it is a good
              practice to set up a bit of transparency for each bubble, allowing to see the map
              behind it.
            </p>
          </li>{" "}
          <li>
            <p>Don’t forget your legend to make the link between bubble size and numeric value.</p>
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
            href="/graph/hexbinmap.html"
            image="/img/section/MapHexbinSmall.png"
            title="Hexbin map"
          >
            Split the geographic area in a set of hexagon and display an aggregated value for each
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
          The <a href="https://r-graph-gallery.com/bubble-map.html">R</a>,{" "}
          <a href="https:/python-graph-gallery.com/bubble-map/">Python</a>,{" "}
          <a href="https://www.react-graph-gallery.com/bubble-map">React</a> and{" "}
          <a href="https://d3-graph-gallery.com/bubblemap.html">D3</a> graph galleries are 4
          websites providing hundreds of chart example, always providing the reproducible code.
          Click the button below to see how to build the chart you need with your favorite
          programing language.
        </p>

        <p>
          <ButtonLink href="https://r-graph-gallery.com/bubble-map.html/">
            R graph gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://python-graph-gallery.com/bubble-map/">
            Python gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://www.react-graph-gallery.com/bubble-map">
            React gallery
          </ButtonLink>{" "}
          <ButtonLink href="https://d3-graph-gallery.com/bubblemap.html">D3 gallery</ButtonLink>
        </p>
      </Section>
    </GraphLayout>
  );
}
