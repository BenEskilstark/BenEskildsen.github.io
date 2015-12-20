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
        goalCells: [],
        goalIndex: 0,
        previousCell: cell,
        tasks: tasks,
        taskStack: [],
        currentTask: tasks.explore,
        recruited: false,

        decide: function(vectors) {
            var transition = this.currentTask.transition(this);
            // if (transition != "placeDirt") {
            //     console.log(transition, this.hasDirt);
            // }
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
                vector: [2, 0.1, 1, 0.5, 0, 0, 1],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    if (ant.hasFood) {
                        return "returnFood";
                    }
                    if (ant.hasDirt) {
                        return "placeDirt";
                    }
                    if (pos.x == 0 || pos.z == 0 || pos.x == 29 || pos.z == 29) {
                        return "comeBack";
                    }
                    return "explore";
                },
            },

            comeBack: {
                vector: [2, 0.1, 1, -1, 0, 0],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    var nest = simulation.nest
                    if (ant.hasFood) {
                        return "returnFood";
                    }
                    if (ant.hasDirt) {
                        return "placeDirt";
                    }
                    if (pos.x == nest.x && pos.y == nest.y && pos.z == nest.z) {
                        var prevTask = ant.taskStack.pop();
                        if (prevTask) {
                            return prevTask
                        } else {
                            return "explore";
                        }
                    }
                    return "comeBack";
                },
            },

            placeDirt: {
                vector: [0, 2, 1, -0.5, 0, 0],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    var nest = simulation.nest;
                    var dist = Math.sqrt(
                        (pos.x - nest.x) * (pos.x - nest.x) +
                        (pos.y - nest.y) * (pos.y - nest.y) +
                        (pos.z - nest.z) * (pos.z - nest.z));
                    if (pos.y > nest.y  &&
                            (dist > 1 * Math.random() &&
                            dist < 18 * Math.random())) {
                        ant.hasDirt = false;
                        ant.cell.type = "dirt";
                        var prevTask = ant.taskStack.pop();
                        if (prevTask) {
                            return prevTask;
                        } else if(Math.random() < 0.5) {
                            ant.recruited = false;
                            ant.taskStack.push("digTunnel");
                            ant.goalIndex = 0;
                            if (ant.goalCells.length == 0) {
                                ant.goalCells.push(ant.cell);
                            }
                            return "goToCell";
                        } else {
                            for (var i = 0; i < 10; i++) {
                                ant.taskStack.push("explore");
                            }
                            ant.recruited = false;
                            return "explore";
                        }
                    }
                    return "placeDirt";
                }
            },

            digTunnel: {
                vector: [0, 1, 1, 1, 1, 0],
                transition: function(ant) {
                    var pos = ant.cell.position;
                    var nest = simulation.nest;
                    if (ant.hasDirt) {
                        if (Math.random() < 0.25 && pos.y < nest.y - 8) {
                            for (var i = 0; i < 30; i++) {
                                ant.taskStack.push("digChamber");
                                ant.taskStack.push("goToCell");
                            }
                        } else if (Math.random() < 0.5) {
                            for (var i = 0; i < 10; i++) {
                                ant.taskStack.push("explore");
                            }
                        } else {
                            ant.taskStack.push("digTunnel");
                            ant.taskStack.push("goToCell");
                        }
                        ant.goalCells.push(ant.cell);
                        ant.goalIndex = 0;
                        return "placeDirt";
                    }
                    return "digTunnel";
                }
            },

            digChamber: {
                vector: [0, 4, 1, 1, 0, 0],
                transition: function(ant) {
                    if (ant.hasDirt) {
                        return "placeDirt";
                    }
                    return "digChamber";
                }
            },

            goToCell: {
                name: "goToCell",
                vector: [0, 2, 1, 0, 0, 5],
                transition: function(ant) {
                    this.vector[1] += 1 / 100; // increase randomness the longer you're here
                    var pos = ant.cell.position;
                    var goalPos = ant.goalCells[ant.goalIndex].position;
                    if (ant.hasDirt) {
                        ant.taskStack.push("goToCell");
                        this.vector[1] = 2;
                        return "placeDirt";
                    }
                    if (pos.x == goalPos.x && pos.y == goalPos.y && pos.z == goalPos.z) {
                        if (ant.goalIndex < ant.goalCells.length - 1) {
                            ant.goalIndex += 1;
                            return "goToCell";
                        } else {
                            ant.goalIndex = 0;
                        }
                        var prevTask = ant.taskStack.pop();
                        this.vector[1] = 2;
                        if (prevTask) {
                            return prevTask;
                        } else {
                            return "explore";
                        }
                    }
                    ant.goTosInARow += 1;
                    return "goToCell";
                }
            },

            returnFood: {
                name: "returnFood",
                vector: [1, 0, 1, -2, 0, 0, -1],
                transition: function(ant) {
                    if (ant.hasDirt) {
                        ant.taskStack.push("returnFood");
                        return "placeDirt";
                    }

                    var prevPos = ant.previousCell.position;
                    var pos = ant.cell.position;
                    // lay down pheromone trail
                    var ph = [0, 0, 0];
                    ant.cell.pheromone = [
                        prevPos.x-pos.x + ph[0], prevPos.y-pos.y + ph[1], prevPos.z-pos.z + ph[2]
                    ];

                    var nest = simulation.nest
                    if (pos.x == nest.x && pos.y == nest.y && pos.z == nest.z) {
                        ant.hasFood = false;
                        console.log("food returned");
                        return "explore";
                    }
                    return "returnFood";
                }
            }

        }
    );
}
