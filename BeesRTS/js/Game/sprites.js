function loadSprites(game) {
  game.sprites.bee = [];
  game.sprites.grass = [];
  game.sprites.honeycomb = [];
  game.sprites.landscape = [];
  game.sprites.flower = [];

  // bees
  const bee0 = new Image();
  bee0.addEventListener('load', () => {
    game.sprites.bee.push(bee0);
  }, false);
  bee0.src = 'bee0.png';

  const bee1 = new Image();
  bee1.addEventListener('load', () => {
    game.sprites.bee.push(bee1);
  }, false);
  bee1.src = 'bee1.png';

  const bee2 = new Image();
  bee2.addEventListener('load', () => {
    game.sprites.bee.push(bee2);
  }, false);
  bee2.src = 'bee2.png';

  const bee3 = new Image();
  bee3.addEventListener('load', () => {
    game.sprites.bee.push(bee3);
  }, false);
  bee3.src = 'bee3.png';

  // honeycombs
  const honeycomb1 = new Image();
  honeycomb1.addEventListener('load', () => {
    game.sprites.honeycomb.push(honeycomb1);
  }, false);
  honeycomb1.src = 'honeycomb1.png';

  const honeycomb2 = new Image();
  honeycomb2.addEventListener('load', () => {
    game.sprites.honeycomb.push(honeycomb2);
  }, false);
  honeycomb2.src = 'honeycomb2.png';

  const honeycomb3 = new Image();
  honeycomb3.addEventListener('load', () => {
    game.sprites.honeycomb.push(honeycomb3);
  }, false);
  honeycomb3.src = 'honeycomb3.png';

  const honeycomb4 = new Image();
  honeycomb4.addEventListener('load', () => {
    game.sprites.honeycomb.push(honeycomb4);
  }, false);
  honeycomb4.src = 'honeycomb4.png';

  // landscapes
  const landscape1 = new Image();
  landscape1.addEventListener('load', () => {
    game.sprites.landscape.push(landscape1);
  }, false);
  landscape1.src = 'landscape1.jpeg';

  const landscape2 = new Image();
  landscape2.addEventListener('load', () => {
    game.sprites.landscape.push(landscape2);
  }, false);
  landscape2.src = 'landscape2.jpg';

  // grass
  const grass1 = new Image();
  grass1.addEventListener('load', () => {
    game.sprites.grass.push(grass1);
  }, false);
  grass1.src = 'grass1.png';

  // flower
  const flower1 = new Image();
  flower1.addEventListener('load', () => {
    game.sprites.flower.push(flower1);
  }, false);
  flower1.src = 'flower1.png';


  return game;
}
