var WORLDJSON = "world-50m.json";
d3.json(WORLDJSON, function(error, world){
  console.log(world);
})

var width = 960;
var height = 700;

var projection = d3.geo.equirectangular()
    .scale(150)
    .translate([width / 2, height / 2]);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json(WORLDJSON, function(error, world) {
  if (error) return console.error(error);
  
  svg.append("path")
    // .datum(topojson.feature(world, world.objects.countries))
    // .attr("d", d3.geo.path().projection(projection));

    svg.selectAll(".country")
      .data(topojson.feature(world, world.objects.countries).features)
    .enter().append("path")
      .attr("class", function(d) { return "country_" + d.id; })
      .attr("d", d3.geo.path().projection(projection));

});