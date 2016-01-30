// custom javascript


$(function() {
  console.log('jquery is working!')
  createGraph2();
});

function createGraph() {
  console.log('jquery is working!');
  // main config
  var width = 960; // chart width
  var height = 700; // chart height
  var format = d3.format(",d");  // convert value to integer
  var color = d3.scale.category20b();  // create ordial scale with 20 colors
  var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50]);  // https://github.com/mbostock/d3/wiki/Quantitative-Scales#pow

  // bubble config
  var bubble = d3.layout.pack()
    .sort(null)  // disable sorting, use DOM tree traversal
    .size([width, height])  // chart layout size
    .padding(1)  // padding between circles
    .radius(function(d) { return 20 + (sizeOfRadius(d) * 60); });  // radius for each circle

  // svg config
  var svg = d3.select("#chart").append("svg") // append to DOM
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bubble");

  // tooltip config
  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px sans-serif")
    .text("tooltip");

  // request the data
  d3.json("/data", function(error, quotes) {
    console.log(quotes)
    var node = svg.selectAll('.node')
      .data(bubble.nodes(quotes).filter(function(d) { return !d.children; }))
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

  node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style('fill', function(d) { return color(d.symbol); })

    .on("mouseover", function(d) {
      tooltip.text(d.name + ": $" + d.price);
      tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
      return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    node.append('text')
      .attr("dy", ".3em")
      .style('text-anchor', 'middle')
      .text(function(d) { return d.symbol; });

  });

}

function createGraph2() {

var data = [{
    "sale": "202",
    "year": "2000"
}, {
    "sale": "215",
    "year": "2001"
}, {
    "sale": "179",
    "year": "2002"
}, {
    "sale": "199",
    "year": "2003"
}, {
    "sale": "134",
    "year": "2003"
}, {
    "sale": "176",
    "year": "2010"
}];

var data2 = [{
    "sale": "152",
    "year": "2000"
}, {
    "sale": "189",
    "year": "2002"
}, {
    "sale": "179",
    "year": "2004"
}, {
    "sale": "199",
    "year": "2006"
}, {
    "sale": "134",
    "year": "2008"
}, {
    "sale": "176",
    "year": "2010"
}];

var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    };

xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000,2010]);

yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134,215]);

xAxis = d3.svg.axis()
    .scale(xScale);
  
yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

vis.append("svg:g")
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

vis.append("svg:g")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.sale);
  })
 .interpolate("basis");

var lineGe2 = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.sale);
  })
 .interpolate("basis");

d3.json("/data", function(error, results) {
	console.log(results);
vis.append('svg:path')
  .attr('d', lineGen())
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
	});

vis.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', 'green')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

vis.append('svg:path')
  .attr('d', lineGen(data2))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');


}



function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}
