function addEventHandlers(game) {
  addClickHandlers(game);
  addKeyHandlers(game);
}

function addClickHandlers(game) {
  game.mouse.onMouseDown = function(ev) {
    const canvas = document.getElementById(game.canvas.id);
    invariant(canvas, 'onMouseDown couldn\'t find the canvas');
    // bounding rect adjusts for canvas anywhere on screen (as long as
    // canvas pixels are 1 to 1 with screen pixels)
    const rect = canvas.getBoundingClientRect();
    if (ev.button == 0) {
      game.mouse.left = true;
      game.mouse.leftX = ev.clientX - rect.left;
      game.mouse.leftY = ev.clientY - rect.top;
    } else if (ev.button == 2) {
      game.mouse.right = true;
      game.mouse.rightX = ev.clientX - rect.left;
      game.mouse.rightY = ev.clientY - rect.top;
    }
    ev.preventDefault();
  };
  game.mouse.onMouseUp = function(ev) {
    if (ev.button == 0 && game.mouse.left) {
      game.mouse.leftUp = true; // for dragging, mainly
    } else if (ev.button == 2 && game.mouse.right) {
      game.mouse.rightUp = true;
    }
  };
  game.mouse.onMouseMove = function(ev) {
    const canvas = document.getElementById(game.canvas.id);
    invariant(canvas, 'onMouseDown couldn\'t find the canvas');
    const rect = canvas.getBoundingClientRect();
    game.mouse.x = ev.clientX - rect.left;
    game.mouse.y = ev.clientY - rect.top;
  };
  return game;
}

function addKeyHandlers(game) {
  game.keys.onKeyDown = function (ev) {
    game.keys[ev.key] = true;
  };
  game.keys.onKeyUp = function(ev) {
    delete game.keys[ev.key];
  };
  return game;
}
