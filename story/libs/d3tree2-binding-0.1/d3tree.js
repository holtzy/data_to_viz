HTMLWidgets.widget({

  name: 'd3tree',

  type: 'output',

  initialize: function(el, width, height) {

    return {

    }

  },

  renderValue: function(el, x, instance) {

    // thanks Bill White for his treemap code on which this is based
    //    http://www.billdwhite.com/wordpress/2012/12/16/d3-treemap-with-title-headers/

    // set this as constant false instead of trying to detect browser type
    //   but leave in case we need to revert back to detecting IE
    var isIE = false;


    // clear out contents in case of dynamic/Shiny situation
    el.innerHTML = "";

    var chartWidth = el.getBoundingClientRect().width;
    var chartHeight = el.getBoundingClientRect().height;
    var xscale = d3.scale.linear().range([0, chartWidth]);
    var yscale = d3.scale.linear().range([0, chartHeight]);
    var color = d3.scale.category10();
    var headerHeight = 20;
    var headerColor = "#555555";
    var transitionDuration = 500;
    var root;
    var node;

    var treemap = d3.layout.treemap()
        .round(false)
        .size([chartWidth, chartHeight])
        .sticky(true)
        .value(function(d) {
            return d.size;
        });

    var svg = d3.select(el)
        .append("svg:svg")
        .attr("width", chartWidth)
        .attr("height", chartHeight);

    var chart = svg.append("svg:g");

    var defs = svg.append("defs");

    var filter = defs.append("svg:filter")
        .attr("id", "outerDropShadow")
        .attr("x", "-20%")
        .attr("y", "-20%")
        .attr("width", "140%")
        .attr("height", "140%");

    filter.append("svg:feOffset")
        .attr("result", "offOut")
        .attr("in", "SourceGraphic")
        .attr("dx", "1")
        .attr("dy", "1");

    filter.append("svg:feColorMatrix")
        .attr("result", "matrixOut")
        .attr("in", "offOut")
        .attr("type", "matrix")
        .attr("values", "1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 .5 0");

    filter.append("svg:feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "matrixOut")
        .attr("stdDeviation", "3");

    filter.append("svg:feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "blurOut")
        .attr("mode", "normal");

    drawTree( x.data, x.options.id, x.options.celltext );



    // set up a container for tasks to perform after completion
    //  one example would be add callbacks for event handling
    //  styling
    if (!(typeof x.tasks === "undefined") ){
      if ( (typeof x.tasks.length === "undefined") ||
       (typeof x.tasks === "function" ) ) {
         // handle a function not enclosed in array
         // should be able to remove once using jsonlite
         x.tasks = [x.tasks];
      }
      x.tasks.map(function(t){
        // for each tasks call the task with el supplied as `this`
        t.call(el);
      })
    }

    function drawTree( data, id, celltext ) {
        id ? id : "id";
        celltext ? celltext : "name";
        node = root = data;
        var nodes = treemap.nodes(root);

        var children = nodes.filter(function(d) {
            return !d.children;
        });
        var parents = nodes.filter(function(d) {
            return d.children;
        });

        // create parent cells
        var parentCells = chart.selectAll("g.cell.parent")
            .data(parents, function(d) {
                return "p-" + d[id];
            });
        var parentEnterTransition = parentCells.enter()
            .append("g")
            .attr("class", "cell parent")
            .on("click", function(d) {
                zoom(d, id, celltext);
            })
            .append("svg")
            .attr("class", "clip")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight);
        parentEnterTransition.append("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
        parentEnterTransition.append('text')
            .attr("class", "label")
            .attr("transform", "translate(3, 13)")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .text(function(d) {
                return d[celltext];
            });
        // update transition
        var parentUpdateTransition = parentCells.transition().duration(transitionDuration);
        parentUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.dx + "," + d.y + ")";
            });
        parentUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .style("fill", headerColor);
        parentUpdateTransition.select(".label")
            .attr("transform", "translate(3, 13)")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", headerHeight)
            .text(function(d) {
                return d[celltext];
            });
        // remove transition
        parentCells.exit()
            .remove();

        // create children cells
        var childrenCells = chart.selectAll("g.cell.child")
            .data(children, function(d) {
                return "c-" + d[id];
            });
        // enter transition
        var childEnterTransition = childrenCells.enter()
            .append("g")
            .attr("class", "cell child")
            .on("click", function(d) {
                zoom(node === d.parent ? root : d.parent, id, celltext);
            })
            .on("mouseover", function() {
                this.parentNode.appendChild(this); // workaround for bringing elements to the front (ie z-index)
                d3.select(this)
                    .attr("filter", "url(#outerDropShadow)")
                    .select(".background")
                    .style("stroke", "#000000");
            })
            .on("mouseout", function() {
              d3.select(this)
                    .attr("filter", "")
                    .select(".background")
                    .style("stroke", "#FFFFFF");
            })
            .append("svg")
            .attr("class", "clip")
        childEnterTransition.append("rect")
            .classed("background", true)
            .style("fill", function(d) {
                return d.color ? d.color :  color(d.parent[id]);
            });
        childEnterTransition.append('text')
            .attr("class", "label")
            .attr('x', function(d) {
                return d.dx / 2;
            })
            .attr('y', function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("display", "none")
            .text(function(d) {
                return d[celltext];
            });
        // update transition
        var childUpdateTransition = childrenCells.transition().duration(transitionDuration);
        childUpdateTransition.select(".cell")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        childUpdateTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, d.dx);
            })
            .attr("height", function(d) {
                return d.dy;
            })
            .style("fill", function(d) {
                return d.color ? d.color : color(d.parent[id]);
            });
        childUpdateTransition.select(".label")
            .attr('x', function(d) {
                return d.dx / 2;
            })
            .attr('y', function(d) {
                return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .style("display", "none")
            .text(function(d) {
                return d[celltext];
            });

        // exit transition
        childrenCells.exit()
            .remove();

        d3.select("select").on("change", function() {
            console.log("select zoom(node)");
            treemap.value(this.value == "size" ? size : count)
                .nodes(root);
            zoom(node, id, celltext);
        });

        zoom(node, id, celltext);
    };


    function size(d) {
        return d.size;
    }


    function count(d) {
        return 1;
    }


    //and another one
    function textHeight(d) {
        var ky = chartHeight / d.dy;
        yscale.domain([d.y, d.y + d.dy]);
        return (ky * d.dy) / headerHeight;
    }

    function getRGBComponents(color) {
        var r = color.substring(1, 3);
        var g = color.substring(3, 5);
        var b = color.substring(5, 7);
        return {
            R: parseInt(r, 16),
            G: parseInt(g, 16),
            B: parseInt(b, 16)
        };
    }


    function idealTextColor(bgColor) {
        var nThreshold = 105;
        var components = getRGBComponents(bgColor);
        var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }


    function zoom(d, id, celltext) {
        id ? id : "id";
        celltext ? celltext : "name";
        treemap
            .padding([headerHeight / (chartHeight / d.dy), 0, 0, 0])
            .nodes(d);

        // moving the next two lines above treemap layout messes up padding of zoom result
        var kx = chartWidth / d.dx;
        var ky = chartHeight / d.dy;
        var level = d;

        xscale.domain([d.x, d.x + d.dx]);
        yscale.domain([d.y, d.y + d.dy]);

        if (node != level) {
            chart.selectAll(".cell.child .label")
                .style("display", "none");
        }

        var zoomTransition = chart.selectAll("g.cell").transition().duration(transitionDuration)
            .attr("transform", function(d) {
                return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
            })
            .each("start", function() {
                d3.select(this).select("label")
                    .style("display", "none");
            })
            .each("end", function(d, i) {
                if (!i && (level !== root)) {
                    chart.selectAll(".cell.child")
                        .filter(function(d) {
                            return d.parent === node; // only get the children for selected group
                        })
                        .select(".label")
                        .style("display", "")
                        .style("fill", function(d) {
                            return idealTextColor(d.color ? d.color : color(d.parent[id]));
                        });
                }
            });

        zoomTransition.select(".clip")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            });

        zoomTransition.select(".label")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            })
        .text(function(d) {
                return d[celltext];
            });

        zoomTransition.select(".child .label")
            .attr("x", function(d) {
                return kx * d.dx / 2;
            })
            .attr("y", function(d) {
                return ky * d.dy / 2;
            });

        zoomTransition.select("rect")
            .attr("width", function(d) {
                return Math.max(0.01, (kx * d.dx));
            })
            .attr("height", function(d) {
                return d.children ? headerHeight : Math.max(0.01, (ky * d.dy));
            })
            .style("fill", function(d) {
                return d.children ? headerColor : ( d.color ? d.color : color(d.parent[id]) );
            });

        node = d;

        if (d3.event) {
            d3.event.stopPropagation();
        }
    }

  },

  resize: function(el, width, height, instance) {

  }

});
