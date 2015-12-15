//////////////////////////////////////////////////////////////////////////////
// Initialize Simulation
// Returns a simulation object which will contain ALL (AND ONLY) STATE related to the
// simulation to be fed into a graphical representation giving it everything it would
// need to render and to be fed into a set of behaviours to make decisions
// TODO: deal with empty cells better
var EMPTY = "EMPTY";
function initializeSimulation(width, height, numAnts) {
    // TODO: abstract away grid dimensions
    var simulation = {
        width: width,
        height: height,
        grid: [],
        numAnts: numAnts,
        ants: []
    };
    // Initialize the grid
    for (var x = 0, row = []; x < simulation.width; x++, row = []) {
        for (var y = 0; y < simulation.height; y++) {
            // pheromone level exists alongside anything else a grid location
            // might contain, but otherwise it can only contain one thing
            // (eg. an ant, food, an obstacle)
            row.push({pheromone: 0, contains: {type: EMPTY}});
        }
        simulation.grid.push(row);
    }
    // Initialize the ants (at random locations)
    // TODO: Abstract away the creation of ants
    for (var i = 0; i < numAnts; i++) {
        var newAnt = {
            type: "ant",
            decide: directedFollowPheromone2,
            away: -1, // start going away from colony?
            x: Math.floor(Math.random() * simulation.width),
            y: Math.floor(Math.random() * simulation.height),
            pheromoneStrength: 64 // how pheromone it leaves each step
        };
        simulation.ants.push(newAnt);
        simulation.grid[newAnt.x][newAnt.y].contains = newAnt;
    }
    return simulation;
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Update Simulation
// Run one step of the simulation by asking each ant to decide what to do next.
// Let each ant take turns deciding where to move to avoid collisions.
// Ants have access to all information about the simulation, so their decide
// function will have to be trusted to act in a biologically realistic manner
// (this makes sense to allow since I don't know yet what information would be
// biologically realistic for an ant to have access to).
function updateSimulation(simulation) {
    for (var a = 0, ant; ant = simulation.ants[a]; a++) {
        // TODO: Abstract away the mapping of moveDirections to grid locations
        simulation.grid[ant.x][ant.y].contains = {type: EMPTY};
        // update the pheromone level of the ant's previous position
        if (ant.away < 0) {
            simulation.grid[ant.x][ant.y].pheromone += ant.pheromoneStrength;
        }
        // each ant just decides which direction to move next and the simulation
        // handles how translate that direction decision into a destination
        var moveDirection = ant.decide(simulation, ant) || {x: 0, y: 0};
        // update previous position of the ant
        ant.previousX = ant.x;
        ant.previousY = ant.y;
        // update current position
        ant.x += moveDirection.x;
        ant.y += moveDirection.y;
        simulation.grid[ant.x][ant.y].contains = ant;

    }
    // for each grid square, update its pheromone level
    // TODO: clean this up
    var updatedPheromones = [];
    var evaporationRate = 0.5;
    for (var x = 0; x < simulation.grid.length; x++) {
        var row = [];
        for (var y = 0; y < simulation.grid[x].length; y++) {
            row.push(simulation.grid[x][y].pheromone);
        }
        updatedPheromones.push(row);
    }
    updatedPheromones = diffusePheromones(updatedPheromones);
    for (var x = 0; x < simulation.grid.length; x++) {
        for (var y = 0; y < simulation.grid[x].length; y++) {
            if (updatedPheromones[x][y] > 0) {
                simulation.grid[x][y].pheromone = updatedPheromones[x][y] - evaporationRate;
            } else {
                simulation.grid[x][y].pheromone = 0;
            }
        }
    }

    return simulation;
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Diffuse Pheromones
// Use a blur filter to "smear" the pheromone around, spreading it out
function diffusePheromones(pheromoneLevels) {
    // var box = [
    //     [1/64, 3/64, 1/64],
    //     [3/64, 48/64, 3/64],
    //     [1/64, 3/64, 1/64]
    // ];

    var box = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
    ];
    for (var j = 0; j < pheromoneLevels.length; j++) {
        for (var i = 0; i < pheromoneLevels[j].length; i++) {
            var b = 0;
            for (var x = j - 1; x <= j + 1; x++) {
                if (x < 0 || x >= pheromoneLevels.length) { continue; }
                for (var y = i - 1; y <= i + 1; y++) {
                    if (y < 0 || y >= pheromoneLevels[x].length) { continue; }
                    b += pheromoneLevels[x][y] * box[1 + y - i][1 + x - j];
                }
            }
            pheromoneLevels[j][i] = Math.floor(b);
        }
    }
    return pheromoneLevels;
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// Decision Functions
// Given a simulation and a specific ant in it, choose which direction to move
// in (eg. north/south/east/west)
var DIRECTIONS = {
    south: {x: 0, y: 1},
    north: {x: 0, y: -1},
    east: {x: -1, y: 0},
    west: {x: 1, y: 0},
};

// Pick a random direction to move in that's on the grid and unoccupied
function random(simulation, ant) {
    var availableDirections = getAvailableDirections(simulation, ant);
    return availableDirections[Math.floor(Math.random() * availableDirections.length)];
}

// Pick a random unoccupied direction to move, preferring directions with higher
// pheromone levels
function followPheromone(simulation, ant) {
    var availableDirections = getAvailableDirections(simulation, ant);
    var weights = getPheromoneWeights(simulation, ant, availableDirections);
    return getWeightedRandomDirection(availableDirections, weights);
}

// Follow pheromones but prefer not to go back where you came from
function directedFollowPheromone(simulation, ant) {
    var availableDirections = getAvailableDirections(simulation, ant);
    var weights = getPheromoneWeights(simulation, ant, availableDirections);
    for (var i = 0; i < availableDirections.length; i++) {
        if (availableDirections[i].x === ant.previousX &&
            availableDirections[i].y === ant.previousY) {
            var coeff = weights[i];
            for (var j = i; j < weights.length; j++) {
                weights[j] -= coeff + 1;
            }
        }
    }
    return getWeightedRandomDirection(availableDirections, weights);
}

// Follow pheromones but prefer not to go back where you came from
function directedFollowPheromone2(simulation, ant) {
    var availableDirections = getAvailableDirections(simulation, ant);
    var pheromones = getPheromoneWeights(simulation, ant, availableDirections);
    var moveMatrix = getMoveWeights(simulation, ant, availableDirections);
    var colonyMatrix = getColonyWeights(simulation, ant, availableDirections);
    var weights = [];
    for (var i = 0; i < availableDirections.length; i++) {
        weights.push(Math.floor(
            1 * pheromones[i] +
            10 * moveMatrix[i] +
            100 * colonyMatrix[i]
        ));
    }
    return getWeightedRandomDirection(availableDirections, weights);
}

function getColonyWeights(simulation, ant, availableDirections) {
    var colonyWeights = [];
    var colonyLoc = {x: simulation.grid.length / 2, y: simulation.grid[0].length /2};
    var distToCenter = Math.sqrt(
        Math.pow(Math.abs(ant.x - colonyLoc.x), 2) +
        Math.pow(Math.abs(ant.y - colonyLoc.y), 2));
    if (ant.x == 0 || ant.x == simulation.grid.length - 1 ||
        ant.y == 0 || ant.y == simulation.grid[0].length -1 ||
        distToCenter < 5) {
            ant.away *= -1;
    }
    for (var i = 0; i < availableDirections.length; i++) {
        var dist = Math.sqrt(
            Math.pow(ant.x + availableDirections[i].x - colonyLoc.x, 2) +
            Math.pow(ant.y + availableDirections[i].y - colonyLoc.y, 2));
        colonyWeights.push(Math.pow((dist - distToCenter + 1)/2, ant.away));
    }
    return colonyWeights;
}

function getMoveWeights(simulation, ant, availableDirections) {
    var moveWeights = [];
    for (var i = 0; i < availableDirections.length; i++) {
        var dist = Math.sqrt(
            Math.pow(ant.x + availableDirections[i].x - ant.previousX, 2) +
            Math.pow(ant.y + availableDirections[i].y - ant.previousY, 2));
        moveWeights.push(Math.pow(dist / 2, 6));
    }
    return moveWeights;
}

// TODO sort these helper functions out better (Are these the behaviors??) TODO
// return the directions neighboring the ant for which those grid cells are unoccupied
function getAvailableDirections(simulation, ant) {
    var availableDirections = [];
    for (var dir in DIRECTIONS) {
        if (ant.x + DIRECTIONS[dir].x < simulation.grid.length &&
            ant.y + DIRECTIONS[dir].y < simulation.grid[0].length &&
            ant.x + DIRECTIONS[dir].x >= 0 &&
            ant.y + DIRECTIONS[dir].y >= 0 &&
            simulation.grid[ant.x + DIRECTIONS[dir].x][ant.y + DIRECTIONS[dir].y].contains.type
                == EMPTY
        ) {
            availableDirections.push(DIRECTIONS[dir]);
        }
    }
    return availableDirections;
}

function getPheromoneWeights(simulation, ant, availableDirections) {
    var weights = [];
    for (var i = 0; i < availableDirections.length; i++) {
        weights.push(1 + simulation.grid[ant.x + availableDirections[i].x]
                               [ant.y + availableDirections[i].y].pheromone);
    }
    return weights;
}

function getWeightedRandomDirection(availableDirections, weights) {
    var totalWeights = 0;
    for (var i = 0; i < weights.length; i++) {
        totalWeights += weights[i];
    }
    var rand = Math.floor(Math.random() * totalWeights);
    totalWeights = 0;
    for (var i = 0; i < availableDirections.length; i++) {
        totalWeights += weights[i];
        if (totalWeights > rand) {
            return availableDirections[i];
        }
    }
    return availableDirections[0];
}
//////////////////////////////////////////////////////////////////////////////
function placePheromone(simulation, x, y, strength) {
    simulation.grid[x][y].pheromone += strength;
    return simulation;
}
