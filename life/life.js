var DEAD = 0;
var ALIVE = 1;

function life_instance () {
    this.seed = 0;
    this.probability = 0;

    this.createpop = 0;
    this.underpop = 0;
    this.overpop = 0;

    this.num_cols = 320;
    this.num_rows = 160;

    this.canvas_width = 1000;
    this.canvas_height = 500;
    this.divid = ""; // canvas id
    this.speed = 75; // milliseconds per redraw
    this.kill = true;

    this.age = 0;

    this.grid = [];
}

function create_instance (life_instance, has_prob, form)
{
    life_instance.createpop = parseInt (form.create.value);
    life_instance.underpop = parseInt (form.starve.value);
    life_instance.overpop = parseInt (form.suffocate.value);
    life_instance.seed = parseFloat (form.seed.value);
    if (has_prob) {
        life_instance.probability = parseFloat (form.probability.value);
    }
    life_instance.kill=true;
    run (life_instance, 1000);
}

function run_no_graphics (life, iterations)
{
    life.grid = create_grid (life, true);
    while (life.age < iterations) {
        update (life);
    }
}

function run (life, iterations) {
    if (life.kill) {
        life.grid = create_grid (life, true);
        life.age = 0;
        life.kill = false;
    }
    if (!life.kill && life.age <= iterations) {
        setTimeout (function () {
            update (life);
            draw_life (life);
            run (life, iterations);
        }, life.speed);
    }
}

function create_grid (life, seed_on)
{
    var grid = [];
    for (var r = 0; r < life.num_rows; r++) {
        var row = [];
        for (var c = 0; c < life.num_cols; c++) {
            if (seed_on && Math.random () < life.seed) {
                row.push (ALIVE);
            } else {
                row.push (DEAD);
            }
        }
        grid.push(row);
    }
    return grid;
}

function update (life)
{
    var new_grid = create_grid (life, false);
    for (var r = 0; r < life.num_rows; r++) {
        for (var c = 0; c < life.num_cols; c++) {
            // stay alive or be born or spawn
            if ((life.grid[r][c] >= ALIVE &&
                num_neighbors (life,r,c) >= life.underpop &&
                num_neighbors (life,r,c) <= life.overpop) ||
                (life.grid[r][c] == DEAD &&
                num_neighbors (life,r,c) == life.createpop) ||
                (life.grid[r][c] == DEAD && Math.random () < life.probability)){
                    new_grid[r][c] = life.grid[r][c]+1; // age by 1
            }
        }
    }
    life.age++;
    life.grid = new_grid;
}

function num_neighbors (life, row, col)
{
    var neighbors = 0;
    if (life.grid[row][col] >= ALIVE) { neighbors = -1;}
    for (var r = -1; r <= 1; r++) {
        for (var c = -1; c <= 1; c++) {
            var nr = life.num_rows; var nc = life.num_cols;
            if (life.grid[(row+r+nr)%nr][(col+c+nc)%nc] >= ALIVE) {
                neighbors += 1;
            }
        }
    }
    return neighbors;
}

function draw_life (instance)
{
    var g2=document.getElementById(instance.divid).getContext("2d");
    var width = instance.canvas_width;
    var height = instance.canvas_height;

    g2.fillRect(0,0,width,height);
    for (var r = 0; r < instance.num_rows; r++) {
        for (var c = 0; c < instance.num_cols; c++) {
            // note that strictly > can be used to reduce noise
            if (instance.grid[r][c] >= ALIVE) {
                g2.fillStyle="#FF0000"; // red
                var px_width = width / instance.num_cols;
                var px_height = height / instance.num_rows;

                g2.fillRect (px_width*c, px_height*r, px_width, px_height);
            }
        }
    }
    g2.fillStyle="#000000"; // black
}

function density (instance)
{
    var sum = 0;
    for (var r = 0; r < instance.num_rows; r++) {
        for (var c = 0; c < instance.num_cols; c++) {
            if (instance.grid[r][c] >= ALIVE) {
                sum++;
            }
        }
    }
    return sum / (instance.num_rows * instance.num_cols);
}

function graph_instance ()
{
    this.min = 0;
    this.max = 0;
    this.step = 0;

    this.instance_grid = [];

    this.divid = ""; // canvas id
    this.canvas_width = 960;
    this.canvas_height = 210;
}

function create_graph_instance (graph, has_probability, form)
{
    var min = parseFloat (form.seed_min.value);
    var max = parseFloat (form.seed_max.value);
    var step = parseFloat (form.seed_step.value);
    graph.min = min; graph.max = max; graph.step = step;
    graph.iterations = parseInt (form.iters.value);
    for (var y = 1; y <= 8; y++) {
        var row = [];
        for (var x = min; x < max; x+=step) {
            var i = new life_instance ();

            i.num_rows = 35;
            i.num_cols = 35;

            i.seed = x;

            if (form.create.value == "y") {
                i.createpop = y;
            } else {
                i.createpop = parseInt (form.create.value);
            }
            if (form.starve.value == "y") {
                i.underpop = y;
            } else {
                i.underpop = parseInt (form.starve.value);
            }
            if (form.suffocate.value == "y") {
                i.overpop = y;
            } else {
                i.overpop = parseInt (form.suffocate.value);
            }


            row.push(i)
        }
        graph.instance_grid.push (row);
    }
}

function draw_graph (graph)
{
    var g2=document.getElementById(graph.divid).getContext("2d");
    var width = graph.canvas_width;
    var height = graph.canvas_height;

    g2.fillStyle="#000000"; // black
    g2.fillRect(40,0,width,height);
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < Math.round((graph.max-graph.min)/graph.step); x+=1){
            run_no_graphics (graph.instance_grid[y][x],graph.iterations);
            var d = density (graph.instance_grid[y][x]);
            var fill_string = "rgb(0," + Math.round (d*255) + ",0)";
            g2.fillStyle = fill_string;

            var px_width = width / Math.round((graph.max-graph.min)/graph.step);
            var px_height = height / 8;

            g2.fillRect (40+px_width*x,height-(px_height*(y+1)), px_width, px_height);
            g2.fillStyle="#000000"; // black
        }
    }

    g2.fillStyle="#000000"; // black
}
