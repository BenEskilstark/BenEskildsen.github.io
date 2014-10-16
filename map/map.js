var WORLD50JSON = "world-50m.json";
var WORLD110JSON = "world-110m.json";
var COUNTRYCODESJSON = "countryCodes.json";

var width = 1000;
var height = 625;
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

var tooltip = d3.select("body").select("#maincontent")
  .append("div").attr("class", "tooltip hidden");

svg
  .call(zoom)
  .call(zoom.event);

d3.json(WORLD110JSON, function(error, world) {
  if (error) return console.error(error);

  g.selectAll(".country")
    .data(topojson.feature(world, world.objects.countries).features)
  .enter().insert("path")
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
    .on("click", handleClick)
    .on("mousemove", function(d, i) {
      var mouse = d3.mouse(svg.node()).map(function(d){return parseInt(d);});
      tooltip.classed("hidden", false)
        .attr("style", "left:"+(mouse[0]+5)+"px;top:"+(mouse[1]+30)+"px")
        .html(countryCodeToName(""+d.id))
    })
    .on("mouseout", function(d, i) {
      tooltip.classed("hidden", true);
    });

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


// show the leader's images on clicks
function handleClick (d, i) {
  d3.select(".selected").classed("selected", false);
  var country = d3.select("#country_" + d.id);
  country.classed("selected", true);

  var persons = countryCodeToPersons(d.id);
  console.log(persons);

  country.selectAll("circle")
    .data(persons)
  .enter().append("circle")
    .attr("id", d.name)
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 50)
    .attr("class", "person");

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

//convert between country code and Person
function countryCodeToPersons(code) {
  console.log(code);
  var countryName = countryCodeToName(code);
  console.log(countryName);
  var persons = [];
  for (var i = 0, person; person = PEOPLE[i]; i++) {
    console.log(person.country);
    if (person.country === countryName) {
      persons.push(person);
    }
  }
  return persons;
}

////////////////////////////////////////////////////////////////////////////

function Person(name, country, image, information) {
  this.name = name;
  this.country = country;
  this.image = image;
  this.information = information
}

var PEOPLE = [
  new Person("Che Guevara", "Cuba", "", ""),
  new Person("Zhou Enlai", "China", "", ""),
  new Person("Lin Biao", "China", "", "")
];

function groupHighlight(codes, color) {
  for (var i = 0, d; d = codes[i]; i++) {
    d3.select("#country_" + d).style("fill", color);
  }
}
function groupUnHighlight(codes) {
  groupHighlight(codes, "#79A881");
}























