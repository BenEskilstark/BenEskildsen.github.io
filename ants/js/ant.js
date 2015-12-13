// Ants make decisions on two levels: based on their currentState and then based on the
// specific operations of that state. For example, when an ant is in the "wander" state it will
// choose to move randomly until something triggers it to change states (eg. if it found food
// and entered the "returnToNest" state.
//
// A state is just an array of numbers. When deciding what to do, the ant will take in a series
// of 7-element matrices (called "stencils" for their loose correspondence to this simulation
// strategy:  https://en.wikipedia.org/wiki/Stencil_code (in practice the stencils will be 1D
// arrays, but will correspond to the 3D world directly)) whose contents depends on some
// external factor as it exists in the ant's cell's immediate neighbors. For example a
// stencil for pheromones would have the pheromone levels of each of the ant's cell's neighbors
// so that the ant could move toward (locally) higher concentrations of pheromones. The array
// of numbers in the state will be used as coefficients/constants to be multiplied into each
// of the stencils based on the relative importance of each type of stencil for the specific
// state the ant is in. Then all the stencils will be summed and the value in each neighboring
// cell will be used as weights for the ant to randomly decide which cell to move to next
// (biased towards cells with higher stencil values).
//
// The values in every cell of a stencil will be between 0 - 1 so that they can't overload
// each other -- only the relative importance of that stencil (based on its coefficient in the
// state array) can cause one stencil's values to be significantly bigger than another's.
//
// At each time the ant decides, it will also examine certain factors to decide if it should
// change states.
//
// Order of stencils therefore matters to the order of coefficients given in each state.
// The zeroeth stencil will always give the cells that are physically possible to move to in the
// form of 1 or 0. The decide function will then further multiply each cell by the value in
// the 0th stencil so that it never chooses cells that are impossible to move to.

// states is a dictionary mapping state names (like wander) to the state array that represents
// that behavior. cell points back to the grid location where the ant is. The decide function
// is called every step and is where the ant uses the stencils to choose a neighboring cell
// to move to, and decides whether or not to switch states. It returns the cell it wants to
// move to  and updates its own currentState. decide() will also call behavior as its way to
// change states. This way, any type of ant decision-making can be
// specified entirely between the states available to it and the strategy it uses to switch
// between states (the behavior function).
function createAnt(name, cell, states, behavior) {
    return {
        name: name,
        cell: cell,
        previousCell: cell,
        states: states,
        currentState: states.wander,
        pheromone: 1, // pheromone it puts down per step

        decide: function(stencils) {
            this.currentState = behavior(this, states, stencils);

            var totalStencil = stencils[0];
            for (var i = 1; i < this.currentState.length && i < stencils.length; i++) {
                for (var j = 0; j < totalStencil.length; j++) {
                    totalStencil[j] += this.currentState[i] * stencils[i][j] * stencils[0][j];
                }
            }

            return pickFromArray(totalStencil);
        }
    };
}

///////////////////////////////////////////////////////////////////////////////////
// Some specific types of ants
function createTestAnt(name, cell) {
    return createAnt(
        name,
        cell,
        {
            wander: [1],
            followPheromone: [1, 1],
            goStraight: [1, 0, 10],
            goStraightAndFollowPheromone: [1, 1, 10]
        },
        function (ant, states, stencils) {
            return states.goStraightAndFollowPheromone;
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
