function makeGrid(width, height) {
    var grid = [];
    for (var x = 0; x < width; x++) {
        var col = [];
        for (var y = 0; y < height; y++) {
            col.push({alive: 0});
        }
        grid.push(col);
    }

    return grid;
}

function applyRules(grid, rules, axes) {
    var nextGrid = makeGrid(grid.length, grid[0].length);

    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            var neighbors = getNeighbors(grid, x, y, rules.wrapAround);
            var livingNeighbors = 0;
            for (var i = 0; i < neighbors.length; i++) {
                if (neighbors[i].alive > 0) {
                    livingNeighbors++;
                }
            }
            var axesRules = {
                create: rules.create,
                starve: rules.starve,
                suffocate: rules.suffocate,
                generation: rules.generation
            };
            axesRules[axes.xDimension] = Math.floor(9 * x / grid.length);
            axesRules[axes.yDimension] = 8 - Math.floor(9 * y / grid[0].length);

            if ((grid[x][y].alive >= 1 &&
                livingNeighbors >= axesRules.starve && livingNeighbors <= axesRules.suffocate) ||
                (grid[x][y].alive == 0 && livingNeighbors == axesRules.create) ||
                axesRules.generation > Math.random() * 10000) {
                    nextGrid[x][y].alive = grid[x][y].alive + 1;
            }
        }
    }
    return nextGrid;
}

function seedGrid(grid, probability, axes) {
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            var adjustedProb = probability;
            if (axes.xDimension == "seed") {
                adjustedProb = x / grid.length;
            }
            if (axes.yDimension == "seed") {
                adjustedProb = y / grid.length;
            }
            if (Math.random() < adjustedProb) {
                grid[x][y].alive = 1;
            }
        }
    }
}

function getNeighbors(grid, x, y, wrapAround) {
    var width = grid.length;
    var height = grid[0].length;

    var neighbors = [];
    if (wrapAround) {
        neighbors.push(grid[(width + x - 1) % width][y]);
        neighbors.push(grid[(width + x - 1) % width][(height + y - 1) % height]);
        neighbors.push(grid[(width + x - 1) % width][(y + 1) % height]);
        neighbors.push(grid[(x + 1) % width][y]);
        neighbors.push(grid[(x + 1) % width][(height + y - 1) % height]);
        neighbors.push(grid[(x + 1) % width][(y + 1) % height]);
        neighbors.push(grid[x][(height + y - 1) % height]);
        neighbors.push(grid[x][(y + 1) % height]);
    } else {
        if (x > 0) {
            neighbors.push(grid[(x - 1) % width][y]);
            if (y > 0) {
                neighbors.push(grid[(x - 1) % width][(y - 1) % height]);
            }
            if (y < grid[0].length - 1) {
                neighbors.push(grid[(x - 1) % width][(y + 1) % height]);
            }
        }
        if (x < grid.length - 1) {
            neighbors.push(grid[(x + 1) % width][y]);
            if (y > 0) {
                neighbors.push(grid[(x + 1) % width][(y - 1) % height]);
            }
            if (y < grid[0].length - 1) {
                neighbors.push(grid[(x + 1) % width][(y + 1) % height]);
            }
        }
        if (y > 0) {
            neighbors.push(grid[x][(y - 1) % height]);
        }
        if (y < grid[0].length - 1) {
            neighbors.push(grid[x][(y + 1) % height]);
        }
    }

    return neighbors;
}
