// A simulation consists of a world, an array of ants, a step function that updates the task of
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
                var vectors = getVectors(ant, currentCell, this);
                // have the ant decide where to go next
                var nextCell = vectorToCell(ant.decide(vectors), ant, currentCell, this);
                // update the cells to reflect new position of the ant
                ant.previousCell = ant.cell;
                ant.cell = nextCell;
                nextCell.ant = ant;
                if (nextCell !== currentCell) {
                    currentCell.ant = null;
                }
                // update pheromone levels
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

        seedWithFood: function(amount, density) {
            this.food = this.food || [];
            for (var i = 0; i < amount; i++) {
                var cell = this.world.getRandomOccupiableCell();
                cell.type = "food";
                cell.foodDensity = density;
                cell.startingFoodDensity = density;
                this.food.push(cell);
            }
        },

        seedWithAnts: function(numAnts) {
            for (var i = 0; i < numAnts; i++) {
                var ant = createTestAnt("ant:"+i, this.world.getRandomOccupiableCell(), this);
                this.ants.push(ant);
                ant.cell.ant = ant;
            }
        },

        seedWithDirt: function(depth) {
            this.world.seedWithDirt(depth);
            this.nest = {
                x: dimensions.x / 2,
                y: depth - 1,
                z: dimensions.z / 2
            };
        }
    };
}

function getVectors(ant, cell, simulation) {
    var vectors = [];

    // 1. Vector pointing in a random 2D direction. "noise"
    vectors.push([2*Math.random() - 1, 0, 2*Math.random() - 1]);

    // 2. Vector pointing in a random 3D direction.
    vectors.push([2*Math.random() - 1, 2*Math.random() - 1, 2*Math.random() - 1]);

    // 3. Vector for continuing in a straight line.
    var curr = ant.cell.position;
    var prev = ant.previousCell.position;
    vectors.push([curr.x - prev.x, curr.y -  prev.y, curr.z - prev.z]);

    // 4. Vector for pointing away from the nest entrance
    var nest = simulation.nest;
    var dist = Math.sqrt(
        (curr.x - nest.x) * (curr.x - nest.x) +
        (curr.y - nest.y) * (curr.y - nest.y) +
        (curr.z - nest.z) * (curr.z - nest.z));
    if (dist == 0) {
        dist += 0.01
    }
    vectors.push([(curr.x - nest.x)/dist, (curr.y - nest.y)/dist, (curr.z - nest.z)/dist]);

    // 5. Vector for pointing down in order to dig
    vectors.push([0, -1, 0]);

    // 6. Vector for pointing to a cell the ant cares about
    if (ant.goalCells.length > 0) {
        var goalPos = ant.goalCells[ant.goalIndex].position;
        var goalDist = Math.sqrt(
            (curr.x - goalPos.x) * (curr.x - goalPos.x) +
            (curr.y - goalPos.y) * (curr.y - goalPos.y) +
            (curr.z - goalPos.z) * (curr.z - goalPos.z));
        if (goalDist == 0) {
            goalDist += 0.01
        }
        vectors.push([
            (goalPos.x - curr.x)/goalDist,
            (goalPos.y - curr.y)/goalDist,
            (goalPos.z - curr.z)/goalDist
        ]);
    }

    // 7. Vector for pheromone
    if (cell.pheromone) {
        vectors.push(cell.pheromone);
    }

    return vectors;
}

// Will convert the ant's chosen vector into the next cell that the ant will move to
// This is more than simple math because if the ant wants to go somewhere illegal then
// this function will decide which cell the ant will get to move to instead.
// There are 5 cases where an ant would want to go somewhere illegal:
// 1. Move off the map      -- stay put
// 2. Move into dirt        -- dig through the dirt if that cell would be occupiable w/o dirt
// 3. Move into another ant -- stay put
// 4. Move into open air    -- turn the vector downwards until it points to a legal cell
// 5. Move into food        -- take some of the food and stay put
function vectorToCell(vector, ant, cell, simulation) {
    // Find the largest component of the vector
    var maxComp = -Infinity;
    for (var i = 0; i < vector.length; i++) {
        if (Math.abs(vector[i]) > maxComp) {
            maxComp = Math.abs(vector[i]);
        }
    }
    // scale the vector down based on largest component
    for (var i = 0; i < vector.length; i++) {
        vector[i] = Math.round(vector[i] / maxComp) || 0;
    }

    var nextCell = cell.neighbors[9 * (vector[0]+1) + 3 * (vector[1]+1) + (vector[2]+1)];

    // handle case 1:
    if (isWrappedAround(cell.position, nextCell.position)) {
        return cell;
    }

    // handle case 2:
    if (nextCell.type == "dirt") {
        nextCell.type = "empty";
        if (!ant.hasDirt && nextCell.occupiable() && !ant.dontDig &&
                ((ant.currentTask.name == "goToCell" &&
                  ant.cell.position.y >= simulation.world.depth) ||
                ant.currentTask.name != "goToCell")) {
            ant.hasDirt = true;
            simulation.world.dirtToRenderCache = null;
            return nextCell;
        } else {
            nextCell.type = "dirt";
            return cell;
        }
    }

    // handle case 3:
    if (nextCell.ant) {
        if (Math.random() < 0.5 && ant.currentTask.name && !nextCell.ant.recruited) { // recruit
            nextCell.ant.recruited = true;
            nextCell.ant.taskStack = ant.taskStack.slice();
            nextCell.ant.goalCells = ant.goalCells.slice();
            nextCell.ant.goalIndex = ant.goalIndex;
            nextCell.ant.currentTask = ant.currentTask;
        }
    }

    // handle case 4:
    if (!nextCell.occupiable()) {
        while (vector[1] >= -1 && !nextCell.occupiable()) {
            vector[1] -= 1;
            var nextCell = cell.neighbors[9*(vector[0]+1) + 3*(vector[1]+1) + (vector[2]+1)];
        }
        if (vector[1] < -1) {
            return cell;
        }
    }

    // handle case 5:
    if (nextCell.type == "food") {
        if (!ant.hasFood) {
            nextCell.foodDensity -= 1;
            ant.hasFood = true;
        }
        return cell;
    }

    return nextCell;
}
