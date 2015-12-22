function createWorld(dimensions) {
    // dimensions looks like {x: width, y: height, z: depth}
    return {
        dimensions: dimensions,

        grid: function() {
            var grid = [];

            for (var x = 0; x < dimensions.x; x++) {
                var row = [];
                for (var y = 0; y < dimensions.y; y++) {
                    var col = [];
                    for (var z = 0; z < dimensions.z; z++) {
                        col.push(createCell({x: x, y: y, z: z}));
                    }
                    row.push(col);
                }
                grid.push(row);
            }
            // Point the cell at its neighbors -- all cells sharing a face, edge or vertex
            // with the cell. (there are 26). The grid wraps so that stencils will
            // always line up, but in practice I might put some invisible barrier around
            // the edge to prevent ants from going around.
            for (var x = 0; x < dimensions.x; x++) {
            for (var y = 0; y < dimensions.y; y++) {
            for (var z = 0; z < dimensions.z; z++) {
                var cell = grid[x][y][z];
                cell.neighbors = [];
                for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                for (var k = -1; k <= 1; k++) {
                    cell.neighbors.push(grid[(x+i + dimensions.x) % dimensions.x]
                                            [(y+j + dimensions.y) % dimensions.y]
                                            [(z+k + dimensions.z) % dimensions.z]);
                }
                }
                }
            }
            }
            }
            return grid;
        }(),

        getCell: function(point) {
            return this.grid[point.x][point.y][point.z];
        },

        getRandomCell: function() {
            return this.grid[Math.floor(Math.random() * this.dimensions.x)]
                            [Math.floor(Math.random() * this.dimensions.y)]
                            [Math.floor(Math.random() * this.dimensions.z)]
        },

        getRandomOccupiableCell: function() {
            var occupiable = this.getOccupiableCells();
            return occupiable[Math.floor(Math.random() * occupiable.length)];
        },

        getOccupiableCells: function() {
            var occupiable = [];
            for (var x = 0; x < dimensions.x; x++) {
            for (var y = 0; y < dimensions.y; y++) {
            for (var z = 0; z < dimensions.z; z++) {
                var cell = this.grid[x][y][z];
                if (cell.occupiable()) {
                    occupiable.push(cell);
                }
            }
            }
            }
            return occupiable;
        },

        getOccupiableDirtCells: function() {
            if (this.dirtToRenderCache) {
                return this.dirtToRenderCache;
            }
            var occupiable = [];
            for (var x = 0; x < dimensions.x; x++) {
            for (var y = 0; y < dimensions.y; y++) {
            for (var z = 0; z < dimensions.z; z++) {
                var cell = this.grid[x][y][z];
                if (cell.type === "dirt") {
                    var closeNeighbors = [4, 10, 12, 14, 16, 22];
                    for (var i = 0; i < closeNeighbors.length; i++) {
                        var dirtCell = cell.neighbors[closeNeighbors[i]];
                        if (dirtCell.occupiable() &&
                            !isWrappedAround(cell.position, dirtCell.position)) {
                            occupiable.push(cell);
                        }
                    }
                }
            }
            }
            }
            this.dirtToRenderCache = occupiable;
            return occupiable;
        },

        seedWithDirt: function(depth) {
            this.depth = depth;
            for (var x = 0; x < dimensions.x; x++) {
                for (var y = 0; y < depth; y++) {
                    for (var z = 0; z < dimensions.z; z++) {
                        this.grid[x][y][z].type = "dirt";
                    }
                }
            }
        },

        clearDirtOffSurface: function() {
            var y = this.depth;
            for (var x = 0; x < this.dimensions.x; x++) {
                for (var z = 0; z < this.dimensions.z; z++) {
                    this.grid[x][y][z].type = "empty";
                }
            }
            this.dirtToRenderCache = null;
        }
    };
}

function createCell(point) {
    return {
        position: {x: point.x, y: point.y, z: point.z},
        neighbors: [],
        type: "empty", // dirt, ant, food, rock
        ant: null,
        pheromone: 0,
        // a cell is occupiable if it is empty AND it neighbors
        // something solid like dirt or rock.
        occupiable: function () {
            if (this.type === "empty" || this.type === "food") {
                for (var i = 0; i < this.neighbors.length; i++) {
                    if (isWrappedAround(this.neighbors[i].position, this.position)) {
                       continue;
                    }
                    if (this.neighbors[i].type === "dirt" ||
                        this.neighbors[i].type === "rock") {
                            return true;
                    }
                }
            }
            return false;
        }
    };

    return cell;
}

function isWrappedAround(pos1, pos2) {
    return (Math.abs(pos1.x - pos2.x) > 1 ||
            Math.abs(pos1.y - pos2.y) > 1 ||
            Math.abs(pos1.z - pos2.z) > 1);
}

