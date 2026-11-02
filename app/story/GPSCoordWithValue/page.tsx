import { StoryLayout } from "@/components/layouts";
import { Code, Section, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/story/GPSCoordWithValue.html",
  title: "The biggest UK cities – from Data to Viz",
  description:
    "This document gives a few suggestions to analyse a dataset composed by a set of geographic coordinates that have an associated numeric value.It considers…",
  image: "/img/section/BubbleMap150.png",
});

export default function Page() {
  return (
    <StoryLayout title="The biggest UK cities" images={["/img/section/BubbleMap150.png"]}>
      <div className="grid gap-6 md:grid-cols-12">
        {" "}
        <div className="md:col-span-6">
          <p>
            This document gives a few suggestions to analyse a dataset composed by a set of
            geographic coordinates that have an associated numeric value.
            <br />
            <br />
            It considers the population of 925 cities in the UK. This example dataset is provided in
            the <a href="https://github.com/adeckmyn/maps">R maps library</a> and is available on
            this{" "}
            <a href="https://github.com/holtzy/data_to_viz/tree/master/Example_dataset">
              Github repository
            </a>
            . Basically it looks like the table beside.
          </p>
        </div>{" "}
        <div className="md:col-span-6">
          <Code lang="r">{`# Libraries
library(tidyverse)
library(hrbrthemes)
library(kableExtra)
options(knitr.table.format = "html")
library(viridis)

# Load dataset from github
data <- read.table("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/18_ListGPSCoordinatesWithValue.csv", header=T)

# show data
data %>% head(5) %>% kable() %>%
  kable_styling(bootstrap_options = "striped", full_width = F)`}</Code>

          <div className="overflow-x-auto">
            <table>
              {" "}
              <thead>
                <tr>
                  <th className="text-right">lat</th>
                  <th className="text-right">long</th>
                  <th className="text-right">pop</th>
                  <th>name</th>
                </tr>
              </thead>{" "}
              <tbody>
                <tr>
                  <td className="text-right">51.65</td>
                  <td className="text-right">-3.14</td>
                  <td className="text-right">10146</td>
                  <td>Abercarn-Newbridge</td>
                </tr>
                <tr>
                  <td className="text-right">51.72</td>
                  <td className="text-right">-3.46</td>
                  <td className="text-right">33048</td>
                  <td>Aberdare</td>
                </tr>
                <tr>
                  <td className="text-right">57.15</td>
                  <td className="text-right">-2.10</td>
                  <td className="text-right">184031</td>
                  <td>Aberdeen</td>
                </tr>
                <tr>
                  <td className="text-right">51.83</td>
                  <td className="text-right">-3.02</td>
                  <td className="text-right">14251</td>
                  <td>Abergavenny</td>
                </tr>
                <tr>
                  <td className="text-right">53.28</td>
                  <td className="text-right">-3.58</td>
                  <td className="text-right">17819</td>
                  <td>Abergele</td>
                </tr>
              </tbody>{" "}
            </table>
          </div>
        </div>{" "}
      </div>

      <Section id="bubble-map" title="Bubble map">
        <p>
          The go-to graphic in this kind of situation is probably the{" "}
          <a href="/graph/bubblemap.html">bubble map</a>. Basically, one circle is drawn per
          provided geographic position. The size of the bubble is proportional to its corresponding
          numeric value. Warning, remember that the bubble area must be proportional to the value,{" "}
          <a href="/caveat/radius_or_area.html">not its radius</a>.
        </p>

        <Code lang="r">{`# Get the world polygon and extract UK
library(maps)
UK <- map_data("world") %>% filter(region=="UK")

# Easy to make it interactive!
library(plotly)

# plot
p=data %>%

  arrange(desc(pop)) %>%
  mutate( name=factor(name, unique(name))) %>%
  mutate( mytext=paste("City: ", name, "\\n", "Population: ", pop, sep="")) %>%  # This prepare the text displayed on hover.

  # Makte the static plot calling this text:
  ggplot() +
    ggplot2::annotate("text", x = 1, y = 56.3, label="1000 biggest cities in the UK", colour = "black", size=4, alpha=1) +
    ggplot2::annotate("segment", x = -1, xend = 3, y = 56, yend = 56, colour = "black", size=0.2, alpha=1) +
    geom_polygon(data = UK, aes(x=long, y = lat, group = group), fill="grey", alpha=0.3) +
    geom_point(aes(x=long, y=lat, size=pop, color=pop, text=mytext, alpha=pop) ) +
    scale_size_continuous(range=c(0.3,12)) +
    scale_color_viridis(option="inferno", trans="log" ) +
    scale_alpha_continuous(trans="log") +
    theme_void() +
    ylim(50,59) +
    coord_map() +
    theme(
      legend.position = "none"
    )

p <- ggplotly(p, tooltip="text")`}</Code>

        <div className="text-center">
          <Widget src="/widgets/story/GPSCoordWithValue-1.html" height={864} width={672} />
        </div>

        <p>
          <em>Note</em>: this map is <code>interactive</code>. Hover a bubble to get the city name
          and its population, Zoom on a specific part for more details.
        </p>
      </Section>

      <h2>Going further</h2>

      <hr />

      <p>
        You can learn more about each type of graphic presented in this story in the dedicated
        sections. Click the icon below:
      </p>
      <a href="/#portfolio">
        {" "}
        <img
          src="/img/section/BubbleMap150.png"
          alt="The biggest UK cities – chart example"
          loading="lazy"
        />
      </a>
    </StoryLayout>
  );
}
