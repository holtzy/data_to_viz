// Generated from legacy/index.html by scripts/migrate/convert-home.mjs — edit freely.
import type { ReactNode } from "react";

export type Chart = {
  title: string;
  /** Dedicated page, e.g. /graph/violin.html */
  href: string;
  image: string;
  intro: string;
  about: ReactNode;
  mistakes: ReactNode;
  code: { label: string; href: string }[];
};

export const CHARTS: Record<string, Chart> = {
  violin: {
    title: "Violin",
    href: "/graph/violin.html",
    image: "/img/section/Violin150.png",
    intro: "An alternative to boxplot to compare the distribution of several groups.",
    about: (
      <>
        <p>
          Violinplots allow to visualize the distribution of a numeric variable for one or several
          groups. It is really close from a <a href="/caveat/boxplot.html">boxplot</a>, but allows a
          deeper understanding of the distribution. <br />
          <br />
          Violins are particularly adapted when the amount of data is huge and showing individual
          observations gets impossible.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            If you have just a few groups, you are probably interested by{" "}
            <a href="/graph/ridgeline.html">ridgeline charts</a>.
          </li>
          <li>
            If you compare groups with very different sample size,{" "}
            <a href="/caveat/boxplot.html">show it</a>.
          </li>
          <li>
            <a href="/caveat/order_data.html">Ordering groups</a> by median value makes the chart
            more insightful.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/violin/" },
      { label: "Python", href: "https://python-graph-gallery.com/violin-plot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/violin" },
      { label: "React", href: "https://www.react-graph-gallery.com/violin-plot" },
    ],
  },
  density: {
    title: "Density",
    href: "/graph/density.html",
    image: "/img/section/Density150.png",
    intro: "Show the density of a numeric variable",
    about: (
      <>
        <p>
          A density plot shows the distribution of a numeric variable. It takes only numeric
          variables as input and is very close from an <a href="#histogram">histogram</a>. It can be
          use in the same exact condition.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/bin_size.html">Play with the bandwith</a> of your density function.
          </li>
          <li>
            Don't show the distribution of{" "}
            <a href="/caveat/multi_distribution.html">more than ~5 variables</a>. Use Violin or
            Ridge line plot instead.
          </li>
          <li>
            Avoid filling with <a href="/caveat/color_com_nothing.html">color palettes</a>.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/density-plot/" },
      { label: "Python", href: "https://python-graph-gallery.com/density-plot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/density" },
      { label: "React", href: "https://www.react-graph-gallery.com/density-plot" },
    ],
  },
  histogram: {
    title: "Histogram",
    href: "/graph/histogram.html",
    image: "/img/section/Histogram150.png",
    intro: "An accurate graphical representation of the distribution of numeric data.",
    about: (
      <>
        <p>
          A histogram takes as input a numeric variable only. The variable is cut into several bins,
          and the number of observation per bin is represented by the height of the bar. It is
          possible to represent the distribution of several variable on the same axis using this
          technique.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/bin_size.html">Play with the bin size</a>, it can give different
            insight.
          </li>
          <li>
            Don't show the distribution of{" "}
            <a href="/caveat/multi_distribution.html">more than ~5 variables</a>. Use{" "}
            <a href="/graph/violin.html">violin</a> or{" "}
            <a href="/graph/ridgeline.html">ridgeline plot</a> instead.
          </li>
          <li>
            <a href="/caveat/color_com_nothing.html">Avoid filling with color palettes.</a>
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/histogram/" },
      { label: "Python", href: "https://python-graph-gallery.com/histogram/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/histogram" },
      { label: "React", href: "https://www.react-graph-gallery.com/histogram" },
    ],
  },
  boxplot: {
    title: "Boxplot",
    href: "/caveat/boxplot.html",
    image: "/img/section/Box1150.png",
    intro: "Summarize the distribution of numeric variables",
    about: (
      <>
        <p>
          A <a href="/caveat/boxplot.html">boxplot</a> gives a nice summary of one or several
          numeric variables. The line that divides the box into 2 parts represents the median of the
          data. The end of the box shows the upper and lower quartiles. The extreme lines show the
          highest and lowest value excluding outliers.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Boxplot hides the sample size of each group,{" "}
            <a href="/caveat/boxplot.html">show it with annotation or box width.</a>
          </li>
          <li>
            Boxplot <a href="/caveat/boxplot.html">hides the underlying distribution</a>. Use jitter
            if low number of data points, or use violin with bigger data.
          </li>
          <li>
            <a href="/caveat/order_data.html">Order your boxplot</a> by median can make it more
            insightful.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/boxplot/" },
      { label: "Python", href: "https://python-graph-gallery.com/boxplot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/boxplot" },
      { label: "React", href: "https://www.react-graph-gallery.com/boxplot" },
    ],
  },
  ridgeline: {
    title: "Ridgeline plot",
    href: "/graph/ridgeline.html",
    image: "/img/section/Joyplot150.png",
    intro:
      "Several distributions aligned to the same horizontal scale and presented with a slight overlap",
    about: (
      <>
        <p>
          A <a href="/graph/ridgeline.html">Ridgeline plot</a> (sometimes called Joyplot) shows the
          distribution of a numerical value for several groups. Distribution can be represented
          using <a href="/graph/histogram.html">histograms</a> or{" "}
          <a href="/graph/density.html">density plots</a>, all aligned to the same horizontal scale
          and presented with a slight overlap. <br />
          <br /> It is especially useful when the number of group to represent is high, and thus a
          classic window separation would take to much space.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            As with histogram or density plot,{" "}
            <a href="/caveat/bin_size.html">play with bin size</a> / bandwidth argument.
          </li>
          <li>
            Ridgeline plot works well when there is a clear pattern to discover since it hides a
            part of the data where the overlap takes place.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/ridgeline-plot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/ridgeline" },
      { label: "D3.js", href: "https://www.react-graph-gallery.com/ridgeline" },
    ],
  },
  scatter: {
    title: "Scatter plot",
    href: "/graph/scatter.html",
    image: "/img/section/ScatterPlot150.png",
    intro: "Show the relationship between 2 numeric variables.",
    about: (
      <>
        <p>
          A <a href="/graph/scatter.html">scatterplot</a> displays the relationship between 2
          numeric variables. For each data point, the value of its first variable is represented on
          the X axis, the second on the Y axis
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/overplotting.html">Overplotting</a> is the most common mistake when
            sample size is high.
          </li>
          <li>Don't forget to show subgroups if you have some.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/scatterplot/" },
      { label: "Python", href: "https://python-graph-gallery.com/scatter-plot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/scatter" },
      { label: "React", href: "https://www.react-graph-gallery.com/scatter-plot" },
    ],
  },
  heatmap: {
    title: "Heatmap",
    href: "/graph/heatmap.html",
    image: "/img/section/Heatmap150.png",
    intro: "Like watching a table from above",
    about: (
      <>
        <p>
          A <a href="/graph/heatmap.html">heatmap</a> is a graphical representation of data where
          the individual values contained in a matrix are represented as colors. It is a bit like
          looking a data table from above. <br />
          It is really useful to display a general view of numerical data, not to extract specific
          data point.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Often need to <a href="/graph/heatmap.html">normalize your data</a>
          </li>
          <li>
            Use <a href="/graph/heatmap.html">cluster analysis</a> and thus permute the rows and the
            columns of the matrix to place similar values near each other according to the
            clustering
          </li>
          <li>
            <a href="/caveat/rainbow.html">Color palette</a> is important
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/heatmap/" },
      { label: "Python", href: "https://python-graph-gallery.com/heatmap/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/heatmap" },
      { label: "React", href: "https://www.react-graph-gallery.com/heatmap" },
    ],
  },
  correlogram: {
    title: "Correlogram",
    href: "/graph/correlogram.html",
    image: "/img/section/Correlogram150.png",
    intro: "Relationship between each pair of numeric variables",
    about: (
      <>
        <p>
          A <a href="/graph/correlogram.html">correlogram</a> or correlation matrix allows to
          analyse the relationship between each pair of numeric variables of a matrix.
          <br />
          The correlation between each pair of variable is visualised through a{" "}
          <a href="/graph/scatter.html">scatterplot</a>, or a symbol that represents the correlation
          (bubble, line, number..).
          <br />
          The diagonal often represents the distribution of each variable, using an{" "}
          <a href="/graph/histogram.html">histogram</a> or a{" "}
          <a href="/graph/density.html">density</a> plot.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Displaying the relationship between more than ~10 variables makes the plot very hard to
            read
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/correlogram/" },
      { label: "Python", href: "https://python-graph-gallery.com/correlogram/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/correlogram" },
      { label: "React", href: "https://www.react-graph-gallery.com/correlogram" },
    ],
  },
  bubble: {
    title: "Bubble plot",
    href: "/graph/bubble.html",
    image: "/img/section/BubblePlot150.png",
    intro: "A scatterplot with variable dot size.",
    about: (
      <>
        <p>
          A <a href="/graph/bubble.html">bubble plot</a> is a{" "}
          <a href="/graph/scatter.html">scatterplot</a> where a third dimension is added: the value
          of an additional numeric variable is represented through the size of the dots.
          <br />
          <br />
          You need 3 numerical variables as input: one is represented by the X axis, one by the Y
          axis, and one by the dot size.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Use bubble area as metrics, <a href="/caveat/radius_or_area.html">not diameter</a>.
          </li>
          <li>
            As for scatter, bubble plot suffers <a href="/caveat/overplotting.html">overplotting</a>{" "}
            if sample size is too big.
          </li>
          <li>Show a legend for bubble size.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/bubble-chart/" },
      { label: "Python", href: "https://python-graph-gallery.com/bubble-plot/" },
      { label: "D3.js", href: "https://www.d3-graph-gallery.com/bubble" },
      { label: "React", href: "https://www.react-graph-gallery.com/bubble-plot" },
    ],
  },
  connectedscatter: {
    title: "Connected Scatter",
    href: "/graph/connectedscatter.html",
    image: "/img/section/ScatterConnected150.png",
    intro: "Between the scatter and the line charts.",
    about: (
      <>
        <p>
          A <a href="/graph/connectedscatter.html">connected scatter plot</a> shows the relationship
          between two variables represented by the X and the Y axis, like a{" "}
          <a href="/graph/scatter.html">scatter plot</a> does. Moreover, dots are connected by
          segments, as for a <a href="/graph/line.html">line plot</a>. <br />
          <br />
          Most of the time, they are exactly the same as a line plot and just allow to understand
          where each measure has been done. Sometimes, points are connected in an order different
          from the X axis, giving a supplementary information to the graphic.{" "}
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Don't use <a href="/caveat/dual_axis.html">dual axis</a>.
          </li>
          <li>
            As for scatter, mind <a href="/caveat/overplotting.html">overplotting</a> if sample size
            is too big.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/connected-scatterplot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/connected-scatter-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/connectedscatter" },
    ],
  },
  density2d: {
    title: "Density 2d",
    href: "/graph/density2d.html",
    image: "/img/section/2dDensity150.png",
    intro: "2d representation of a joint distribution.",
    about: (
      <>
        <p>
          A <a href="/graph/density2d.html">2d density plot</a> shows the distribution of values in
          a dataset across the range of two quantitative variables. <br />
          <br />
          It counts the number of observations within a particular area of the 2D space and
          represent it using square, hexagon, or kernel density estimation.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Play with <a href="/caveat/bin_size.html">bin size / bandwidth</a>.
          </li>
          <li>Useful only if sample size is huge.</li>
          <li>
            Pick up a good <a href="/caveat/rainbow.html">color palette</a>.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/2d-density-chart/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/2d-density-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/density2d" },
    ],
  },
  barplot: {
    title: "Barplot",
    href: "/graph/barplot.html",
    image: "/img/section/Bar150.png",
    intro: "Represents the value of entities using bar of various length.",
    about: (
      <>
        <p>
          A <a href="/graph/barplot.html">barplot</a> shows the relationship between a numeric and a
          categoric variable. Each entity of the categoric variable is represented as a bar. The
          size of the bar represents its numeric value.
          <br />
          <br />
          Barplot is sometimes described as a boring way to visualize information. However it is
          probably the most efficient way to show this kind of data. Ordering bars and providing
          good annotation are often necessary.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Do not confound it with a histogram.</li>
          <li>
            Long labels? Think of an <a href="/caveat/hard_label.html">horizontal version</a>.
          </li>
          <li>
            <a href="/caveat/order_data.html">Sorting bars</a> often add insight.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/barplot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/barplot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/barplot" },
    ],
  },
  spider: {
    title: "Spider Chart",
    href: "/caveat/spider.html",
    image: "/img/section/Spider150.png",
    intro: "Also called Web chart or Radar chart.",
    about: (
      <>
        <p>
          <a href="/caveat/spider.html">Radar chart</a> is a two-dimensional chart type designed to
          plot one or more series of values over multiple common quantitative variables. Each
          variable has its own axis, all axis are joint in the center of the figure.
          <br />
          <br />
          Radar chart is <a href="/caveat/spider.html">often criticized</a> in dataviz, and it is
          probably not the best way to convey information.
          <br />
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Do not display more than ~5 groups on the same plot, use{" "}
            <a href="/caveat/spider.html">faceting instead</a>.
          </li>
          <li>
            Be careful if you use variables with different scales. At least, do not forget to{" "}
            <a href="/caveat/spider.html">display values</a> on each scale
          </li>
          <li>
            Read this page about <a href="/caveat/spider.html">radar chart weaknesses</a>
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/spider-or-radar-chart/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/radar-chart/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/spider" },
    ],
  },
  wordcloud: {
    title: "Wordcloud",
    href: "/graph/wordcloud.html",
    image: "/img/section/Wordcloud150.png",
    intro: "A visual representation of text data.",
    about: (
      <>
        <p>
          A <a href="/graph/wordcloud.html">Wordcloud</a> (or Tag cloud) displays a list of words,
          the importance of each beeing shown with font size or color. This format is useful for
          quickly perceiving the most prominent terms.
          <br />
          <br />
          This type of visualization is well known by the public and eye-catching. It works well to
          reveal the essential. However, wordcloud is often criticized for not being insightful and
          to distort reality. For example, long words will be more prominent on the picture
          independently of their occurence.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Doing a <a href="/graph/wordcloud.html">wordcloud</a> itself is not a best practice.
          </li>
          <li>Useful only if sample size is huge.</li>
          <li>
            Use a horizontal <a href="/graph/lollipop.html">lolipop</a> plot instead?
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/wordcloud/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/wordcloud/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/wordcloud" },
    ],
  },
  parallel: {
    title: "Parallel coordinates",
    href: "/graph/parallel.html",
    image: "/img/section/Parallel1150.png",
    intro: "Compare samples for several numeric values.",
    about: (
      <>
        <p>
          <a href="/graph/parallel.html">Parallel plot</a> or Parallel Coordinates plot allows to
          compare the feature of several individual observations on a set of numeric variables. Each
          vertical bar represents a variable and usually has its own scale. (The units can even be
          different). Values are then plotted as series of lines connected across each axis.
          <br />
          <br />
          Parallel plot is the equivalent of a <a href="/caveat/spider.html">spider chart</a>, but
          with cartesian coordinates. Thus, it is often prefered.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Like for <a href="/graph/line.html">line chart</a>, displaying too many samples result
            in a cluttered and unreadable <a href="/caveat/spaghetti.html">spaghetti chart</a>.
          </li>
          <li>
            <a href="/caveat/order_data.html">Sort the variables</a> on the X axis, it makes sense
            to avoid crosses in sample lines.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/parallel-plot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/parallel-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/parallel" },
    ],
  },
  lollipop: {
    title: "Lollipop",
    href: "/graph/lollipop.html",
    image: "/img/section/Lollipop150.png",
    intro: "A fancy barplot, with even more options.",
    about: (
      <>
        <p>
          A <a href="/graph/lollipop.html">lollipop plot</a> is basically a{" "}
          <a href="/graph/barplot.html">barplot</a>, where the bar is transformed in a line and a
          dot. It shows the relationship between a numeric and a categoric variable.
          <br />
          <br />
          However it is more appealing and convey as well the information. It is especially useful
          when you have several bars of the same height: it avoids to have a cluttered figure and a
          Moiré effect.
          <br />
          <br />
          The Cleveland dot plot is a handy variation, allowing to compare the value of 2 numeric
          values for each group.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/order_data.html">Order your samples</a>, it makes the figure way more
            impactful
          </li>
          <li>
            If for whatever reason your bars must remain unsorted, it is probably better to use a
            barplot instead. Lollipop would be harder to read.
          </li>
          <li>
            A horizontal version allows to{" "}
            <a href="/caveat/hard_label.html">read labels more easily</a>
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/lollipop-plot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/lollipop-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/lollipop" },
    ],
  },
  circularbarplot: {
    title: "Circular Barplot",
    href: "/graph/circularbarplot.html",
    image: "/img/section/CircularBarplot150.png",
    intro: "A barplot with a circularized X axis.",
    about: (
      <>
        <p>
          A <a href="/graph/circularbarplot.html">circular barplot</a> is a{" "}
          <a href="/graph/barplot.html">barplot</a>, with each bar displayed along a circle instead
          of a line. Thus, it is advised to have a good understanding of how barplot work before
          making it circular.
          <br />
          <br />
          Circular bar chart is very ‘eye catching’ and allows a better use of the space than a long
          usual barplot.
          <br />
          <br /> However it is more difficult to read the differences between each bar size. Thus,
          circular barcharts make sense only if you have an huge number of bar to display, and if an
          obvious pattern pops out.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            The proportion of the inner circle must be huge ({">"}1/3). Otherwise{" "}
            <a href="/caveat/circular_bar_yaxis.html">bars are very skewed</a>.
          </li>
          <li>Works only if you have many levels to display ({">"} ~40) and a clear pattern</li>
          <li>Keep displaying a Y axis all along the circle.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/circular-barplot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/circular_barplot" },
    ],
  },
  treemap: {
    title: "Treemap",
    href: "/graph/treemap.html",
    image: "/img/section/Tree150.png",
    intro: "Divide your whole in rectangles",
    about: (
      <>
        <p>
          A <a href="/graph/treemap.html">Treemap</a> displays hierarchical data as a set of nested
          rectangles. Each group is represented by a rectangle, which area is proportional to its
          value. Using color schemes, it is possible to represent several dimensions: groups,
          subgroups etc.
          <br />
          <br />
          Treemaps have the advantage to make efficient use of space, what makes them useful to
          represent a big amount of data.
          <br />
          <br />
          If you have many levels of hierarchy ({">"}2), it is advised to build an interactive
          figure: clicking on a upper level of organization will reveal the next level and so on.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Don't annotate more than 3 levels of the hierarchy, it would make the figure unreadable.
          </li>
          <li>Prioritize the highest level of the hierarchy.</li>
          <li>
            <a href="/graph/treemap.html">Interactive version</a> really makes sense for treemap.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/treemap/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/treemap/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/treemap" },
    ],
  },
  venn: {
    title: "Venn diagram",
    href: "/graph/venn.html",
    image: "/img/section/Venn150.png",
    intro: "Show list sizes and their intersection.",
    about: (
      <>
        <p>
          A <a href="/graph/venn.html">Venn diagram</a> (also called primary diagram, set diagram or
          logic diagram) is a diagram that shows all possible logical relationships between a finite
          collection of different sets.
          <br />
          <br />
          Each set is represented by a circle. The circle size represents the importance of the
          group. The groups are usually overlapping: the size of the overlap represents the
          intersection between both groups.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Don't display more than 3 groups. Over this limit the figure gets very hard to read.
          </li>
          <li>
            If working with 2 groups, make the circle areas proportional to the represented values.
          </li>
          <li>Write the numbers into each areas.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/venn-diagram/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/venn-diagram/" },
    ],
  },
  donut: {
    title: "Doughnut chart",
    href: "/graph/donut.html",
    image: "/img/section/Doughnut150.png",
    intro: "A pieplot with an area of the center cut out.",
    about: (
      <>
        <p>
          A doughnut plot displays the value of several entities, really often to show proportions
          that must add up to 100%.
          <br />
          <br />
          It is very close from a <a href="/caveat/pie.html">pie plot</a> and thus suffers the same
          drawbacks. It is thus better to avoid using it, why not replacing it with a{" "}
          <a href="/graph/barplot.html">barplot</a> or{" "}
          <a href="/graph/lollipop.html">lollipop plot</a>?
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Most of the time, it is better to avoid doughnut chart for the{" "}
            <a href="/caveat/pie.html">same reasons</a> than pie plots.
          </li>
          <li>Don't use 3D.</li>
          <li>Don't use a side legend. Annotate directly each slice.</li>
          <li>If using percentages, make sure it adds up to 100%</li>
          <li>Don't put several doughnut one beside each other to compare them.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/doughnut-plot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/donut-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/donut" },
    ],
  },
  pie: {
    title: "Pie chart",
    href: "/caveat/pie.html",
    image: "/img/section/Pie150.png",
    intro: "A circular graphic divided into slices to illustrate numerical proportion.",
    about: (
      <>
        <p>
          A <a href="/caveat/pie.html">pie chart</a> is a circle divided into sectors that each
          represent a proportion of the whole. It is often used to show proportion, where the sum of
          the sectors equal 100%.
          <br />
          <br />
          Pie charts are highly critized and must be avoided as much as possible. Human is very bad
          at translating angles towards values.
          <br />
          <br />
          Instead, why not considering a <a href="/graph/barplot.html">bar chart</a> or a{" "}
          <a href="/graph/lollipop.html">lollipop plot</a>?
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/pie.html">Don't use it</a>
          </li>
          <li>Don't use 3D.</li>
          <li>Don't use a legend, annotate directly each slice.</li>
          <li>
            If displaying proportion,{" "}
            <a href="/caveat/calculation_error.html">sum must add up to 100</a>.
          </li>
          <li>Don't put several pie charts one beside each other to compare them.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/pie-plot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/pie-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/pie" },
    ],
  },
  dendrogram: {
    title: "Dendrogram",
    href: "/graph/dendrogram.html",
    image: "/img/section/Dendrogram150.png",
    intro: "A tree showing a hierarchical organization.",
    about: (
      <>
        <p>
          A <a href="/graph/dendrogram.html">dendrogram</a> is a network structure. It is
          constituted of a root node that gives birth to several nodes connected by edges or
          branches.
          <br />
          <br />
          Dendrogram can be made with 2 types of dataset. i/ A numeric matrix allowing to compute
          distance between individuals ii/ A hierarchical dataset where the relationship between
          entities is provided directly.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          {" "}
          <li>
            If using a clustering algorythm, be sure you understood{" "}
            <a href="/graph/dendrogram.html">which metrics have been used</a> for the distance
            calculation and for the clustering algorythm.
          </li>{" "}
          <li>Horizontal version are appreciated with long labels</li>{" "}
          <li>
            Showing the <a href="/graph/heatmap.html">heatmap</a> is a good practice if you're
            working with clustering.
          </li>{" "}
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/dendrogram/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/dendrogram/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/dendrogram" },
    ],
  },
  circularpacking: {
    title: "Circular Packing",
    href: "/graph/circularpacking.html",
    image: "/img/section/CircularPacking150.png",
    intro: "A circular version of a Treemap.",
    about: (
      <>
        <p>
          <a href="/graph/circularpacking.html">Circular packing</a> or circular treemap allows to
          visualise a hierarchic architecture. It is an equivalent of a{" "}
          <a href="/graph/treemap.html">treemap</a> or a{" "}
          <a href="/graph/dendrogram.html">dendrogram</a>, where each node of the tree is
          represented as a circle and its sub-nodes are represented as circles inside of it. The
          size of each circle can be proportional to a specific value, what gives more insight to
          the plot.
          <br />
          <br />
          If only one level of hierarchy is displayed (no encapsulation), it becomes equivalent to a{" "}
          <a href="/graph/barplot.html">barplot</a>. Instead of showing the value of each individual
          as a bar, it uses a circle.
          <br />
          <br />
          Circle packing is not recommended if you need to precisely compare values of group.
          However, it shows very well how groups are organised in subgroups. It uses the space less
          efficiently than a treemap, but the hierarchy gets more obvious.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>If many levels in the hierarchy, using an interactive version is advised.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/circle-packing/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/circularpacking" },
    ],
  },
  sunburst: {
    title: "Sunburst diagram",
    href: "/graph/sunburst.html",
    image: "/img/section/Sunburst150.png",
    intro: "Also called multi-level pie chart or Radial Treemap.",
    about: (
      <>
        <p>
          A <a href="/graph/sunburst.html">sunburst diagram</a> displays a hierarchical structure.
          The origin of the organization is represented by the center of the circle, and each level
          of the organization by an aditional ring. The last level (leaves) are located at the
          extreme outer part of the circle.
          <br />
          <br />
          It is possible to map a numeric value to each leaf of the graphic, in this case their size
          will be proportional to this value.
          <br />
          <br />
          Sunburst diagrams suffer the same issue than <a href="/caveat/pie.html">pie</a> or{" "}
          <a href="/graph/donut.html">doughnut</a> plot: it is really hard to compare the size of
          different slices and thus conveys poorly the information. You should probably consider
          treemap, circular packing or dendrogram.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Do not confound it with a circular stacked barplot.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "http://www.r-graph-gallery.com" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/sunburst" },
    ],
  },
  line: {
    title: "Line chart",
    href: "/graph/line.html",
    image: "/img/section/Line150.png",
    intro: "Shows the evolution of numeric variables.",
    about: (
      <>
        <p>
          A <a href="/graph/line.html">line chart</a> or line graph displays the evolution of one or
          several numeric variables. Data points are connected by straight line segments. It is
          similar to a <a href="/graph/scatter.html">scatter plot</a> except that the measurement
          points are ordered (typically by their x-axis value) and joined with straight line
          segments.
          <br />
          <br />A line chart is often used to visualize a trend in data over intervals of time – a
          time series – thus the line is often drawn chronologically.
          <br />
          <br />
          When several values are available for each time stamp, data can be aggregated and a
          confidence zone is generally added around the trend.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/cut_y_axis.html">To cut or not to cut</a> the Y axis?
          </li>
          <li>
            If you need to compare the evolution of 2 different variables, do not use{" "}
            <a href="/caveat/dual_axis.html">dual axis</a>.
          </li>
          <li>
            Mind the <a href="/caveat/spaghetti.html">spaghetti chart</a>: too many lines make the
            chart unreadable.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/line-plot/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/line-chart/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/line" },
    ],
  },
  area: {
    title: "Area chart",
    href: "/graph/area.html",
    image: "/img/section/Area150.png",
    intro: "A line graph, filling the area under the curve.",
    about: (
      <>
        <p>
          An <a href="/graph/area.html">area chart</a> is really similar to a{" "}
          <a href="/graph/line.html">line chart</a>, except that the area between the x axis and the
          line is filled in with color or shading. It represents the evolution of a numeric
          variable.
          <br />
          <br />I am a big fan of area charts and believe that it makes the trend more obvious than
          using a line graph.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            <a href="/caveat/cut_y_axis.html">To cut or not to cut</a> the Y axis?
          </li>
          <li>
            Using the same color for the line and the fill with more transparency for the fill
            usually gives a nice visual.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/area-chart/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/area-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/area" },
    ],
  },
  stackedarea: {
    title: "Stacked Area",
    href: "/graph/stackedarea.html",
    image: "/img/section/StackedArea150.png",
    intro: "A stacked version of the area chart to compare several groups.",
    about: (
      <>
        <p>
          A <a href="/graph/stackedarea.html">stacked area chart</a> is the extension of a basic{" "}
          <a href="/graph/area.html">area chart</a> which displays the evolution of the value of
          several groups on the same graphic. The values of each group are displayed on top of each
          other, what allows to check on the same figure the evolution of both the total of a
          numeric variable, and the importance of each group.
          <br />
          <br />
          If only the relative importance of each group interests you, you should probably draw a
          percent stacked area chart. It is the same thing, but proportion of each group are
          represented instead of absolute value.
          <br />
          <br />
          <a href="/graph/stackedarea.html">Stacked area chart</a> are criticized. Indeed, it can be
          hard to read the evolution of a specific group, since the reader has to substract the
          other groups in his mind. It is often better to use small multiple or line plot instead.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Use it with care, try using small multiple or line chart instead.</li>
          <li>The group order (from bottom to top) can have an influence, try several orders.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/stacked-area-graph/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/stacked-area-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/stackedarea" },
    ],
  },
  streamgraph: {
    title: "Streamgraph",
    href: "/graph/streamgraph.html",
    image: "/img/section/Stream150.png",
    intro: "A smooth version of the stacked area chart.",
    about: (
      <>
        <p>
          A <a href="/graph/streamgraph.html">Stream graph</a> is a type of{" "}
          <a href="/graph/stackedarea.html">stacked area chart</a>. It displays the evolution of a
          numeric value (Y axis) following another numeric value (X axis). This evolution is
          represented for several groups, all with a distinct color.
          <br />
          <br />
          Contrary to a stacked area, there is no corner: edges are rounded what gives this nice
          impression of flow. Moreover, areas are usually displaced around a central axis, resulting
          in a flowing and organic shape.
          <br />
          <br />
          <a href="/graph/streamgraph.html">Stream chart</a> gets really useful when displayed in an
          interactive mode: highlighting a group gives you directly an insight of its evolution.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Good to study the relative proportions of the whole.</li>
          <li>
            Bad to study the <a href="">evolution of each individual</a> group: it is very hard to
            substract the height of other groups at each time point.
          </li>
          <li>
            For a more accurate but less attractive figure, consider a{" "}
            <a href="/graph/line.html">line chart</a> or using small multiple.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/streamgraph/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/streamchart/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/streamgraph" },
    ],
  },
  map: {
    title: "Background Map",
    href: "/graph/map.html",
    image: "/img/section/Map150.png",
    intro: "The basis of all geospatial analysis.",
    about: (
      <>
        <p>
          Drawing a <a href="/graph/map.html">background map</a> is the first step of any geospatial
          analysis.
          <br />
          <br />
          Once this background is available, you can color each region to get a{" "}
          <a href="/graph/choropleth.html">choropleth</a> map, add points or bubble to get a{" "}
          <a href="/graph/bubblemap.html">bubble map</a>, reshape the region to get a{" "}
          <a href="/graph/cartogram.html">cartogram</a>, or show connection with a{" "}
          <a href="/story/MapConnection.html">connection map</a>.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Be careful concerning the projection of geo coordinates you are using.</li>
          <li>Indicate your source of information and the projection used.</li>
          <li>Don't use color without obvious purpose</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/map/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/map/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/backgroundmap" },
    ],
  },
  hexbinmap: {
    title: "Hexbin Map",
    href: "/graph/hexbinmap.html",
    image: "/img/section/MapHexbin150.png",
    intro: "Split the geographic region in a multitude of hexagons",
    about: (
      <>
        <p>
          A <a href="/graph/hexbinmap.html">hexbin map</a> splits a geographic area in a multitude
          of hexagons. A numeric value is attributed to each hexagone, what controls its color.
          <br />
          <br />
          Hexbin map is a kind of <a href="/graph/choropleth.html">choropleth map</a>. It removes
          the bias introduced by the different region size in choropleth, since each region is
          represented by the same hexagone.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Hexbin map can be confusing for reader. It is indeed harder to make the link with a real
            map since usual geographic landmarks are not present.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/hexbin-map/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/2d-density-plot/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/hexbinmap" },
    ],
  },
  cartogram: {
    title: "Cartogram",
    href: "/graph/cartogram.html",
    image: "/img/section/Cartogram150.png",
    intro: "Distorts regions to map a quantitative variable",
    about: (
      <>
        <p>
          A <a href="/graph/cartogram.html">cartogram</a> is a map in which the geometry of regions
          is distorted in order to convey the information of an alternate variable.
          <br />
          <br />
          Cartogram aims to correct the bias that can be observed in a{" "}
          <a href="/graph/choropleth.html">choropleth map</a>: when a variable is aggregated per
          region, a region with very few data points will look as important as a region with many
          data points
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Normalize your variable: you cannot compare raw numbers between regions of distinct size
            or population.
          </li>
          <li>Take a huge care when choosing the continuous color palette.</li>
          <li>Don't forget the legend.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/cartogram/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/cartogram" },
    ],
  },
  choropleth: {
    title: "Choropleth map",
    href: "/graph/choropleth.html",
    image: "/img/section/Choropleth150.png",
    intro: "Display a aggregated value for each region of the map.",
    about: (
      <>
        <p>
          A <a href="/graph/choropleth.html">choropleth map</a> displays divided geographical areas
          or regions that are coloured in relation to a numeric variable. It allows to study how a
          variable evolutes along a territory.
          <br />
          <br />
          It is a powerful and widely used data visualization technique. However, its downside is
          that regions with bigger sizes tend to have a bigger weight in the map interpretation,
          which includes a bias.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Normalize your variable: you cannot compare raw numbers between regions of distinct size
            or population.
          </li>
          <li>Take a huge care when choosing the continuous color palette.</li>
          <li>Don't forget the legend.</li>
          <li>
            If your regions have a broad range of sizes it introduces a biais. You could consider
            using hexbin maps instead.
          </li>
          <li>
            Don't call it ch<em>L</em>oropleth map.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/chloropleth-map/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/choropleth-map/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/choropleth" },
    ],
  },
  connection: {
    title: "Connection map",
    href: "/story/MapConnection.html",
    image: "/img/section/ConnectedMap150.png",
    intro: "Shows multiple connection using lines or arcs.",
    about: (
      <>
        <p>
          A <a href="/story/MapConnection.html">connection map</a> allows to show the connection
          between several positions on a map.
          <br />
          <br />
          The link between 2 places can be drawn with a straight line, or more commonly by
          representing the ‘great circle‘: the shortest route between them. Knowing that the earth
          is a sphere, this results in rounded lines that give a really pleasant look to the map.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            If showing a multitude of connection, think of the order of the traits you draw. The
            latest will be more apparant.
          </li>
          <li>
            Use <a href="/story/MapConnection.html">great circle</a> instead of straight lines.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/connection-map/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/connection-map/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/connection" },
    ],
  },
  bubblemap: {
    title: "Bubble maps",
    href: "/graph/bubblemap.html",
    image: "/img/section/BubbleMap150.png",
    intro: "Bubbles on a map to show quantitative variables.",
    about: (
      <>
        <p>
          A <a href="/graph/bubblemap.html">bubble map</a> uses circles of different size to
          represent a numeric value on a territory.
          <br />
          <br />
          It is possible to display a bubble per geographic coordinate, or a bubble per region (in
          this case the bubble is usually displayed in the baricentre of the region).
          <br />
          <br />
          <a href="/graph/bubblemap.html">Bubble map</a> allows to avoid the bias caused by regional
          area sizes in choropleth maps.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Map the numeric variable to the bubble area,{" "}
            <a href="/caveat/radius_or_area.html">not to the bubble diameter.</a>
          </li>
          <li>Use transparency if bubbles are overlapping.</li>
          <li>
            Display a legend to understand the meaning of bubble size, or annotate each bubble.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/bubble-map/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/bubble-map/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/bubblemap" },
    ],
  },
  chord: {
    title: "Chord diagram",
    href: "/graph/chord.html",
    image: "/img/section/Chord150.png",
    intro: "A circular plot showing connections.",
    about: (
      <>
        <p>
          <a href="/graph/chord.html">Chord diagrams</a> allow to visualize flows or connections
          between several entities (nodes). Each entity is represented by a fragment on the outer
          part of the circular layout. Then, arcs are drawn between each entities. The size of the
          arc is proportional to the importance of the flow
          <br />
          <br />
          Chord diagrams are eye catching and quite popular in data visualization. Their main
          downside is that they becom quickly cluttered and unreadable. Hierarchical edge bundling
          is a really close type of graphic that allows to avoid this issue.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Order of groups around the circle is important, it is better to minimize the number of
            arcs crossing.
          </li>
          <li>
            Chord diagrams are not straightforward to understand. Give plenty of explanation to your
            audience when you present it.
          </li>
          <li>Mind over-cluttering.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/chord-diagram/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/chord-diagram/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/chord" },
    ],
  },
  network: {
    title: "Network",
    href: "/graph/network.html",
    image: "/img/section/Network150.png",
    intro: "A set of nodes and links",
    about: (
      <>
        <p>
          <a href="/graph/network.html">Network diagrams</a> (also called Graphs) show
          interconnections between a set of entities. Each entity is represented by a Node (or
          vertice). Connection between nodes are represented through links (or edges).
          <br />
          <br />
          Networks is an entire field of research in itself. For example, you need to set up a
          layout algorythm that finds out an optimal position for each node.
          <br />
          <br />
          Several type of networks exist. They can be directed (flow) or undirected (connection).
          Links can be wheigthed or not.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>
            Hairball is the main enemy: when too many connection and no obivious pattern is
            represented, the figure get cluttered and unreadable.
          </li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/network/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/network-chart/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/network" },
    ],
  },
  sankey: {
    title: "Sankey diagram",
    href: "/graph/sankey.html",
    image: "/img/section/Sankey150.png",
    intro: "Showing flows with smooth links",
    about: (
      <>
        <p>
          A <a href="/graph/sankey.html">Sankey Diagram</a> is a visualisation technique that allows
          to display flows. Several entities (nodes) are represented by rectangles or text. Their
          links are represented with arrows or arcs that have a width proportional to the importance
          of the flow.
          <br />
          <br />
          Note that an <a href="/graph/sankey.html">Alluvial diagram</a> is a sub category of Sankey
          diagrams where nodes are grouped in vertical nodes (sometimes called steps).
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Node position is important: minimize the number of crossing between links.</li>
          <li>Mind over-cluttering that makes the figure unreadable: dismiss weak connections.</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com/sankey-diagram/" },
      { label: "Python gallery", href: "https://python-graph-gallery.com/sankey-diagram/" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/sankey" },
    ],
  },
  arc: {
    title: "Arc diagram",
    href: "/graph/arc.html",
    image: "/img/section/Arc150.png",
    intro: "A network structure where nodes are aligned.",
    about: (
      <>
        <p>
          An <a href="/graph/arc.html">arc diagram</a> is a special kind of network graph. It is
          consituted by nodes that represent entities and by links that show relationships between
          entities.
          <br />
          <br />
          In arc diagrams, nodes are displayed along a single axis and links are represented with
          arcs.
          <br />
          <br />
          They do not convey the overall node structure than an{" "}
          <a href="/graph/network.html">2d network</a>, but can highlight clusters and briges if the
          node order is chosen correclty.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Finding the best node order is the key for an insightful arc diagram</li>
        </ul>
      </>
    ),
    code: [
      { label: "R graph gallery", href: "https://www.r-graph-gallery.com" },
      { label: "Python gallery", href: "https://www.python-graph-gallery.com" },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/arc" },
    ],
  },
  bundle: {
    title: "Hierarchical edge bundling",
    href: "/graph/edge_bundling.html",
    image: "/img/section/Bundle150.png",
    intro: "A network structure where nodes are aligned.",
    about: (
      <>
        <p>
          <a href="/graph/edge_bundling.html">Hierarchical edge bundling</a> is a data visualisation
          method allowing to check connections between leaves of a hierarchical network.
          <br />
          <br />
          Instead of using straight line to do so, each connection is curved and follow the
          hierarchical path between the 2 nodes. This technique minimize the clutter and allows to
          detect trends more efficiently.
        </p>
      </>
    ),
    mistakes: (
      <>
        <ul>
          <li>Play with bin size / bandwidth.</li>
          <li>Useful only if sample size is huge.</li>
          <li>Pick up a good color palette.</li>
        </ul>
      </>
    ),
    code: [
      {
        label: "R graph gallery",
        href: "https://www.r-graph-gallery.com/hierarchical-edge-bundling/",
      },
      { label: "D3.js gallery", href: "https://www.d3-graph-gallery.com/bundle" },
    ],
  },
};
