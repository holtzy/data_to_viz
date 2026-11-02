import { StoryLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/GPSCoordWithoutValue.html",
  title: "Where surfers live – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a list of GPS coordinatesIt considers the geographic position of about 200k tweets…",
  image: "/img/section/Choropleth150.png",
});

export default function Page() {
  return (
    <StoryLayout
      title="Where surfers live"
      images={[
        "/img/section/Choropleth150.png",
        "/img/section/MapHexbin150.png",
        "/img/section/Cartogram150.png",
      ]}
    >
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-8">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a list of GPS
            coordinates
            <br />
            It considers the geographic position of about 200k tweets containing the hashtags{" "}
            <code>#surf</code>, <code>#windsurf</code> or <code>#kitesurf</code>.<br />
            This dataset has been built harvesting twitter every day during about 300 days. It is
            fully available in this{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Basically it looks like the table beside.
          </p>
        </div>{" "}
        <div className="md:col-span-4">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(viridis)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(mapdata)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/17_ListGPSCoordinates.csv", sep=",", header=T)

# show data
data %>% select(homelat, homelon) %>% head(3) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th className="text-right">homelat</th>
                  <th className="text-right">homelon</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-right">18.28548</td>
                  <td className="text-right">-70.33012</td>
                </tr>
                <tr>
                  <td className="text-right">39.10312</td>
                  <td className="text-right">-84.51202</td>
                </tr>
                <tr>
                  <td className="text-right">19.41095</td>
                  <td className="text-right">-99.27186</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
      <Section id="showing-a-few-dots" title="Showing a few dots">
        <p>
          If your dataset is composed by a few data point only, you can just display them on a map.
          If you have specific information to display concerning these positions, use an
          interactive: more information are available when you click data points.
        </p>
      </Section>
      <Section id="a-dot-density-map" title="A dot density map">
        <p>A dot density map is used when the sample size of your dataset is high.</p>

        <Code lang="r">{`# Get the world polygon
world <- map_data("world")

p <- data %>%
  #head(1000) %>%
  ggplot( aes(x=homelon, y=homelat)) +
    geom_polygon(data = world, aes(x=long, y = lat, group = group), fill="grey", alpha=0.1) +
    geom_point(size=0.8, color="#69b3a2", alpha=0.5) +
    coord_equal() +
    theme_void() +
    theme(
        panel.spacing=unit(c(0,0,0,0), "null"),
        plot.margin=grid::unit(c(0,0,0,0), "cm"),
    ) +
    ggplot2::annotate("text", x = -150, y = -45, hjust = 0, size = 11, label = paste("Where surfers live."), color = "Black") +
    ggplot2::annotate("text", x = -150, y = -51, hjust = 0, size = 8, label = paste("data-to-viz.com | 200,000 #surf tweets recovered"), color = "black", alpha = 0.5) +
    xlim(-180,180) +
    ylim(-60,80) +
    scale_x_continuous(expand = c(0.006, 0.006)) +
    coord_equal()

ggsave(p, file="IMG/Surfer_position.png", width = 36, height = 15.22, units = "in", dpi = 90)`}</Code>
      </Section>
      <div className="text-center">
        <figure>
          <img
            src="/figures/story/GPSCoordWithoutValue/1.webp"
            alt="Where surfers live – chart example"
            loading="lazy"
          />
        </figure>
      </div>
      <p>
        Dotmaps give a good idea about where samples are distributed. However, once dots start to
        overlap, it gets impossible to distinguish how many of them are displayed on a certain zone.
        That’s where binning becomes an interesting option.
      </p>
      <Section id="hexbin" title="Hexbin">
        <p>
          To create a <a href="/graph/hexbinmap.html">hexbin map</a>, the territory is divided in
          many <code>hexagons</code> and the number of sample per hexagon is counted and represented
          by a color.
        </p>
      </Section>
      <div className="grid gap-6 md:grid-cols-12">
        <Code lang="r">{`data %>%
  filter(homecontinent=='Europe') %>%
  ggplot( aes(x=homelon, y=homelat)) +
    geom_hex(bins=59) +
    ggplot2::annotate("text", x = -27, y = 72, label="Where people tweet about #Surf", colour = "black", size=5, alpha=1, hjust=0) +
    ggplot2::annotate("segment", x = -27, xend = 10, y = 70, yend = 70, colour = "black", size=0.2, alpha=1) +
    theme_void() +
    xlim(-30, 70) +
    ylim(24, 72) +
    scale_fill_viridis(
      trans = "log",
      breaks = c(1,7,54,403,3000),
      name="Tweet # recorded in 8 months",
      guide = guide_legend( keyheight = unit(2.5, units = "mm"), keywidth=unit(10, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1)
    )  +
    ggtitle( "" ) +
    theme(
      legend.position = c(0.8, 0.09),
      legend.title=element_text(color="black", size=8),
      text = element_text(color = "#22211d"),
      plot.background = element_rect(fill = "#f5f5f2", color = NA),
      panel.background = element_rect(fill = "#f5f5f2", color = NA),
      legend.background = element_rect(fill = "#f5f5f2", color = NA),
      plot.title = element_text(size= 13, hjust=0.1, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    )`}</Code>

        <figure>
          <img
            src="/figures/story/GPSCoordWithoutValue/2.webp"
            alt="Where surfers live – chart example"
            width={864}
            loading="lazy"
          />
        </figure>
      </div>
      <p>
        Note that this is very close from an <a href="/graph/hexbinmap.html">2d histogram map</a>.
        Basically, it splits the space into a set of squares instead of hexagons, and uses the same
        process:
      </p>
      <div className="grid gap-6 md:grid-cols-12">
        <Code lang="r">{`# Make the hexbin map with the geom_hex function
ggplot(data, aes(x=homelon, y=homelat)) +
    geom_polygon(data = world, aes(x=long, y = lat, group = group), fill="grey", alpha=0.3) +
    geom_bin2d(bins=100) +
    ggplot2::annotate("text", x = 175, y = 80, label="Where people tweet about #Surf", colour = "black", size=4, alpha=1, hjust=1) +
    ggplot2::annotate("segment", x = 100, xend = 175, y = 73, yend = 73, colour = "black", size=0.2, alpha=1) +
    theme_void() +
    ylim(-70, 80) +
    scale_fill_viridis(
      trans = "log",
      breaks = c(1,7,54,403,3000),
      name="Tweet # recorded in 8 months",
      guide = guide_legend( keyheight = unit(2.5, units = "mm"), keywidth=unit(10, units = "mm"), label.position = "bottom", title.position = 'top', nrow=1)
    )  +
    ggtitle( "" ) +
    theme(
      legend.position = c(0.8, 0.09),
      legend.title=element_text(color="black", size=8),
      text = element_text(color = "#22211d"),
      plot.background = element_rect(fill = "#f5f5f2", color = NA),
      panel.background = element_rect(fill = "#f5f5f2", color = NA),
      legend.background = element_rect(fill = "#f5f5f2", color = NA),
      plot.title = element_text(size= 13, hjust=0.1, color = "#4e4d47", margin = margin(b = -0.1, t = 0.4, l = 2, unit = "cm")),
    )`}</Code>

        <figure>
          <img
            src="/figures/story/GPSCoordWithoutValue/3.webp"
            alt="Where surfers live – chart example"
            width={864}
            loading="lazy"
          />
        </figure>
      </div>
      <Section id="choropleth" title="Choropleth">
        <p>
          It is also possible to divide your territory (the world here) in regions other than square
          or hexagones. This will result in a chloropleth map. Of course, you need the information
          of the exact shape of your regions.
        </p>
      </Section>
      <h2>Going further</h2>
      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a href="/graph/choropleth.html" title="Choropleth map">
          <img
            src="/img/section/Choropleth150.png"
            alt="Choropleth map"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/hexbinmap.html" title="Hexbin Map">
          <img
            src="/img/section/MapHexbin150.png"
            alt="Hexbin Map"
            loading="lazy"
            className="size-24"
          />
        </a>
        <a href="/graph/cartogram.html" title="Cartogram">
          <img
            src="/img/section/Cartogram150.png"
            alt="Cartogram"
            loading="lazy"
            className="size-24"
          />
        </a>
      </div>
    </StoryLayout>
  );
}
