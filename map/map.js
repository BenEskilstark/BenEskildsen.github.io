console.log("map.js running");
var WORLDJSON = "world-50m.json";

d3.json(WORLDJSON, function(error, world) {
  if (error) return console.error(error);
  console.log(world);
});