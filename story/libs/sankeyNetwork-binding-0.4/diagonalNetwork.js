HTMLWidgets.widget({

  name: "diagonalNetwork",
  type: "output",

  initialize: function(el, width, height) {

    d3.select(el).append("svg")
      .style("width", "100%")
      .style("height", "100%")
      .append("g")
      .attr("transform", "translate(40,0)");
    return d3.tree();

  },

  resize: function(el, width, height, tree) {
    // resize now handled by svg viewBox attribute
    /*
    var s = d3.select(el).selectAll("svg");
    s.attr("width", width).attr("height", height);

    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    width = width - margin.right - margin.left;
    height = height - margin.top - margin.bottom;

    tree.size([height, width]);
    var svg = d3.select(el).selectAll("svg").select("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    */

  },

  renderValue: function(el, x, tree) {
    // x is a list with two elements, options and root; root must already be a
    // JSON array with the d3Tree root data

    var s = d3.select(el).selectAll("svg");

    // when re-rendering the svg, the viewBox attribute set in the code below, will
    // be affected by the previously set viewBox. This line ensures, that the
    // viewBox will always be calculated right.
    s.attr("viewBox", null);

    // margin handling
    //   set our default margin to be 20
    //   will override with x.options.margin if provided
    var margin = {top: 20, right: 20, bottom: 20, left: 20};
    //   go through each key of x.options.margin
    //   use this value if provided from the R side
    Object.keys(x.options.margin).map(function(ky){
      if(x.options.margin[ky] !== null) {
        margin[ky] = x.options.margin[ky];
      }
      // set the margin on the svg with css style
      // commenting this out since not correct
      // s.style(["margin",ky].join("-"), margin[ky]);
    });


    width = s.node().getBoundingClientRect().width - margin.right - margin.left;
    height = s.node().getBoundingClientRect().height - margin.top - margin.bottom;

    //added Math.max(1, ...) to avoid NaN values when dealing with nodes of depth 0.
    tree.size([height, width])
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / Math.max(1, a.depth); });

    // select the svg group element and remove existing children
    s.attr("pointer-events", "all").selectAll("*").remove();
    s.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svg = d3.select(el).selectAll("g");

    var root = d3.hierarchy(x.root);
    tree(root);

    var diagonal = function(d, i) {
      return "M" + d.source.y + "," + d.source.x
                  + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
                  + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
                  + " " + d.target.y + "," + d.target.x;
    };

    // draw links
    var link = svg.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .style("fill", "none")
      .style("stroke", x.options.linkColour)
      .style("opacity", "0.55")
      .style("stroke-width", "1.5px")
      .attr("d", diagonal);

    // draw nodes
    var node = svg.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    // node circles
    node.append("circle")
        .attr("r", 4.5)
        .style("fill", x.options.nodeColour)
        .style("opacity", x.options.opacity)
        .style("stroke", x.options.nodeStroke)
        .style("stroke-width", "1.5px");

    // node text
    node.append("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
        })
        .style("font", x.options.fontSize + "px " + x.options.fontFamily)
        .style("opacity", x.options.opacity)
        .style("fill", x.options.textColour)
        .text(function(d) { return d.data.name; });

    // adjust viewBox to fit the bounds of our tree
    s.attr(
        "viewBox",
        [
          d3.min(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().left
            })
          ) - s.node().getBoundingClientRect().left - margin.right,
          d3.min(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().top
            })
          ) - s.node().getBoundingClientRect().top - margin.top,
          d3.max(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().right
            })
          ) -
          d3.min(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().left
            })
          ) + margin.left + margin.right,
          d3.max(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().bottom
            })
          ) -
          d3.min(
            s.selectAll('.node text').nodes().map(function(d){
              return d.getBoundingClientRect().top
            })
          ) + margin.top + margin.bottom
        ].join(",")
      );

    // mouseover event handler
    function mouseover() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 9);

      d3.select(this).select("text").transition()
        .duration(750)
        .style("stroke-width", ".5px")
        .style("font", "25px " + x.options.fontFamily)
        .style("opacity", 1);
    }

    // mouseout event handler
    function mouseout() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 4.5);

      d3.select(this).select("text").transition()
        .duration(750)
        .style("font", x.options.fontSize + "px " + x.options.fontFamily)
        .style("opacity", x.options.opacity);
    }

  },
});
