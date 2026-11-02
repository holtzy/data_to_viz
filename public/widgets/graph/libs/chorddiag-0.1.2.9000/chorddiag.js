HTMLWidgets.widget({

  name: 'chorddiag',
  type: 'output',

  initialize: function(el, width, height) {

    d3.select(el).append("svg")
                 .attr("width", width)
                 .attr("height", height);

    return d3.chord();

  },

  resize: function(el, width, height, chord) {

    d3.select(el).select("svg")
                 .attr("width", width)
                 .attr("height", height);

    this.renderValue(el, chord.params, chord);

  },

  renderValue: function(el, params, chord) {

    // save params for reference from resize method
    chord.params = params;

    var matrix = params.matrix,
        options = params.options;

    // get width and height, calculate min for use in diagram size
    var width = el.offsetWidth,
        height = el.offsetHeight,
        d = Math.min(width, height);

    var type = options.type,
        margin = options.margin,
        showGroupnames = options.showGroupnames,
        groupNames = options.groupNames,
        groupColors = options.groupColors,
        groupThickness = options.groupThickness,
        groupPadding = options.groupPadding,
        groupnamePadding = options.groupnamePadding,
        groupnameFontsize = options.groupnameFontsize,
        groupedgeColor = options.groupedgeColor,
        chordedgeColor = options.chordedgeColor,
        categoryNames = options.categoryNames,
        categorynamePadding = options.categorynamePadding,
        categorynameFontsize = options.categorynameFontsize,
        showTicks = options.showTicks,
        tickInterval = options.tickInterval,
        ticklabelFontsize = options.ticklabelFontsize,
        fadeLevel = options.fadeLevel,
        showTooltips = options.showTooltips,
        showZeroTooltips = options.showZeroTooltips,
        tooltipNames = options.tooltipNames,
        tooltipFontsize = options.tooltipFontsize,
        tooltipUnit = options.tooltipUnit,
        tooltipGroupConnector = options.tooltipGroupConnector,
        precision = options.precision,
        clickAction = options.clickAction,
        clickGroupAction = options.clickGroupAction;

    d3.select(el).selectAll("div.d3-tip").remove();

    if (showTooltips) {
        var chordTip = d3.tip()
                         .attr('class', 'd3-tip')
                         .style("font-size", tooltipFontsize + "px")
                         .style("font-family", "sans-serif")
                         .direction('n')
                         .offset([10, 10])
                         .html(function(d) {
                             // indexes
                             var i = d.source.index,
                                 j = d.target.index;
                             // values
                             var vij = sigFigs(matrix[i][j], precision),
                                 vji = sigFigs(matrix[j][i], precision);
                             var dir1 = tooltipNames[i] + tooltipGroupConnector + tooltipNames[j] + ": " + vij + tooltipUnit,
                                 dir2 = tooltipNames[j] + tooltipGroupConnector + tooltipNames[i] + ": " + vji + tooltipUnit;
                             if (type == "directional") {
                                 if (i == j) {
                                     return dir1;
                                 } else {
                                     if (showZeroTooltips) {
                                         return dir1 + "</br>" + dir2;
                                     } else {
                                         return dir1 + (vji > 0 ? "</br>" + dir2 : "");
                                     }
                                 }
                             } else if (type == "bipartite") {
                                 return dir2;
                             }
                         });

        var groupTip = d3.tip()
                         .attr('class', 'd3-tip')
                         .style("font-size", tooltipFontsize + "px")
                         .style("font-family", "sans-serif")
                         .direction('n')
                         .offset([10, 10])
                         .html(function(d) {
                             var value = sigFigs(d.value, precision);
                             return tooltipNames[d.index] + " (total): " + value + tooltipUnit;
                         });
    }

    var svgContainer = d3.select(el).select("svg");
    svgContainer.selectAll("*").remove();

    // apply chord settings and data
    chord = chord.padAngle(groupPadding)
                 .sortSubgroups(d3.descending)(matrix);

    // calculate outer and inner radius for chord diagram
    var outerRadius = (d - 2 * margin) / 2,
        innerRadius = outerRadius * (1 - groupThickness);

    // create ordinal color fill scale from groupColors
    var fillScale = d3.scaleOrdinal()
                            .domain(d3.range(matrix.length))
                            .range(groupColors);

    // calculate horizontal and vertical translation values
    var xTranslate = Math.max(width / 2, outerRadius + margin),
        yTranslate = Math.max(height / 2, outerRadius + margin);

    var svg = svgContainer.append("g");
    svg.attr("transform", "translate(" + xTranslate + "," + yTranslate + ")");

    if (showTooltips) {
       svg.call(chordTip)
          .call(groupTip);
    }

    // create groups
    var groups = svg.append("g").attr("class", "groups")
                    .selectAll("path")
                    .data(chord.groups)
                    .enter().append("path").attr("id", function(d, i) {
                           return "group-" + groupNames[i];
                    });

    // style groups and define mouse events
    groups.style("fill", function(d) { return fillScale(d.index); })
          .style("stroke", function(d) { return fillScale(d.index); })
          .attr("d", d3.arc().innerRadius(innerRadius).outerRadius(outerRadius))
          .on("mouseover", function(d) {
              if (showTooltips) groupTip.show(d,this);
              return groupFade(d, fadeLevel);
          })
          .on("mouseout", function(d) {
              if (showTooltips) groupTip.hide(d);
              return groupFade(d, 1);
          })
          .on("click", clickGroup);

    if (groupedgeColor) {
        groups.style("stroke", groupedgeColor);
    } else {
        groups.style("stroke", function(d) { return fillScale(d.index); });
    }

    if (showTicks) {
        // create ticks for groups
        var ticks = svg.append("g").attr("class", "ticks")
                       .selectAll("g")
                       .data(chord.groups)
                       .enter().append("g") //.attr("class", "ticks")
                       .attr("id", function(d, i) {
                           return "ticks-" + groupNames[i];
                       })
                       .selectAll("g")
                       .data(groupTicks)
                       .enter().append("g").attr("class", "tick")
                       .attr("transform", function(d) {
                           return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                               + "translate(" + outerRadius + ", 0)";
                       });

        // add tick marks
        ticks.append("line")
             .attr("x1", 1)
             .attr("y1", 0)
             .attr("x2", 5)
             .attr("y2", 0)
             .style("stroke", "#000");

        // add tick labels
        ticks.append("text")
             .attr("x", 0)
             .attr("dy", ".35em")
             .style("font-size", ticklabelFontsize + "px")
             .style("font-family", "sans-serif")
             .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-8)" : "translate(8)"; })
             .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : "start"; })
             .text(function(d) { return d.label; });
    }

    // create chords
    var chords = svg.append("g").attr("class", "chords")
                    .selectAll("path")
                    .data(chord)
                    .enter().append("path").attr("id", function(d, i) {
                        return "chord-" + groupNames[d.source.index]
                               + "-" + groupNames[d.target.index];
                    })
                    .attr("d", d3.ribbon().radius(innerRadius));

    // style chords and define mouse events
    chords.style("fill", function(d) { return fillScale(d.target.index); })
          .style("stroke", chordedgeColor)
          .style("fill-opacity", 0.67)
          .style("stroke-width", "0.5px")
          .style("opacity", 1)
          .on("mouseover", function(d) {
              if (showTooltips) chordTip.show(d, this);
              return chordFade(d, fadeLevel);
          })
          .on("mouseout", function(d) {
              if (showTooltips) chordTip.hide(d);
              return chordFade(d, 1);
          })
          .on("click", click);

    // create group labels
    if (showGroupnames) {
        var names = svg.append("g").attr("class", "names")
                       .selectAll("g")
                       .data(chord.groups)
                       .enter().append("g").attr("class", "name")
                       .on("mouseover", function(d) {
                           return groupFade(d, fadeLevel);
                       })
                       .on("mouseout", function(d) {
                           return groupFade(d, 1);
                       })
                       .selectAll("g")
                       .data(groupLabels)
                       .enter().append("g").attr("id", function(d) {
                           return "label-" + d.label;
                       })
                       .attr("transform", function(d) {
                           return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                                + "translate(" + (outerRadius + d.padding) + ", 0)";
                       });
        names.append("text")
            .attr("x", 0)
            .attr("dy", ".35em")
            .style("font-size", groupnameFontsize + "px")
            .style("font-family", "sans-serif")
            .attr("transform", function(d) {
                return d.handside == "left" ? "rotate(180)" : null;
            })
            .style("text-anchor", function(d) { return d.handside == "left" ? "end" : "start"; })
            .text(function(d) { return d.label; })
            .attr("id", function(d) { return d.label; });
    }

    if (categoryNames) {
        var categories = svg.append("g").attr("class", "categories")
                            .selectAll("g")
                            .data(categoryNames)
                            .enter().append("g").attr("class", "category")
                            .selectAll("g")
                            .data(categoryLabels)
                            .enter().append("g")
                            .style("fill", "black")
                            .attr("id", function(d) {
                                return "label-" + d.label;
                            })
                            .attr("transform", function(d) {
                                return "rotate(" + (d.angle * 180 / Math.PI) + ")"
                                    + "translate(" + (outerRadius + categorynamePadding) + ", 0)";
                            });

        categories.append("text")
                  .attr("x", 0)
                  .attr("dy", ".35em")
                  .style("font-size", categorynameFontsize + "px")
                  .style("font-family", "sans-serif")
                  .style("font-weight", "bold")
                  .attr("transform", function(d, i) { return i ? "rotate(270)" : "rotate(90)"; })
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.label; })
                  .attr("id", function(d) { return d.label; });
    }

    function categoryLabels(d, i) {
        return [{
          angle: i * Math.PI,
          label: d
        }];
    }

    // returns an array of tick angles and labels, given a group
    function groupTicks(d) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, tickInterval).map(function(v, i) {
        return {
          angle: v * k + d.startAngle,
          label: i % 5 ? null : v
        };
      });
    }

    function groupLabels(d) {
      var a = (d.startAngle + d.endAngle) / 2;
      return [{
          angle: a,
          handside: (a < Math.PI) ? "right" : "left",
          label: groupNames[d.index],
          padding: groupnamePadding[d.index]
        }];
    }

    // returns an event handler for fading all chords not belonging to a
    // specific group
    function groupFade(g, opacity) {
        svg.selectAll(".chords path")
            .filter(function(d) { return d.source.index != g.index
                                      && d.target.index != g.index; })
            .transition()
            .style("opacity", opacity);
    }

    // returns an event handler for fading all chords except for the one
    // given
    function chordFade(g, opacity) {
        svg.selectAll(".chords path")
            .filter(function(d) { return d.source.index != g.source.index
                                      || d.target.index != g.target.index;
            })
            .transition()
            .style("opacity", opacity);
    }

    // round to significant figures / digits
    function sigFigs(n, sig) {
        if (n == 0) { return n}
        if (sig == "null") { sig = 7; }
        var mult = Math.pow(10, sig - Math.floor(Math.log(n) / Math.LN10) - 1);
        return Math.round(n * mult) / mult;
    }

    function click(d) {
      return eval(clickAction);
    }

    function clickGroup(d) {
        return eval(clickGroupAction)
    }

  }  // end renderValue function

});

