function createWorld(dimensions) {
    // dimensions looks like {x: width, y: height, z: depth}Õ
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
            // Point the cell at its neighbors, where neighbors are cells that share a face
            // with the cell. (there are 6). The grid wraps so that stencils will
            // always line up, but in practice I might put some invisible barrier around
            // the edge to prevent ants from going around.
            for (var x = 0; x < dimensions.x; x++) {
            for (var y = 0; y < dimensions.y; y++) {
            for (var z = 0; z < dimensions.z; z++) {
                var cell = grid[x][y][z];
                cell.neighbors.push(grid[(x + grid.length - 1) % grid.length][y][z]);
                cell.neighbors.push(grid[(x + grid.length + 1) % grid.length][y][z]);

                cell.neighbors.push(grid[x][(y + grid.length - 1) % grid[0].length][z]);
                cell.neighbors.push(grid[x][(y + grid.length + 1) % grid[0].length][z]);

                cell.neighbors.push(grid[x][y][(z + grid.length - 1) % grid[0][0].length]);
                cell.neighbors.push(grid[x][y][(z + grid.length + 1) % grid[0][0].length]);
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
                    for (var i = 0; i < cell.neighbors.length; i++) {
                        if (cell.neighbors[i].occupiable()) {
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
            for (var x = 0; x < dimensions.x; x++) {
                for (var y = 0; y < depth; y++) {
                    for (var z = 0; z < dimensions.z; z++) {
                        this.grid[x][y][z].type = "dirt";
                    }
                }
            }
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
        },
    };

    return cell;
}

function isWrappedAround(pos1, pos2) {
    return (Math.abs(pos1.x - pos2.x) > 1 ||
            Math.abs(pos1.y - pos2.y) > 1 ||
            Math.abs(pos1.z - pos2.z) > 1);
}

