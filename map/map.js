var WORLD50JSON = "world-50m.json";
var WORLD110JSON = "world-110m.json";
var COUNTRYCODESJSON = "countryCodes.json";

var width = 800;
var height = 525;
var scale0 = (width - 1) / 2 / Math.PI;
var YEAR = 0;
var countryCodes = {};

var projection = d3.geo.equirectangular()
    .scale(150)
    .translate([width / 2, height / 2]);

var zoom = d3.behavior.zoom()
  .translate([width / 2, height / 2])
  .scale(scale0)
  .scaleExtent([scale0, 8 * scale0])
  .on("zoom", zoomed);

var path = d3.geo.path().projection(projection);

var svg = d3.select("body").select("#maincontent").append("svg")
  .attr("width", width)
  .attr("height", height);

var g = svg.append("g");

svg
  .call(zoom)
  .call(zoom.event);

d3.json(WORLD110JSON, function(error, world) {
  if (error) return console.error(error);

  g.selectAll(".country")
    .data(topojson.feature(world, world.objects.countries).features)
  .enter().append("path")
    .attr("class", function(d) { return "country" })
    .attr("id", function(d) {return "country_" + d.id})
    .attr("d", path)
    .style({
      "visibility": 
      function(d) {
        if(d.id == 10) {
          return "hidden";
        }
        return 
          "visible";
      },
      "stroke-width": "1px"
      });

  g.selectAll(".country")
    .on("click", handleClick);

});

// unpack country codes:
d3.json(COUNTRYCODESJSON, function(error, json) {
  if (error) return console.error(error);

  countryCodes = json;
  console.log(countryCodes);
});

function zoomed() {
  projection
    .translate(zoom.translate())
    .scale(zoom.scale());

  g.selectAll("path")
    .attr("d", path);
}

function handleClick (d, i) {
  var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
  d3.select(".selected").classed("selected", false);
  d3.select("#country_" + d.id).classed("selected", true);

  displayInfo(d3.select("#country_" + d.id));
}

function updateYear(year) {
  YEAR = year;
  d3.select("#yearBox").html(year);
}

function Event(year, countries) {
  this.year = year;
  this.countries = countries;
}


























