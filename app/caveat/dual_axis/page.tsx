import { CaveatLayout } from "@/components/layouts";
import { Code, Widget } from "@/components/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/caveat/dual_axis.html",
  title: "The issue with dual axis | Dataviz pitfall gallery",
  description:
    "good example coming from Planned-Parenthood and from Politifact, initially published on aul.org.",
  image: "/img/mistake/dual_axis.png",
});

export default function Page() {
  return (
    <CaveatLayout title="The issue with dual axis" images={["/img/mistake/dual_axis.png"]}>
      <h2 id="example">Example</h2>

      <hr />

      <p>
        good example coming from{" "}
        <a href="http://emschuch.github.io/Planned-Parenthood/">Planned-Parenthood</a> and from{" "}
        <a href="http://www.politifact.com/truth-o-meter/statements/2015/oct/01/jason-chaffetz/chart-shown-planned-parenthood-hearing-misleading-/">
          Politifact
        </a>
        , initially published on <a href="http://www.aul.org">aul.org</a>.
      </p>

      <p>
        Data here{" "}
        <a href="https://docs.google.com/spreadsheets/d/1vzkuzSi2S-JO0m0VolflzxaMN9wUfjw6Slek97_6L4s/edit#gid=0">
          https://docs.google.com/spreadsheets/d/1vzkuzSi2S-JO0m0VolflzxaMN9wUfjw6Slek97_6L4s/edit#gid=0
        </a>
      </p>

      <Code lang="r">{`library(plotly)

ay <- list(
  tickfont = list(color = "red"),
  overlaying = "y",
  side = "right",
  title = "second y axis"
)
p <- plot_ly() %>%
  add_lines(x = ~1:3, y = ~10*(1:3), name = "slope of 10") %>%
  add_lines(x = ~2:4, y = ~1:3, name = "slope of 1", yaxis = "y2") %>%
  layout(
    title = "Double Y Axis", yaxis2 = ay,
    xaxis = list(title="x")
  )

# add slider control to plot
p <- p %>%
  layout(sliders = list(list(active = 3,
                             currentvalue = list(prefix = "Frequency: "),
                             steps = c(1:10))))
p`}</Code>

      <Widget src="/widgets/caveat/dual_axis-1.html" height={576} width={576} />

      <Code lang="r">{`x <- seq(0,10, length.out = 1000)

# create data
aval <- list()
for(step in 1:11){
  aval[[step]] <-list(visible = FALSE,
                      name = paste0('v = ', step),
                      x=x,
                      y=sin(step*x))
}
aval[3][[1]]$visible = TRUE



# create steps and plot all traces
steps <- list()
p <- plot_ly()
for (i in 1:11) {
  p <- add_lines(p,x=aval[i][[1]]$x,  y=aval[i][[1]]$y, visible = aval[i][[1]]$visible,
                 name = aval[i][[1]]$name, type = 'scatter', mode = 'lines', hoverinfo = 'name',
                 line=list(color='00CED1'), showlegend = FALSE)

  step <- list(args = list('visible', rep(FALSE, length(aval))),
               method = 'restyle')
  step$args[[2]][i] = TRUE
  steps[[i]] = step
}

# add slider control to plot
p <- p %>%
  layout(sliders = list(list(active = 3,
                             currentvalue = list(prefix = "Frequency: "),
                             steps = steps)))
p`}</Code>

      <Widget src="/widgets/caveat/dual_axis-2.html" height={480} width={672} />

      <p>
        find how to add a slider:{" "}
        <a href="https://plot.ly/r/sliders/">https://plot.ly/r/sliders/</a>
      </p>
    </CaveatLayout>
  );
}
