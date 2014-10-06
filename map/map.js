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
}

////////////////////////////////////////////////////////////////////////////
// conversion between country names and codes

function countryToCode(country) {
  for (var i = 0, obj; obj = countryCodes[i]; i++) {
    if (obj.name === country) {
      return obj.countryCode;
    }
  }
  return "";
}
function countryCodeToName(code) {
  for (var i = 0, obj; obj = countryCodes[i]; i++) {
    if (obj.countryCode === code) {
      return obj.name;
    }
  }
  return "";
}

function countriesToCodes(countries) {
  var codes = [];
  for (var i = 0, country; country = countries[i]; i++) {
    codes.push(countryToCode(country));
  }
  return codes;
}
function countryCodesToNames(codes) {
  var names = [];
  for (var i = 0, code; code = codes[i]; i++) {
    names.push(countryCodeToName(code));
  }
  return names;
}
////////////////////////////////////////////////////////////////////////////

function updateYear(year) {
  YEAR = year;
  d3.select("#yearBox").html(year);
  timeline(year);
}

function Event(name, year, countries, color, information) {
  this.name = name;
  this.year = year;
  this.countries = countries; // list of country names
  this.color = color;
  this.information = "";
}

function groupHighlight(codes, color) {
  for (var i = 0, d; d = codes[i]; i++) {
    d3.select("#country_" + d).style("fill", color);
  }
}
function groupUnHighlight(codes) {
  groupHighlight(codes, "#79A881");
}

var EVENTS = [
  new Event(
    "NATO formed", 
    "1949", 
    ["United States",
    "United Kingdom",
    "Portugal",
    "Norway",
    "Netherlands",
    "Luxembourg",
    "Italy",
    "Iceland",
    "France",
    "Denmark",
    "Canada",
    "Belgium"], 
    "#2412AA",
    ""
  ),
  new Event(
    "NATO adds Greece and Turkey",
    "1952",
    ["Greece",
    "Turkey"],
    "#2412AA",
    ""
  ),
  new Event(
    "Warsaw Pact formed",
    "1955",
    ["Russia",
    "Bulgaria",
    "Hungary",
    "Poland",
    "Romania",
    "Albania"],
    "#CC3131",
    ""
  )
];

function timeline(year) {
  for (i = 0, event; event = EVENTS[i]; i++) {
    if (year == event.year) {
      console.log(event.name);
      groupHighlight(countriesToCodes(event.countries), event.color);
    } else {
      groupUnHighlight(countriesToCodes(event.countries));
    }
  }
}























