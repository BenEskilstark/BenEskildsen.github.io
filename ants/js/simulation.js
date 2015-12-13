// A simulation consists of a world, an array of ants, a step function that updates the state of
// the world by having each ant decide what to do next, a render function that decides how to
// display the simulation on screen, and the run function that decides when to step and when to
// render.
// Since run and render will be so heavily designed for the specific simulation (since how and
// when I choose to render will be really perf-based) I will pass them in from outside
function createSimulation(dimensions) {
    return {
        world: createWorld(dimensions),
        ants: [],
        rate: 1, // milliseconds per step
        run: undefined,
        render: undefined,

        step: function() {
            // have each ant decide what to do
            for (var i = 0, ant; ant = this.ants[i]; i++) {
                var currentCell = ant.cell;
                // make stencils for this cell
                var stencils = getStencils(ant, currentCell, this.world.grid);
                // have the ant decide where to go next
                var nextCell = indexToCell(ant.decide(stencils), currentCell);
                // update the cells to reflect new position of the ant
                ant.previousCell = ant.cell;
                ant.cell = nextCell;
                nextCell.ant = ant;
                currentCell.ant = null;
                currentCell.pheromone += ant.pheromone;
            }
        },

        start: function() {
            this.interval = setInterval(this.run, this.rate);
        },

        stop: function() {
            clearInterval(this.interval);
        },

        setRate: function(newRate) {
            this.rate = newRate;
            this.stop();
            this.start();
        },

        seedWithAnts: function(numAnts) {
            for (var i = 0; i < numAnts; i++) {
                this.ants.push(createTestAnt("ant:"+i, this.world.getRandomOccupiableCell()));
            }
        },

        seedWithDirt: function(depth) {
            this.world.seedWithDirt(depth);
        }
    };
}

// stencils always go in the order: [current location, left neighbor, right neighbor,
// top neighbor, bottom neighbor, front neighbor, back neighbor]
function getStencils(ant, cell, grid) {
    var stencils = [];

    // stencil for cells that are possible to move to:
    var occupiable = [];
    occupiable.push(1); // ant's current location must be occupiable
    for (var i = 0; i < cell.neighbors.length; i++) {
        if (cell.neighbors[i].occupiable() &&
            !isWrappedAround(cell.position, cell.neighbors[i].position)) {
            occupiable.push(1);
        } else {
            occupiable.push(0);
        }
    }
    stencils.push(occupiable);

    // stencil for pheromone levels
    var pheromones = [];
    pheromones.push(0); // don't go to your current location
    for (var i = 0; i < cell.neighbors.length; i++) {
        pheromones.push(cell.neighbors[i].pheromone);
    }
    stencils.push(pheromones);

    // stencil for keeping the ant going straight
    var goStraight = [];
    goStraight.push(0.2);
    for (var i = 0; i < cell.neighbors.length; i++) {
        var xDist = Math.abs(cell.neighbors[i].position.x - ant.previousCell.position.x);
        var yDist = Math.abs(cell.neighbors[i].position.y - ant.previousCell.position.y);
        var zDist = Math.abs(cell.neighbors[i].position.z - ant.previousCell.position.z);
        if (xDist + yDist + zDist == 0) {
            goStraight.push(0);
        } else if (xDist == 2 || yDist == 2 || zDist == 2) {
            goStraight.push(1);
        } else {
            goStraight.push(0.5);
        }
    }
    stencils.push(goStraight);

    // stencil for pointing to the direction of the colony

    return stencils;
}

function indexToCell(index, cell) {
    if (index === 0) {
        return cell;
    }
    return cell.neighbors[index - 1];
}
