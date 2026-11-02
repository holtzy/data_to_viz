import { CaveatLayout } from "@/components/layouts";
import { Code, Section } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/circular_bar_yaxis.html",
  title: "Circular barplot and distortion | Dataviz pitfall gallery",
  description:
    "Circular barplots are a good alternative to classic barplots. It is basically the same thing with each bar displayed along a circle instead of a line,…",
  image: "/img/mistake/circular_bar_yaxis.png",
});

export default function Page() {
  return (
    <CaveatLayout
      title="Circular barplot and distortion"
      images={["/img/mistake/circular_bar_yaxis.png"]}
    >
      <Section id="the-issue" title="The issue">
        <p>
          <a href="/graph/circularbarplot.html">Circular barplots</a> are a good alternative to
          classic <a href="/graph/circularbarplot.html">barplots</a>. It is basically the same thing
          with each bar displayed along a circle instead of a line, resulting in a more eye-catching
          figure.
        </p>

        <p>
          However, circular barplots are <code>less efficient</code> in representing data{" "}
          <code>accurately</code>. Indeed, it is harder to compare bar lengths since they are not on
          the same line anymore. Moreover, the inner base of the bar is often thinner than the outer
          part. This results in a bias: group with large values appear even larger than they are in
          reality.
        </p>

        <p>This bias is even more important if:</p>
        <ul>
          {" "}
          <li>
            <em>left</em> - the number of bars is low.
          </li>{" "}
          <li>
            <em>right</em> - the inner radius of the circle is too small.
          </li>{" "}
        </ul>
        <Code lang="r">{`# package
library(tidyverse)
library(viridis)
library(patchwork)

# Create dataset
data=data.frame(
  individual=paste( "Mister ", seq(1,9), sep=""),
  group=c( rep('A', 3), rep('C', 3), rep('D', 3)) ,
  value=sample( seq(10,100), 9, replace=T)
)
data = data %>% arrange(group, value)

# Set a number of 'empty bar' to add at the end of each group
empty_bar=1
to_add = data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) = colnames(data)
to_add$group=rep(levels(data$group), each=empty_bar)
data=rbind(data, to_add)
data=data %>% arrange(group)
data$id=seq(1, nrow(data))

# Get the name and the y position of each label
label_data=data
number_of_bar=nrow(label_data)
angle= 90 - 360 * (label_data$id-0.5) /number_of_bar     # I subtract 0.5 because the letter must have the angle of the center of the bars. Not extreme right(1) or extreme left (0)
label_data$hjust<-ifelse( angle < -90, 1, 0)
label_data$angle<-ifelse(angle < -90, angle+180, angle)


# Make the plot
p1 = ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +       # Note that id is a factor. If x is numeric, there is some space between the first bar

  geom_bar(aes(x=as.factor(id), y=value, fill=group), stat="identity", alpha=0.5) +
  scale_fill_viridis(discrete=TRUE) +
  ylim(-80,120) +
  theme_minimal() +
  theme(
    legend.position = "none",
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), "cm")
  ) +
  coord_polar() +
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color="black", fontface="bold",alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE )



# Create dataset 2
data=data.frame(
  individual=paste( "Mister ", seq(1,60), sep=""),
  group=c( rep('A', 20), rep('C', 24), rep('D', 16)) ,
  value=sample( seq(10,100), 60, replace=T)
)
data = data %>% arrange(group, value)

# Set a number of 'empty bar' to add at the end of each group
empty_bar=1
to_add = data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) = colnames(data)
to_add$group=rep(levels(data$group), each=empty_bar)
data=rbind(data, to_add)
data=data %>% arrange(group)
data$id=seq(1, nrow(data))

# Get the name and the y position of each label
label_data=data
number_of_bar=nrow(label_data)
angle= 90 - 360 * (label_data$id-0.5) /number_of_bar     # I subtract 0.5 because the letter must have the angle of the center of the bars. Not extreme right(1) or extreme left (0)
label_data$hjust<-ifelse( angle < -90, 1, 0)
label_data$angle<-ifelse(angle < -90, angle+180, angle)


# Make the plot
p2 <- ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +       # Note that id is a factor. If x is numeric, there is some space between the first bar

  geom_bar(aes(x=as.factor(id), y=value, fill=group), stat="identity", alpha=0.5) +
  scale_fill_viridis(discrete=TRUE) +
  ylim(-10,120) +
  theme_minimal() +
  theme(
    legend.position = "none",
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), "cm")
  ) +
  coord_polar() +
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color="black", fontface="bold",alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE )


p1 + p2`}</Code>

        <figure>
          <img
            src="/figures/caveat/circular_bar_yaxis/1.webp"
            alt="Circular barplot and distortion – chart example"
            width={960}
            loading="lazy"
          />
        </figure>
      </Section>

      <Section id="solving-the-issue" title="Solving the issue">
        <p>Circular barcharts can be a good option in very specific conditions. You need:</p>
        <ul>
          {" "}
          <li>a large number of bars</li>{" "}
          <li>
            a clear pattern in the data: if all groups have almost the same value, a circular
            version is not accurate enough for comparison.
          </li>{" "}
          <li>to keep a large inner circle</li>{" "}
        </ul>
        <Code lang="r">{`# package
library(tidyverse)
library(viridis)

# Create dataset
data=data.frame(
  individual=paste( "Mister ", seq(1,60), sep=""),
  group=c( rep('A', 20), rep('C', 24), rep('D', 16)) ,
  value=sample( seq(10,100), 60, replace=T)
)
data = data %>% arrange(group, value)

# Set a number of 'empty bar' to add at the end of each group
empty_bar=1
to_add = data.frame( matrix(NA, empty_bar*nlevels(data$group), ncol(data)) )
colnames(to_add) = colnames(data)
to_add$group=rep(levels(data$group), each=empty_bar)
data=rbind(data, to_add)
data=data %>% arrange(group)
data$id=seq(1, nrow(data))

# Get the name and the y position of each label
label_data=data
number_of_bar=nrow(label_data)
angle= 90 - 360 * (label_data$id-0.5) /number_of_bar     # I subtract 0.5 because the letter must have the angle of the center of the bars. Not extreme right(1) or extreme left (0)
label_data$hjust<-ifelse( angle < -90, 1, 0)
label_data$angle<-ifelse(angle < -90, angle+180, angle)


# Make the plot
p = ggplot(data, aes(x=as.factor(id), y=value, fill=group)) +       # Note that id is a factor. If x is numeric, there is some space between the first bar

  geom_bar(aes(x=as.factor(id), y=value, fill=group), stat="identity", alpha=0.5) +
  scale_fill_viridis(discrete=TRUE) +
  ylim(-80,120) +
  theme_minimal() +
  theme(
    legend.position = "none",
    axis.text = element_blank(),
    axis.title = element_blank(),
    panel.grid = element_blank(),
    plot.margin = unit(rep(-1,4), "cm")
  ) +
  coord_polar() +
  geom_text(data=label_data, aes(x=id, y=value+10, label=individual, hjust=hjust), color="black", fontface="bold",alpha=0.6, size=2.5, angle= label_data$angle, inherit.aes = FALSE )

p`}</Code>

        <figure>
          <img
            src="/figures/caveat/circular_bar_yaxis/2.webp"
            alt="Circular barplot and distortion – chart example"
            width={672}
            loading="lazy"
          />
        </figure>

        <p>
          <em>Note</em>: don’t forget to add a <code>legend</code> or <code>annotation</code> for
          the colors and a <code>scale</code> for the bar height. See more in the{" "}
          <a href="/graph/circularbarplot.html">circular barplot section</a>.
        </p>
      </Section>
    </CaveatLayout>
  );
}
