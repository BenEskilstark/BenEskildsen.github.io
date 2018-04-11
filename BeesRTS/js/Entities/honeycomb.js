
let honeycombIndex = 0;

function makeHoneycomb(contains = null) {
  return {
    type: 'honeycomb',
    id: honeycombIndex++,

    spriteIndex: Math.floor(Math.random() * 2),

    contains: contains, // null, honey, egg, larva, pupa,
  };
}
