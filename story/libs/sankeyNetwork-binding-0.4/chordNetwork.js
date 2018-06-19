HTMLWidgets.widget({

  name: "chordNetwork",
  type: "output",

  initialize: function(el, width, height) {
    var x = width + 50;
    var y = height + 50;

    d3.select(el).append("svg")
      .attr("width", x)
      .attr("height", y)
      .append("g")
      .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");

    return d3.chord();
  },

  resize: function(el, width, height, chord) {
    var x = width + 50;
    var y = height + 50;
    d3.select(el).selectAll("svg").attr("width", x).attr("height", y);
    d3.select(el).selectAll("svg").select("g")
      .attr("transform", "translate(" + x / 2 + "," + y / 2 + ")");
  },

  renderValue: function(el, x, chord) {

    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
      return function(g, i) {
        s.selectAll(".chord path")
          .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
          .style("opacity", opacity);
      };
    }

    var para = document.createElement("style");
    para.innerHTML = ".chord path { fill-opacity: "+ x.options.initial_opacity +"; stroke: #000; stroke-width: .0px; }"
    document.getElementsByTagName("head")[0].appendChild(para);

    chord.padAngle(x.options.padding)
        .sortSubgroups(d3.descending);

    var s = d3.select(el).select("g").datum(chord(x.matrix));
    var diameter = Math.min(x.options.width, x.options.height);
    var innerRadius = Math.min(x.options.width, x.options.height) * .31;
    var outerRadius = innerRadius * 1.1;

    var fill = x.options.colour_scale
          ?d3.scaleOrdinal().domain(x.matrix.length).range(x.options.colour_scale)
          :(x.matrix.length>10?d3.schemeCategory20():d3.schemeCategory10());

    s.append("g").selectAll("path")
      .data(function(chords) { return chords.groups; })
      .enter().append("g")
      .attr("class", "pie-slice")
      .append("path")
      .style("fill", function(d) {
        return fill(d.index);
        })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .on("mouseover", fade(.1))
      .on("mouseout", fade(1));

      if(x.options.labels) {
        // Forumulas taken from http://sdk.gooddata.com/gooddata-js/example/chord-chart-to-analyze-sales/
        s.append("g").selectAll(".arc")
          .data(function(chords) { return chords.groups; })
          .enter().append("svg:text")
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return ((d.startAngle + d.endAngle) / 2) > Math.PI ? "end" : null; })
          .attr("transform", function(d) {
            return "rotate(" + (((d.startAngle + d.endAngle) / 2) * 180 / Math.PI - 90) + ")"
                + "translate(" + (x.options.height / 2 - x.options.label_distance) + ")"
                + (((d.startAngle + d.endAngle) / 2) > Math.PI ? "rotate(180)" : "");
          }).text(function(d) {
              return x.options.labels[d.index];
          }).attr("font-size", x.options.font_size + "px")
          .attr("font-family", x.options.font_family);
      }

    if(x.options.use_ticks) {
      var ticks = s.append("g").selectAll("g")
        .data(function(chords) { return chords.groups; })
        .enter().append("g").selectAll("g")
        .data(groupTicks)
        .enter().append("g")
        .attr("transform", function(d) {
          return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
              + "translate(" + outerRadius + ",0)";
        });

      ticks.append("line")
        .attr("x1", 1)
        .attr("y1", 0)
        .attr("x2", 5)
        .attr("y2", 0)
        .style("stroke", "#000");

      ticks.append("text")
        .attr("x", 8)
        .attr("dy", ".35em")
        .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
        .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .text(function(d) { return d.label; })
        .attr("font-size", x.options.font_size + "px")
        .attr("font-family", x.options.font_family);
    }

    s.append("g")
      .attr("class", "chord")
      .selectAll("path")
      .data(function(chords) { return chords; })
      .enter().append("path")
      .attr("d", d3.ribbon().radius(innerRadius))
      .style("fill", function(d) { return fill(d.target.index); })
      .style("fill-opacity", x.options.initial_opacity);

    function groupTicks(d) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, 1000).map(function(v, i) {
        return {
          angle: v * k + d.startAngle,
          label: i % 5 ? null : v / 1000 + "k"
        };
      });
    }

  },
});
