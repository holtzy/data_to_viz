// Generated from legacy/index.html by scripts/migrate/convert-home.mjs — edit freely.
export const STORY_GROUPS = [
  {
    label: "Numeric",
    items: [
      {
        title: "Rbnb night prices on the french riviera",
        href: "/story/OneNum.html",
      },
      {
        title: "Price / area relationship of 1500 apartments",
        href: "/story/TwoNum.html",
      },
      {
        title: "Evolution of the bitcoin price",
        href: "/story/TwoNumOrdered.html",
      },
      {
        title: "Relationship between life expectancy, gdp per capita and population",
        href: "/story/ThreeNum.html",
      },
      {
        title: "Evolution of baby names in the US since 1880",
        href: "/story/OneCatSevOrderedNum.html",
      },
      {
        title: "Features of 32 famous car models",
        href: "/story/SeveralNum.html",
      },
    ],
  },
  {
    label: "Categoric",
    items: [
      {
        title: "Who sells more weapons?",
        href: "/story/OneNumOneCat.html",
      },
      {
        title: "Comparing the lyrics of 3 french rappers",
        href: "/story/SeveralIndepLists.html",
      },
      {
        title: "Repartition of the world population",
        href: "/story/SevCatOneNumNestedOneObsPerGroup.html",
      },
      {
        title: "The gender wage gap",
        href: "/story/OneNumSevCatSubgroupOneObsPerGroup.html",
      },
      {
        title: "Co-autorship network | migration flows",
        href: "/story/AdjacencyMatrix.html",
      },
    ],
  },
  {
    label: "Num & Cat",
    items: [
      {
        title: "Who sells more weapons?",
        href: "/story/OneNumOneCat.html",
      },
      {
        title: "How people perceive probability vocabulary",
        href: "/story/OneNumOneCatSeveralObs.html",
      },
      {
        title: "Features of 32 famous car models",
        href: "/story/SeveralNum.html",
      },
      {
        title: "Evolution of baby names in the US since 1880",
        href: "/story/OneCatSevOrderedNum.html",
      },
      {
        title: "The gender wage gap",
        href: "/story/OneNumSevCatSubgroupOneObsPerGroup.html",
      },
      {
        title: "How much do people tip?",
        href: "/story/OneNumSevCatSubgroupSevObsPerGroup.html",
      },
      {
        title: "Repartition of the world population",
        href: "/story/SevCatOneNumNestedOneObsPerGroup.html",
      },
      {
        title: "Co-autorship network | migration flows",
        href: "/story/AdjacencyMatrix.html",
      },
    ],
  },
  {
    label: "Maps",
    items: [
      {
        title: "Where surfers live",
        href: "/story/GPSCoordWithoutValue.html",
      },
      {
        title: "The population of 1000 cities in the UK",
        href: "/story/GPSCoordWithValue.html",
      },
      {
        title: "Where surfers travel",
        href: "/story/MapConnection.html",
      },
      {
        title: "Distribution of restaurants in the south of France",
        href: "/graph/choropleth.html",
      },
    ],
  },
  {
    label: "Network",
    items: [
      {
        title: "Co-autorship network | migration flows",
        href: "/story/AdjacencyMatrix.html",
      },
      {
        title: "Repartition of the world population",
        href: "/story/SevCatOneNumNestedOneObsPerGroup.html",
      },
      {
        title: "Connection between informatic components",
        href: "/graph/edge_bundling.html",
      },
    ],
  },
];

export const PORTFOLIO_FILTERS = [
  {
    id: "all",
    label: "Show all",
  },
  {
    id: "distribution",
    label: "Distribution",
  },
  {
    id: "correlation",
    label: "Correlation",
  },
  {
    id: "ranking",
    label: "Ranking",
  },
  {
    id: "partofawhole",
    label: "Part of a whole",
  },
  {
    id: "evolution",
    label: "Evolution",
  },
  {
    id: "maps",
    label: "Map",
  },
  {
    id: "flow",
    label: "Flow",
  },
];

