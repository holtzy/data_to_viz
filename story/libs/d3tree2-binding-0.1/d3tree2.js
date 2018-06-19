HTMLWidgets.widget({

  name: 'd3tree2',

  type: 'output',

  initialize: function(el, width, height) {

    return {

    }

  },

  renderValue: function(el, x, instance) {

    //clear out el in case of dynamic/Shiny situation
    el.innerHTML = "";

    var valueField = x.options.valueField ? x.options.valueField : "size";
    var celltext = x.options.celltext ? x.options.celltext : "name";
    var cellid = x.options.id ? x.options.id : "id";

    // thanks Mike Bostock and Zan Armstrong for all the code on which
    //    this is based
    //  http://bost.ocks.org/mike/treemap/
    //  https://gist.github.com/zanarmstrong/76d263bd36f312cb0f9f

    var margin = {top: 20, right: 0, bottom: 20, left: 0},
        width = el.getBoundingClientRect().width,
        height = el.getBoundingClientRect().height - margin.top - margin.bottom,
        formatNumber = d3.format(",d"),
        transitioning;

    var svg = d3.select(el).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("margin-left", -margin.left + "px")
        .style("margin.right", -margin.right + "px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("shape-rendering", "crispEdges");

    // experiment to add a legend if provided from treemap
    if (x.legend){
      var legend = svg.append("g")
                      .attr("class","legend");

      legend[0][0].innerHTML = x.legend.join(" ");

      // try to scale legend to fit width
      var legendscale = Math.min(Math.round(
          ((width-100)/legend[0][0].getBoundingClientRect().width)*100
        ) / 100, 1.5)

      legend.attr(
        "transform",
        "translate(0," +
                          (
                            height + margin.bottom
                          ) +
        ") scale(" + legendscale + "," + -legendscale +")");

      height = height - legend[0][0].getBoundingClientRect().height;
    }

    var xscale = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

    var yscale = d3.scale.linear()
        .domain([0, height])
        .range([0, height]);

    var color = d3.scale.category20();
    color.range(
      color.range().map(
        function(d,i){
          return (i==0) ? "#bbb" : d
        }
      )
    );

    var treemap = d3.layout.treemap()
        .children(function(d, depth) { return depth ? null : d._children; })
        .sort(function(a, b) { return a[valueField] - b[valueField]; })
        .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        .round(false)
        .value(function(d) {
            return d[valueField];
        });


    var grandparent = svg.append("g")
        .attr("class", "grandparent");

    grandparent.append("rect")
        .attr("y", -margin.top)
        .attr("width", width)
        .attr("height", margin.top);

    grandparent.append("text")
        .attr("x", 6)
        .attr("y", 6 - margin.top)
        .attr("dy", ".75em");


    // determines if white or black will be better contrasting color
    //  copied from

    function getRGBComponents(color) {
        return d3.rgb(color)
    }

    function idealTextColor(bgColor) {
        var nThreshold = 105;
        var components = getRGBComponents(bgColor);
        var bgDelta = (components.r * 0.299) + (components.g * 0.587) + (components.b * 0.114);
        return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
    }

    draw( x.data );


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


    function draw(root) {
      initialize(root);
      accumulate(root);
      layout(root);
      display(root);

      function initialize(root) {
        root.x = root.y = 0;
        root.dx = width;
        root.dy = height;
        root.depth = 0;
      }

      // Aggregate the values for internal nodes. This is normally done by the
      // treemap layout, but not here because of our custom implementation.
      // We also take a snapshot of the original children (_children) to avoid
      // the children being overwritten when when layout is computed.
      function accumulate(d) {

        if( Array.isArray(d.children) ) {
            return (d._children = d.children)
              ? d[valueField] = d.children.reduce(function(p, v) { return p + accumulate(v); }, 0)
              : d[valueField];
        } else {
          return d[valueField];
        }

      }

      // Compute the treemap layout recursively such that each group of siblings
      // uses the same size (1×1) rather than the dimensions of the parent cell.
      // This optimizes the layout for the current zoom state. Note that a wrapper
      // object is created for the parent node for each group of siblings so that
      // the parent’s dimensions are not discarded as we recurse. Since each group
      // of sibling was laid out in 1×1, we must rescale to fit using absolute
      // coordinates. This lets us use a viewport to zoom.
      function layout(d) {
        if (d._children) {
          treemap.nodes({_children: d._children});
          d._children.forEach(function(c) {
            c.x = d.x + c.x * d.dx;
            c.y = d.y + c.y * d.dy;
            c.dx *= d.dx;
            c.dy *= d.dy;
            c.parent = d;
            layout(c);
          });
        }
      }

      function display(d) {
        grandparent
            .datum( d )
            .on("click", function(d){
              transition( (d.parent) ? d.parent: d );
              communicateClick( d.parent ? d.parent: d );
            } )
          .select("text")
            .text(name(d))
            .style("fill", function (d) {
              return idealTextColor( d.color ? d.color : color(leveltwo(d)[celltext]) );
            });

        grandparent
          .select("rect")
            .style("fill",function(d){
              return (d) ?
                ( (d.color) ? d.color : color(leveltwo(d)[celltext]) ) :
                "#bbb";
            })

        var g1 = svg.insert("g", ".grandparent")
            .datum(d)
            .attr("class", "depth");

        var g = g1.selectAll("g")
            .data(d._children)
          .enter().append("g");

        g.filter(function(d) { return d._children; })
            .classed("children", true)
            .on("click", transition);

        g.selectAll(".child")
            .data(function(d) { return d._children || [d]; })
          .enter().append("rect")
            .attr("class", "child")
            .call(rect);

        g.append("rect")
            .attr("class", "parent")
            .call(rect)
            .on("click", function(d){
              communicateClick(d);
            })
          .append("title")
            .text(function(d) { return formatNumber(d[valueField]); });

        g.append("text")
            .attr("dy", ".75em")
            .text(function(d) { return d[celltext]; })
            .call(text);

        function transition(d) {
          if (transitioning || !d) return;
          transitioning = true;

          var g2 = display(d),
              t1 = g1.transition().duration(750),
              t2 = g2.transition().duration(750);

          // Update the domain only after entering new elements.
          xscale.domain([d.x, d.x + d.dx]);
          yscale.domain([d.y, d.y + d.dy]);

          // Enable anti-aliasing during the transition.
          svg.style("shape-rendering", null);

          // Draw child nodes on top of parent nodes.
          svg.selectAll(".depth").sort(function(a, b) { return a.depth - b.depth; });

          // Fade-in entering text.
          g2.selectAll("text").style("fill-opacity", 0);

          // Transition to the new view.
          t1.selectAll("text").call(text).style("fill-opacity", 0);
          t2.selectAll("text").call(text).style("fill-opacity", 1);
          t1.selectAll("rect").call(rect);
          t2.selectAll("rect").call(rect);

          // Remove the old node when the transition is finished.
          t1.remove().each("end", function() {
            svg.style("shape-rendering", "crispEdges");
            transitioning = false;
          });
        }

        return g;
      }

      function communicateClick(d){

        // add a hook to Shiny
        if( HTMLWidgets.shinyMode ){
          Shiny.onInputChange(el.id + '_click', {name:d[celltext],id:d[cellid]});
        }

        // check for additional clickAction to perform
        if( x.options.clickAction && typeof x.options.clickAction === "function" ){
          x.options.clickAction(d);
        }

      };

      function text(text) {
        text.attr("x", function(d) { return xscale(d.x) + 6; })
            .attr("y", function(d) { return yscale(d.y) + 6; })
            .style("fill", function (d) {
              return idealTextColor( d.color ? d.color : color(leveltwo(d)[celltext]) );
            });
      }

      function rect(rect) {
        rect.attr("x", function(d) { return xscale(d.x); })
            .attr("y", function(d) { return yscale(d.y); })
            .attr("width", function(d) { return xscale(d.x + d.dx) - xscale(d.x); })
            .attr("height", function(d) { return yscale(d.y + d.dy) - yscale(d.y); })
            .style("fill", function(d){
              return d.color ? d.color : color(leveltwo(d)[celltext]);
            })
            .style("stroke", function(d){
              return idealTextColor( d.color ? d.color : color(leveltwo(d)[celltext]) );
            })
            ;
      }

      function name(d) {
        return d.parent
            ? name(d.parent) + "." + d[celltext]
            : d[celltext];

      }

      function leveltwo(d){
        return ( typeof d.parent !== "undefined" && d.parent.parent ) ?
          leveltwo( d.parent ) :
          d;
      }

    }

  },

  resize: function(el, width, height, instance) {

  }

});
