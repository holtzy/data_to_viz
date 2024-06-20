function heatmap(selector, data, options) {

  // ==== BEGIN HELPERS =================================
  function htmlEscape(str) {
    return (str+"").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
    
  function cssify(styles) {
    return {
      position: "absolute",
      top: styles.top + "px",
      left: styles.left + "px",
      right: styles.right + "px",
      bottom: styles.bottom + "px",
      width: styles.width + "px",
      height: styles.height + "px"
    };
  }

	function numDigits(x) {
		return String(x).replace('.', '').length;
	}
  
	function flattenMatrix(m) {
    var cols = m[0].length;
    var vec = [];
    for (var i = 0; i < m.length; i++) {
      if (m[i].length !== cols)
        throw new Error("Non-rectangular matrix");
      for (var j = 0; j < m[i].length; j++) {
        vec.push(m[i][j]);
      }
    }
    return vec;
  }

  d3v3.selectAll(".outer").remove();

        // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
      // At least Safari 3+: "[object HTMLElementConstructor]"
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
      // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
      // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
      // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;


  // Given a list of widths/heights and a total width/height, provides
  // easy access to the absolute top/left/width/height of any individual
  // grid cell. Optionally, a single cell can be specified as a "fill"
  // cell, meaning it will take up any remaining width/height.
  // 
  // rows and cols are arrays that contain numeric pixel dimensions,
  // and up to one "*" value.
  function GridSizer(widths, heights, /*optional*/ totalWidth, /*optional*/ totalHeight) {
    this.widths = widths;
    this.heights = heights;
  
    var fillColIndex = null;
    var fillRowIndex = null;
    var usedWidth = 0;
    var usedHeight = 0;
    var i;
    for (i = 0; i < widths.length; i++) {
      if (widths[i] === "*") {
        if (fillColIndex !== null) {
          throw new Error("Only one column can be designated as fill");
        }
        fillColIndex = i;
      } else {
        usedWidth += widths[i];
      }
    }
    if (fillColIndex !== null) {
      widths[fillColIndex] = totalWidth - usedWidth;
    } else {
      if (typeof(totalWidth) === "number" && totalWidth !== usedWidth) {
        throw new Error("Column widths don't add up to total width");
      }
    }
    for (i = 0; i < heights.length; i++) {
      if (heights[i] === "*") {
        if (fillRowIndex !== null) {
          throw new Error("Only one row can be designated as fill");
        }
        fillRowIndex = i;
      } else {
        usedHeight += heights[i];
      }
    }
    if (fillRowIndex !== null) {
      heights[fillRowIndex] = totalHeight - usedHeight;
    } else {
      if (typeof(totalHeight) === "number" && totalHeight !== usedHeight) {
        throw new Error("Column heights don't add up to total height");
      }
    }
  }
  
  GridSizer.prototype.getCellBounds = function(x, y) {
    if (x < 0 || x >= this.widths.length || y < 0 || y >= this.heights.length)
      throw new Error("Invalid cell bounds");
  
    var left = 0;
    for (var i = 0; i < x; i++) {
      left += this.widths[i];
    }
  
    var top = 0;
    for (var j = 0; j < y; j++) {
      top += this.heights[j];
    }
  
    return {
      width: this.widths[x],
      height: this.heights[y],
      top: top,
      left: left
    }
  }
  
  // ==== END HELPERS ===================================


  var el = d3v3.select(selector);

  var outer = el.append("div").classed("outer", true);

	var innerPos = {top: 0, left: 0};

	if(data.title){
  	var main = outer.append("svg")
  	  .classed("title", true)
  	  .attr("height", "50")
  	  .attr("width", "100%");

  	main.append("text")
  	  .classed("plot_title", true)
  	  .text(data.title)
  	  .attr("x", "50%")
  	  .attr("y", "50%");

		innerPos.top = 50;
	}

	if(options.rsc_cols || options.csc_cols) innerPos.left = 50;
		
//	var inner = outer.append("div").classed("inner", true).style({top: innerPos.top + "px", left: innerPos.left + 'px'});
	var inner = outer.append("div").classed("inner", true).style(cssify(innerPos));
	
  var bbox = inner.node().getBoundingClientRect();

  var Controller = function() {
    this._events = d3v3.dispatch("highlight", "datapoint_hover", "transform");
    this._highlight = {x: null, y: null};
    this._datapoint_hover = {x: null, y: null, value: null};
    this._transform = null;
  };

  (function() {
    this.highlight = function(x, y) {
      // Copy for safety
      if (!arguments.length) return {x: this._highlight.x, y: this._highlight.y};

      if (arguments.length == 1) {
        this._highlight = x;
      } else {
        this._highlight = {x: x, y: y};
      }
      this._events.highlight.call(this, this._highlight);
    };

    this.datapoint_hover = function(_) {
      if (!arguments.length) return this._datapoint_hover;
      
      this._datapoint_hover = _;
      this._events.datapoint_hover.call(this, _);
    };

    this.transform = function(_) {
      if (!arguments.length) return this._transform;
      this._transform = _;
      this._events.transform.call(this, _);
    };

    this.on = function(evt, callback) {
      this._events.on(evt, callback);
    };
  }).call(Controller.prototype);

  var controller = new Controller();

  // Set option defaults
  var opts = options || {};
  opts.width = options.width || bbox.width;
  opts.height = options.height || bbox.height;
  opts.link_color = opts.link_color || "#AAA";
	// for the legend size (key size) calculate the max of the legend size and the axis, then
				// take the min (so the axis will be at least the size of the key, but the key can
				// be smaller
  opts.xaxis_height = Math.max((options.xaxis_height || 80), (80 * options.legend_scaler));
  opts.yaxis_width = Math.max((options.yaxis_width || 120), (120 * options.legend_scaler));
  opts.axis_padding = options.axis_padding || 6;
  if (typeof(opts.show_grid) === 'undefined') {
    opts.show_grid = true;
  }
  opts.brush_color = options.brush_color || "#0000FF";
	opts.cellnote_color = options.cellnote_color || "#888888";
  
	if (typeof(opts.anim_duration) === 'undefined') {
    opts.anim_duration = 500;
  }
    
  if (typeof(opts.show_grid) === 'number') {
    opts.spacing = opts.show_grid;
  } else if (!!opts.show_grid) {
    opts.spacing = 0.25;
  } else {
    opts.spacing = 0;
  }
	
	// modify for presence of main title bar and for presence of xaxis title
	opts.height = opts.height - innerPos.top;

	//For future user control of the side color size
	//opts.ycolors_width = options.ycolors_width;
  //opts.xcolors_height = options.xcolors_height;
  
	// Row and Side colors sizes
	opts.ycolors_width = !data.rowcolors ? 0 : data.rowcolors.length * 15;
	opts.xcolors_height = !data.colcolors ? 0 : data.colcolors.length * 15;
	opts.leftColEl_width = opts.ycolors_width;
	opts.topColEl_height = opts.xcolors_height;
	opts.rightColEl_width = 0;
	opts.bottomColEl_height = 0;

	// title blocks
	var xaxis_title_height = opts.xaxis_title ? opts.xaxis_title_font_size * 1.5 + 5 : 0;
	var yaxis_title_width = opts.yaxis_title ? opts.yaxis_title_font_size * 1.5 + 5 : 0;

  opts.xclust_height = options.xclust_height || opts.height * 0.12;
  opts.yclust_width = options.yclust_width || opts.width * 0.12;
  opts.topEl_height = !data.cols ? 0 : opts.xclust_height;
  opts.leftEl_width = !data.rows ? 0 : opts.yclust_width;
  opts.bottomEl_height = opts.xaxis_height;
  opts.rightEl_width = opts.yaxis_width;
 
  opts.leftTitle_width = 0;
  opts.rightTitle_width = yaxis_title_width;
  opts.topTitle_height = 0;
  opts.bottomTitle_height = xaxis_title_height;
 
	// adjust element dimensions if an axis location has been switched	
  if (opts.yaxis_location === "left") {
    opts.rightEl_width = opts.leftEl_width;
    opts.leftEl_width = opts.yaxis_width;
    
    opts.rightTitle_width = 0;
    opts.leftTitle_width = yaxis_title_width;  

		opts.leftColEl_width = 0;
		opts.rightColEl_width = opts.ycolors_width;
  }
  
  if (opts.xaxis_location === "top") {
    opts.bottomEl_height = opts.topEl_height;
    opts.topEl_height = opts.xaxis_height;
    
    opts.bottomTitle_height = 0;
    opts.topTitle_height = xaxis_title_height;  
	
		opts.topColEl_height = 0;
		opts.bottomColEl_height = opts.xcolors_height;
  }
 
	// lastly, adjust the bounds sizes for the presence of the legend	
	if(opts.show_legend) {
			switch (opts.legend_location) {
				case "br":
    				opts.bottomEl_height = Math.max(opts.bottomEl_height, 80);
    				opts.rightEl_width = Math.max(opts.rightEl_width, 120);
						break;
				case "tr":
    				opts.topEl_height = Math.max(opts.topEl_height, 80);
    				opts.rightEl_width = Math.max(opts.rightEl_width, 120);
						break;
				case "tl":
    				opts.topEl_height = Math.max(opts.topEl_height, 80);
    				opts.leftEl_width = Math.max(opts.leftEl_width, 120);
						break;
				case "bl":
    				opts.bottomEl_height = Math.max(opts.bottomEl_height, 80);
    				opts.leftEl_width = Math.max(opts.leftEl_width, 120);
						break;
				default:
						break;
			}
	}
  
  gridSizer = new GridSizer(
    [opts.leftTitle_width, opts.leftEl_width, opts.leftColEl_width,
						"*", 
		  opts.rightColEl_width, opts.rightEl_width, opts.rightTitle_width],
    [opts.topTitle_height, opts.topEl_height, opts.topColEl_height,
						"*", 
		  opts.bottomColEl_height, opts.bottomEl_height, opts.bottomTitle_height],
    opts.width,
    opts.height
  );

	// determine the bounds for all the grid partitions
	var topTitleBounds = gridSizer.getCellBounds(3, 0);
  var topElBounds = gridSizer.getCellBounds(3, 1);
  var topColElBounds = gridSizer.getCellBounds(3, 2);
  var bottomColElBounds = gridSizer.getCellBounds(3, 4);
  var bottomElBounds = gridSizer.getCellBounds(3, 5);
	var bottomTitleBounds = gridSizer.getCellBounds(3, 6);
 
  var colormapBounds = gridSizer.getCellBounds(3, 3);
  
  var leftTitleBounds = gridSizer.getCellBounds(0, 3);
	var leftElBounds = gridSizer.getCellBounds(1, 3);
  var leftColElBounds = gridSizer.getCellBounds(2, 3);
	var rightColElBounds = gridSizer.getCellBounds(4, 3);
  var rightElBounds = gridSizer.getCellBounds(5, 3);
  var rightTitleBounds = gridSizer.getCellBounds(6, 3);

	var topLeftRowColorAxisBounds = gridSizer.getCellBounds(2,1);
	var topRightRowColorAxisBounds = gridSizer.getCellBounds(4,1);
	var bottomLeftRowColorAxisBounds = gridSizer.getCellBounds(2,5);
	var bottomRightRowColorAxisBounds = gridSizer.getCellBounds(4,5);

	var topLeftColColorAxisBounds = gridSizer.getCellBounds(1,2);
	var bottomLeftColColorAxisBounds = gridSizer.getCellBounds(1,4);
	var topRightColColorAxisBounds = gridSizer.getCellBounds(5,2);
	var bottomRightColColorAxisBounds = gridSizer.getCellBounds(5,4);

	// start mapping heatmap sections to the appropriate
	// grid space	
  var colDendBounds, rowDendBounds, 
								colColorsBounds, rowColorsBounds,
								colColorsAxisBounds, rowColorsAxisBounds,
								yaxisBounds, xaxisBounds;
 
	if (opts.yaxis_location === "right") {
    yaxisBounds = rightElBounds;
    ytitleBounds = rightTitleBounds;
  	rowDendBounds = leftElBounds;
		rowColorsBounds = leftColElBounds;

  } else {
    yaxisBounds = leftElBounds;
    ytitleBounds = leftTitleBounds;
  	rowDendBounds = rightElBounds;
		rowColorsBounds = rightColElBounds;

  }
  
  if (opts.xaxis_location === "bottom") {
    xaxisBounds = bottomElBounds;
    xtitleBounds = bottomTitleBounds;
		colDendBounds = topElBounds;
		colColorsBounds = topColElBounds;

  } else {
    xaxisBounds = topElBounds;
    xtitleBounds = topTitleBounds;
		colDendBounds = bottomElBounds;
		colColorsBounds = bottomColElBounds;

  }
 
	// calculate where SideColor labels should go
	if (opts.xaxis_location === "bottom" & opts.yaxis_location === "right") {
		rowColorsAxisBounds = bottomLeftRowColorAxisBounds;
		colColorsAxisBounds = topRightColColorAxisBounds;

	} else if (opts.xaxis_location === "bottom") {
 		rowColorsAxisBounds = bottomRightRowColorAxisBounds;
		colColorsAxisBounds = topLeftColColorAxisBounds;

	} else if (opts.xaxis_location === "top" & 
					opts.yaxis_location === "right") {
		rowColorsAxisBounds = topLeftRowColorAxisBounds;
		colColorsAxisBounds = bottomRightColColorAxisBounds;

	} else {
		rowColorsAxisBounds = topRightRowColorAxisBounds;
		colColorsAxisBounds = bottomLeftColColorAxisBounds;

	}

	var legdBounds;
	if(opts.show_legend) {
			var legdX, legdY;
			switch (opts.legend_location) {
				case "br":
						legdBounds = gridSizer.getCellBounds(5, 5);
						break;
				case "tr":
						legdBounds = gridSizer.getCellBounds(5, 1);
						break;
				case "tl":
						legdBounds = gridSizer.getCellBounds(1, 1);
						break;
				case "bl":
						legdBounds = gridSizer.getCellBounds(1, 5);
						break;
				default:
						legdX = opts.yaxis_location === "left" ? 1 : 5;
						legdY = opts.xaxis_location === "top" ? 1 : 5;
						legdBounds = gridSizer.getCellBounds(legdX, legdY);
			}
	}

  // Create DOM structure
  (function() {
		
		var rowColorsLabel = !opts.rsc_cols ? null : outer.append('svg').classed('row_colors_label', true); 
		var colColorsLabel = !opts.csc_cols ? null : outer.append('svg').classed('col_colors_label', true);  
  
		var legd = !opts.show_legend ? null : inner.append("svg").classed("legend", true).style(cssify(legdBounds));
    var colDend = !data.cols ? null : inner.append("svg").classed("dendrogram colDend", true).style(cssify(colDendBounds));
    var rowDend = !data.rows ? null : inner.append("svg").classed("dendrogram rowDend", true).style(cssify(rowDendBounds));
    
    var rowColors = !data.rowcolors ? null : inner.append("svg").classed("rowColors", true).style(cssify(rowColorsBounds));
		var colColors = !data.colcolors ? null : inner.append("svg").classed("colColors", true).style(cssify(colColorsBounds));
		
		var colColorsAxis = inner.append("svg").classed("axis colColorsAxis", true).style(cssify(colColorsAxisBounds));
		var rowColorsAxis = inner.append("svg").classed("axis rowColorsAxis", true).style(cssify(rowColorsAxisBounds));

		var xtitle = !opts.xaxis_title ? null : inner.append("svg").classed("xtitle", true).style(cssify(xtitleBounds));
    var ytitle = !opts.yaxis_title ? null : inner.append("svg").classed("ytitle", true).style(cssify(ytitleBounds));
    
		var xaxis = inner.append("svg").classed("axis xaxis", true).style(cssify(xaxisBounds));
    var yaxis = inner.append("svg").classed("axis yaxis", true).style(cssify(yaxisBounds));
    
		var colmap = inner.append("svg").classed("colormap", true).style(cssify(colormapBounds));
  
    // Hack the width of the x-axis to allow x-overflow of rotated labels; the
    // QtWebkit viewer won't allow svg elements to overflow:visible.
    xaxis.style("width", (opts.width - opts.yclust_width) + "px");
    xaxis
      .append("defs")
        .append("clipPath").attr("id", "xaxis-clip")
          .append("polygon")
            .attr("points", "" + [
              [0, 0],
              [xaxisBounds.width, 0],
              [xaxisBounds.width + yaxisBounds.width, xaxisBounds.height],
              [0, xaxisBounds.height]
            ]);
    xaxis.node(0).setAttribute("clip-path", "url(#xaxis-clip)");

    inner.on("click", function() {
      controller.highlight(null, null);
    });
    controller.on('highlight.inner', function(hl) {
      inner.classed('highlighting',
        typeof(hl.x) === 'number' || typeof(hl.y) === 'number');
    });
  })();
 

  var row = !data.rows ? null : dendrogram(el.select('svg.rowDend'), data.rows, false, rowDendBounds.width, rowDendBounds.height, opts.axis_padding, opts.yaxis_location === "left");
  var col = !data.cols ? null : dendrogram(el.select('svg.colDend'), data.cols, true, colDendBounds.width, colDendBounds.height, opts.axis_padding, opts.xaxis_location === "top");

	var rowColors = !data.rowcolors ? null : rowColorLabels(el.select('svg.rowColors'), data, rowColorsBounds.width, rowColorsBounds.height, rowColorsAxisBounds.height, opts);
  var colColors = !data.colcolors ? null : colColorLabels(el.select('svg.colColors'), data, colColorsBounds.width, colColorsBounds.height, colColorsAxisBounds.width, opts);
		
	var colormap = colormap(el.select('svg.colormap'), data.matrix, colormapBounds.width, colormapBounds.height, yaxisBounds.height);
  
	var xax = axisLabels(el.select('svg.xaxis'), data.cols || data.matrix.cols, true, xaxisBounds.width, xaxisBounds.height, opts.axis_padding, opts.xaxis_location);
  var yax = axisLabels(el.select('svg.yaxis'), data.rows || data.matrix.rows, false, yaxisBounds.width, yaxisBounds.height, opts.axis_padding, opts.yaxis_location);
  
	var xtitle = !opts.xaxis_title ? null : title(el.select('svg.xtitle'), opts.xaxis_title, false, xtitleBounds);
  var ytitle = !opts.yaxis_title ? null : title(el.select('svg.ytitle'), opts.yaxis_title, true, ytitleBounds);

	// as an extra buffer, we'll multiply the legend size and legend scaler by 0.9	
	var legend = !opts.show_legend ? null : legend(el.select('svg.legend'), data.matrix, opts, 
					opts.xaxis_height * options.legend_scaler * 0.9, 
					opts.yaxis_width * options.legend_scaler * 0.9); 

  function colormap(svg, data, width, height, yaxis_height) {
    // Check for no data
    if (data.length === 0)
      return function() {};

		if (!opts.show_grid) {
  	    svg.style("shape-rendering", "crispEdges");
		}
 
    var cols = data.dim[1];
    var rows = data.dim[0];
    
    var merged = data.merged;
    var x = d3v3.scale.linear().domain([0, cols]).range([0, width]);
    var y = d3v3.scale.linear().domain([0, rows]).range([0, height]);

    var tip = d3v3.tip()
        .attr('class', 'd3heatmap-tip')
        .html(function(d, i) {
          var rowTitle = opts.cellnote_row ? opts.cellnote_row : opts.yaxis_title ? opts.yaxis_title : "Row";
          var colTitle = opts.cellnote_col ? opts.cellnote_col : opts.xaxis_title ? opts.xaxis_title : "Column"; 
          return "<table>" + 
            "<tr><th align=\"right\">" + rowTitle + "</th><td>" + htmlEscape(data.rows[d.row]) + "</td></tr>" +
            "<tr><th align=\"right\">" + colTitle + "</th><td>" + htmlEscape(data.cols[d.col]) + "</td></tr>" +
            "<tr><th align=\"right\">" + opts.cellnote_val + "</th><td>" + htmlEscape(d.label) + "</td></tr>" +
            "</table>";
        })
        .direction("se")
        .style("position", "fixed");
    
    var current_origin;    
    
    var brush = d3v3.svg.brush()
        .x(x)
        .y(y)
        .clamp([true, true])
        .on('brush', function() {
          var extent = brush.extent();
          extent[0][0] = Math.round(extent[0][0]);
          extent[0][1] = Math.round(extent[0][1]);
          extent[1][0] = Math.round(extent[1][0]);
          extent[1][1] = Math.round(extent[1][1]);
          d3v3.select(this).call(brush.extent(extent));
        })
        .on('brushend', function() {

          if (brush.empty()) {
            current_origin = [0,0];
            controller.transform({
              scale: [1,1],
              translate: [0,0],
              extent: [[0,0],[cols,rows]]
            });
          } else {
            var tf = controller.transform();
            var ex = brush.extent();
            current_origin = ex[0];
            var scale = [
              cols / (ex[1][0] - ex[0][0]),
              rows / (ex[1][1] - ex[0][1])
            ];
            var translate = [
              ex[0][0] * (width / cols) * scale[0] * -1,
              ex[0][1] * (height / rows) * scale[1] * -1
            ];
            controller.transform({scale: scale, translate: translate, extent: ex});
          }
          brush.clear();
          d3v3.select(this).call(brush).select(".brush .extent")
              .style({fill: opts.brush_color, stroke: opts.brush_color});
        });

    svg = svg
        .attr("width", width)
        .attr("height", height);
    var rect = svg.selectAll("rect").data(merged);
    rect.enter().append("rect").classed("datapt", true)
        .property("colIndex", function(d, i) { return i % cols; })
        .property("rowIndex", function(d, i) { return Math.floor(i / cols); })
        .property("value", function(d, i) { return d.value; })
        .attr("fill", function(d) {
          if (!d.color) {
            return opts.na_color;
          }
          return d.color;
        });
    rect.exit().remove();
    rect.append("title")
        .text(function(d, i) { return d.label; });
    rect.call(tip);

    var spacing;
    if (typeof(opts.show_grid) === 'number') {
      spacing = opts.show_grid;
    } else if (!!opts.show_grid) {
      spacing = 0.25;
    } else {
      spacing = 0;
    }
    function draw(selection) {
      selection
          .attr("x", function(d, i) {
            return x(i % cols);
          })
          .attr("y", function(d, i) {
            return y(Math.floor(i / cols));
          })
          .attr("width", (x(1) - x(0)) - spacing)
          .attr("height", (y(1) - y(0)) - spacing);
    }
    draw(rect);

    if(opts.print_values){
  		var cellLabels = svg.selectAll("text").data(merged);
  		cellLabels.enter().append("text")
  			.property("colIndex", function(d, i) { return i % cols; }) .property("rowIndex", function(d, i) { return Math.floor(i / cols); })
  			.property("value", function(d, i) { return d.value; })
  			.text(function(d, i) { return d.label; });
  		cellLabels.exit().remove();
  
  		function drawCellLabels(selection) {
  			var cellHeight = (y(1) - y(0)) - spacing;
  			var cellWidth = (x(1) - x(0)) - spacing;
  
      	var leaves = data.rows || data.matrix.rows;
      	if (data.children) {
      	  leaves = d3v3.layout.cluster().nodes(data)
      	      .filter(function(x) { return !x.children; })
      	      .map(function(x) { return x.label + ""; });
      	} else if (data.length) {
      	  leaves = data;
      	}
      	var scale = d3v3.scale.ordinal()
          .domain(leaves)
          .rangeBands([0, yaxis_height]);

   			// take the specified size or the minimum of the calculate y and x font sizes 
				var yfontSize = opts['yaxis_font_size'] || Math.min(18, Math.max(9, scale.rangeBand() - (8)));
		    var xfontSize = opts['xaxis_font_size'] || Math.min(18, Math.max(9, scale.rangeBand() - (11)));
  
        var fontSize = opts.cellnote_fontsize ? opts.cellnote_fontsize : Math.min(yfontSize, xfontSize);
  			
				selection
  				.attr("x", function(d, i) {
  					return x(i % cols) + cellWidth/2 - 1 - ((numDigits(d.label) - 1) * fontSize/2);
  				})
  				.attr("y", function(d, i) {
  					return y(Math.floor(i / cols)) + cellHeight/2 + fontSize/2;
  				})
  				.style("font-size", fontSize + "px")
					.style("fill", opts.cellnote_color);
  		}
  		drawCellLabels(cellLabels);
    }
      
    controller.on('transform.colormap', function(_) {
      x.range([_.translate[0], width * _.scale[0] + _.translate[0]]);
      y.range([_.translate[1], height * _.scale[1] + _.translate[1]]);
      draw(rect.transition().duration(opts.anim_duration).ease("linear"));
			!opts.print_values ? null : drawCellLabels(cellLabels.transition().duration(opts.anim_duration).ease("linear"));
    });
    
    var brushG = svg.append("g")
        .attr('class', 'brush')
        .call(brush)
        .call(brush.event);
    brushG.select("rect.background")
        .on("mouseenter", function() {
          tip.style("display", "block");
        })
        .on("mousemove", function() {
          var e = d3v3.event;
          var offsetX = d3v3.event.offsetX;
          var offsetY = d3v3.event.offsetY;
          if (typeof(offsetX) === "undefined") {
            // Firefox 38 and earlier
            var target = e.target || e.srcElement;
            var rect = target.getBoundingClientRect();
            offsetX = e.clientX - rect.left,
            offsetY = e.clientY - rect.top;
          }
          
          var col = Math.floor(x.invert(offsetX));
          var row = Math.floor(y.invert(offsetY));
          var label = merged[row * cols + col].label;
         
          var isFirefox = typeof InstallTrigger !== 'undefined';         
          var origin_col = current_origin[0];
          var origin_row = current_origin[1];

          if (isFirefox) {
            col = col - origin_col;
            row = row - origin_row;
          	label = merged[row * cols + col].label;
          }
          
          tip.show({col: col, row: row, label: label}).style({
            top: d3v3.event.clientY + 15 + "px",
            left: d3v3.event.clientX + 15 + "px",
            opacity: 0.9
          });
          controller.datapoint_hover({col:col, row:row, label:label});
        })
        .on("mouseleave", function() {
          tip.hide().style("display", "none");
          controller.datapoint_hover(null);
        });

    controller.on('highlight.datapt', function(hl) {
      rect.classed('highlight', function(d, i) {
        return (this.rowIndex === hl.y) || (this.colIndex === hl.x);
      });
    });
  }

  function title(svg, data, rotated, bounds) {
    // rotated is y, unrotated is x
    svg = svg.append('g');
    
    svg.append("text")
      .text(data)
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", rotated ? "translate(" + (bounds.width/2) + "," + (bounds.height/2) + "),rotate(-90)" : 
                                    "translate(" + (bounds.width/2) + "," + (bounds.height/2) + ")")
      .style("font-weight", "bold")
      .style("font-size", rotated ? opts.xaxis_title_font_size : opts.yaxis_title_font_size)
      .style("text-anchor", "middle");
  }

  function axisLabels(svg, data, rotated, width, height, padding, axis_location) {
    svg = svg.append('g');

    // The data variable is either cluster info, or a flat list of names.
    // If the former, transform it to simply a list of names.
    var leaves;
    if (data.children) {
      leaves = d3v3.layout.cluster().nodes(data)
          .filter(function(x) { return !x.children; })
          .map(function(x) { return x.label + ""; });
    } else if (data.length) {
      leaves = data;
    }
    
    // Define scale, axis
    var scale = d3v3.scale.ordinal()
        .domain(leaves)
        .rangeBands([0, rotated ? width : height]);
    var axis = d3v3.svg.axis()
        .scale(scale)
        .orient(axis_location)
        .outerTickSize(0)
        .tickPadding(padding)
        .tickValues(leaves);

    
		// Create the actual axis
    var axisNodes = svg.append("g")
        .attr("transform", function() {
          if (rotated) {
            if (axis_location === "bottom") {
              return "translate(0," + padding + ")";
            } else if (axis_location === "top") {
              return "translate(0," + (xaxisBounds.height - padding) + ")";
            }
          } else {
            if (axis_location === "right") {
              return "translate(" + padding + ",0)";
            } else if (axis_location === "left") {
              return "translate(" + (yaxisBounds.width - padding) + ",0)";
            }
          }
        })
        .call(axis);
    var yfontSize = opts['yaxis_font_size'] || Math.min(18, Math.max(9, scale.rangeBand() - (8))) + "px";
    var xfontSize = opts['xaxis_font_size'] || Math.min(18, Math.max(9, scale.rangeBand() - (11))) + "px";
    var fontSize = (rotated ? xfontSize : yfontSize); 
      axisNodes.selectAll("text").style("font-size", fontSize);
    
    var mouseTargets = svg.append("g")
      .selectAll("g").data(leaves);
    mouseTargets
      .enter()
        .append("g").append("rect")
          .attr("transform", rotated ? (axis_location === "bottom" ? "rotate(" + opts.xaxis_angle + 
									"),translate(0,0)": "rotate(-" + opts.xaxis_angle + "),translate(0,0)") : "")
          .attr("fill", "transparent")
          .on("click", function(d, i) {
            var dim = rotated ? 'x' : 'y';
            var hl = controller.highlight() || {x:null, y:null};
            if (hl[dim] == i) {
              // If clicked already-highlighted row/col, then unhighlight
              hl[dim] = null;
              controller.highlight(hl);
            } else {
              hl[dim] = i;
              controller.highlight(hl);
            }
            d3v3.event.stopPropagation();
          });
    function layoutMouseTargets(selection) {
      var _h = scale.rangeBand() / (rotated ? 1.414 : 1);
      var _w = rotated ? height * 1.414 * 1.2 : width;
 
      selection
          .attr("transform", function(d, i) {
            var x = rotated ? (axis_location === "bottom" ? scale(d) + scale.rangeBand()/2 : scale(d)) : 0;
            var y = rotated ? (axis_location === "bottom" ? padding + 6 : height - _h/1.414 - padding - 6): scale(d);
            return "translate(" + x + "," + y + ")";
          })
        .selectAll("rect")
          .attr("height", _h)
          .attr("width", _w);
    }
    layoutMouseTargets(mouseTargets);

		var xAxisLabelOffset_x = 10 + 10 * (opts.xaxis_angle - 25)/65;
		var xAxisLabelOffset_y = padding + 2 * (opts.xaxis_angle - 25)/65;

    if (rotated) {
      axisNodes.selectAll("text")
        .attr("transform", function() {
          if (axis_location === "bottom") {
            return "rotate(" + opts.xaxis_angle + 
													"),translate(" + 
													xAxisLabelOffset_y + ",-" + xAxisLabelOffset_x + ")";
          } else if (axis_location === "top") {
            return "rotate(-" + opts.xaxis_angle + 
													"),translate(" + 
													xAxisLabelOffset_y + "," + xAxisLabelOffset_x + ")";
          }
        })
        .style("text-anchor", "start");
    }
    
    controller.on('highlight.axis-' + (rotated ? 'x' : 'y'), function(hl) {
      var ticks = axisNodes.selectAll('.tick');
      var selected = hl[rotated ? 'x' : 'y'];
      if (typeof(selected) !== 'number') {
        ticks.classed('faded', false);
        return;
      }
      ticks.classed('faded', function(d, i) {
        return i !== selected;
      });
    });

    controller.on('transform.axis-' + (rotated ? 'x' : 'y'), function(_) {
      var dim = rotated ? 0 : 1;
      //scale.domain(leaves.slice(_.extent[0][dim], _.extent[1][dim]));
      var rb = [_.translate[dim], (rotated ? width : height) * _.scale[dim] + _.translate[dim]];
      scale.rangeBands(rb);
      var tAxisNodes = axisNodes.transition().duration(opts.anim_duration).ease('linear');
      tAxisNodes.call(axis);
      // Set text-anchor on the non-transitioned node to prevent jumpiness
      // in RStudio Viewer pane
      axisNodes.selectAll("text").style("text-anchor", rotated ? "start" : axis_location === "right" ? "start" : "end");
      tAxisNodes.selectAll("g")
          .style("opacity", function(d, i) {
            if (i >= _.extent[0][dim] && i < _.extent[1][dim]) {
              return 1;
            } else {
              return 0;
            }
          });
      tAxisNodes.selectAll("text").style("text-anchor", rotated ? "start" : axis_location === "right" ? "start" : "end");
      mouseTargets.transition().duration(opts.anim_duration).ease('linear')
          .call(layoutMouseTargets)
          .style("opacity", function(d, i) {
            if (i >= _.extent[0][dim] && i < _.extent[1][dim]) {
              return 1;
            } else {
              return 0;
            }
          });
    });

  }
 
	function legend(svg, data, options, height, width) {
    if (data.x.length === 0)
      return function() {};

		var breaks = options.legend_breaks,
		    legend_title = options.legend_title,
        max = d3v3.max(breaks),
        min = d3v3.min(breaks);

		// remove last item since everything above the last threshold
		// gets the same color
		var intervals = breaks;
		// we need N+1 colors for the threshold scale
		var colors = options.legend_colors;
		colors.unshift(options.na_color);

		var colorscale = d3v3.scale.threshold()
      .domain(intervals)
      .range(colors);

    var blockwidth = width / (breaks.length - 1);

		if(options.manual_breaks) {
			var legendscale = d3v3.scale.ordinal()
    	  .domain(intervals)
    	  .rangeBands([0, width]);

			// limit the number of ticks if there are too many
			var divisor = Math.max(1, Math.floor(intervals.length / 5));

	    var xAxis = d3v3.svg.axis()
	      .scale(legendscale)
				.tickValues(intervals.filter(function(value, index, Arr) {
					return (index + 1) % divisor == 0;
				}))
				.tickFormat(d3v3.format(".1f"))
	      .orient("bottom")
	      .tickSize(10);

			//historgrams process thresholds differently than scales,
			// so for manual breaks we need to add inifinity
			intervals.push(d3v3.max(data.x));

		} else {
    	var legendscale = d3v3.scale.linear()
    	  .domain([min, max])
    	  .range([0, (width - blockwidth)]);

	    var xAxis = d3v3.svg.axis()
	      .ticks(5)
				.tickFormat(d3v3.format(".1f"))
	      .scale(legendscale)
	      .orient("bottom")
	      .tickSize(10);

		}

	 if(legend_title) {
  		d3v3.select('.legend')
				.append('text')
  		  .classed('legend_title', true)
  		  .text(legend_title)
  		  .attr('x', '50%')
  		  .attr('padding-top', '1px')
      	.attr("transform", "translate(0, 10)");
		}

    var legend = d3v3.select('.legend')
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(0, 50)")
      .attr('width', '100%');

		var histdata = d3v3.layout.histogram()
      .bins(intervals)(data.x);

    var histy = d3v3.scale.linear()
      .domain([0, d3v3.max(histdata, function(d) { return d.y; })])
      .range([0, height / 2]);

		var none = options.legend_type == 'none';
		var fill = options.legend_fill ? options.legend_fill : null;

  	var bar = legend.selectAll(".bar")
      .data(histdata)
    	.enter().append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { 
							return(-histy(d.y)); 
			})
      .attr("x", function(d) { 
							return(legendscale(d.x)); 
			})
      .attr("width", blockwidth)
      .attr("height", function(d) { 
							return(histy(d.y)) 
			})
      .attr("fill", function(d) { 
							clr = fill ? fill : colorscale(d.x);
		 					return(clr)	
			});

  	legend.append("rect")
  	  .attr("width", width)
  	  .attr("height", none ? height/2 : 8)
  	  .attr("fill", "transparent")
  	  .classed("legendbox", true);

  	legend.selectAll(".legend")
  	  .data(intervals)
  	  .enter().append("rect")
  	  .attr("x", function(d) { return (legendscale(d)); })
  	  .attr("y", none ? -height/2 : 0)
  	  .attr("height", none ? height/2 : 8)
  	  .attr("width", blockwidth)
  	  .attr("fill", function(d) { return(colorscale(d)); });
    
		legend.call(xAxis)
				.selectAll("text")
					.attr("transform", "rotate(25)")
					.style("text-anchor", "start");
	}
  
  function edgeStrokeWidth(node) {
    if (node.edgePar && node.edgePar.lwd)
      return node.edgePar.lwd;
    else
      return 1;
  }
  
  function maxChildStrokeWidth(node, recursive) {
    var max = 0;
    for (var i = 0; i < node.children.length; i++) {
      if (recursive) {
        max = Math.max(max, maxChildStrokeWidth(node.children[i], true));
      }
      max = Math.max(max, edgeStrokeWidth(node.children[i]));
    }
    return max;
  }
  
	function rowColorLabels(svg, data, width, height, axisHeight, options) {
   	svg = svg.append('g').style('overflow', 'hidden');
    d3v3.select('.rowColors');

		var padding = options.axis_padding;
		var xloc = options.xaxis_location;
		var yloc = options.yaxis_location;
		var flip = xloc === 'top';
		var coeff = flip ? -1 : 1;
		var leftPadding = yloc === "left" ? padding : 0;
		var rightPadding = yloc === "left" ? 0 : padding;
   
    // Convert matrix to vector
		// For the sake of consistency, we'll keep rows and cols
		// similar between this function and the colColorLabels, even though
		// we ought to consider switching or transposing the matrix
    var rows = data.rowcolors.length;
    var rowcolors = flattenMatrix(data.rowcolors);
   
		var cols = rowcolors.length / rows;
		var colnames = options.rsc_colnames;
		var colors = {};
		colors.color = !options.rsc_cols ? null : 
									options.rsc_cols.filter(onlyUnique);
		colors.label = !options.rsc_labs ? null : 
									options.rsc_labs.filter(onlyUnique);



		// populate array of named lists for fill and label	
		var scols = [];
		for(var i = 0; i < rowcolors.length; i++) {
			var datum = {};
			datum.fill = rowcolors[i];

			// only proceed if we've explicitly defined the colors and the labels
			if(colors.color) {
				for(var j = 0; j < colors.color.length; j++) {
					if(datum.fill === colors.color[j]) {
						datum.label = colors.label[j];
						continue;
					}
				}
			}
			scols.push(datum);
		}

	  // if we've originally passed a character matrix, then we were able to 
	  // extract labels and apply colors, so we can create the labels
	  if(colors.color) {
	  	function onlyUnique(value, index, self) {   
	  	  return self.indexOf(value) === index;  
	  	} 

	  	var colorlabels = options.rsc_labs.filter(onlyUnique);
	  	
	  	// vertical ordinal colour scale  
	  	// with legend  
	  	var collabels = d3v3.select('.row_colors_label')  
	  	
	  	var labscale = d3v3.scale.ordinal()  
	  	  .domain(colors.label)  
	  	  .range(colors.color)  
	  	
	  	var legendheight = 15 * colors.label.length;  
	  	
			// Color scale  
	  	var colorscale_legendscale = d3v3.scale.ordinal()  
	  	  .domain(colors.label) // legend   
	  	  .rangeRoundBands([0, legendheight]); // height (px)  
	  	
	  	var yAxis = d3v3.svg.axis()  
	  	  .scale(colorscale_legendscale)  
	  	  .orient("right")  
	  	  .tickSize(7)  
	  	
	  	// Color ramp: bricks  
	  	collabels.selectAll(".colorscale_key")  
	  	  .data(colors.label)  
	  	  .enter().append("rect")  
	  	  .attr("class", "side_colors_label")  
	  	  .attr("width", 8)  
	  	  .attr('x', 0)  
	  	  .attr("height", function(d) {   
	  	    return (colorscale_legendscale.rangeBand());   
	  	  })  
	  	  .attr("y", function(d) {   
	  	    return (colorscale_legendscale(d) +"px");   
	  	  })  
	  	  .attr('fill', function(d) { return labscale(d); });  
	  	
	  	collabels.call(yAxis);  
	  }
    
		var x = d3v3.scale.linear()
        .domain([0, rows])
        .range([0 + leftPadding, width - rightPadding]);
    var y = d3v3.scale.linear()
        .domain([0, cols])
        .range([0, height]);
    
    var rect = svg.selectAll("rect").data(scols);
    rect.enter()
        .append("rect")
        .attr("fill", function(d, i) { return d.fill; });
    rect.exit()
        .remove();
   
		if(colnames) {	
			var rcaxis = d3v3.select('.rowColorsAxis').append('g');

			var yscale = d3v3.scale.ordinal()
    	    .domain(colnames)
    	    .rangeBands([0, width - padding]);
    	 
			var rsc_xaxis = d3v3.svg.axis()
    	    .scale(yscale)
    	    .orient(xloc)
    	    .outerTickSize(0)
    	    .tickPadding(padding)
    	    .tickValues(colnames);

			rcaxis.append("g")
    		.attr("transform", flip ? 
								"translate(" + leftPadding + "," + 
												(axisHeight - padding) + ")" :
								"translate(" + leftPadding + "," + padding + ")")
    	  .call(rsc_xaxis)
    	  .selectAll("text")
    	  .classed("tick", true)
    	  .attr("transform", "rotate(" + (coeff * 90) + ")," +
							 "translate(12," + (-coeff * 1.1 * width/rows) + ")")
    	  .style("text-anchor", "start")
  			.style("font-size", (0.8 * width / rows)	+ "px");
		}

	  if(colors.label) {
			var tooltip = d3v3.tip()  
    		  .attr('class', 'd3heatmap-tip')  
    		  .html(function(d, i) {  
    		  return "<table>" +   
    		    "<tr><th align=\"right\">Variable</th><td>" + 
							htmlEscape(colnames[Math.floor(i / cols)]) + "</td></tr>" +  
    		    "<tr><th align=\"right\">Row</th><td>" + 
							htmlEscape(data.matrix.rows[i % cols]) + "</td></tr>" +  
    		    "<tr><th align=\"right\">Value</th><td>" + 
							htmlEscape(scols[i].label) + "</td></tr>" +  
    		    "</table>";  
    		   })  
    		   .direction("se")  
    		   .style("position", "fixed");  

    	rect.call(tooltip);
    	rect.on("mouseover", function(d, i) {
    	  tooltip
    	    .show(d, i)
    	    .style({
    	          top: d3v3.event.clientY + 15 + "px",
    	          left: d3v3.event.clientX + 15 + "px",
    	          opacity: 0.9
    	        });
    	})
    	.on("mouseleave", function() {
    	  tooltip.hide();
    	});
	  }
    
    function draw(selection) {
      selection
          .attr("x", function(d, i) { return x(Math.floor(i / cols)); })
          .attr("y", function(d, i) { return y(i % cols); })
          .attr("width", x(1) - x(0) - (rows > 1 ? opts.spacing : 0))
          .attr("height", y(1) - y(0) - opts.spacing);
    }
    draw(rect);

    controller.on('transform.rowcolors', function(_) {
      y.range([_.translate[1], height * _.scale[1] + _.translate[1]]);
      draw(rect.transition().duration(opts.anim_duration).ease("linear"));
    });
  }
 
	function colColorLabels(svg, data, width, height, axisWidth, options) {
   	svg = svg.append('g').style('overflow', 'hidden');
    d3v3.select('.colColors');
    
		var xloc = options.xaxis_location;
		var yloc = options.yaxis_location;
		var padding = options.axis_padding;
		var flip = options.yaxis_location === 'left';
		var coeff = flip ? -1 : 1;
		var topPadding = xloc === "top" ? 0 : padding;
		var bottomPadding = xloc === "top" ? padding : 0;

    // Convert matrix to vector
		// For the sake of consistency, we'll keep rows and cols
		// similar between this function and the rowColorLabels, even though
		// we ought to consider transposing the matrix in rowColorLabels
    var rows = data.colcolors.length;
    var colcolors = flattenMatrix(data.colcolors);

    var cols = colcolors.length / rows;
		var colnames = options.csc_colnames;
		var colors = {};
		colors.color = !options.csc_cols ? null : 
									options.csc_cols.filter(onlyUnique);
		colors.label = !options.csc_labs ? null : 
									options.csc_labs.filter(onlyUnique);

		// populate array of named lists for fill and label	
		var scols = [];
		for(var i = 0; i < colcolors.length; i++) {
			var datum = {};
			datum.fill = colcolors[i];

			// only proceed if we've explicitly defined the colors and the labels
			if(colors.color) {
				for(var j = 0; j < colors.color.length; j++) {
					if(datum.fill === colors.color[j]) {
						datum.label = colors.label[j];
						continue;
					}
				}
			}
			scols.push(datum);
		}

		// if we've originally passed a character matrix, then we were able to 
		// extract labels and apply colors, so we can create the labels
		if(colors.color) {
			function onlyUnique(value, index, self) {   
			  return self.indexOf(value) === index;  
			} 

			var colorlabels = options.csc_labs.filter(onlyUnique);  
			
			// vertical ordinal colour scale  
			// with legend  
			var collabels = d3v3.select('.col_colors_label')  
			
			var labscale = d3v3.scale.ordinal()  
			  .domain(colors.label)  
			  .range(colors.color)  
			
	  	var legendheight = 15 * colors.label.length;  

			// Color scale  
			var colorscale_legendscale = d3v3.scale.ordinal()  
	  	  .domain(colors.label) // legend   
			  .rangeRoundBands([0, legendheight]); // height (px)  
			
			var yAxis = d3v3.svg.axis()  
			  .scale(colorscale_legendscale)  
			  .orient("right")  
			  .tickSize(7)  
			
			// Color ramp: bricks  
			collabels.selectAll(".colorscale_key")  
			  .data(colorlabels)  
			  .enter().append("rect")  
			  .attr("class", "side_colors_label")  
			  .attr("width", 8)  
			  .attr('x', 0)  
			  .attr("height", function(d) {   
			    return (colorscale_legendscale.rangeBand());   
			  })  
			  .attr("y", function(d) {   
			    return (colorscale_legendscale(d) +"px");   
			  })  
			  .attr('fill', function(d) { return labscale(d); });  
			
			collabels.call(yAxis); 
		}
    
    var x = d3v3.scale.linear()
        .domain([0, cols])
        .range([0, width]);
    var y = d3v3.scale.linear()
        .domain([0, rows])
        .range([0 + bottomPadding, height - topPadding]);
    
    var rect = svg.selectAll("rect").data(scols);
    rect.enter()
        .append("rect")
        .attr("fill", function(d, i) { return d.fill; });
    rect.exit()
        .remove();
		
		if(colnames) {	
			var ccaxis = d3v3.select('.colColorsAxis').append('g');

			var xscale = d3v3.scale.ordinal()
    	    .domain(colnames)
    	    .rangeBands([0 + bottomPadding, height - topPadding]);
    	 
			var csc_xaxis = d3v3.svg.axis()
    	    .scale(xscale)
    	    .orient(yloc)
    	    .outerTickSize(0)
    	    .tickPadding(padding)
    	    .tickValues(colnames);

			ccaxis.append("g")
    		.attr("transform", flip ? 
								"translate(" + (axisWidth - padding) + ",0)" :
								"translate(" + padding + ",0)" )
    	  .call(csc_xaxis)
    	  .selectAll("text")
    	  .classed("tick", true)
    	  .attr("transform", 
							 "translate(" + (coeff * padding) + ",0)")
    	  .style("text-anchor", flip ? "end" : "start")
  			.style("font-size", (0.8 * height / rows)	+ "px");
		}

	  if(colors.label) {
			var tooltip = d3v3.tip()  
    		  .attr('class', 'd3heatmap-tip')  
    		  .html(function(d, i) {  
    		  return "<table>" +   
    		    "<tr><th align=\"right\">Variable</th><td>" + 
							htmlEscape(colnames[Math.floor(i / cols)]) + "</td></tr>" +  
    		    "<tr><th align=\"right\">Col</th><td>" + 
							htmlEscape(data.matrix.cols[i % cols]) + "</td></tr>" +  
    		    "<tr><th align=\"right\">Value</th><td>" + 
							htmlEscape(scols[i].label) + "</td></tr>" +  
    		    "</table>";  
    		   })  
    		   .direction("se")  
    		   .style("position", "fixed");  

    	rect.call(tooltip);
    	rect.on("mouseover", function(d, i) {
    	  tooltip
    	    .show(d, i)
    	    .style({
    	          top: d3v3.event.clientY + 15 + "px",
    	          left: d3v3.event.clientX + 15 + "px",
    	          opacity: 0.9
    	        });
    	})
    	.on("mouseleave", function() {
    	  tooltip.hide();
    	});
	  }

    function draw(selection) {
      selection
          .attr("x", function(d, i) { return x(i % cols); })
          .attr("y", function(d, i) { return y(Math.floor(i / cols)); })
          .attr("width", x(1) - x(0) - opts.spacing)
          .attr("height", y(1) - y(0) - (cols > 1 ? opts.spacing : 0));
    }
    draw(rect);

    controller.on('transform.colcolors', function(_) {
      x.range([_.translate[0], width * _.scale[0] + _.translate[0]]);
      draw(rect.transition().duration(opts.anim_duration).ease("linear"));
    });

  } 

  function dendrogram(svg, data, rotated, width, height, padding, flip) {
		flip = flip || false;
    var topLineWidth = maxChildStrokeWidth(data, false);
    
    var x = d3v3.scale.linear()
        .domain([data.height, 0])
        .range([topLineWidth/2, width-padding]);
    var y = d3v3.scale.linear()
        .domain([0, height])
        .range([0, height]);
    
    var cluster = d3v3.layout.cluster()
        .separation(function(a, b) { return 1; })
        .size([rotated ? width : height, NaN]);
   
    var transform;
    if (rotated) {
      // Flip dendrogram vertically
      x.range([topLineWidth/2, -height+padding+2]);
      // Rotate
      transform = "rotate(-90) translate(-2,0)";
			if (flip) transform = "rotate(-90) translate(-" + (height - 2) + ",0) scale(-1, 1)";

    } else {
    	transform = "translate(1,0)";
			if (flip) transform = "translate(" + (width - 2) + ",0) scale(-1, 1)";

		}

    var dendrG = svg
        .attr("width", width)
        .attr("height", height)
      	.append("g")
        .attr("transform", transform);
    
    var nodes = cluster.nodes(data),
        links = cluster.links(nodes);

    // I'm not sure why, but after the heatmap loads the "links"
    // array mutates to much smaller values. I can't figure out
    // what's doing it, so instead we just make a deep copy of
    // the parts we want.
    var links1 = links.map(function(link, i) {
      return {
        source: {x: link.source.x, y: link.source.height},
        target: {x: link.target.x, y: link.target.height},
        edgePar: link.target.edgePar
      };
    });
    
    var lines = dendrG.selectAll("polyline").data(links1);
    lines
      .enter().append("polyline")
        .attr("class", "link")
        .attr("stroke", function(d, i) {
          if (!d.edgePar.col) {
            return opts.link_color;
          } else {
            return d.edgePar.col;
          }
        })
        .attr("stroke-width", edgeStrokeWidth)
        .attr("stroke-dasharray", function(d, i) {
          var pattern;
          switch (d.edgePar.lty) {
            case 6:
              pattern = [3,3,5,3];
              break;
            case 5:
              pattern = [15,5];
              break;
            case 4:
              pattern = [2,4,4,4];
              break;
            case 3:
              pattern = [2,4];
              break;
            case 2:
              pattern = [4,4];
              break;
            case 1:
            default:
              pattern = [];
              break;
          }
          for (var i = 0; i < pattern.length; i++) {
            pattern[i] = pattern[i] * (d.edgePar.lwd || 1);
          }
          return pattern.join(",");
        });

    function draw(selection) {
      function elbow(d, i) {
        return x(d.source.y) + "," + y(d.source.x) + " " +
            x(d.source.y) + "," + y(d.target.x) + " " +
            x(d.target.y) + "," + y(d.target.x);
      }
      
      selection
          .attr("points", elbow);
    }

    controller.on('transform.dendr-' + (rotated ? 'x' : 'y'), function(_) {
      var scaleBy = _.scale[rotated ? 0 : 1];
      var translateBy = _.translate[rotated ? 0 : 1];
      y.range([translateBy, height * scaleBy + translateBy]);
      draw(lines.transition().duration(opts.anim_duration).ease("linear"));
    });

    draw(lines);
  }

 
  var dispatcher = d3v3.dispatch('hover', 'click');
  
  controller.on("datapoint_hover", function(_) {
    dispatcher.hover({data: _});
  });
  
  function on_col_label_mouseenter(e) {
    controller.highlight(+d3v3.select(this).attr("index"), null);
  }
  function on_col_label_mouseleave(e) {
    controller.highlight(null, null);
  }
  function on_row_label_mouseenter(e) {
    controller.highlight(null, +d3v3.select(this).attr("index"));
  }
  function on_row_label_mouseleave(e) {
    controller.highlight(null, null);
  }

  return {
    on: function(type, listener) {
      dispatcher.on(type, listener);
      return this;
    }
  };
}