export const PORTFOLIO: {
  id: string;
  title: string;
  image: string;
  href: string | null;
  categories: string[];
}[] = [
  {
    id: "violin",
    title: "Violin",
    image: "/img/section/Violin150.png",
    href: "/graph/violin.html",
    categories: ["distribution"],
  },
  {
    id: "density",
    title: "Density",
    image: "/img/section/Density150.png",
    href: "/graph/density.html",
    categories: ["distribution"],
  },
  {
    id: "histogram",
    title: "Histogram",
    image: "/img/section/Histogram150.png",
    href: "/graph/histogram.html",
    categories: ["distribution"],
  },
  {
    id: "boxplot",
    title: "Boxplot",
    image: "/img/section/Box1150.png",
    href: "/caveat/boxplot.html",
    categories: ["distribution"],
  },
  {
    id: "ridgeline",
    title: "Ridgeline",
    image: "/img/section/Joyplot150.png",
    href: "/graph/ridgeline.html",
    categories: ["distribution"],
  },
  {
    id: "scatter",
    title: "Scatter",
    image: "/img/section/ScatterPlot150.png",
    href: "/graph/scatter.html",
    categories: ["correlation"],
  },
  {
    id: "heatmap",
    title: "Heatmap",
    image: "/img/section/Heatmap150.png",
    href: "/graph/heatmap.html",
    categories: ["correlation"],
  },
  {
    id: "correlogram",
    title: "Correlogram",
    image: "/img/section/Correlogram150.png",
    href: "/graph/correlogram.html",
    categories: ["correlation"],
  },
  {
    id: "bubble",
    title: "Bubble",
    image: "/img/section/BubblePlot150.png",
    href: "/graph/bubble.html",
    categories: ["correlation"],
  },
  {
    id: "connectedscatter",
    title: "Connected scatter",
    image: "/img/section/ScatterConnected150.png",
    href: "/graph/connectedscatter.html",
    categories: ["correlation"],
  },
  {
    id: "density2d",
    title: "Density 2d",
    image: "/img/section/2dDensity150.png",
    href: "/graph/density2d.html",
    categories: ["correlation"],
  },
  {
    id: "barplot",
    title: "Barplot",
    image: "/img/section/Bar150.png",
    href: "/graph/barplot.html",
    categories: ["ranking"],
  },
  {
    id: "spider",
    title: "Spider / Radar",
    image: "/img/section/Spider150.png",
    href: "/caveat/spider.html",
    categories: ["ranking"],
  },
  {
    id: "wordcloud",
    title: "Wordcloud",
    image: "/img/section/Wordcloud150.png",
    href: "/graph/wordcloud.html",
    categories: ["ranking"],
  },
  {
    id: "parallel",
    title: "Parallel",
    image: "/img/section/Parallel1150.png",
    href: "/graph/parallel.html",
    categories: ["ranking"],
  },
  {
    id: "lollipop",
    title: "Lollipop",
    image: "/img/section/Lollipop150.png",
    href: "/graph/lollipop.html",
    categories: ["ranking"],
  },
  {
    id: "circularbarplot",
    title: "Circular Barplot",
    image: "/img/section/CircularBarplot150.png",
    href: "/graph/circularbarplot.html",
    categories: ["ranking"],
  },
  {
    id: "treemap",
    title: "Treemap",
    image: "/img/section/Tree150.png",
    href: "/graph/treemap.html",
    categories: ["partofawhole"],
  },
  {
    id: "venn",
    title: "Venn diagram",
    image: "/img/section/Venn150.png",
    href: "/graph/venn.html",
    categories: ["partofawhole"],
  },
  {
    id: "donut",
    title: "Doughnut",
    image: "/img/section/Doughnut150.png",
    href: "/graph/donut.html",
    categories: ["partofawhole"],
  },
  {
    id: "pie",
    title: "Pie chart",
    image: "/img/section/Pie150.png",
    href: "/caveat/pie.html",
    categories: ["partofawhole"],
  },
  {
    id: "dendrogram",
    title: "Dendrogram",
    image: "/img/section/Dendrogram150.png",
    href: "/graph/dendrogram.html",
    categories: ["partofawhole"],
  },
  {
    id: "circularpacking",
    title: "Circular packing",
    image: "/img/section/CircularPacking150.png",
    href: "/graph/circularpacking.html",
    categories: ["partofawhole"],
  },
  {
    id: "sunburst",
    title: "Sunburst",
    image: "/img/section/Sunburst150.png",
    href: "/graph/sunburst.html",
    categories: ["partofawhole"],
  },
  {
    id: "line",
    title: "Line plot",
    image: "/img/section/Line150.png",
    href: "/graph/line.html",
    categories: ["evolution"],
  },
  {
    id: "area",
    title: "Area",
    image: "/img/section/Area150.png",
    href: "/graph/area.html",
    categories: ["evolution"],
  },
  {
    id: "stackedarea",
    title: "Stacked area",
    image: "/img/section/StackedArea150.png",
    href: "/graph/stackedarea.html",
    categories: ["evolution"],
  },
  {
    id: "streamgraph",
    title: "Streamchart",
    image: "/img/section/Stream150.png",
    href: "/graph/streamgraph.html",
    categories: ["evolution"],
  },
  {
    id: "map",
    title: "Map",
    image: "/img/section/Map150.png",
    href: "/graph/map.html",
    categories: ["maps"],
  },
  {
    id: "choropleth",
    title: "Choropleth",
    image: "/img/section/Choropleth150.png",
    href: "/graph/choropleth.html",
    categories: ["maps"],
  },
  {
    id: "hexbinmap",
    title: "Hexbin map",
    image: "/img/section/MapHexbin150.png",
    href: "/graph/hexbinmap.html",
    categories: ["maps"],
  },
  {
    id: "cartogram",
    title: "Cartogram",
    image: "/img/section/Cartogram150.png",
    href: "/graph/cartogram.html",
    categories: ["maps"],
  },
  {
    id: "connection",
    title: "Connection",
    image: "/img/section/ConnectedMap150.png",
    href: "/story/MapConnection.html",
    categories: ["maps"],
  },
  {
    id: "bubblemap",
    title: "Bubble map",
    image: "/img/section/BubbleMap150.png",
    href: "/graph/bubblemap.html",
    categories: ["maps"],
  },
  {
    id: "chord",
    title: "Chord diagram",
    image: "/img/section/Chord150.png",
    href: "/graph/chord.html",
    categories: ["flow"],
  },
  {
    id: "network",
    title: "Network",
    image: "/img/section/Network150.png",
    href: "/graph/network.html",
    categories: ["flow"],
  },
  {
    id: "sankey",
    title: "Sankey",
    image: "/img/section/Sankey150.png",
    href: "/graph/sankey.html",
    categories: ["flow"],
  },
  {
    id: "arc",
    title: "Arc diagram",
    image: "/img/section/Arc150.png",
    href: "/graph/arc.html",
    categories: ["flow"],
  },
  {
    id: "bundle",
    title: "Edge bundling",
    image: "/img/section/Bundle150.png",
    href: "/graph/edge_bundling.html",
    categories: ["flow"],
  },
];

