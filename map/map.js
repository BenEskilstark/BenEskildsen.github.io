var WORLDJSON = "world-50m.json";
// d3.json(WORLDJSON, function(error, world){
//   console.log(world);
// })

var width = 960;
var height = 525;

var projection = d3.geo.equirectangular()
    .scale(150)
    .translate([width / 2, height / 2]);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json(WORLDJSON, function(error, world) {
  if (error) return console.error(error);

  svg.selectAll(".country")
    .data(topojson.feature(world, world.objects.countries).features)
  .enter().append("path")
    .attr("class", function(d) { return "country_" + d.id; })
    .attr("d", d3.geo.path().projection(projection))
    .style({
      "visibility": 
      function(d) {
        if(d.id == 10) {
          return "hidden";
        }
        return 
          "visible";
      },
      "stroke-width": "1px",
       "stroke": "#141414", 
       "fill": "#79A881" 
      });

  // hide Antarctica
  svg.select("#country_10")
    .attr("style", "visibility: hidden");

});