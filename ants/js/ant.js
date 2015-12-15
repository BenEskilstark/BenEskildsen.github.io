// Ants make decisions on two levels: based on their currentTask and then based on the
// specific operations of that task. For example, when an ant is in the "wander" task it will
// choose to move randomly until something triggers it to change tasks (eg. if it found food
// and entered the "returnToNest" task.
//
// At each time the ant decides, it will also examine certain factors to decide if it should
// change tasks.
//
// Order of stencils therefore matters to the order of coefficients given in each task.
// The zeroeth stencil will always give the cells that are physically possible to move to in the
// form of 1 or 0. The decide function will then further multiply each cell by the value in
// the 0th stencil so that it never chooses cells that are impossible to move to.

// tasks is a dictionary mapping task names (like wander) to the task array that represents
// that behavior. cell points back to the grid location where the ant is. The decide function
// is called every step and is where the ant uses the stencils to choose a neighboring cell
// to move to, and decides whether or not to switch tasks. It returns the cell it wants to
// move to  and updates its own currentTask. decide() will also call behavior as its way to
// change tasks. This way, any type of ant decision-making can be
// specified entirely between the tasks available to it and the strategy it uses to switch
// between tasks (the behavior function).
function createAnt(name, cell, tasks) {
    return {
        name: name,
        cell: cell,
        goalCell: cell,
        previousCell: cell,
        tasks: tasks,
        taskStack: [],
        currentTask: tasks.explore,
        pheromone: 0, // pheromone it puts down per step

        decide: function(vectors) {
            var transition = this.currentTask.transition(this);
            // console.log(transition);
            this.currentTask = this.tasks[transition];

            var finalVector = [0, 0, 0];
            for (var i = 0; i < this.currentTask.vector.length && i < vectors.length; i++) {
                for (var j = 0; j < finalVector.length; j++) {
                    finalVector[j] += this.currentTask.vector[i] * vectors[i][j];
                }
            }
            return finalVector;
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Some specific types of ants
function createTestAnt(name, cell, simulation) {
    return createAnt(
        name,
        cell,
        {
            explore: {
                vector: [2, 0.1, 1, 0.5],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    if (ant.hasDirt) {
                        // console.log("Task: placeDirt");
                        return "placeDirt";
                    }
                    if (pos.x == 0 || pos.z == 0 || pos.x == 29 || pos.z == 29) {
                        // console.log("Task: comeBack");
                        return "comeBack";
                    }
                    return "explore";
                },
            },

            comeBack: {
                vector: [2, 0.1, 1, -1],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    var nest = simulation.nest
                    if (ant.hasDirt) {
                        ant.taskStack.push("comeBack");
                        return "placeDirt";
                    }
                    if (pos.x == nest.x && pos.y == nest.y && pos.z == nest.z) {
                        var prevTask = ant.taskStack.pop();
                        if (prevTask) {
                            return prevTask
                        } else if (Math.random() < 0.5) {
                            return "digTunnel";
                        } else {
                            return "explore";
                        }
                    }
                    return "comeBack";
                },
            },

            placeDirt: {
                vector: [0, 2, 1, -0.5],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    var nest = simulation.nest;
                    var dist = Math.sqrt(
                        (pos.x - nest.x) * (pos.x - nest.x) +
                        (pos.y - nest.y) * (pos.y - nest.y) +
                        (pos.z - nest.z) * (pos.z - nest.z));
                    if (pos.y >= nest.y && dist > 5 * Math.random() && dist < 10 * Math.random()) {
                        ant.hasDirt = false;
                        ant.cell.type = "dirt";
                        var prevTask = ant.taskStack.pop();
                        if (prevTask) {
                            return prevTask;
                        } else {
                            return "explore";
                        }
                    }
                    return "placeDirt";
                }
            },

            digTunnel: {
                vector: [0, 1, 1, 0.5, 1],
                transition: function(ant) {
                    if (ant.hasDirt) {
                        if (Math.random() < 0.5) { // allow the possibility of not digging anymore
                            ant.taskStack.push("digTunnel");
                            ant.taskStack.push("goToCell");
                            ant.goalCell = ant.cell;
                        }
                        return "placeDirt";
                    }
                    return "digTunnel";
                }
            },

            goToCell: {
                vector: [0, 1, 1, 0, 0, 5],
                transition: function(ant) {
                    ant.dontDig = true;
                    var pos = ant.cell.position;
                    var goalPos = ant.goalCell.position;
                    if (ant.hasDirt) {
                        ant.taskStack.push("goToCell");
                        return "placeDirt";
                    }
                    if (pos.x == goalPos.x && pos.y == goalPos.y && pos.z == goalPos.z) {
                        var prevTask = ant.taskStack.pop();
                        if (prevTask) {
                            return prevTask;
                        } else {
                            return "explore";
                        }
                    }
                    return "goToCell";
                }
            }

        }
    );
}
///////////////////////////////////////////////////////////////////////////////////

// returns an index into an array where it treats the values in the array as relative
// weights and is biased towards picking indices with higher relative values.
function pickFromArray(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var rand = Math.floor(Math.random() * total);
    total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
        if (total > rand) {
            return i;
        }
    }
    return 0; // shouldn't hit this...
}