export const CAVEAT_CARDS = [
  {
    href: "/caveat/order_data.html",
    image: "/img/mistake/order_data.png",
    title: "Order your data",
    text: "When displaying the value of several entities, ordering it makes it way more insightful.",
  },
  {
    href: "/caveat/cut_y_axis.html",
    image: "/img/mistake/cut_y_axis.png",
    title: "To cut or not to cut?",
    text: "Cutting the Y axis is one of the most controversial practices in data viz. See why.",
  },
  {
    href: "/caveat/spaghetti.html",
    image: "/img/mistake/spaghetti.png",
    title: "The spaghetti chart",
    text: "A line graph with too many lines becomes unreadable: it is called a spaghetti graph.",
  },
  {
    href: "/caveat/pie.html",
    image: "/img/mistake/pie.png",
    title: "Pie chart",
    text: "The human eye is bad at reading angles. See how to replace the most criticized chart ever.",
  },
  {
    href: "/caveat/bin_size.html",
    image: "/img/mistake/bin_size.png",
    title: "Play with histogram bin size",
    text: "Always try different bin sizes when you build an histogram, it can lead to different insights.",
  },
  {
    href: "/caveat/boxplot.html",
    image: "/img/mistake/boxplot.png",
    title: "Do boxplots hide information?",
    text: "A boxplot is a great way to summarize a distribution but it hides the sample size and data distribution.",
  },
  {
    href: "/caveat/error_bar.html",
    image: "/img/mistake/error_bar.png",
    title: "The problem with error bars",
    text: "Barplots with error bars must be used with great care. Learn why and how to replace them.",
  },
  {
    href: "/caveat/multi_distribution.html",
    image: "/img/mistake/multi_distribution.png",
    title: "Too many distributions",
    text: "If you need to compare the distribution of many variables, don't clutter your graph.",
  },
  {
    href: "/caveat/overplotting.html",
    image: "/img/mistake/overplotting.png",
    title: "Overplotting",
    text: "Too many points on your scatter plot makes it unreadable? Techniques exist to avoid overplotting.",
  },
  {
    href: "/caveat/rainbow.html",
    image: "/img/mistake/rainbow.png",
    title: "The rainbow color palette",
    text: "Avoid the rainbow color palette when you map a numeric variable. So many better palettes exist.",
  },
  {
    href: "/caveat/small_multiple.html",
    image: "/img/mistake/small_multiple.png",
    title: "Faceting: horizontal or vertical?",
    text: "Placing individual plots horizontally or vertically is an important choice to make.",
  },
  {
    href: "/caveat/counter_intuitive.html",
    image: "/img/mistake/counter_intuitive.png",
    title: "Don't be counter intuitive",
    text: "Your audience is used to a few dataviz standards. Not respecting it can mislead them.",
  },
];
