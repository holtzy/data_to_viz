HTMLWidgets.widget({

  name: "dendroNetwork",
  type: "output",

  initialize: function(el, width, height) {

    d3.select(el).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    return d3.cluster();

  },

  resize: function(el, width, height, tree) {

    var s = d3.select(el).selectAll("svg")
      .attr("width", width)
      .attr("height", height);

    var margins = s.attr("margins");

    var top = parseInt(margins.top),
      right = parseInt(margins.right),
      bottom = parseInt(margins.bottom),
      left = parseInt(margins.left);

    height = height - top - bottom;
    width = width - right - left;

    if (s.attr("treeOrientation") == "horizontal") {
      tree.size([height, width]);
    } else {
      tree.size([width, height]);
    }

    var svg = d3.select(el).selectAll("svg").select("g")
      .attr("transform", "translate(" + left + "," + top + ")");

  },

  renderValue: function(el, x, tree) {

    var s = d3.select(el).selectAll("svg")
      .attr("margins", x.options.margins)
      .attr("treeOrientation", x.options.treeOrientation);

    var top = parseInt(x.options.margins.top),
      right = parseInt(x.options.margins.right),
      bottom = parseInt(x.options.margins.bottom),
      left = parseInt(x.options.margins.left);

    var height = parseInt(s.attr("height")) - top - bottom,
      width = parseInt(s.attr("width")) - right - left;

    if (s.attr("treeOrientation") == "horizontal") {
      tree.size([height, width]);
    } else {
      tree.size([width, height]);
    }

    var zoom = d3.zoom();

    var svg = d3.select(el).select("svg");
    svg.selectAll("*").remove();

    svg = svg
      .append("g").attr("class","zoom-layer")
      .append("g")
      .attr("transform", "translate(" + left + "," + top + ")");

    if (x.options.zoom) {
       zoom.on("zoom", function() {
         d3.select(el).select(".zoom-layer")
          .attr("transform", d3.event.transform);
       });

       d3.select(el).select("svg")
         .attr("pointer-events", "all")
         .call(zoom);

     } else {
       zoom.on("zoom", null);
     }

    var root = d3.hierarchy(x.root);
    tree(root);

    var ymax = d3.max(root.descendants(), function(d) { return d.data.y; });
    var ymin = d3.min(root.descendants(), function(d) { return d.data.y; });

    if (s.attr("treeOrientation") == "horizontal") {
      fxinv = d3.scaleLinear().domain([ymin, ymax]).range([0, width]);
      fx = d3.scaleLinear().domain([ymax, ymin]).range([0, width]);
    } else {
      fxinv = d3.scaleLinear().domain([ymin, ymax]).range([0, height]);
      fx = d3.scaleLinear().domain([ymax, ymin]).range([0, height]);
    }

    // draw links
    var link = svg.selectAll(".link")
      .data(root.links())
      .enter().append("path")
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("opacity", "0.55")
      .style("stroke-width", "1.5px");

    if (x.options.linkType == "elbow") {
      if (s.attr("treeOrientation") == "horizontal") {
        link.attr("d", function(d, i) {
          return "M" + fx(d.source.data.y) + "," + d.source.x
            + "V" + d.target.x + "H" + fx(d.target.data.y);
        });
      } else {
        link.attr("d", function(d, i) {
          return "M" + d.source.x + "," + fx(d.source.data.y)
            + "H" + d.target.x + "V" + fx(d.target.data.y);
        });
      }
    } else {
      if (s.attr("treeOrientation") == "horizontal") {
        link.attr("d", function(d, i) {
          return "M" + fx(d.source.data.y) + "," + d.source.x
                + "C" + (fx(d.source.data.y) + fx(d.target.data.y)) / 2 + "," + d.source.x
                + " " + (fx(d.source.data.y) + fx(d.target.data.y)) / 2 + "," + d.target.x
                + " " + fx(d.target.data.y) + "," + d.target.x;
        });
      } else {
        link.attr("d", function(d, i) {
          return "M" + d.source.x + "," + fx(d.source.data.y)
                + "C" + (d.source.x + d.target.x) / 2 + "," + fx(d.source.data.y)
                + " " + (d.source.x + d.target.x) / 2 + "," + fx(d.target.data.y)
                + " " + d.target.x + "," + fx(d.target.data.y);
        });
      }
    }

    // draw nodes
    var node = svg.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    if (s.attr("treeOrientation") == "horizontal") {
      node.attr("transform", function(d) { return "translate(" + fx(d.data.y) + "," + d.x + ")"; });
    } else {
      node.attr("transform", function(d) { return "translate(" + d.x + "," + fx(d.data.y) + ")"; });
    }

    // node circles
    node.append("circle")
      .attr("r", 4.5)
      .style("fill", x.options.nodeColour)
      .style("opacity", x.options.opacity)
      .style("stroke", x.options.nodeStroke)
      .style("stroke-width", "1.5px");

    // node text
    node.append("text")
      .attr("transform", "rotate(" + x.options.textRotate + ")")
      .style("font", x.options.fontSize + "px serif")
      .style("opacity", function(d) { return d.data.textOpacity; })
      .style("fill", function(d) { return d.data.textColour; })
      .text(function(d) { return d.data.name; });

    if (s.attr("treeOrientation") == "horizontal") {
      node.select("text")
        .attr("dx", function(d) { return d.children ? -8 : 8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.children ? "end" : "start"; });
    } else {
      node.select("text")
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .attr("dy", ".31em")
        .attr("text-anchor", "start");
    }

    // mouseover event handler
    function mouseover() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 9);

      d3.select(this).select("text").transition()
        .duration(750)
        .style("stroke-width", ".5px")
        .style("font", "25px serif")
        .style("opacity", 1);
    }

    // mouseout event handler
    function mouseout() {
      d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 4.5);

      d3.select(this).select("text").transition()
        .duration(750)
        .style("font", x.options.fontSize + "px serif")
        .style("opacity", x.options.opacity);
    }

  },
});
