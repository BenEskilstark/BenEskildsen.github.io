

function createAnt(name, cell, simulation) {

    var tasks = [
         digTunnelTask,
         digChamberTask,
         returnFoodTask,
         scoutForFoodTask
    ];

    return {
        name: name,
        cell: cell,
        previousCell: cell,
        simulation: simulation,
        age: 0,

        inarow: 0,

        tasks: {
            digTunnelTask: tasks[0],
            digChamberTask: tasks[1],
            returnFoodTask: tasks[2],
            scoutForFoodTask: tasks[3]
        },
        currentTask: tasks[Math.floor(Math.random() * 4)](),
        previousTask: tasks[Math.floor(Math.random() * 4)],

        expectedProportions: {
            digTunnelTask:      0.25,
            digChamberTask:     0.25,
            returnFoodTask:     0.25,
            scoutForFoodTask:   0.25
        },
        threshold: 0.1,

        hasFood: false,
        hasDirt: false,
        antsFound: [],
        foodCells: [],
        tunnelCells: [],

        decide: function(vectors) {

            // update the age of all the ant's information
            for (var i = 0; i < this.antsFound.length; i++) {
                this.antsFound[i].age += 1;
            }
            for (var i = 0; i < this.foodCells.length; i++) {
                this.foodCells[i].age += 1;
            }
            for (var i = 0; i < this.tunnelCells.length; i++) {
                this.tunnelCells[i].age += 1;
            }

            // change tasks if the current task is complete
            var curr = this.currentTask;
            var subtask = curr.subtasks[curr.currentSubtaskIndex];
            if (curr.currentSubtaskIndex == curr.subtasks.length - 1 &&
                subtask.achievedGoal(this)) {
                    if (this.currentTask.name !== "communicationTask") {
                        subtask.sideEffects(this);
                        this.previousTask = curr.name;
                        this.currentTask = communicationTask(this);
                    } else { // else currentTask will be set by delegateTask's side effect
                        subtask.sideEffects(this);
                    }
            }

            // console.log(this.name, subtask);
            curr = this.currentTask;
            subtask = curr.subtasks[curr.currentSubtaskIndex];
            // change subtasks if the current subtask is complete
            if ((subtask.name == "placeDirt" && subtask.alreadySucceeded) ||
                (subtask.name != "placeDirt" && subtask.achievedGoal(this))) {
                subtask.sideEffects(this);
                curr.currentSubtaskIndex += 1;
                subtask = curr.subtasks[curr.currentSubtaskIndex];
            }

            // calculate where to move based on the current subtask
            var finalVector = [0, 0, 0];
            for (var i = 0; i < subtask.vector.length && i < vectors.length; i++) {
                for (var j = 0; j < finalVector.length; j++) {
                    finalVector[j] += subtask.vector[i] * vectors[i][j];
                }
            }
            return finalVector;
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Tasks
function digTunnelTask(ant) {
    var tunnelCellStart = null;
    var tunnelCellEnd = null;
    if (ant && ant.tunnelCells.length > 0) {
        var i = Math.floor(Math.random() * ant.tunnelCells.length);
        tunnelCellStart = ant.tunnelCells[i].startCell;
        tunnelCellEnd = ant.tunnelCells[i].endCell;
    }

    return  {
        name: "digTunnelTask",
        subtasks: [gotoCell(tunnelCellStart), gotoCell(tunnelCellEnd), digTunnel(), placeDirt()],
        currentSubtaskIndex: 0,
    };
}

function digChamberTask(ant) {
    var tunnelCellStart = null;
    var tunnelCellEnd = null;
    if (ant && ant.tunnelCells.length > 0) {
        var i = Math.floor(Math.random() * ant.tunnelCells.length);
        tunnelCellStart = ant.tunnelCells[i].startCell;
        tunnelCellEnd = ant.tunnelCells[i].endCell;
    }

    return {
        name: "digChamberTask",
        subtasks: [gotoCell(tunnelCellStart), gotoCell(tunnelCellEnd), digChamber(), placeDirt()],
        currentSubtaskIndex: 0,
    };
}

function scoutForFoodTask(ant) {
    return {
        name: "scoutForFoodTask",
        subtasks: [explore(), returnFood()],
        currentSubtaskIndex: 0,
    };
}

function returnFoodTask(ant) {
    var foodCell = null;
    for (var i = 0; ant && i < ant.foodCells.length; i++) {
        if (ant.foodCells[i].density > 0) {
            foodCell = ant.foodCells[i].cell;
            break;
        }
    }

    var subtasksArray = [explore(), returnFood()];
    if (foodCell) {
        subtasksArray = [gotoCell(foodCell), returnFood()];
    }

    return {
        name: "returnFoodTask",
        subtasks: subtasksArray,
        currentSubtaskIndex: 0,
    };
}

function communicationTask(ant) {
    var start = ant.antsFound.length;
    return {
        name: "communicationTask",
        subtasks: [findAnt(start, 1), delegateTask()],
        currentSubtaskIndex: 0,
    };
}
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
// Subtasks
function findAnt(startIndex, index) {
    return {
        name: "findAnt",
        vector: [4, 1, 1, 0, 0, 0],
        startIndex: startIndex,
        index: index,
        achievedGoal: function (ant) {
            return ant.antsFound.length >= this.startIndex + this.index;
        },
        sideEffects: function (ant) {
            var antJustSeen = ant.antsFound[ant.antsFound.length - 1].ant;

            // compare food location information:
            for (var i = 0; i < antJustSeen.foodCells.length; i++) {
                var seenSameFood = false;
                for (var j = 0; j < ant.foodCells.length; j++) {
                    if (antJustSeen.foodCells[i].name == ant.foodCells[j].name) {
                        seenSameFood = true;
                        if (ant.foodCells[j].age > antJustSeen.foodCells[i].age) {
                            ant.foodCells[j] = {
                                cell: antJustSeen.foodCells[i].cell,
                                age: antJustSeen.foodCells[i].age,
                                name: antJustSeen.foodCells[i].name,
                                density: antJustSeen.foodCells[i].density
                            }
                        }
                    }
                }
                if (!seenSameFood) {
                    ant.foodCells.push({
                        cell: antJustSeen.foodCells[i].cell,
                        age: antJustSeen.foodCells[i].age,
                        name: antJustSeen.foodCells[i].name,
                        density: antJustSeen.foodCells[i].density
                    });
                }
            }

            // compare tunnel location information:
            for (var i = 0; i < antJustSeen.tunnelCells.length; i++) {
                seenSameTunnel = false;
                for (var j = 0; j < ant.tunnelCells.length; j++) {
                    if (antJustSeen.tunnelCells[i].name == ant.tunnelCells[j].name) {
                        seenSameTunnel = true;
                        if (ant.tunnelCells[j].age > antJustSeen.tunnelCells[i].age) {
                            ant.tunnelCells[j] = {
                                startCell: antJustSeen.tunnelCells[i].startCell,
                                endCell: antJustSeen.tunnelCells[i].endCell,
                                age: antJustSeen.tunnelCells[i].age,
                                name: antJustSeen.tunnelCells[i].name,
                            }
                        }
                    }
                }
                if (!seenSameTunnel) {
                    ant.tunnelCells.push({
                        startCell: antJustSeen.tunnelCells[i].startCell,
                        endCell: antJustSeen.tunnelCells[i].endCell,
                        age: antJustSeen.tunnelCells[i].age,
                        name: antJustSeen.tunnelCells[i].name,
                    });
                }

                if (ant.hasDirt) {
                    ant.hasDirt = false;
                    ant.cell.type = "dirt";
                }
            }
        }
    };
}

function delegateTask() {
    return {
        name: "delegateTask",
        vector: [0, 1, 0, 0, 0, 0],
        achievedGoal: function (ant) {
            return true;
        },
        sideEffects: function (ant) {
            // compute measured proportions of tasks
            var measuredProportions = {
                returnFoodTask: 0,
                digTunnelTask: 0,
                scoutForFoodTask: 0,
                digChamberTask: 0
            };
            for (var i = 0; i < ant.antsFound.length; i++) {
                var taskName = ant.antsFound[i].ant.currentTask.name;
                if (taskName == "communicationTask") {
                    taskName = ant.antsFound[i].ant.previousTask;
                }
                measuredProportions[taskName] +=
                    1 / (ant.antsFound[i].age + 1);
            }

            var totalProportions = 0.000001; // prevent divide-by-zero error
            for (task in measuredProportions) {
                totalProportions += measuredProportions[task];
            }
            for (task in measuredProportions) {
                measuredProportions[task] = measuredProportions[task] / totalProportions;
            }

            // compare measured proportions to expected proportions
            var mostDifferent = measuredProportions.returnFoodTask;
            var biggestDifference = 0;
            for (task in measuredProportions) {
                var difference = ant.expectedProportions[task] - measuredProportions[task];
                if (difference > biggestDifference) {
                    biggestDifference = difference;
                    mostDifferent = task;
                }
            }

            // reassign task based on comparison
            if (biggestDifference > ant.threshold) {
                // console.log("switched tasks");
                ant.currentTask = ant.tasks[mostDifferent](ant);
            } else {
                // console.log("stayed the same task");
                ant.currentTask = ant.tasks[ant.previousTask](ant);
            }
        }
    };
}

function gotoCell(cell) {
    return {
        name: "gotoCell",
        cell: cell,
        vector: [0, 3, 1, 0, 0, 5],
        achievedGoal: function (ant) {
            if (this.cell === null) {
                return true;
            }
            return (ant.cell == this.cell) || ant.inarow > 100;
        },
        sideEffects: function (ant) {
            if (!ant.hasFood) { // if the ant expected food but there wasn't any
                for (var i = 0; i < ant.foodCells.length; i++) {
                    if (ant.cell == ant.foodCells[i].cell) {
                        ant.foodCells[i].density = 0;
                    }
                }
            }
        },
    };
}

function digTunnel(tunnelName) {
    return {
        name: "digTunnel",
        vector: [0, 1, 1, 1, 1, 1],
        achievedGoal: function (ant) {
            return ant.hasDirt;
        },
        sideEffects: function (ant) {
            ant.hasDirt = true;
            if (!tunnelName) {
                ant.tunnelCells.push({
                    startCell: ant.cell,
                    endCell: ant.cell,
                    age: 0,
                    name: ant.name + "" + ant.age,
                });
            } else {
                for (var i = 0; i < ant.tunnelCells.length; i++) {
                    if (ant.tunnelCells[i].name == tunnelName) {
                        ant.tunnelCells[i].endCell = ant.cell;
                    }
                }
            }
        },
    };
}

function placeDirt() {
    return {
        name: "placeDirt",
        vector: [0, 2, 1, -0.5, 0, 0],
        alreadySucceeded: false,
        achievedGoal: function (ant) {
            if (this.alreadySucceeded) {
                return true;
            }
            var pos = ant.cell.position;
            var nest = ant.simulation.nest;
            var dist = Math.sqrt(
                (pos.x - nest.x) * (pos.x - nest.x) +
                (pos.y - nest.y) * (pos.y - nest.y) +
                (pos.z - nest.z) * (pos.z - nest.z));
            var cellUnderneath = ant.simulation.world.grid[pos.x][pos.y - 1][pos.z];
            if (pos.y >= nest.y &&
                    dist > 1 * Math.random() &&
                    dist < 18 * Math.random() && cellUnderneath.type == "dirt") {
                this.alreadySucceeded = true;
                return true;
            }
            return false;
        },
        sideEffects: function (ant) {
            ant.hasDirt = false;
            ant.cell.type = "dirt";
        },
    };
}

function digChamber() {
    return {
        name: "digChamber",
        vector: [0, 4, 1, 1, 0, 0],
        achievedGoal: function (ant) {
            return ant.hasDirt;
        },
        sideEffects: function (ant) {
            ant.hasDirt = true;
        },
    };
}

function explore() {
    return {
        name: "explore",
        vector: [3, 1, 0.5, 0.5, 0, 0],
        achievedGoal: function (ant) {
            var pos = ant.cell.position;
            var width = ant.simulation.world.dimensions.x - 1;
            var length = ant.simulation.world.dimensions.z - 1;
            return ant.hasFood || pos.x == 0 || pos.y == 0 || pos.x == width || pos.y == length;
        },
        sideEffects: function (ant) {
            if (ant.hasFood) {
                ant.foodCells.push({
                    cell: ant.cell,
                    age: 0,
                    name: ant.name + "" + ant.age,
                    density: ant.cell.foodDensity
                });
            }
        }
    };
}

function returnFood() {
    return {
        name: "returnFood",
        vector: [2, 0.1, 1, -2, 0, 0],
        achievedGoal: function (ant) {
            var pos = ant.cell.position;
            var nest = ant.simulation.nest;
            var dist = Math.sqrt(
                (pos.x - nest.x) * (pos.x - nest.x) +
                (pos.y - nest.y) * (pos.y - nest.y) +
                (pos.z - nest.z) * (pos.z - nest.z));
            return dist < 2 || ant.inarow > 100;
        },
        sideEffects: function (ant) {
            if (ant.hasFood) {
                ant.simulation.totalFoodReturned += 1;
                ant.hasFood = false;
            }
        }
    };
}
///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////

